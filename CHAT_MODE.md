# Chat Mode (Words & Sentences)

This document describes the chat mode that opens from the translation bottom sheet and lets learners ask questions about a selected word or a full sentence.

## Where it lives

- UI: translation bottom sheet (`index.html`, `#bottomSheet`)
- Chat view: back face of the bottom sheet (`.bottom-sheet-back`)
- Core logic: `script.js` (sheet ask mode + ChatGPT request)
- Styling: `styles.css` (`.sheet-chat-*` classes)

## How it opens

- From the reader, tap a word or sentence to show the translation bottom sheet.
- Tap the **Ask** button in the sheet actions to flip to chat mode.
- Tap **×** to return to the translation view.

## Context modes

### 1) Word mode

- Trigger: a word is selected in the reader.
- Context includes:
  - the selected word
  - its sentence
- Use for:
  - meaning / usage of the word
  - grammar notes or special forms
  - quick examples

### 2) Sentence mode

- Trigger: a sentence is selected (no specific word focus).
- Context includes:
  - the full sentence only
- Use for:
  - sentence structure
  - paraphrasing
  - simplification

## Quick prompts

- Word mode quick prompts:
  - other meanings
  - usage examples
  - what's special about the word
  - explain sentence structure
- Sentence mode quick prompts:
  - parse the syntax
  - paraphrase
  - simplify

## Requirements

- Requires a ChatGPT API key stored in Settings.
- Key storage: `localStorage` under `chatgpt_api_key`.
- Model: `gpt-4.1` (via the Responses API).

## Behavior notes

- The chat history is scoped to the current word/sentence context.
- Switching context clears the chat log and prompts.
- If no valid context or no API key, inputs are disabled and a hint is shown.

## Output formatting

- Chat responses support minimal markdown rendering:
  - paragraphs (line breaks)
  - unordered/ordered lists
  - inline code
- Long responses are shown in a scrollable message list.
