#!/usr/bin/env node
// Validates unique titles and descriptions, OG image size, JSON-LD, and sitemap coverage.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const siteRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'src');
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(file) {
  return fs.readFileSync(path.join(siteRoot, file), 'utf8');
}

function pngSize(filePath) {
  const buf = fs.readFileSync(filePath);
  const sig = buf.toString('ascii', 1, 4);
  if (sig !== 'PNG') throw new Error(`not a png: ${filePath}`);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function walkTypes(node, types) {
  if (Array.isArray(node)) {
    node.forEach((item) => walkTypes(item, types));
    return;
  }
  if (!node || typeof node !== 'object') return;
  if (node['@type']) {
    const list = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    list.forEach((type) => types.add(type));
  }
  Object.values(node).forEach((value) => walkTypes(value, types));
}

const BANNED = [
  [/HIPAA/i, 'HIPAA'],
  [/SOC\s*2/i, 'SOC 2'],
  [/\bBAA\b/, 'BAA'],
  [/business associate/i, 'Business Associate'],
  [/ClinIQ/i, 'ClinIQ'],
  [/\bPulse\b/, 'Pulse'],
  [/Racchabanda/i, 'Racchabanda'],
  [/Mirage/i, 'Mirage'],
  [/QEDium/i, 'QEDium'],
  [/\bCE\b/, 'CE'],
  [/\bIndia\b/, 'India'],
  [/\bUAE\b/, 'UAE'],
  [/\bU\.S\./, 'U.S.'],
  [/patient satisfaction/i, 'patient satisfaction'],
  [/readmission/i, 'readmission'],
  [/\bsavings\b/i, 'savings'],
  [/\d+\s*%/, 'percent metric'],
  [/\$\s*\d/, 'dollar metric'],
  [/\d+\s*\+/, 'count metric'],
  [/\d+\s*-\s*\d+/, 'range metric'],
  [/\d+\s*(hour|day|week|language|specialt)/i, 'counted metric'],
  [/\u2014/, 'em dash'],
  [/\u2013/, 'en dash'],
  [/\u2192|\u2190|→|←/, 'arrow'],
];

function scanBanned(label, text) {
  for (const [re, name] of BANNED) {
    if (re.test(text)) fail(`${label} contains ${name}`);
  }
}

function headOf(html) {
  const match = html.match(/<head[\s\S]*?<\/head>/i);
  if (!match) throw new Error('missing head');
  return match[0];
}

function attr(tag, name) {
  const re = new RegExp(name + '\\s*=\\s*"([^"]*)"', 'i');
  const match = tag.match(re);
  return match ? match[1] : '';
}

function metaContent(head, selector) {
  const tags = head.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    if (selector(tag)) {
      return attr(tag, 'content').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    }
  }
  return '';
}

const htmlFiles = [];
function walk(dir, prefix) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, rel);
    else if (entry.name.endsWith('.html')) htmlFiles.push(rel);
  }
}
walk(siteRoot, '');

const titles = new Map();
const descriptions = new Map();
const indexable = new Map();
const rows = [];

for (const rel of htmlFiles.sort()) {
  const html = read(rel);
  const head = headOf(html);
  const titleMatch = head.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const description = metaContent(head, (tag) => /name\s*=\s*"description"/i.test(tag));
  const robots = metaContent(head, (tag) => /name\s*=\s*"robots"/i.test(tag));
  const canonicalTag = (head.match(/<link\b[^>]*rel="canonical"[^>]*>/i) || [''])[0];
  const canonical = attr(canonicalTag, 'href');
  const ogTitle = metaContent(head, (tag) => /property\s*=\s*"og:title"/i.test(tag));
  const ogDescription = metaContent(head, (tag) => /property\s*=\s*"og:description"/i.test(tag));
  const ogUrl = metaContent(head, (tag) => /property\s*=\s*"og:url"/i.test(tag));
  const ogType = metaContent(head, (tag) => /property\s*=\s*"og:type"/i.test(tag));
  const ogSite = metaContent(head, (tag) => /property\s*=\s*"og:site_name"/i.test(tag));
  const ogImage = metaContent(head, (tag) => /property\s*=\s*"og:image"/i.test(tag) && !/og:image:/.test(tag));
  const ogAlt = metaContent(head, (tag) => /property\s*=\s*"og:image:alt"/i.test(tag));
  const twCard = metaContent(head, (tag) => /name\s*=\s*"twitter:card"/i.test(tag));
  const twTitle = metaContent(head, (tag) => /name\s*=\s*"twitter:title"/i.test(tag));
  const twDescription = metaContent(head, (tag) => /name\s*=\s*"twitter:description"/i.test(tag));
  const twImage = metaContent(head, (tag) => /name\s*=\s*"twitter:image"/i.test(tag) && !/twitter:image:/.test(tag));

  if (!title) fail(`${rel} missing title`);
  if (title.length > 60) fail(`${rel} title is ${title.length} characters`);
  if (description.length < 150 || description.length > 160) {
    fail(`${rel} description is ${description.length} characters`);
  }
  if (titles.has(title)) fail(`duplicate title "${title}" on ${rel} and ${titles.get(title)}`);
  else titles.set(title, rel);
  if (descriptions.has(description)) {
    fail(`duplicate description on ${rel} and ${descriptions.get(description)}`);
  } else descriptions.set(description, rel);
  if (!canonical.startsWith('https://continuia.ai')) fail(`${rel} canonical is not on https://continuia.ai`);
  if (ogTitle !== title) fail(`${rel} og:title does not match title`);
  if (ogDescription !== description) fail(`${rel} og:description does not match description`);
  if (ogUrl !== canonical) fail(`${rel} og:url does not match canonical`);
  if (ogType !== 'website') fail(`${rel} og:type is ${ogType || 'missing'}`);
  if (ogSite !== 'Continuia') fail(`${rel} og:site_name missing`);
  if (!ogImage.startsWith('https://continuia.ai/og/') || !ogImage.endsWith('.png')) {
    fail(`${rel} og:image is not a site PNG`);
  }
  if (!ogAlt) fail(`${rel} missing og:image:alt`);
  if (twCard !== 'summary_large_image') fail(`${rel} twitter:card is ${twCard || 'missing'}`);
  if (twTitle !== title) fail(`${rel} twitter:title mismatch`);
  if (twDescription !== description) fail(`${rel} twitter:description mismatch`);
  if (twImage !== ogImage) fail(`${rel} twitter:image mismatch`);

  const imageName = ogImage.replace('https://continuia.ai/og/', '');
  const imagePath = path.join(siteRoot, 'og', imageName);
  if (!fs.existsSync(imagePath)) fail(`${rel} missing image file ${imageName}`);
  else {
    try {
      const size = pngSize(imagePath);
      if (size.width !== 1200 || size.height !== 630) {
        fail(`${imageName} is ${size.width}x${size.height}`);
      }
    } catch (err) {
      fail(`${imageName} ${err.message}`);
    }
  }

  const ldMatch = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (!ldMatch) fail(`${rel} missing JSON-LD`);
  else {
    let data;
    try {
      data = JSON.parse(ldMatch[1]);
    } catch (err) {
      fail(`${rel} JSON-LD did not parse: ${err.message}`);
    }
    if (data) {
      const types = new Set();
      walkTypes(data, types);
      if (!types.has('Organization')) fail(`${rel} JSON-LD missing Organization`);
      if (!types.has('WebSite')) fail(`${rel} JSON-LD missing WebSite`);
      for (const bannedType of ['MedicalOrganization', 'FAQPage', 'AggregateRating', 'Review']) {
        if (types.has(bannedType)) fail(`${rel} JSON-LD includes ${bannedType}`);
      }
      scanBanned(`${rel} JSON-LD`, ldMatch[1]);
    }
  }

  const h1 = html.match(/<h1[\s>]/gi) || [];
  if (h1.length !== 1) fail(`${rel} has ${h1.length} h1 elements`);
  const images = html.match(/<img\b[^>]*>/gi) || [];
  for (const img of images) {
    if (!/\salt\s*=\s*"[^"]*"/i.test(img) && !/\salt\s*=\s*'[^']*'/i.test(img)) {
      fail(`${rel} has an img without alt`);
    }
  }

  const headText = [title, description, ogAlt, canonical, robots].join('\n');
  scanBanned(`${rel} metadata`, headText);

  const isIndexable = !/noindex/i.test(robots);
  if (isIndexable) indexable.set(canonical, rel);
  rows.push({ rel, title, description, canonical, image: imageName, indexable: isIndexable, chars: description.length });
}

function readText(name) {
  const file = path.join(siteRoot, name);
  if (!fs.existsSync(file)) {
    fail(`missing ${name}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const llms = readText('llms.txt');
const full = readText('llms-full.txt');
if (llms && !llms.startsWith('# Continuia\n')) fail('llms.txt must start with an H1');
if (llms && !llms.includes('\n> ')) fail('llms.txt missing blockquote summary');
if (llms && !llms.includes('\n## Pages\n')) fail('llms.txt missing Pages section');
if (full && !full.startsWith('# Continuia\n')) fail('llms-full.txt must start with an H1');
scanBanned('llms.txt', llms);
scanBanned('llms-full.txt', full);
if (llms && !llms.includes('sales@continuia.ai')) fail('llms.txt missing sales@continuia.ai');
if (full && !full.includes('sales@continuia.ai')) fail('llms-full.txt missing sales@continuia.ai');

const sitemap = readText('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const lastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
if (locs.length !== lastmods.length) fail('sitemap loc/lastmod count mismatch');
for (const lastmod of lastmods) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) fail(`bad lastmod ${lastmod}`);
}
const locSet = new Set(locs);
for (const [canonical, rel] of indexable) {
  if (!locSet.has(canonical)) fail(`sitemap missing ${canonical} (${rel})`);
}
for (const loc of locs) {
  if (!indexable.has(loc)) fail(`sitemap includes non-indexable or unknown URL ${loc}`);
}
if (locs.length !== indexable.size) fail(`sitemap has ${locs.length} urls, indexable pages are ${indexable.size}`);

const robots = readText('robots.txt');
const aiBots = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];
for (const bot of aiBots) {
  const match = robots.match(new RegExp(`User-agent:\\s*${bot}\\s*([\\s\\S]*?)(?=\\nUser-agent:|$)`, 'i'));
  if (!match) fail(`robots.txt missing ${bot}`);
  else if (!/Allow:\s*\//.test(match[1]) || /Disallow/.test(match[1])) {
    fail(`robots.txt does not allow ${bot}`);
  }
}
if (!/Sitemap:\s*https:\/\/continuia\.ai\/sitemap\.xml/.test(robots)) fail('robots.txt missing sitemap');
if (!/User-agent:\s*\*\s*\nAllow:\s*\//.test(robots)) fail('robots.txt does not allow general crawlers');
if (!/Content-Signal:\s*search=yes,ai-input=yes,ai-train=yes/.test(robots)) {
  fail('robots.txt Content-Signal does not allow search and AI use');
}

const favicons = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
];
for (const file of favicons) {
  if (!fs.existsSync(path.join(siteRoot, file))) fail(`missing ${file}`);
}

function cell(value) {
  return String(value).replace(/\|/g, '\\|');
}

console.log('| Page | Title | Chars | Canonical | Share image |');
console.log('| --- | --- | ---: | --- | --- |');
for (const row of rows) {
  const flag = row.indexable ? '' : ' (noindex)';
  console.log(`| ${cell(row.rel + flag)} | ${cell(row.title)} | ${row.chars} | ${cell(row.canonical)} | ${cell(row.image)} |`);
}
console.log('');
if (errors.length) {
  console.error(`SEO check failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`SEO check passed for ${rows.length} pages, ${indexable.size} in the sitemap.`);
