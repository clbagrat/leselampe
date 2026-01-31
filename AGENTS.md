# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the single-page app shell; `script.js` and `styles.css` contain the core logic and styling.
- `assets/` holds icons and images used by the UI.
- `landing/` contains the marketing/landing page assets.
- `worker/` contains the Cloudflare Worker RSS proxy (`worker/rss-proxy.js`).

## Build, Test, and Development Commands
- No build system or package manager is configured. Open `index.html` directly or serve the repo with a static server (for example: `python3 -m http.server`) during development.
- Cloudflare Worker: copy `worker/rss-proxy.js` into a Worker and deploy; update `RSS_PROXY_BASE` in `script.js` with the Worker URL.

## Coding Style & Naming Conventions
- Indentation: 2 spaces in HTML/CSS/JS.
- JavaScript: use `const`/`let`, arrow functions, and descriptive, lowercase `camelCase` names (e.g., `renderLemmaList`, `openRssReaderScreen`).
- CSS: prefer BEM-ish, descriptive class names (e.g., `.lemma-list`, `.home-library-header`).
- HTML: keep markup minimal and use `data-i18n` keys for translatable copy.
- Localization: when you change any UI text, update all locale entries for the same key (EN/RU).

## Testing Guidelines
- No automated test framework is present. Validate changes manually in the browser.
- For UI updates, verify core flows: reading a story, translating a word, lemma list, and settings.
- Always test in an iPhone 14 Pro Max viewport (430x932).
- When running tests, use the Chrome DevTools MCP browser.

## Commit & Pull Request Guidelines
- Commit messages in history use short, imperative summaries (e.g., “Add …”, “Update …”, “Introduce …”). Follow that style.
- PRs should include a concise description of the change, mention any user-facing behavior changes, and add screenshots or a short screen recording for UI updates.

## Notifications
- After finishing the whole task the user gives you, send a short notification (max 10 words) describing what you did using: `curl -d "..." ntfy.sh/bagrat_codex_done`.

## Add Story Modal Context
- When working on the Add Story modal (Generate/Paste/Scan), read `CUSTOM_STORY_GENERATION.md` first.
- After making any related changes, update `CUSTOM_STORY_GENERATION.md` to keep the documentation current.

## Training Docs
- When working on trainings, read `TRAININGS.md` at the start of the task.
- At the start of any task, and after each commit, update `TRAININGS.md` if training behavior, UI, or storage changes.

## Chat Mode Docs
- When working on chat mode, read `CHAT_MODE.md` at the start of the task.
- At the start of any task, and after each commit, update `CHAT_MODE.md` if chat mode behavior, UI, or storage changes.

## Configuration & Deployment Notes
- GitHub Pages deploys from `main` via GitHub Actions (see `README.md`).
- RSS requires a server-side proxy to avoid CORS; configure and deploy the Worker as described above.
