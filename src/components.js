// Shared nav, footer, and chat panel for every page.
// Pages include: <div id="site-nav"></div> and <footer class="footer" id="site-footer"></footer>
// Chat panel is injected automatically into document.body.
(function () {
  var LOGO = '<img src="/continuia.png" alt="Continuia" />';

  var LINKS = [
    { href: '/', text: 'Home', key: 'home' },
    { href: '/insights.html', text: 'Insights', key: 'insights' },
    { href: '/governance.html', text: 'Governance', key: 'governance' },
    { href: '/products.html', text: 'Products', key: 'products' },
    { href: '/about.html', text: 'About', key: 'about' },
  ];

  var LEGAL_LINKS = [
    { href: '/privacy.html', text: 'Privacy Policy' },
    { href: '/terms.html', text: 'Terms of Service' },
    { href: '/baa.html', text: 'Business Associate Agreement' },
    { href: '/dpa.html', text: 'Data Processing Addendum' },
    { href: '/ai-policy.html', text: 'AI-Assisted Opinion Policy' },
    { href: '/ethics-pledge.html', text: 'Public Ethics Pledge' },
  ];

  function getActive() {
    var p = window.location.pathname;
    if (p === '/' || /\/index\.html$/.test(p)) return 'home';
    for (var i = 0; i < LINKS.length; i++) {
      if (LINKS[i].key !== 'home' && p.indexOf(LINKS[i].key) !== -1) return LINKS[i].key;
    }
    return '';
  }

  var active = getActive();

  function deskLinks() {
    return LINKS.map(function (l) {
      var c = l.key === active ? ' class="active"' : '';
      return '<a href="' + l.href + '"' + c + '>' + l.text + '</a>';
    }).join('') + '<a href="/getInTouch.html" class="btn btn-nav">Talk to us</a>';
  }

  function mobileLinksHtml() {
    return LINKS.map(function (l) {
      var c = l.key === active ? ' class="active"' : '';
      return '<a href="' + l.href + '"' + c + '>' + l.text + '</a>';
    }).join('');
  }

  // Inject nav
  var navPlaceholder = document.getElementById('site-nav');
  if (navPlaceholder) {
    var navHtml = [
      '<nav class="nav" id="nav">',
      '  <a class="nav-brand" href="/">' + LOGO + '</a>',
      '  <div class="nav-links">' + deskLinks() + '</div>',
      '  <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-label="Open menu"><span></span><span></span><span></span></button>',
      '</nav>',
      '<div class="nav-mobile-menu" id="nav-mobile-menu">',
      '  <div class="nav-mobile-header">',
      '    <a class="nav-brand" href="/">' + LOGO + '</a>',
      '    <button class="nav-mobile-close" id="nav-mobile-close" aria-label="Close menu"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4L4 12M4 4l8 8"/></svg></button>',
      '  </div>',
      '  <nav class="nav-mobile-links">' + mobileLinksHtml() + '</nav>',
      '  <a href="/getInTouch.html" class="btn btn-primary btn-large nav-mobile-cta">Talk to us</a>',
      '</div>',
    ].join('');
    navPlaceholder.outerHTML = navHtml;
  }

  // Inject footer
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    var legalLinksHtml = LEGAL_LINKS.map(function (l) {
      return '<a href="' + l.href + '">' + l.text + '</a>';
    }).join('');
    var productLinksHtml = [
      { href: '/products.html#insights', text: 'Continuia Insights' },
      { href: '/products.html#governance', text: 'Continuia Governance' },
      { href: '/products.html#cliniq', text: 'ClinIQ' },
      { href: '/products.html#pulse', text: 'Pulse' },
    ].map(function (l) { return '<a href="' + l.href + '">' + l.text + '</a>'; }).join('');
    var companyLinksHtml = [
      { href: '/about.html', text: 'About' },
      { href: '/getInTouch.html', text: 'Get in touch' },
      { href: 'https://linkedin.com/company/continuia', text: 'LinkedIn' },
    ].map(function (l) { return '<a href="' + l.href + '" ' + (l.href.indexOf('http') === 0 ? 'target="_blank" rel="noopener"' : '') + '>' + l.text + '</a>'; }).join('');

    footerEl.innerHTML = [
      '<div class="container">',
      '  <div class="footer-inner">',
      '    <div class="footer-brand">',
      '      <img src="/continuia.png" alt="Continuia" />',
      '      <p>AI-enhanced second medical opinions and clinical governance, reviewed by board-certified specialists. We don\'t replace doctors. We help you and your care team decide with confidence.</p>',
      '    </div>',
      '    <div class="footer-cols">',
      '      <div class="footer-col"><div class="footer-col-title">Products</div>' + productLinksHtml + '</div>',
      '      <div class="footer-col"><div class="footer-col-title">Company</div>' + companyLinksHtml + '</div>',
      '      <div class="footer-col"><div class="footer-col-title">Legal</div>' + legalLinksHtml + '</div>',
      '    </div>',
      '  </div>',
      '  <div class="footer-bottom">',
      '    <div class="footer-legal-name">&copy; ' + new Date().getFullYear() + ' Continuia HealthTech Pvt Ltd. All rights reserved.</div>',
      '    <div class="footer-social">',
      '      <a href="https://linkedin.com/company/continuia" target="_blank" rel="noopener" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/></svg></a>',
      '      <a href="https://instagram.com/continuia" target="_blank" rel="noopener" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none"/></svg></a>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('');
  }

  // Inject chat panel
  var CHAT_SVG_REFRESH = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M13.5 8A5.5 5.5 0 112.5 5M2.5 2v3h3"/></svg>';
  var CHAT_SVG_CLOSE   = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 4L4 12M4 4l8 8"/></svg>';
  var CHAT_SVG_SEND    = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8l12-6-6 12V8H2z" fill="currentColor"/></svg>';
  var CHAT_SVG_BUBBLE  = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
  var chatHtml = [
    '<div id="chat-overlay" class="chat-overlay"></div>',
    '<div id="chat-panel" class="chat-panel">',
    '  <div class="chat-header">',
    '    <div class="chat-header-info">',
    '      <div class="chat-avatar">',
    '        <img src="/avatar.png" alt="Maya" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" />',
    '        <span class="chat-avatar-fallback">M</span>',
    '      </div>',
    '      <div class="chat-header-text">',
    '        <div class="chat-name">Maya</div>',
    '        <div class="chat-status"><span class="chat-status-dot"></span>Continuia\'s care guide, online now</div>',
    '      </div>',
    '    </div>',
    '    <div class="chat-header-actions">',
    '      <button id="chat-fresh-btn" class="chat-fresh-btn hidden" title="Start fresh conversation" aria-label="Start fresh">' + CHAT_SVG_REFRESH + '</button>',
    '      <button id="chat-close" class="chat-close" aria-label="Close">' + CHAT_SVG_CLOSE + '</button>',
    '    </div>',
    '  </div>',
    '  <div id="chat-messages" class="chat-messages"></div>',
    '  <div id="chat-typing" class="chat-typing hidden"><span></span><span></span><span></span></div>',
    '  <div class="chat-input-row">',
    '    <input id="chat-input" type="text" placeholder="Ask about a second opinion, governance, or anything else…" autocomplete="off" />',
    '    <button id="chat-send" aria-label="Send">' + CHAT_SVG_SEND + '</button>',
    '  </div>',
    '</div>',
    '<div id="chat-bubble" class="chat-bubble" aria-label="Chat with Maya">' + CHAT_SVG_BUBBLE + '<span class="chat-bubble-ping"></span></div>',
  ].join('');
  document.body.insertAdjacentHTML('beforeend', chatHtml);

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // Mobile menu
  var toggle   = document.getElementById('nav-mobile-toggle');
  var menu     = document.getElementById('nav-mobile-menu');
  var closeBtn = document.getElementById('nav-mobile-close');
  function openMenu()  { if (menu) menu.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMenu() { if (menu) menu.classList.remove('open'); document.body.style.overflow = ''; }
  if (toggle) toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
})();
