# AGENTS.md — quinn-gaoo/resume

## Repo overview

pnpm monorepo with 3 packages under `packages/*`:

| Package | Path | Stack | Lang |
|---|---|---|---|
| `@resume/blog` | `packages/blog/` | Next.js 16 (Pages Router), Tailwind v4, shadcn/ui, static export | JS (no TS) |
| `@resume/quinn` | `packages/quinn/` | Vite 7 + React 19 + TypeScript, Tailwind v4, shadcn/ui, react-router-dom | TS |
| `@resume/worker` | `packages/worker/` | Cloudflare Worker (blog view counter), KV storage | JS (ESM) |

## Commands (run from root with pnpm --filter)

```bash
pnpm blog:dev          # next dev
pnpm blog:build        # next build (static export)
pnpm blog:start        # next start
pnpm blog:lint         # eslint (next/core-web-vitals config)

pnpm quinn:dev         # vite dev
pnpm quinn:build       # tsc -b && vite build
pnpm quinn:preview     # vite preview
pnpm quinn:lint        # eslint (ts + react-hooks + react-refresh)

pnpm blog-worker:dev       # wrangler dev --port 8888
pnpm blog-worker:deploy    # wrangler deploy --env production
```

No test framework or test scripts exist across the repo.

## Architecture notes

- **blog**: Pages Router (not App Router). Content lives as `.md` files in `content/posts/` with frontmatter (`title`, `date`, `category`, `tags`, `description`). Static export via `next.config.mjs` (`output: "export"`). JS-only, no TypeScript. Path alias `@/` → `src/`.
- **quinn**: SPA with react-router-dom. Routes: `/` (home), `/cv`. Path alias `@/` → `src/`. Build requires `tsc -b` then `vite build` (both tsconfig.app.json and tsconfig.node.json).
- **worker**: Cloudflare Worker at `src/index.js`. Endpoints: `GET /api/counter/:slug` (increment + deduplicate by device fingerprint), `GET /api/views/:slug` (read-only), `POST /api/views/batch` (bulk read), `GET /health`. KV namespace `COUNTER_KV` (bound in wrangler.toml). Local dev falls back to in-memory store when `env.COUNTER_KV` is absent.

## Conventions

- Both blog and quinn use `@` path alias to `src/`.
- Both use `cn()` utility (`clsx` + `tailwind-merge`) from `src/lib/utils`.
- Both use shadcn/ui components. Run `pnpm --filter <package> shadcn add <component>`.
- blog components are JS-only; quinn components are TSX.
- Blog uses `radix-vega` shadcn style; quinn uses `new-york` style.

## Codegen / lint / build order

- `quinn:build` runs `tsc -b` first, then `vite build`. Lint failures or type errors will block the build.
- No typecheck command exists for the blog (JS-only).
- No CI or pre-commit hooks configured.
