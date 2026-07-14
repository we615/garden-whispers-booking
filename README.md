# EcoBloom Plant Care — Monorepo

Three npm workspaces:

- **`customer-site/`** — the public marketing site (Vite + React + shadcn/ui). Reads all content from the API.
- **`admin/`** — the admin CMS panel (separate Vite app, same design tokens). Manages every content type, bookings, and orders.
- **`backend/`** — the Node.js + TypeScript + Express + MongoDB API used by both.

## Setup

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is required because `lovable-tagger` (a dev-only Lovable platform plugin) declares a peer range that predates Vite 8.

Copy env files and fill in real values:

```bash
cp .env.example .env                       # customer-site (VITE_API_BASE_URL)
cp admin/.env.example admin/.env           # admin (VITE_ADMIN_API_BASE_URL)
cp backend/.env.example backend/.env       # backend (Mongo URI, JWT secret, Razorpay keys, admin seed creds)
```

You'll need a running MongoDB (local install or `docker run -p 27017:27017 mongo`).

Seed the one admin user (reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `backend/.env`):

```bash
npm run seed:admin
```

## Running everything

```bash
npm run dev:all       # customer-site :8080, admin :8081, server :4000
```

Or individually: `npm run dev:client`, `npm run dev:admin`, `npm run dev:server`.

## Testing

```bash
npm run test:server   # Vitest + mongodb-memory-server + supertest — no real Mongo needed
npm run test:client   # Vitest, frontend unit tests
```

## Building for production

```bash
npm run build:client
npm run build:admin
npm run build:server
```

### Known local-environment gotcha

If `vite build` fails with `Cannot find native binding` pointing at `rolldown`, this is an
upstream npm bug ([npm/cli#4828](https://github.com/npm/cli/issues/4828)) where a
platform-specific optional dependency doesn't get installed — it's not specific to this
codebase. Fix by installing the missing binding directly for your platform, e.g. on Apple
Silicon:

```bash
npm install @rolldown/binding-darwin-arm64 --no-save --legacy-peer-deps
```

(swap the package name for your platform — Linux x64 is `@rolldown/binding-linux-x64-gnu`,
Intel Mac is `@rolldown/binding-darwin-x64`, etc.)

Separately, `vite build` (not `vite dev`) requires **Node 20.19+ or 22.12+** — if your default
`node` is older, point at a newer one for the build step only, e.g.
`PATH="/usr/local/bin:$PATH" node node_modules/.bin/vite build` if you have a newer Node
installed elsewhere.
