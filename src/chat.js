/**
 * Maya chat widget — calls /api/* on the same origin (Cloudflare Pages Functions).
 * - Session persisted to localStorage + 30-day cookie for cross-navigation continuity
 * - Chat opens as a right-side panel, page remains scrollable behind it
 * - Renders assistant messages as markdown
 * - Sends browser metadata with each request
 */

// ── Session ───────────────────────────────────────────────────────────────────

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? m[2] : null;
}
function setCookie(name, value, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${exp};path=/;SameSite=Lax`;
}

const SESSION_KEY = 'continuia_session_id';
let sessionId = localStorage.getItem(SESSION_KEY) || getCookie(SESSION_KEY);
if (!sessionId) {
  sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
}
localStorage.setItem(SESSION_KEY, sessionId);
setCookie(SESSION_KEY, sessionId, 30);

const messages = [];

// ── DOM ───────────────────────────────────────────────────────────────────────

const panel        = document.getElementById('chat-panel');
const overlay      = document.getElementById('chat-overlay');
const bubble       = document.getElementById('chat-bubble');
const closeBtn     = document.getElementById('chat-close');
const freshBtn     = document.getElementById('chat-fresh-btn');
const input        = document.getElementById('chat-input');
const sendBtn      = document.getElementById('chat-send');
const messagesList = document.getElementById('chat-messages');
const typingEl     = document.getElementById('chat-typing');

document.querySelectorAll('#chat-open-hero, #chat-open-nav, #chat-open-cta, #footer-chat-btn, #chat-bubble').forEach(el => {
  el?.addEventListener('click', openChat);
});

window.openChat = openChat;

let opened = false;

function openChat() {
  panel.classList.add('open');
  if (window.innerWidth <= 640) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (!opened) {
    opened = true;
    initChat();
  }
  setTimeout(() => input.focus(), 320);
}

function closeChat() {
  panel.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
closeBtn.addEventListener('click', closeChat);
overlay.addEventListener('click', closeChat);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
sendBtn.addEventListener('click', sendMessage);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && panel.classList.contains('open')) closeChat();
});

if (freshBtn) {
  freshBtn.addEventListener('click', () => {
    messagesList.querySelectorAll('.reconnect-card').forEach(n => n.remove());
    startFreshSession();
  });
}

async function initChat() {
  freshBtn?.classList.remove('hidden');
  try {
    const res = await fetch(`/api/session?id=${encodeURIComponent(sessionId)}`);
    const data = await res.json();
    if (data.exists && data.messageCount > 2) {
      showReconnectPrompt(data);
      return;
    }
  } catch { /* network error, fall through to opening */ }
  loadOpening();
}

function showReconnectPrompt(data) {
  const el = document.createElement('div');
  el.className = 'reconnect-card';
  const greeting = data.name ? `, ${data.name}` : '';
  el.innerHTML = `<p>Good to have you back${greeting}. We were mid-conversation. Pick up where we left off, or start fresh?</p>
    <div class="reconnect-btns">
      <button class="reconnect-btn primary" id="btn-continue">Continue</button>
      <button class="reconnect-btn" id="btn-fresh">Start fresh</button>
    </div>`;
  messagesList.appendChild(el);
  scrollToBottom();

  document.getElementById('btn-continue').addEventListener('click', () => {
    el.remove();
    continueSession(data);
  });
  document.getElementById('btn-fresh').addEventListener('click', () => {
    el.remove();
    startFreshSession();
  });
}

function continueSession(data) {
  (data.messages || []).forEach(m => {
    const text = typeof m.content === 'string' ? m.content : (m.content?.[0]?.text ?? '');
    appendMessage(m.role === 'user' ? 'user' : 'assistant', text);
    messages.push(m);
  });

  if (data.pendingMessage) {
    const note = `**A note from the Continuia team:**\n\n${data.pendingMessage}`;
    appendMessage('assistant', note);
    messages.push({ role: 'assistant', content: note });
  }

  scrollToBottom();
}

function startFreshSession() {
  sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  localStorage.setItem(SESSION_KEY, sessionId);
  setCookie(SESSION_KEY, sessionId, 30);
  messages.length = 0;
  messagesList.innerHTML = '';
  loadOpening();
}

async function loadOpening() {
  try {
    const res = await fetch('/api/opening');
    const { message } = await res.json();
    appendMessage('assistant', message);
    messages.push({ role: 'assistant', content: message });
  } catch {
    const fallback = "Hi, I'm Maya, Continuia's care guide. What brought you here today?";
    appendMessage('assistant', fallback);
    messages.push({ role: 'assistant', content: fallback });
  }
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  sendBtn.disabled = true;
  appendMessage('user', text);
  messages.push({ role: 'user', content: text });

  typingEl.classList.remove('hidden');
  scrollToBottom();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages,
        sessionId,
        meta: {
          browser: navigator.userAgent,
          referrer: document.referrer,
          page: location.pathname,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      }),
    });

    const { reply, error } = await res.json();
    typingEl.classList.add('hidden');

    if (error || !reply) {
      appendMessage('assistant', 'Having a moment - try again in a sec.');
      return;
    }

    appendMessage('assistant', reply);
    messages.push({ role: 'assistant', content: reply });
  } catch {
    typingEl.classList.add('hidden');
    appendMessage('assistant', 'Connection issue - try again in a moment.');
  } finally {
    sendBtn.disabled = false;
    input.focus();
    scrollToBottom();
  }
}

function appendMessage(role, text) {
  const el = document.createElement('div');
  el.className = `msg msg-${role}`;
  if (role === 'assistant') {
    el.innerHTML = renderMarkdown(text);
  } else {
    el.textContent = text;
  }
  messagesList.appendChild(el);
  scrollToBottom();
}

function renderMarkdown(text) {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${code.trim()}</code></pre>`
  );
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  html = html
    .split(/\n{2,}/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<')) return block;
      return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');

  return html;
}

function scrollToBottom() {
  messagesList.scrollTop = messagesList.scrollHeight;
}
