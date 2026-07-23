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


## 项目名称

 1. 适当添加英文单词，但是不要强行添加
 2. 常用词汇： 智能，云服务，平台等
 3. 不太好的词汇： xxx管理系统
  - bad example: 数据中心基础设置管理系统，学生管理系统
  - good example: DCIM数字化管控系统，智能云端学生平台

## 项目描述
  1. 两到三行
  2. 简单讲下项目背景， 项目分为哪些模块

## 技术栈
 书写关键技术名词，注意大小写，只写库/框架级别，不要有拼写错误

## 项目职责描述

1. 描述在项目里面做了什么事情
2. 注意： 只描述做了事情，不要写细枝末节如何实现

**项目职责描述示**
bad example:
优化element-select 添加分野，解决数据量过大选择后卡顿的问题
good example:
优化分页因数据量过大导致选择卡顿问题

bad example:
根据登录用户权限生成路由数据，通过addRoutes方法动态添加路由
good example:
根据用户权限实现动态路由

bad example:
使用Vue 的定义指令 derective 写按钮权限指令，方便对不同的钱选人员放不同的权限
good example:
实现按钮级别的权限控制

## 项目亮点描述

1. 给落地效果，这种效果一般比较宽泛的，并且有具象化数据支撑的（如果不适合数据描述的不要强行添加）