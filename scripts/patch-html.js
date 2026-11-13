#!/usr/bin/env node
// Inserts SEO tags into src HTML. Does not change visible body copy,
// except the doctor profile shell uses an h1 for its loading state.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages.json'), 'utf8'));

const ORG_DESCRIPTION =
  'AI organizes, matches, and drafts but never diagnoses on its own, and a licensed, board-certified physician reviews every AI-assisted opinion. A documented specialist second opinion at the point of care, with no formal referral, and consults logged as they happen.';

function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://continuia.ai/#organization',
        name: 'Continuia',
        legalName: 'Continuia HealthTech Pvt Ltd.',
        url: 'https://continuia.ai/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://continuia.ai/android-chrome-512x512.png',
        },
        email: 'sales@continuia.ai',
        description: ORG_DESCRIPTION,
        sameAs: [
          'https://linkedin.com/company/continuia',
          'https://instagram.com/continuia',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://continuia.ai/#website',
        name: 'Continuia',
        url: 'https://continuia.ai/',
        description:
          'AI organizes, matches, and drafts but never diagnoses on its own, and a licensed, board-certified physician reviews every AI-assisted opinion.',
        publisher: { '@id': 'https://continuia.ai/#organization' },
      },
    ],
  };
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function headBlock(page) {
  const image = `https://continuia.ai/og/${page.image}`;
  const ld = JSON.stringify(jsonLd(), null, 2).replace(/</g, '\\u003c');
  return [
    `  <title>${esc(page.title)}</title>`,
    `  <meta name="description" content="${esc(page.description)}" />`,
    `  <link rel="canonical" href="${esc(page.canonical)}" />`,
    `  <meta name="robots" content="${esc(page.robots)}" />`,
    '  <meta name="theme-color" content="#7c3aed" />',
    '  <link rel="icon" href="/favicon.ico" sizes="any" />',
    '  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />',
    '  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />',
    '  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />',
    '  <link rel="manifest" href="/site.webmanifest" />',
    '  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />',
    '  <link rel="describedby" href="/llms.txt" type="text/plain" />',
    `  <meta property="og:title" content="${esc(page.title)}" />`,
    `  <meta property="og:description" content="${esc(page.description)}" />`,
    `  <meta property="og:url" content="${esc(page.canonical)}" />`,
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="Continuia" />',
    `  <meta property="og:image" content="${image}" />`,
    '  <meta property="og:image:type" content="image/png" />',
    '  <meta property="og:image:width" content="1200" />',
    '  <meta property="og:image:height" content="630" />',
    `  <meta property="og:image:alt" content="${esc(page.alt)}" />`,
    '  <meta name="twitter:card" content="summary_large_image" />',
    `  <meta name="twitter:title" content="${esc(page.title)}" />`,
    `  <meta name="twitter:description" content="${esc(page.description)}" />`,
    `  <meta name="twitter:image" content="${image}" />`,
    `  <meta name="twitter:image:alt" content="${esc(page.alt)}" />`,
    '  <script type="application/ld+json">',
    ld,
    '  </script>',
  ].join('\n');
}

function stripHead(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/gi, '')
    .replace(/\s*<meta\s+name="description"\s[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="robots"\s[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="theme-color"\s[^>]*>/gi, '')
    .replace(/\s*<meta\s+name="twitter:[^>]*>/gi, '')
    .replace(/\s*<meta\s+property="og:[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="icon"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="apple-touch-icon"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="manifest"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="sitemap"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="describedby"\s[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="robots"\s[^>]*>/gi, '')
    .replace(/\s*<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
}

function wrapMain(html) {
  if (/<main[\s>]/i.test(html)) return html;
  if (!html.includes('<div id="site-nav"></div>')) {
    throw new Error('missing site-nav');
  }
  if (!html.includes('<footer class="footer" id="site-footer"></footer>')) {
    throw new Error('missing footer');
  }
  html = html.replace(
    '<div id="site-nav"></div>',
    '<div id="site-nav"></div>\n\n<main>'
  );
  html = html.replace(
    '<footer class="footer" id="site-footer"></footer>',
    '</main>\n\n  <footer class="footer" id="site-footer"></footer>'
  );
  return html;
}

function patchProfile(html) {
  const from =
    '<div id="profile-state" style="padding:20px 0;color:var(--text-dim)">Loading&hellip;</div>';
  const to =
    '<h1 id="profile-state" style="padding:20px 0;margin:0;color:var(--text-dim);font-family:var(--font);font-size:17px;font-weight:400;line-height:1.6">Loading&hellip;</h1>';
  if (html.includes(from)) return html.replace(from, to);
  if (html.includes('id="profile-state"')) return html;
  throw new Error('profile loading state not found');
}

const viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';

for (const page of pages) {
  const file = path.join(root, 'src', page.file);
  let html = fs.readFileSync(file, 'utf8');
  html = stripHead(html);
  if (!html.includes(viewport)) throw new Error(`no viewport in ${page.file}`);
  html = html.replace(viewport, `${viewport}\n${headBlock(page)}`);
  if (page.file === 'doctorProfile.html') html = patchProfile(html);
  html = wrapMain(html);
  const h1 = html.match(/<h1[\s>]/gi) || [];
  if (h1.length !== 1) throw new Error(`${page.file} has ${h1.length} h1 tags`);
  fs.writeFileSync(file, html);
  console.log('patched', page.file);
}
