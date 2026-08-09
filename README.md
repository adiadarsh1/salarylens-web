# SalaryLens Web

A free, no-sign-up **in-hand salary calculator for India** — decode any CTC into
your real monthly take-home pay, with new vs old regime comparison, per-CTC and
per-company breakdowns, and plain-English salary guides.

Live: https://adiadarsh1.github.io/salarylens-web/

Companion to the [SalaryLens Chrome extension](https://github.com/adiadarsh1/salarylens),
which shows take-home right on LinkedIn & Naukri job posts. Both share the same
tax engine.

## Stack

- **Astro** static site (fast, SEO-first, zero-JS by default)
- **React** island for the interactive calculator only
- **Tailwind CSS**
- Deployed free on **GitHub Pages** via GitHub Actions

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # preview the build
npm run deploy   # build + publish dist/ to the gh-pages branch
```

Deployed to GitHub Pages from the `gh-pages` branch. Run `npm run deploy` to ship
changes (rebuilds and pushes the static output).

## How it works

All salary math runs in the browser (`src/lib/ctc.ts`) — nothing is sent to a
server. Programmatic pages (per-CTC, per-company) are generated at build time via
Astro `getStaticPaths`, and every page renders its numbers into static HTML for
search engines, with the React calculator hydrating on top.

## Moving to a custom domain

Change `SITE` and `BASE` in `astro.config.mjs` (and the sitemap URL in
`public/robots.txt`). Everything else derives from those.

## Disclaimer

All figures are estimates for FY 2025-26 and are **not** tax advice. See the
`/methodology/` and `/disclaimer/` pages.
