# Accountant Services

Modern website for Accountant Services, covering company formation, Companies
House searches, business filings, registrations, company changes, and ongoing
finance support.

Built and maintained by **Tee Champion**.

## Requirements

- Node.js 22.13 or newer
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

The local site is served by vinext with Cloudflare-compatible bindings.

## Validation

```bash
pnpm build
pnpm test
pnpm lint
```

## Project structure

- `app/` — pages, components, styles, and server-side website logic
- `public/` — static images and social-sharing assets
- `worker/` — Cloudflare worker entry point
- `tests/` — rendered HTML checks for the main customer journeys
- `db/` — optional database schema

## Main journeys

- Company name search through the public Companies House register
- Limited company formation package selection
- Service discovery for filings, registrations, changes, and finance support
- Contact and enquiry routes

## Deployment

Create a production build with `pnpm build`. The generated Cloudflare-compatible
output is written to `dist/`.
