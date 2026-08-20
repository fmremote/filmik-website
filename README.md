# Filmik Website

Marketing site for Filmik, built with Vite and React and deployed on Vercel.

## Current Status

- Local preview: `http://localhost:5173`
- Stable production URL: `https://filmik-website.vercel.app`
- Vercel project: `filmik-website`
- Deployment model: local changes are previewed first, then deployed to Vercel

## Stack

- Vite 6
- React 18
- TypeScript
- Tailwind CSS 4
- Radix UI primitives
- Motion for interactive effects

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the local site:

```bash
npm run dev
```

3. Open:

```text
http://localhost:5173
```

## Build

Create a production build locally:

```bash
npm run build
```

This runs the SEO sync step before the Vite build.

## SEO, Analytics, and Publishing

The site is set up so publishing-related assets are generated from a single config source.

- Main config: [`seo.config.mjs`](/Users/victorfrias/dev/filmik-website/seo.config.mjs)
- Generator script: [`scripts/sync-seo.mjs`](/Users/victorfrias/dev/filmik-website/scripts/sync-seo.mjs)

Generated outputs include:

- `public/sitemap.xml`
- `public/robots.txt`
- `public/manifest.webmanifest`
- `public/llms.txt`
- metadata injected into [`index.html`](/Users/victorfrias/dev/filmik-website/index.html)
- schema.org structured data
- Google Tag Manager tags

Important note for future updates:

- Any content, SEO, analytics, social, or publishing update should be reflected in both the site code and the SEO/config layer when relevant.
- Keep this README updated whenever deployment flow, analytics wiring, URLs, forms, or infrastructure assumptions change.

## Analytics

Google Tag Manager is enabled with container:

- `GTM-W5KFKF77`

Client-side event helpers live in:

- [`src/lib/analytics.ts`](/Users/victorfrias/dev/filmik-website/src/lib/analytics.ts)

Tracked interactions currently include key CTA and navigation actions across the landing page.

## Request Access Form

The Request Access flow is currently self-hosted in the frontend and not yet wired to a backend.

- Component: [`src/app/components/RequestAccessModal.tsx`](/Users/victorfrias/dev/filmik-website/src/app/components/RequestAccessModal.tsx)
- Current behavior: local form UI and success state
- Planned future integration: Supabase

## Media

Hero video assets live in:

- [`public/media/home-loop.mp4`](/Users/victorfrias/dev/filmik-website/public/media/home-loop.mp4)
- [`public/media/home-loop.webm`](/Users/victorfrias/dev/filmik-website/public/media/home-loop.webm)
- [`public/media/home-loop-poster.jpg`](/Users/victorfrias/dev/filmik-website/public/media/home-loop-poster.jpg)

These are optimized web delivery assets derived from the source `.mov`. The source media file is not stored in the repo.

## Brand Assets

- Header/footer logo: [`public/filmik-logo-white.svg`](/Users/victorfrias/dev/filmik-website/public/filmik-logo-white.svg)
- Footer social links currently point to Filmik's live social profiles

## Deployment Notes

- Vercel config: [`vercel.json`](/Users/victorfrias/dev/filmik-website/vercel.json)
- Local Vercel linkage: `.vercel/project.json` (intentionally gitignored)
- Stable production alias should resolve to:
  - `https://filmik-website.vercel.app`

If the stable alias drifts after a deployment, correct the Vercel alias before considering the release complete.

## Working Away From This Computer

Once the repo is pushed to GitHub, the project can be worked on remotely from another machine or cloud environment.

That does not prevent working from this computer later. The normal flow becomes:

1. Pull latest changes
2. Work locally or remotely
3. Preview locally when needed
4. Deploy to Vercel

## Recommended No-Cost Remote Option

The recommended no-cost path for this project is GitHub Codespaces.

Why this is the best fit here:

- The repo already lives on GitHub
- It works well with Vite/React projects like this one
- It lets you edit and run the site in a browser without using this computer
- The repo now includes a dev container config at [.devcontainer/devcontainer.json](/Users/victorfrias/dev/filmik-website/.devcontainer/devcontainer.json)

As of August 20, 2026, GitHub documents that personal accounts include:

- 120 free Codespaces compute hours per month
- 15 GB-month of free Codespaces storage per month

That makes it the cleanest free option for occasional remote updates on this marketing site.

### How To Use Codespaces

1. Open the repo on GitHub
2. Click `Code`
3. Open the `Codespaces` tab
4. Create a new codespace from `main`
5. Wait for setup to finish
6. Run `npm run dev`
7. Open the forwarded port for the site preview

### Notes

- If you stay within GitHub's included free quota, there is no added cost
- If you exceed the included free quota, GitHub may require billing before additional usage continues
- For this repo, shut down idle codespaces when you're done to preserve the free allowance
- Local work on this computer is unaffected

## Repository Hygiene

- Do not commit `dist`, `node_modules`, `.env`, or `.vercel`
- Preview locally before pushing
- Keep production URLs, analytics wiring, and SEO assets in sync with visible site changes
- Update this README as the project evolves
