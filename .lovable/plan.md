## Diagnosis

capitalmota.com returns HTTP 200 but renders blank. Loading it in a headless browser shows a JavaScript crash at startup:

```
PAGEERROR: supabaseUrl is required.
```

The Supabase client throws immediately, which prevents React from mounting — so visitors see an empty page (only the "Built by Alexander Emilio Perez" badge is visible, because it lives outside the React tree).

Why: `src/integrations/supabase/client.ts` reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` from `import.meta.env`. These are baked into the JS bundle **at build time**. The currently deployed build was published before those env vars were set (or before a recent env change), so the deployed bundle has `undefined` for both.

Local `.env` is fine (`VITE_SUPABASE_URL` present). The preview inside Lovable works. Only the published `capitalmota.com` / `capitalmota512.lovable.app` bundle is broken.

## Fix

Republish the project. That triggers a fresh build with the current env vars baked in, which resolves the crash — no code changes needed.

Concretely, after you approve this plan I will:

1. Call the publish action to redeploy the latest build to `capitalmota.com` and `capitalmota512.lovable.app`.
2. After publish completes (about a minute), reload the live URL in a headless browser and confirm the homepage renders (hero, nav, footer, share button all visible) and there is no `supabaseUrl is required` error in the console.

## Notes

- No source code needs to change for this fix.
- The recent Footer "Use this link" share button will also go live as part of this republish.
- If after republish the same error persists, the next step would be to check that Lovable Cloud env vars are actually present in the deploy environment — but this is very unlikely given the local `.env` looks correct.
