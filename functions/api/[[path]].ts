import { SYSTEM_PROMPT, OPENING_MESSAGE, ADMIN_SYSTEM_PROMPT, INTAKE_SYSTEM_PROMPT, INTAKE_OPENING_MESSAGE } from '../_shared/persona';

export interface Env {
  ANTHROPIC_API_KEY: string;
  ADMIN_PASSWORD: string;
  LEADS_KV: KVNamespace;
  // Base URL of the doctor-directory backend, set as a Cloudflare Pages
  // environment variable (Settings -> Environment variables). NOT wired to
  // a live backend yet — see handleDoctors/handleDoctorProfile below and
  // the Phase 2 migration report for what needs confirming before this
  // returns real data. No default is baked in here on purpose: guessing
  // between the two candidate URLs in the old .env would be worse than an
  // honest "not configured" response.
  PUBLIC_API_BASE_URL?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string | Array<{ type: string; text: string; cache_control?: { type: string } }>;
}

interface SessionMeta {
  browser?: string;
  referrer?: string;
  page?: string;
  tz?: string;
}

interface LeadData {
  sessionId: string;
  // Contact
  name?: string;
  email?: string;
  phone?: string;
  org?: string;
  // Intent
  need?: string;      // what they're asking for (second opinion / governance partnership / other)
  urgency?: string;
  summary: string;
  // Session
  messages: Message[];
  meta?: SessionMeta;
  source: 'chat' | 'contact-form' | 'patient-intake';
  capturedAt: string;
  updatedAt: string;
  // Admin
  notes?: string;
  pendingMessage?: string;
  pendingMessageAt?: string;
}

function nowISO(): string {
  return new Date().toISOString();
}

// ── Router ────────────────────────────────────────────────────────────────────

export async function onRequest(ctx: EventContext<Env, string, Record<string, unknown>>): Promise<Response> {
  const { request, env } = ctx;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/chat'    && request.method === 'POST') return handleChat(request, env, ctx);
  if (path === '/api/contact' && request.method === 'POST') return handleContact(request, env);
  if (path === '/api/session' && request.method === 'GET')  return handleSession(url, env);
  if (path === '/api/opening') {
    const isIntake = url.searchParams.get('persona') === 'intake';
    return Response.json({ message: isIntake ? INTAKE_OPENING_MESSAGE : OPENING_MESSAGE });
  }

  if (path === '/api/doctors' && request.method === 'GET') return handleDoctors(env);
  const doctorMatch = path.match(/^\/api\/doctors\/([^/]+)$/);
  if (doctorMatch && request.method === 'GET') return handleDoctorProfile(doctorMatch[1], env);

  if (path.startsWith('/api/admin/')) {
    const pw = request.headers.get('X-Admin-Password');
    if (!pw || pw !== env.ADMIN_PASSWORD) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (path === '/api/admin/leads'     && request.method === 'GET')    return handleAdminLeads(env);
    if (path === '/api/admin/lead-note' && request.method === 'POST')   return handleAdminLeadNote(request, env);
    if (path === '/api/admin/lead'      && request.method === 'GET')    return handleAdminLead(url, env);
    if (path === '/api/admin/lead'      && request.method === 'DELETE') return handleAdminDeleteLead(url, env);
    if (path === '/api/admin/chat'      && request.method === 'POST')   return handleAdminChat(request, env);
  }

  return new Response('Not found', { status: 404 });
}

// ── Visitor chat ──────────────────────────────────────────────────────────────

async function handleChat(request: Request, env: Env, ctx: EventContext<Env, string, Record<string, unknown>>): Promise<Response> {
  let body: { messages: Message[]; sessionId?: string; meta?: SessionMeta; persona?: string };
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { messages, sessionId, meta, persona } = body;
  if (!messages?.length) return Response.json({ error: 'messages required' }, { status: 400 });

  const isIntake = persona === 'intake';
  const systemPrompt = isIntake ? INTAKE_SYSTEM_PROMPT : SYSTEM_PROMPT;

  const cachedMessages = messages.map((m, i) =>
    i === messages.length - 1 && m.role === 'user'
      ? { role: m.role, content: [{ type: 'text', text: m.content as string, cache_control: { type: 'ephemeral' } }] }
      : m
  );
  const res = await claudeChat(env.ANTHROPIC_API_KEY, systemPrompt, cachedMessages, 'claude-sonnet-4-6', 400);
  if (!res.ok) return Response.json({ error: 'Upstream error' }, { status: 502 });

  const data = await res.json() as { content: Array<{ text: string }> };
  const reply = data.content?.[0]?.text ?? '';

  if (sessionId) {
    const all = [...messages, { role: 'assistant' as const, content: reply }];
    ctx.waitUntil(persistLead(all, sessionId, meta, env, isIntake ? 'patient-intake' : 'chat').catch(() => {}));
  }

  return Response.json({ reply });
}

// ── Contact form (Get in touch) ─────────────────────────────────────────────

async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: { name?: string; email?: string; phone?: string; org?: string; message?: string };
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { name, email, phone, org, message } = body;
  if (!email) return Response.json({ error: 'email required' }, { status: 400 });

  const sessionId = `contact-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  const now = nowISO();

  const lead: LeadData = {
    sessionId,
    name: name ?? undefined,
    email,
    phone: phone ?? undefined,
    org: org ?? undefined,
    need: 'contact form',
    summary: message ? message.slice(0, 200) : 'Contact form submission',
    messages: message ? [{ role: 'user', content: message }] : [],
    source: 'contact-form',
    capturedAt: now,
    updatedAt: now,
  };

  await env.LEADS_KV.put(`lead:${sessionId}`, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 180 });
  return Response.json({ ok: true });
}

// ── Public: session lookup (returning visitor) ────────────────────────────────

async function handleSession(url: URL, env: Env): Promise<Response> {
  const id = url.searchParams.get('id');
  if (!id) return Response.json({ exists: false });
  const raw = await env.LEADS_KV.get(`lead:${id}`);
  if (!raw) return Response.json({ exists: false });

  const lead = JSON.parse(raw) as LeadData;
  const pendingMessage = lead.pendingMessage ?? null;

  if (pendingMessage) {
    lead.pendingMessage = undefined;
    lead.pendingMessageAt = undefined;
    lead.updatedAt = nowISO();
    await env.LEADS_KV.put(`lead:${id}`, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 180 });
  }

  return Response.json({
    exists: true,
    name: lead.name ?? null,
    messageCount: lead.messages.length,
    messages: lead.messages,
    pendingMessage,
  });
}

// ── Admin: notes + pending message ────────────────────────────────────────────

async function handleAdminLeadNote(request: Request, env: Env): Promise<Response> {
  let body: { sessionId: string; notes?: string; pendingMessage?: string };
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const { sessionId, notes, pendingMessage } = body;
  if (!sessionId) return Response.json({ error: 'sessionId required' }, { status: 400 });

  const raw = await env.LEADS_KV.get(`lead:${sessionId}`);
  if (!raw) return Response.json({ error: 'Lead not found' }, { status: 404 });

  const lead = JSON.parse(raw) as LeadData;
  if (notes !== undefined) lead.notes = notes || undefined;
  if (pendingMessage !== undefined) {
    lead.pendingMessage = pendingMessage || undefined;
    lead.pendingMessageAt = pendingMessage ? nowISO() : undefined;
  }
  lead.updatedAt = nowISO();

  await env.LEADS_KV.put(`lead:${sessionId}`, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 180 });
  return Response.json({ ok: true });
}

// ── Admin: list leads ─────────────────────────────────────────────────────────

async function handleAdminLeads(env: Env): Promise<Response> {
  const keys: { name: string }[] = [];
  let cursor: string | undefined;
  do {
    const page = await env.LEADS_KV.list({ prefix: 'lead:', cursor });
    keys.push(...page.keys);
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  const leads = await Promise.all(
    keys.map(async ({ name }) => {
      try {
        const raw = await env.LEADS_KV.get(name);
        if (!raw) return null;
        const l = JSON.parse(raw) as LeadData;
        return {
          sessionId: l.sessionId,
          name: l.name, email: l.email, phone: l.phone,
          org: l.org, need: l.need, urgency: l.urgency,
          summary: l.summary ?? '',
          source: l.source,
          capturedAt: l.capturedAt, updatedAt: l.updatedAt,
          messageCount: (l.messages ?? []).length,
        };
      } catch { return null; }
    })
  );
  const sorted = leads
    .filter(Boolean)
    .sort((a, b) => new Date(b!.updatedAt ?? 0).getTime() - new Date(a!.updatedAt ?? 0).getTime());
  return Response.json({ leads: sorted });
}

async function handleAdminLead(url: URL, env: Env): Promise<Response> {
  const id = url.searchParams.get('id');
  if (!id) return Response.json({ error: 'id required' }, { status: 400 });
  const raw = await env.LEADS_KV.get(`lead:${id}`);
  if (!raw) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ lead: JSON.parse(raw) });
}

async function handleAdminDeleteLead(url: URL, env: Env): Promise<Response> {
  const id = url.searchParams.get('id');
  if (!id) return Response.json({ error: 'id required' }, { status: 400 });
  await env.LEADS_KV.delete(`lead:${id}`);
  return Response.json({ ok: true });
}

async function handleAdminChat(request: Request, env: Env): Promise<Response> {
  let body: { messages: Message[] };
  try { body = await request.json(); }
  catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const list = await env.LEADS_KV.list({ prefix: 'lead:' });
  const leads = await Promise.all(
    list.keys.slice(0, 50).map(async ({ name }) => {
      const raw = await env.LEADS_KV.get(name);
      return raw ? JSON.parse(raw) as LeadData : null;
    })
  );

  const leadsContext = leads
    .filter(Boolean)
    .sort((a, b) => new Date(b!.updatedAt).getTime() - new Date(a!.updatedAt).getTime())
    .map(l => [
      `--- Session: ${l!.sessionId} (${l!.source})`,
      `Name: ${l!.name ?? 'Unknown'} | Email: ${l!.email ?? '-'} | Phone: ${l!.phone ?? '-'}`,
      `Org: ${l!.org ?? 'Unknown'} | Need: ${l!.need ?? 'Unknown'} | Urgency: ${l!.urgency ?? '-'}`,
      `Captured: ${l!.capturedAt} | Updated: ${l!.updatedAt} | Messages: ${l!.messages.length}`,
      `Transcript:\n${(l!.messages ?? []).map(m => `${m.role}: ${typeof m.content === 'string' ? m.content : JSON.stringify(m.content)}`).join('\n')}`,
    ].join('\n'))
    .join('\n\n');

  const system = ADMIN_SYSTEM_PROMPT.replace('{{LEADS}}', leadsContext || 'No leads yet.');
  const res = await claudeChat(env.ANTHROPIC_API_KEY, system, body.messages, 'claude-sonnet-4-6', 1024);
  if (!res.ok) return Response.json({ error: 'Upstream error' }, { status: 502 });

  const data = await res.json() as { content: Array<{ text: string }> };
  return Response.json({ reply: data.content?.[0]?.text ?? '' });
}

// ── Lead qualification & persistence ─────────────────────────────────────────

async function persistLead(messages: Message[], sessionId: string, meta: SessionMeta | undefined, env: Env, source: 'chat' | 'patient-intake' = 'chat'): Promise<void> {
  if (!messages.length || !env.LEADS_KV) return;

  const key = `lead:${sessionId}`;
  const now = nowISO();

  const existingRaw = await env.LEADS_KV.get(key);
  const prev = existingRaw ? JSON.parse(existingRaw) as LeadData : null;

  const lead: LeadData = {
    sessionId,
    name:  prev?.name,
    email: prev?.email,
    phone: prev?.phone,
    org:   prev?.org,
    need:  prev?.need,
    urgency: prev?.urgency,
    summary: prev?.summary ?? '',
    messages,
    meta: meta ?? prev?.meta,
    source,
    capturedAt: prev?.capturedAt ?? now,
    updatedAt: now,
  };

  await env.LEADS_KV.put(key, JSON.stringify(lead), { expirationTtl: 60 * 60 * 24 * 180 });

  // Best-effort AI extraction; raw lead is already saved above.
  try {
    const prompt = `Analyze this conversation with a visitor to a healthcare second-opinion / clinical governance company's website. Extract contact info and what they need.
Respond ONLY with valid JSON - no markdown, no explanation:
{
  "name": string | null,
  "email": string | null,
  "phone": string | null,
  "org": string | null,
  "need": string | null,
  "urgency": string | null,
  "summary": string
}
Rules:
- "email" and "phone": only if explicitly mentioned in chat
- "need": what they actually want (patient second opinion, hospital/governance partnership, product question, general info)
- "urgency": flag clearly if this reads like an urgent patient situation
- "summary": one crisp sentence about who this is and what they need

Transcript:
${messages.map(m => `${m.role}: ${typeof m.content === 'string' ? m.content : JSON.stringify(m.content)}`).join('\n')}`;

    const res = await claudeChat(
      env.ANTHROPIC_API_KEY, '',
      [{ role: 'user', content: prompt }],
      'claude-haiku-4-5-20251001', 600,
    );
    if (!res.ok) {
      await env.LEADS_KV.put(`lead-err:${sessionId}`, `enrichment-upstream:${res.status}:${nowISO()}`, { expirationTtl: 60 * 60 * 24 * 7 });
      return;
    }

    const data = await res.json() as { content: Array<{ text: string }> };
    const text = (data.content?.[0]?.text ?? '{}').trim()
      .replace(/^```json?\s*/i, '').replace(/```\s*$/i, '');
    const x = JSON.parse(text) as {
      name?: string; email?: string; phone?: string;
      org?: string; need?: string; urgency?: string;
      summary?: string;
    };

    const enriched: LeadData = {
      ...lead,
      name:  x.name  ?? lead.name,
      email: x.email ?? lead.email,
      phone: x.phone ?? lead.phone,
      org:   x.org   ?? lead.org,
      need:  x.need  ?? lead.need,
      urgency: x.urgency ?? lead.urgency,
      summary: x.summary ?? lead.summary,
    };

    await env.LEADS_KV.put(key, JSON.stringify(enriched), { expirationTtl: 60 * 60 * 24 * 180 });
  } catch (err) {
    await env.LEADS_KV.put(
      `lead-err:${sessionId}`,
      `enrichment-exception:${String(err)}:${nowISO()}`,
      { expirationTtl: 60 * 60 * 24 * 7 },
    ).catch(() => {});
  }
}

// ── Doctor directory (proxy) ──────────────────────────────────────────────────
//
// The old React site never actually called a Continuia backend for doctor
// data: the listing pulled from a public Coda.io table with a bearer token
// hardcoded in client source, and the individual profile page was a hardcoded
// demo stub that only resolved id "1". There is no confirmed production
// doctor API today. This proxy is deliberately backend-agnostic: it forwards
// to PUBLIC_API_BASE_URL (a Cloudflare Pages env var, unset by default) and
// returns an honest "not configured" response until Shree confirms the real
// URL and this env var is set. See the Phase 2 report for the two candidate
// URLs found in the old .env and why neither was assumed.
//
// Expected upstream shape (adjust here once the real API is confirmed):
//   GET {base}/doctors        -> { doctors: [{ id, name, specialty, credentials, ... }] }
//   GET {base}/doctors/:id    -> { doctor: { id, name, specialty, credentials, bio, ... } }

async function handleDoctors(env: Env): Promise<Response> {
  if (!env.PUBLIC_API_BASE_URL) {
    return Response.json({ configured: false, doctors: [] });
  }
  try {
    const upstream = await fetch(`${env.PUBLIC_API_BASE_URL.replace(/\/$/, '')}/doctors`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!upstream.ok) return Response.json({ configured: true, error: 'Upstream error', doctors: [] }, { status: 502 });
    const data = await upstream.json() as unknown;
    const body: Record<string, unknown> = Array.isArray(data) ? { doctors: data } : (data as Record<string, unknown>);
    return Response.json({ configured: true, ...body });
  } catch {
    return Response.json({ configured: true, error: 'Upstream unreachable', doctors: [] }, { status: 502 });
  }
}

async function handleDoctorProfile(id: string, env: Env): Promise<Response> {
  if (!env.PUBLIC_API_BASE_URL) {
    return Response.json({ configured: false, doctor: null });
  }
  try {
    const upstream = await fetch(`${env.PUBLIC_API_BASE_URL.replace(/\/$/, '')}/doctors/${encodeURIComponent(id)}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (upstream.status === 404) return Response.json({ configured: true, doctor: null }, { status: 404 });
    if (!upstream.ok) return Response.json({ configured: true, error: 'Upstream error', doctor: null }, { status: 502 });
    const data = await upstream.json() as Record<string, unknown>;
    return Response.json({ configured: true, doctor: data.doctor ?? data });
  } catch {
    return Response.json({ configured: true, error: 'Upstream unreachable', doctor: null }, { status: 502 });
  }
}

// ── Claude helper ─────────────────────────────────────────────────────────────

function claudeChat(
  apiKey: string, system: string, messages: Message[], model: string, maxTokens: number,
): Promise<Response> {
  const body: Record<string, unknown> = { model, max_tokens: maxTokens, messages };
  if (system) {
    body.system = [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }];
  }
  return fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'prompt-caching-2024-07-31',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
