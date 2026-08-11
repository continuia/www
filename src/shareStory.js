/**
 * Share Your Story — a standalone, full-page patient intake conversation
 * with Aarika, Continuia's intake specialist. Deliberately separate from
 * chat.js (the Maya marketing/sales widget): its own session key, its own
 * persona flag sent to /api/chat, its own inline layout instead of a
 * slide-over panel. The two never share a session id.
 */

function getCookie(name) {
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return m ? m[2] : null;
}
function setCookie(name, value, days) {
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value};expires=${exp};path=/;SameSite=Lax`;
}

const SESSION_KEY = 'continuia_intake_session_id';
let sessionId = localStorage.getItem(SESSION_KEY) || getCookie(SESSION_KEY);
if (!sessionId) {
  sessionId = 'intake-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
localStorage.setItem(SESSION_KEY, sessionId);
setCookie(SESSION_KEY, sessionId, 30);

const messages = [];

const messagesList = document.getElementById('intake-messages');
const typingEl     = document.getElementById('intake-typing');
const input        = document.getElementById('intake-input');
const sendBtn      = document.getElementById('intake-send');

input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});
sendBtn.addEventListener('click', sendMessage);

async function loadOpening() {
  try {
    const res = await fetch('/api/opening?persona=intake');
    const { message } = await res.json();
    appendMessage('assistant', message);
    messages.push({ role: 'assistant', content: message });
  } catch {
    const fallback = "Hi, I'm Aarika. What's going on, and what would you like a second opinion on?";
    appendMessage('assistant', fallback);
    messages.push({ role: 'assistant', content: fallback });
  }
  input.focus();
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
        persona: 'intake',
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
      appendMessage('assistant', 'Having a moment, try again in a sec.');
      return;
    }

    appendMessage('assistant', reply);
    messages.push({ role: 'assistant', content: reply });
  } catch {
    typingEl.classList.add('hidden');
    appendMessage('assistant', 'Connection issue, try again in a moment.');
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

loadOpening();
