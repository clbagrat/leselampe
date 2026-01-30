# Custom Story Generation Flow

This document describes the Add Story modal UX and custom story generation flow in `script.js`.

## Modal UX (user-facing)
- Entry points: the “Add text” buttons on Home/Library call `showAddTextModal`.
- If there is no API key, the modal does not open; it triggers the welcome/settings flow instead.
- The modal has two modes: `Generate` and `Paste/Scan`.
  - Switching modes toggles visibility and enables/disables inputs.
- The modal closes when:
  - Clicking the ✕ button.
  - Clicking the modal backdrop or any element with `[data-close-modal]`.
  - Pressing `Escape`.
- Closing the modal resets the scan panel (clears file input + status).

## Generate Mode (story creation)
- Inputs:
  - Prompt textarea (`promptBody`).
  - Word count slider.
  - Level buttons (A1–C2).
  - Style buttons (literary vs casual).
- Preferences are stored in both `localStorage` and `document.body.dataset` via:
  `applyStoryWordCount`, `applyStoryLevel`, `applyStoryStyle`.
- Prompt suggestion:
  - “Suggest” calls `fillPromptSuggestion`.
  - If API key exists, it calls OpenAI to generate a prompt; otherwise falls back
    to local prompt lists.
  - The suggestion is normalized to include a CEFR tag and approximate word count.
- Generate click:
  - Disables the button, swaps label to “Generating…”.
  - Uses `getTopLemmaList(10)` to pass top lemmas to the generator.
  - Calls `generateStoryFromPrompt` with prompt, word count, level, style, lemmas.
  - On success: saves the new story, updates Home list, opens reader, clears prompt,
    closes the modal.
  - On failure: button re-enables and modal stays open (no story saved).

## Paste/Scan Mode (manual import + OCR)
- Paste inputs: title + body text; clicking “Save” stores the story and opens it.
- Scan input accepts image files and uses the device camera on mobile.
- OCR flow:
  - Requires an API key. If absent, the welcome flow opens.
  - Reads the image as a data URL, calls `extractTextFromImage`, and fills title/body.
  - Shows status messages for scanning, success, “no text”, or failure.

## UI Inputs + Preferences
- Word count, level, and style are set via `applyStoryWordCount`, `applyStoryLevel`, and
  `applyStoryStyle`, which store values in `localStorage` and on
  `document.body.dataset` for later reads.
- The prompt text is typed into the modal; there is also a prompt suggestion flow
  that uses ChatGPT or a local fallback list.

## Generate Click Handler
- Clicking the Generate button collects the prompt, disables the button, pulls the
  top 10 lemmas from translation history (`getTopLemmaList(10)`), and calls
  `generateStoryFromPrompt` with word count, level, style, and lemmas.

## API Key Resolution
- `getApiKey()` uses the typed key from the settings input, falling back to
  `localStorage` (`chatgpt_api_key`).
- If there is no key, `generateStoryFromPrompt` returns `null` immediately.

## ChatGPT Request
- `generateStoryFromPrompt` sends a `POST` to
  `https://api.openai.com/v1/chat/completions` using `gpt-4o-mini`.
- It requires a strict JSON response:
  `{ "title": "...", "text": "...", "used_lemmas": ["..."] }`.
- The system/user messages include CEFR level, word count target, style rules
  (casual vs. literary), and optional lemmas.
- It aborts any previous in-flight generation with an `AbortController`.

## Parse + Validate
- The response content is parsed as JSON.
- It requires `text` and falls back to a default title if needed.
- Failures or aborts return `null` (no story created).

## Persist + Open
- On success, a story object is created with `id: Date.now()`.
- The story is saved into the stories array in `localStorage`.
- The home list is re-rendered, and the reader opens to the new story.
- The prompt field is cleared and the modal is closed.
