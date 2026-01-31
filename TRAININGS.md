# Training Screens

This document describes the training UI and data model for the two training screens currently available in the app.

## Where it lives

- Screen: `Trainings` (`index.html`, `data-screen="trainings"`)
- Core logic: `script.js` (training configs, state machine, generation)
- Styling: `styles.css` (`.training-*` classes)

## Screens & layouts

### 1) Training list view

The list view shows available trainings and per-training session size controls.

- Each training item displays:
  - Title + description
  - Session size label (`{count} sentences`)
  - Status line (generating / ready / failed)
  - Abort button (visible only while generating)
- Session size buttons: 3 / 5 / 10 / 15 / 20
- When a training is opened, list view is hidden and detail view is shown.

### 2) Training detail view

Single shared detail view for all training types.

- Header: title + subtitle (set by training config), Close button
- Progress bar: % through current session
- Sentence area: rendered template with gaps highlighted
- Cards:
  - Case selection (`trainingCaseCard`)
  - Article/ending options (`trainingArticleCard`)
  - Controls (`trainingControlsCard`)
- Explain card: hidden until explanation is fetched
- Summary card: shown after the last item

## Training types

### Dativ oder Akkusativ

- `id`: `dativ-akkusativ`
- Cases: `dative`, `accusative`
- Steps: `case` → `article`
- Answer mode: `article`
- Gaps: one or more article slots in a sentence

User flow:
1. Choose the case for the highlighted gap.
2. Choose the correct article (including contractions like `am`, `im`).
3. If multiple gaps exist, repeat for each gap.
4. After completion, tap Next to advance.

### Adjective Endings

- `id`: `adjective-endings`
- Cases: `nominative`, `accusative`, `dative`
- Steps: `case` → `ending`
- Answer mode: `ending`
- Gaps: one adjective ending per sentence

User flow:
1. Choose the case for the adjective.
2. Choose the correct adjective ending (`e`, `en`, `er`, `es`, `em`).
3. Tap Next to advance.

## Data model

### Shared fields

Each training item is normalized into this shape:

- `sentence` (string): full, correct sentence
- `template` (string): sentence with `__ARTICLE__` token(s) in place of gaps
- `gaps` (array): ordered list of gap objects

### Dativ/Akkusativ gap fields

- `article` (string): full article or contraction (e.g., `dem`, `im`)
- `base` (string): first character of the article/contraction
- `suffix` (string): remaining characters of the article/contraction
- `preposition` (string): preposition if contraction applies
- `case` (string): `dative` or `accusative`
- `gender` (string): `masculine`, `feminine`, `neuter`, `plural`
- `noun` (string): noun for explanation context

### Adjective ending gap fields

- `base` (string): adjective base (e.g., `klein`)
- `suffix` (string): adjective ending (`e`, `en`, `er`, `es`, `em`)
- `case` (string): `nominative`, `accusative`, `dative`
- `gender` (string): `masculine`, `feminine`, `neuter`, `plural`
- `noun` (string): noun for explanation context
- `determinerType` (string): `definite`, `indefinite`, `possessive`, `none`

Normalization ensures:
- Templates contain the correct number of `__ARTICLE__` tokens.
- No adjacent tokens are allowed.
- Cases/genders/endings are validated and filtered.
- Adjective endings must match the expected table for `determinerType`.

## Session behavior

- Session size is per-training and stored in localStorage.
- Learned items are tracked per-training; learned entries are filtered out of the pool.
- Items are marked learned only when a sentence is completed with no mistakes.
- At the end of a session, a summary card shows score; if <100%, a note indicates missed items may return.

## Generation & explanation

- Training sets are generated via OpenAI when the pool is too small.
- The status line reflects generation state; Abort cancels the request.
- Explanation is available after completing a sentence (before advancing):
  - Uses OpenAI chat completion.
  - Model: `gpt-4o-mini`.
  - Uses the user’s UI language in the response.
  - Requires an API key in settings.
- Adjective endings generation allows a wider set of determiners:
  - `definite`: der/die/das + der-words (e.g., dieser/jeder/welcher)
  - `indefinite`: ein- words (e.g., ein/kein, plural without ending)
  - `possessive`: mein/dein/sein/ihr/unser/euer
  - `none`: no determiner
- Adjective endings generation expects exactly one adjective directly before exactly one noun per sentence.
- Adjective endings prompt includes explicit per-batch target counts for cases and determiner types.
- Training generation strips JSON code fences if the model wraps the response.

## LocalStorage keys

- Dativ/Akkusativ
  - Items: `training_dative_accusative_v1`
  - Learned: `training_dative_accusative_learned_v1`
  - Session size: `training_dative_accusative_size_v1`
- Adjective endings
  - Items: `training_adjective_endings_v1`
  - Learned: `training_adjective_endings_learned_v1`
  - Session size: `training_adjective_endings_size_v1`

## Adding a new training

1. Add a new entry in `TRAINING_CONFIGS` (id, title/description keys, cases, steps, answer mode, normalization, generation).
2. Add list item markup in `index.html` with session size buttons.
3. Add i18n keys in `script.js` for EN/RU.
4. Add any new validation/gap rules in the normalization functions.
5. Verify flows on iPhone 14 Pro Max viewport (430x932).
