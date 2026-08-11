// Build script: minifies JS from src/ into dist/, copies everything else.
// Run: node build.js
//
// Content-layer JSON (functions/_shared/content/*.json, if any) is server-side
// only and must never be reachable via a public URL. This build only ever
// walks SRC ('src/'), never 'functions/', so nothing under functions/ can be
// copied into dist/ by construction. Do not add a step that walks 'functions/'
// into dist/ without re-checking this.
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const SRC  = 'src';
const DIST = 'dist';

// Clean dist
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const jsFiles = [];

function processDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const srcPath  = path.join(dir, entry.name);
    const relPath  = path.relative(SRC, srcPath);
    const distPath = path.join(DIST, relPath);

    if (entry.isDirectory()) {
      fs.mkdirSync(distPath, { recursive: true });
      processDir(srcPath);
    } else if (entry.name.endsWith('.js')) {
      jsFiles.push({ src: srcPath, out: distPath });
    } else {
      fs.mkdirSync(path.dirname(distPath), { recursive: true });
      fs.copyFileSync(srcPath, distPath);
    }
  }
}

processDir(SRC);

Promise.all(
  jsFiles.map(({ src, out }) =>
    esbuild.build({
      entryPoints: [src],
      outfile: out,
      minify: true,
      bundle: false,
      platform: 'browser',
      target: 'es2018',
    })
  )
).then(() => {
  const sizes = jsFiles.map(({ src, out }) => {
    const orig = fs.statSync(src).size;
    const mini = fs.statSync(out).size;
    const pct  = Math.round((1 - mini / orig) * 100);
    return `  ${path.relative(SRC, src).padEnd(20)} ${orig}b -> ${mini}b  (-${pct}%)`;
  });
  console.log(`Built to ${DIST}/\n${sizes.join('\n')}`);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
