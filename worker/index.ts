// Entry point for `wrangler deploy` (the Workers CLI path the Cloudflare
// dashboard's Git integration actually runs, per its Build settings' Deploy
// command). wrangler.toml's `pages_build_output_dir` key and the file-based
// routing under functions/ are a Pages-only convention; a plain Workers
// deploy needs an explicit `main` script and an [assets] block instead, so
// this adapts the same request handler to that shape rather than
// duplicating its logic.
import { onRequest as handleApi, type Env as ApiEnv } from '../functions/api/[[path]]';

export interface Env extends ApiEnv {
  ASSETS: Fetcher;
}

// Clean-URL rewrites: serve the .html asset's content directly at the
// extensionless path, no redirect involved. This used to live in
// src/_redirects (Cloudflare Pages convention), but that file isn't
// reliably honored for a plain `wrangler deploy` + [assets] Worker, and
// combined with the assets binding's own default html_handling
// ("auto-trailing-slash", which 307s .html -> clean URL automatically),
// the two disagreed and produced a genuine infinite redirect loop in
// production: /governance.html -> /governance -> /governance -> ...
// wrangler.toml now sets html_handling = "none" to disable Cloudflare's
// automatic .html-stripping entirely, so this map is the only thing
// doing clean-URL routing, deterministically, with no redirect at all.
const CLEAN_URL_MAP: Record<string, string> = {
  '/insights': '/insights.html',
  '/governance': '/governance.html',
  '/about': '/about.html',
  '/products': '/products.html',
  '/getInTouch': '/getInTouch.html',
  '/doctors': '/doctors.html',
  '/partners': '/partners.html',
  '/partners/hospitals': '/partners/hospitals.html',
  '/partners/nursing-and-living': '/partners/nursing-and-living.html',
  '/partners/doctors-and-specialists': '/partners/doctors-and-specialists.html',
  '/partners/clinics-diagnostics': '/partners/clinics-diagnostics.html',
  '/partners/health-plans-tpas': '/partners/health-plans-tpas.html',
  '/partners/benefit-consultants': '/partners/benefit-consultants.html',
  '/partners/advocacy-ngos': '/partners/advocacy-ngos.html',
  '/partners/medical-tourism': '/partners/medical-tourism.html',
  '/pricing': '/pricing.html',
  '/patient-pricing': '/pricing.html',
  '/share-your-story': '/share-your-story.html',
  '/employees': '/employees.html',
  '/himss26': '/himss26.html',
  '/cxa-globallaunch-c1a7e3d': '/cxa-globallaunch-c1a7e3d.html',
};

// Real permanent redirects (these change the URL the visitor sees, unlike
// the map above), matching what the old _redirects file specified.
const REDIRECTS: Record<string, string> = {
  '/get-in-touch': '/getInTouch.html',
  '/contact': '/getInTouch.html',
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path.startsWith('/api/')) {
      return handleApi({
        request,
        env,
        waitUntil: ctx.waitUntil.bind(ctx),
      } as unknown as Parameters<typeof handleApi>[0]);
    }

    if (REDIRECTS[path]) {
      return Response.redirect(new URL(REDIRECTS[path], url.origin).toString(), 301);
    }

    if (CLEAN_URL_MAP[path]) {
      const assetUrl = new URL(CLEAN_URL_MAP[path], url.origin);
      return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    }

    // html_handling = "none" (see wrangler.toml) also disables Cloudflare's
    // automatic "/" -> "/index.html" resolution, not just the .html
    // stripping this file exists to control. Handle root explicitly or the
    // homepage 404s, which is a worse regression than the loop this fixed.
    if (path === '/') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', url.origin).toString(), request));
    }

    const doctorProfileMatch = path.match(/^\/doctorProfile\/([^/]+)$/);
    if (doctorProfileMatch) {
      const assetUrl = new URL(`/doctorProfile.html?id=${encodeURIComponent(doctorProfileMatch[1])}`, url.origin);
      return env.ASSETS.fetch(new Request(assetUrl.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
