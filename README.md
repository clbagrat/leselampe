# Leselampe

Leselampe is a static web page for a German-reading experience: a simple, focused UI that helps you read, scan, and learn without extra distractions.

## Disclaimer: 100% Vibecoded

THIS PROJECT IS COMPLETELY VIBECODED. EXPECT IMPERFECTIONS, INCONSISTENCIES, AND EXPERIMENTAL CHOICES. USE AT YOUR OWN RISK, AND DO NOT RELY ON IT FOR PRODUCTION-CRITICAL WORK.

## GitHub Pages

This repo is configured to deploy via GitHub Actions.
Live site: https://clbagrat.github.io/leselampe/

1. Push to `main` (or `master`).
2. In GitHub repo settings, set Pages → Source to "GitHub Actions".
3. The site will be available at the URL shown in the Actions run summary.

## RSS proxy (Cloudflare Worker)

Fetching RSS feeds and article content requires a server-side proxy to avoid CORS issues. This project includes a minimal Worker in `worker/rss-proxy.js`.

1. Create a Cloudflare Worker (Workers & Pages → Create → Worker).
2. Paste the contents of `worker/rss-proxy.js` into the editor and deploy.
3. Copy the Worker URL (e.g. `https://leselampe-rss.your-subdomain.workers.dev`).
4. Update `RSS_PROXY_BASE` in `script.js` with that URL.
