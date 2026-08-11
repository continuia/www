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

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      return handleApi({
        request,
        env,
        waitUntil: ctx.waitUntil.bind(ctx),
      } as unknown as Parameters<typeof handleApi>[0]);
    }
    return env.ASSETS.fetch(request);
  },
};
