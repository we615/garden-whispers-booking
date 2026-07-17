# EcoBloom Plant Care

Three fully independent apps living in one repo. There is **no root `package.json`, no shared
`node_modules`, no workspaces** — each folder is installed, run, tested, and deployed on its own,
exactly like three separate repos would be. Deploying one (e.g. `backend/` to Hostinger) means
pointing at that folder and nothing else needs to exist alongside it.

- **`customer-site/`** — the public marketing site (Vite + React + shadcn/ui). Reads all content from the API.
- **`admin/`** — the admin CMS panel (separate Vite app, same design tokens). Manages every content type, bookings, and orders.
- **`backend/`** — the Node.js + TypeScript + Express + MongoDB API used by both.

## Setup

Each app is installed separately, from inside its own folder:

```bash
cd customer-site && npm install --legacy-peer-deps   # see note below on why this one needs the flag
cd admin && npm install
cd backend && npm install
```

`customer-site` needs `--legacy-peer-deps` because `lovable-tagger` (a dev-only Lovable platform
plugin) declares a peer range that predates Vite 8. `admin` and `backend` don't have that
dependency and install cleanly without it.

Copy env files and fill in real values:

```bash
cp customer-site/.env.example customer-site/.env   # VITE_API_BASE_URL
cp admin/.env.example admin/.env                   # VITE_ADMIN_API_BASE_URL
cp backend/.env.example backend/.env                # Mongo URI, JWT secret, Razorpay keys, admin seed creds
```

You'll need a running MongoDB (local install or `docker run -p 27017:27017 mongo`).

Seed the one admin user (reads `ADMIN_EMAIL`/`ADMIN_PASSWORD` from `backend/.env`):

```bash
cd backend && npm run seed:admin
```

## Running

Open three terminals, one per app:

```bash
cd customer-site && npm run dev   # :8080
cd admin && npm run dev           # :8081
cd backend && npm run dev         # :4000
```

## Testing

```bash
cd backend && npm test        # Vitest + mongodb-memory-server + supertest — no real Mongo needed
cd customer-site && npm test  # Vitest, frontend unit tests
```

## Building for production

```bash
cd customer-site && npm run build
cd admin && npm run build
cd backend && npm run build
```

## Deploying

Because each app is fully self-contained, a host like Hostinger/Render/Railway should have its
**root/source directory** pointed directly at the app being deployed (e.g. `backend/`), with that
folder treated as if it were the entire repo:

- **`backend/`**: install `npm install`, build `npm run build`, start `node dist/index.js`. Set all
  of `backend/.env`'s variables as environment variables in the host's dashboard — `.env` files are
  gitignored and never get pushed, so they don't exist on the server unless entered manually there.
- **`customer-site/` or `admin/`**: install `npm install --legacy-peer-deps` (customer-site) or
  `npm install` (admin), build `npm run build`, serve the resulting `dist/` folder as a static site.

### Known local-environment gotcha

If `vite build` fails with `Cannot find native binding` pointing at `rolldown`, this is an
upstream npm bug ([npm/cli#4828](https://github.com/npm/cli/issues/4828)) where a
platform-specific optional dependency doesn't get installed — it's not specific to this
codebase. Fix by installing the missing binding directly for your platform, from inside
whichever app hit the error (`customer-site/` or `admin/`), e.g. on Apple Silicon:

```bash
npm install @rolldown/binding-darwin-arm64 --no-save
```

(swap the package name for your platform — Linux x64 is `@rolldown/binding-linux-x64-gnu`,
Intel Mac is `@rolldown/binding-darwin-x64`, etc.)

Separately, `vite build` (not `vite dev`) requires **Node 20.19+ or 22.12+** — if your default
`node` is older, point at a newer one for the build step only, e.g.
`PATH="/usr/local/bin:$PATH" node node_modules/.bin/vite build` if you have a newer Node
installed elsewhere.
