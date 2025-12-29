const reader = document.getElementById("reader");
const selectionGerman = document.getElementById("selectionGerman");
const selectionEnglish = document.getElementById("selectionEnglish");
const selectionGrammar = document.getElementById("selectionGrammar");
const selectionLemmaDiff = document.getElementById("selectionLemmaDiff");
const lemmaDiffDivider = document.getElementById("lemmaDiffDivider");
const grammarMeta = document.getElementById("grammarMeta");
const metaLemma = document.getElementById("metaLemma");
const metaHead = document.getElementById("metaHead");
const metaArticle = document.getElementById("metaArticle");
const metaGender = document.getElementById("metaGender");
const metaCase = document.getElementById("metaCase");
const metaLemmaPill = document.getElementById("metaLemmaPill");
const metaHeadPill = document.getElementById("metaHeadPill");
const metaArticlePill = document.getElementById("metaArticlePill");
const metaGenderPill = document.getElementById("metaGenderPill");
const metaCasePill = document.getElementById("metaCasePill");
const sheetGerman = document.getElementById("sheetGerman");
const sheetEnglish = document.getElementById("sheetEnglish");
const sheetGrammar = document.getElementById("sheetGrammar");
const sheetGrammarMeta = document.getElementById("sheetGrammarMeta");
const sheetMetaLemma = document.getElementById("sheetMetaLemma");
const sheetMetaHead = document.getElementById("sheetMetaHead");
const sheetMetaArticle = document.getElementById("sheetMetaArticle");
const sheetMetaGender = document.getElementById("sheetMetaGender");
const sheetMetaCase = document.getElementById("sheetMetaCase");
const sheetMetaLemmaPill = document.getElementById("sheetMetaLemmaPill");
const sheetMetaHeadPill = document.getElementById("sheetMetaHeadPill");
const sheetMetaArticlePill = document.getElementById("sheetMetaArticlePill");
const sheetMetaGenderPill = document.getElementById("sheetMetaGenderPill");
const sheetMetaCasePill = document.getElementById("sheetMetaCasePill");
const panelGenderWord = document.getElementById("panelGenderWord");
const panelCaseWord = document.getElementById("panelCaseWord");
const sheetGenderWord = document.getElementById("sheetGenderWord");
const sheetCaseWord = document.getElementById("sheetCaseWord");
const panelGoverningLegend = document.getElementById("panelGoverningLegend");
const sheetGoverningLegend = document.getElementById("sheetGoverningLegend");
const clearSelection = document.getElementById("clearSelection");
const apiKeyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");
const toggleApi = document.getElementById("toggleApi");
const apiKeyModal = document.getElementById("apiKeyModal");
const apiKeyModalClose = apiKeyModal.querySelector("[data-close-modal]");
const fontOptions = document.querySelectorAll("[data-font]");
const readerSize = document.getElementById("readerSize");
const toggleKeyVisibility = document.getElementById("toggleKeyVisibility");
const clearKey = document.getElementById("clearKey");
const translationPanel = document.getElementById("translationPanel");
const bottomSheet = document.getElementById("bottomSheet");
const addStoryCta = document.getElementById("addStoryCta");
const addTextButton = document.getElementById("addText");
const openSavedButton = document.getElementById("openSaved");
const addTextModal = document.getElementById("addTextModal");
const closeAddText = document.getElementById("closeAddText");
const savedTextsModal = document.getElementById("savedTextsModal");
const savedTextsModalClose = savedTextsModal?.querySelector("[data-close-modal]");
const modeButtons = document.querySelectorAll("[data-mode]");
const modePaste = document.getElementById("modePaste");
const modeGenerate = document.getElementById("modeGenerate");
const pasteTitle = document.getElementById("pasteTitle");
const pasteBody = document.getElementById("pasteBody");
const savePaste = document.getElementById("savePaste");
const promptBody = document.getElementById("promptBody");
const generateStory = document.getElementById("generateStory");
const suggestPrompt = document.getElementById("suggestPrompt");
const savedTexts = document.getElementById("savedTexts");
const wordCountSlider = document.getElementById("wordCount");
const wordCountValue = document.getElementById("wordCountValue");
const levelButtons = document.querySelectorAll("[data-level]");

let lastGerman = "";
let lastTranslation = "";
let lastGrammar = "";
const translationCache = new Map();
let pendingController = null;
let generationController = null;
let suggestionController = null;
let translationRequestId = 0;
let longPressTimer = null;
let longPressTriggered = false;
let sentenceTranslationEl = null;
const STORY_STORAGE_KEY = "reader_texts_v1";
const LAST_STORY_KEY = "reader_last_story_id";
const STORY_LEVEL_KEY = "reader_story_level";
const STORY_WORD_COUNT_KEY = "reader_story_word_count";
const storyTitle = document.querySelector(".book-header h1");

const clearGoverningHighlight = () => {
  reader
    .querySelectorAll(".word.governing, .word.governing-case, .word.governing-gender")
    .forEach((word) => {
      word.classList.remove("governing", "governing-case", "governing-gender");
    });
};

const highlightGoverningWord = (
  targetText,
  sentenceEl,
  clickedWord,
  className
) => {
  if (!targetText || !sentenceEl) {
    return;
  }

  const normalized = targetText.trim().toLowerCase();
  const candidates = Array.from(sentenceEl.querySelectorAll(".word"));
  const match = candidates.find((candidate) => {
    if (candidate === clickedWord) {
      return false;
    }
    const lemma = candidate.dataset.lemma?.toLowerCase() || "";
    const text = candidate.textContent.trim().toLowerCase();
    return lemma === normalized || text === normalized;
  });

  if (match) {
    match.classList.add(className);
  }
};

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const escapeRegExp = (value) => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const normalizeCompare = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "");

const formatGrammarHtml = (text, highlights, { wholeWord = false } = {}) => {
  const safeText = escapeHtml(text || "");
  const items = (highlights || [])
    .map((item) => ({
      word: item.word?.trim(),
      className: item.className,
    }))
    .filter((item) => item.word && item.className);

  if (!items.length || !safeText) {
    return safeText;
  }

  const unique = new Map();
  items.forEach((item) => {
    const key = item.word.toLowerCase();
    if (!unique.has(key)) {
      unique.set(key, item.className);
    }
  });

  const parts = Array.from(unique.keys())
    .sort((a, b) => b.length - a.length)
    .map((word) => escapeRegExp(word));
  if (!parts.length) {
    return safeText;
  }

  if (!wholeWord) {
    const regex = new RegExp(`(${parts.join("|")})`, "gi");
    return safeText.replace(regex, (match) => {
      const className = unique.get(match.toLowerCase());
      if (!className) {
        return match;
      }
      return `<span class="${className}">${match}</span>`;
    });
  }

  const regex = new RegExp(
    `(^|[^\\p{L}\\d])(${parts.join("|")})(?=$|[^\\p{L}\\d])`,
    "giu"
  );
  return safeText.replace(regex, (match, lead, word) => {
    const className = unique.get(word.toLowerCase());
    if (!className) {
      return match;
    }
    return `${lead}<span class="${className}">${word}</span>`;
  });
};

const setMetaPill = (pillEl, valueEl, value) => {
  const safeValue = (value || "").trim();
  valueEl.textContent = safeValue;
  pillEl.classList.toggle("is-hidden", !safeValue);
};

const updateTranslation = (type, german, translation, grammar, meta) => {
  lastGerman = german;
  lastTranslation = translation;
  lastGrammar = grammar;
  selectionGerman.textContent = german;
  selectionEnglish.textContent = translation;
  const isWord = type === "word";
  const isSentence = type === "sentence";
  const highlights = [
    { word: meta?.caseWord, className: "governing-case" },
    { word: meta?.genderWord, className: "governing-gender" },
  ];
  const panelGrammarHtml = isWord
    ? formatGrammarHtml(grammar, highlights, { wholeWord: true })
    : escapeHtml(grammar);
  const sheetGrammarHtml = isWord
    ? formatGrammarHtml(grammar, highlights)
    : escapeHtml(grammar);
  selectionGrammar.innerHTML = panelGrammarHtml;
  sheetGerman.textContent = german;
  sheetEnglish.textContent = translation;
  sheetGrammar.innerHTML = sheetGrammarHtml;
  panelGenderWord.textContent = meta?.genderWord || "—";
  panelCaseWord.textContent = meta?.caseWord || "—";
  sheetGenderWord.textContent = meta?.genderWord || "—";
  sheetCaseWord.textContent = meta?.caseWord || "—";
  const hasLegend =
    isWord && !!(meta?.genderWord || meta?.caseWord);
  panelGoverningLegend.classList.toggle("is-hidden", !hasLegend);
  sheetGoverningLegend.classList.toggle("is-hidden", !hasLegend);
  selectionGrammar.classList.toggle("is-hidden", !isWord);
  sheetGrammar.classList.toggle("is-hidden", !isWord);
  if (selectionLemmaDiff) {
    const explanation = (meta?.formExplanation || "").trim();
    selectionLemmaDiff.textContent = explanation;
    selectionLemmaDiff.classList.toggle("is-hidden", !isWord || !explanation);
    if (lemmaDiffDivider) {
      lemmaDiffDivider.classList.toggle("is-hidden", !isWord || !explanation);
    }
  }
  translationPanel.classList.remove("is-hidden");
  bottomSheet.classList.remove("is-hidden");
  translationPanel.classList.toggle("is-sentence", isSentence);
  bottomSheet.classList.toggle("is-sentence", isSentence);

  const hasMeta =
    meta &&
    (meta.lemma || meta.head || meta.article || meta.gender || meta.case) &&
    type === "word";
  if (hasMeta) {
    setMetaPill(metaLemmaPill, metaLemma, meta.lemma);
    setMetaPill(metaHeadPill, metaHead, meta.head);
    setMetaPill(metaArticlePill, metaArticle, meta.article);
    setMetaPill(metaGenderPill, metaGender, meta.gender);
    setMetaPill(metaCasePill, metaCase, meta.case);
    setMetaPill(sheetMetaLemmaPill, sheetMetaLemma, meta.lemma);
    setMetaPill(sheetMetaHeadPill, sheetMetaHead, meta.head);
    setMetaPill(sheetMetaArticlePill, sheetMetaArticle, meta.article);
    setMetaPill(sheetMetaGenderPill, sheetMetaGender, meta.gender);
    setMetaPill(sheetMetaCasePill, sheetMetaCase, meta.case);
    grammarMeta.classList.remove("is-hidden");
    sheetGrammarMeta.classList.remove("is-hidden");
  } else {
    setMetaPill(metaLemmaPill, metaLemma, "");
    setMetaPill(metaHeadPill, metaHead, "");
    setMetaPill(metaArticlePill, metaArticle, "");
    setMetaPill(metaGenderPill, metaGender, "");
    setMetaPill(metaCasePill, metaCase, "");
    setMetaPill(sheetMetaLemmaPill, sheetMetaLemma, "");
    setMetaPill(sheetMetaHeadPill, sheetMetaHead, "");
    setMetaPill(sheetMetaArticlePill, sheetMetaArticle, "");
    setMetaPill(sheetMetaGenderPill, sheetMetaGender, "");
    setMetaPill(sheetMetaCasePill, sheetMetaCase, "");
    grammarMeta.classList.add("is-hidden");
    sheetGrammarMeta.classList.add("is-hidden");
  }
};

const clearActiveWord = () => {
  const active = reader.querySelector(".word.active");
  if (active) {
    active.classList.remove("active", "loading");
  }
  reader.querySelectorAll(".word.loading").forEach((word) => {
    word.classList.remove("loading");
  });
  reader.querySelectorAll(".word.separable").forEach((word) => {
    word.classList.remove("separable");
  });
};

const clearActiveSentence = () => {
  reader.querySelectorAll(".sentence.active").forEach((sentence) => {
    sentence.classList.remove("active");
  });
  reader.classList.remove("has-active-sentence");
};

const clearSentenceTranslationHighlight = () => {
  if (sentenceTranslationEl) {
    sentenceTranslationEl.classList.remove("sentence-translation");
    sentenceTranslationEl = null;
  }
};

const setWordLoading = (word, isLoading) => {
  if (!word) {
    return;
  }
  word.classList.toggle("loading", isLoading);
};

const clearLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
};

const loadStories = () => {
  try {
    const raw = localStorage.getItem(STORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    return [];
  }
};

const saveStories = (stories) => {
  localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(stories));
};

const renderSavedStories = (stories) => {
  savedTexts.innerHTML = "";
  if (!stories.length) {
    return;
  }

  stories.forEach((story) => {
    const item = document.createElement("div");
    item.className = "saved-item";
    const title = document.createElement("div");
    title.textContent = story.title;
    const actions = document.createElement("div");
    actions.className = "saved-actions";
    const loadButton = document.createElement("button");
    loadButton.className = "ghost";
    loadButton.type = "button";
    loadButton.textContent = "Load";
    loadButton.addEventListener("click", () => {
      renderStory(story);
      addTextModal.classList.add("is-hidden");
      savedTextsModal?.classList.add("is-hidden");
    });
    const deleteButton = document.createElement("button");
    deleteButton.className = "ghost";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const next = loadStories().filter((saved) => saved.id !== story.id);
      saveStories(next);
      renderSavedStories(next);
      const lastStoryId = localStorage.getItem(LAST_STORY_KEY);
      if (!next.length) {
        localStorage.removeItem(LAST_STORY_KEY);
        storyTitle.textContent = "";
        reader.innerHTML = "";
        translationPanel.classList.add("is-hidden");
        return;
      }
      if (String(story.id) === lastStoryId) {
        renderStory(next[0]);
      }
    });
    actions.appendChild(loadButton);
    actions.appendChild(deleteButton);
    item.appendChild(title);
    item.appendChild(actions);
    savedTexts.appendChild(item);
  });
};

const splitIntoSentences = (text) => {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    return [];
  }
  const matches =
    cleaned.match(/[^.!?]+[.!?]+(?:["'»”’„“]+)?|[^.!?]+$/g) || [];
  return matches.map((sentence) => sentence.trim()).filter(Boolean);
};

const articleMap = {
  der: "der",
  die: "die",
  das: "das",
  den: "der",
  dem: "der",
  des: "der",
  ein: "ein",
  eine: "eine",
  einen: "ein",
  einem: "ein",
  eines: "ein",
  kein: "kein",
  keine: "keine",
  keinen: "kein",
  keinem: "kein",
  keines: "kein",
};

const isWordToken = (token) => /[\p{L}\d]/u.test(token);

const noSpaceBefore = new Set([",", ".", "!", "?", ":", ";", ")", "]", "}", "»", "”", "’"]);
const noSpaceAfter = new Set(["(", "[", "{", "«", "„", "“", "‘"]);
const separablePrefixes = new Set([
  "ab",
  "an",
  "auf",
  "aus",
  "bei",
  "ein",
  "fest",
  "fort",
  "her",
  "hin",
  "los",
  "mit",
  "nach",
  "vor",
  "weg",
  "weiter",
  "zuruck",
  "zurueck",
  "zusammen",
  "zu",
  "auseinander",
]);

const normalizeUmlauts = (text) =>
  text
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

const normalizeWordText = (wordEl) =>
  normalizeUmlauts(wordEl.textContent.trim().toLowerCase());

const findSeparableVerbPhrase = (clickedWord, sentenceEl) => {
  if (!clickedWord || !sentenceEl) {
    return null;
  }
  const words = Array.from(sentenceEl.querySelectorAll(".word"));
  const index = words.indexOf(clickedWord);
  if (index === -1) {
    return null;
  }

  const lastIndex = words.length - 1;
  const clickedText = normalizeWordText(clickedWord);
  const isPrefix = separablePrefixes.has(clickedText);
  const isVerbCandidate =
    clickedWord.dataset.pos !== "article" && clickedWord.dataset.pos !== "noun";

  const isTerminalPrefix = (prefixIndex) => prefixIndex === lastIndex;

  if (isPrefix && isTerminalPrefix(index)) {
    for (let i = index - 1; i >= 0; i -= 1) {
      const candidate = words[i];
      const candidateText = normalizeWordText(candidate);
      if (!candidateText) {
        continue;
      }
      if (candidate.dataset.pos === "article" || candidate.dataset.pos === "noun") {
        continue;
      }
      if (separablePrefixes.has(candidateText)) {
        continue;
      }
      return { verbSpan: candidate, prefixSpan: clickedWord };
    }
  }

  if (isVerbCandidate) {
    for (let i = index + 1; i < words.length; i += 1) {
      const candidate = words[i];
      const candidateText = normalizeWordText(candidate);
      if (!separablePrefixes.has(candidateText)) {
        continue;
      }
      if (!isTerminalPrefix(i)) {
        continue;
      }
      return { verbSpan: clickedWord, prefixSpan: candidate };
    }
  }

  return null;
};

const renderStory = (story) => {
  localStorage.setItem(LAST_STORY_KEY, String(story.id));
  storyTitle.textContent = story.title;
  reader.innerHTML = "";
  resetTranslation();

  const sentences = splitIntoSentences(story.text);
  const paragraph = document.createElement("p");
  paragraph.className = "story";
  sentences.forEach((sentence, index) => {
    const sentenceSpan = document.createElement("span");
    sentenceSpan.className = "sentence";
    sentenceSpan.dataset.translation = "";

    const tokens = sentence.match(/[\p{L}]+(?:-[\p{L}]+)?|\d+|[^\s\p{L}\d]+/gu) || [];
    let previousToken = null;

    tokens.forEach((token) => {
      const needsSpace =
        previousToken &&
        !noSpaceBefore.has(token) &&
        !noSpaceAfter.has(previousToken);

      if (needsSpace) {
        sentenceSpan.appendChild(document.createTextNode(" "));
      }

      if (isWordToken(token)) {
        const span = document.createElement("span");
        span.className = "word";
        span.dataset.translation = "";
        span.textContent = token;
        const lower = token.toLowerCase();
        if (articleMap[lower]) {
          span.dataset.pos = "article";
          span.dataset.articleBase = articleMap[lower];
        } else if (/^\p{Lu}/u.test(token)) {
          span.dataset.pos = "noun";
          span.dataset.lemma = token;
        }
        sentenceSpan.appendChild(span);
      } else {
        sentenceSpan.appendChild(document.createTextNode(token));
      }

      previousToken = token;
    });

    paragraph.appendChild(sentenceSpan);
    if (index < sentences.length - 1) {
      paragraph.appendChild(document.createTextNode(" "));
    }
  });
  reader.appendChild(paragraph);
};

const getApiKey = () => {
  const typedKey = apiKeyInput.value.trim();
  if (typedKey) {
    return typedKey;
  }
  return localStorage.getItem("chatgpt_api_key") || "";
};

const translateWithChatGPT = async (text, type, context) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  const cacheKey = `${type}:${text.trim().toLowerCase()}:${context || ""}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  if (pendingController) {
    pendingController.abort();
  }
  pendingController = new AbortController();

  try {
    const messages =
      type === "word"
        ? [
            {
              role: "system",
              content:
                "You are a German-to-Russian translation and grammar assistant. Respond with strict JSON: {\"translation\":\"...\",\"declension_explanation\":\"...\",\"form_explanation\":\"...\",\"lemma\":\"...\",\"article\":\"...\",\"gender\":\"...\",\"case\":\"...\",\"case_governing_word\":\"...\",\"gender_governing_word\":\"...\"}. The declension explanation must be in Russian, short, and if no declension applies, explain why. The form_explanation must be in Russian and explain how the word form differs from its lemma (tense, case, number, or other change); if the form matches the lemma, return an empty string. The case_governing_word must be the exact German word from the sentence that triggers the case (empty if none). The gender_governing_word must be the exact German word that determines gender (typically the noun lemma or head noun). If the word is a separable verb phrase (e.g. \"stand auf\"), return the combined lemma without a space (e.g. \"aufstehen\"). Use empty strings when lemma/article/gender/case cannot be determined.",
            },
            {
              role: "user",
              content: `Translate the German word to Russian and explain its declension or case choice succinctly in Russian, referencing the specific sentence context. Also explain how the word form differs from its lemma (tense, case, number, or other change). If the word is a separable verb phrase, return the combined lemma (prefix+verb).\nWord: ${text}\nSentence: ${context || "N/A"}`,
            },
          ]
        : [
            {
              role: "system",
              content:
                "You are a concise German-to-Russian translator. Return only the Russian translation, no extra text.",
            },
            { role: "user", content: text },
          ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages,
      }),
      signal: pendingController.signal,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Translation failed");
    }

    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      throw new Error("Empty translation");
    }

    const parsed =
      type === "word"
        ? JSON.parse(raw)
        : {
            translation: raw,
            declension_explanation:
              "Объяснение склонения доступно только для отдельных слов.",
            lemma: "",
            article: "",
            gender: "",
            case: "",
            case_governing_word: "",
            gender_governing_word: "",
          };

    if (!parsed.translation || !parsed.declension_explanation) {
      throw new Error("Malformed translation");
    }

    translationCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    return null;
  }
};

const generateStoryFromPrompt = async (prompt, fallbackTitle, options = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  if (generationController) {
    generationController.abort();
  }
  generationController = new AbortController();

  try {
    const wordCount = Number(options.wordCount) || 120;
    const level = options.level || "A2";
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              `Generate a short German story for language learners. Respond with strict JSON: {"title":"...","text":"..."}. Target about ${wordCount} words (±10%). Use CEFR ${level} vocabulary and grammar.`,
          },
          {
            role: "user",
            content: `${prompt}\nLength: ${wordCount} words.\nLevel: ${level}.`,
          },
        ],
      }),
      signal: generationController.signal,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Story generation failed");
    }

    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      throw new Error("Empty story");
    }

    const parsed = JSON.parse(raw);
    if (!parsed.text) {
      throw new Error("Malformed story");
    }

    return {
      title: parsed.title || fallbackTitle || "Neue Geschichte",
      text: parsed.text,
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    return null;
  }
};

reader.addEventListener("click", (event) => {
  if (longPressTriggered) {
    longPressTriggered = false;
    return;
  }
  const activeSentence = reader.querySelector(".sentence.active");
  const word = event.target.closest(".word");
  if (activeSentence && !word) {
    resetTranslation();
    return;
  }
  if (word) {
    clearActiveWord();
    const sentenceEl = word.closest(".sentence");
    if (!activeSentence || activeSentence !== sentenceEl) {
      clearActiveSentence();
    }
    clearGoverningHighlight();
    clearSentenceTranslationHighlight();
    if (sentenceEl) {
      sentenceEl.classList.add("active");
      reader.classList.add("has-active-sentence");
    }
    word.classList.add("active");
    setWordLoading(word, true);
    const separable = findSeparableVerbPhrase(word, sentenceEl);
    if (separable) {
      separable.verbSpan.classList.add("separable");
      separable.prefixSpan.classList.add("separable");
    }
    const german = separable
      ? `${separable.verbSpan.textContent.trim()} ${separable.prefixSpan.textContent.trim()}`
      : word.textContent.trim();
    const requestId = ++translationRequestId;
    updateTranslation(
      "word",
      german,
      "Переводим...",
      "Объясняем...",
      null
    );
    const sentenceText = sentenceEl?.textContent.trim() || "";
    translateWithChatGPT(german, "word", sentenceText).then((result) => {
      if (requestId !== translationRequestId) {
        setWordLoading(word, false);
        return;
      }
      const fallback = word.dataset.translation;
      const translation = result?.translation || fallback;
      const grammar =
        result?.declension_explanation ||
        "Нет объяснения склонения для этого слова.";
      const meta = {
        lemma: result?.lemma || "",
        head: "",
        article: result?.article || "",
        gender: result?.gender || "",
        case: result?.case || "",
        caseWord: result?.case_governing_word || "",
        genderWord: result?.gender_governing_word || "",
        formExplanation: result?.form_explanation || "",
      };

      if (word.dataset.pos === "article") {
        const baseArticle = word.dataset.articleBase || "";
        if (baseArticle) {
          meta.lemma = baseArticle;
        }

        const sentenceWords = Array.from(
          sentenceEl?.querySelectorAll(".word") || []
        );
        const wordIndex = sentenceWords.indexOf(word);
        const headWord = sentenceWords
          .slice(wordIndex + 1)
          .find((item) => item.dataset.pos === "noun");
        if (headWord) {
          meta.head = headWord.dataset.lemma || headWord.textContent.trim();
          if (!meta.genderWord) {
            meta.genderWord = meta.head;
          }
          highlightGoverningWord(
            meta.head,
            sentenceEl,
            word,
            "governing-gender"
          );
        }
      } else {
        highlightGoverningWord(
          result?.case_governing_word || "",
          sentenceEl,
          word,
          "governing-case"
        );
        highlightGoverningWord(
          result?.gender_governing_word || "",
          sentenceEl,
          word,
          "governing-gender"
        );
      }
      setWordLoading(word, false);
      updateTranslation("word", german, translation, grammar, meta);
    });
    return;
  }

  const sentence = event.target.closest(".sentence");
  if (sentence) {
    const german = sentence.textContent.trim();
    clearActiveSentence();
    sentence.classList.add("active");
    reader.classList.add("has-active-sentence");
    translateSentenceText(german, sentence.dataset.translation, sentence);
  }
});

reader.addEventListener("pointerdown", (event) => {
  const word = event.target.closest(".word");
  if (!word) {
    return;
  }
  clearLongPress();
  longPressTimer = setTimeout(() => {
    const sentenceEl = word.closest(".sentence");
    if (!sentenceEl) {
      return;
    }
    longPressTriggered = true;
    clearActiveWord();
    clearGoverningHighlight();
    clearActiveSentence();
    sentenceEl.classList.add("active");
    reader.classList.add("has-active-sentence");
    translateSentenceText(
      sentenceEl.textContent.trim(),
      sentenceEl.dataset.translation,
      sentenceEl
    );
  }, 450);
});

reader.addEventListener("pointerup", () => {
  clearLongPress();
});

reader.addEventListener("pointerleave", () => {
  clearLongPress();
});

reader.addEventListener("pointercancel", () => {
  clearLongPress();
});

const translateSentenceText = (
  german,
  fallbackTranslation = "",
  sentenceEl = null
) => {
  if (!german) {
    return;
  }
  clearActiveWord();
  clearGoverningHighlight();
  clearSentenceTranslationHighlight();
  if (sentenceEl) {
    sentenceEl.classList.add("sentence-translation");
    sentenceTranslationEl = sentenceEl;
  }
  const requestId = ++translationRequestId;
  updateTranslation(
    "sentence",
    german,
    "Переводим...",
    "Объяснение склонения доступно только для отдельных слов.",
    null
  );
  translateWithChatGPT(german, "sentence").then((result) => {
    if (requestId !== translationRequestId) {
      return;
    }
    const translation =
      result?.translation || fallbackTranslation || "Перевод на русский появится здесь.";
    const grammar =
      result?.declension_explanation ||
      "Объяснение склонения доступно только для отдельных слов.";
    updateTranslation("sentence", german, translation, grammar, null);
  });
};

storyTitle.addEventListener("click", () => {
  const german = storyTitle.textContent.trim();
  translateSentenceText(german);
});

const resetTranslation = () => {
  if (pendingController) {
    pendingController.abort();
  }
  translationRequestId += 1;
  clearActiveWord();
  clearSentenceTranslationHighlight();
  clearActiveSentence();
  clearGoverningHighlight();
  updateTranslation(
    "word",
    "Tap a word",
    "Перевод на русский появится здесь.",
    "Объяснение склонения появится здесь.",
    null
  );
  selectionGrammar.classList.add("is-hidden");
  sheetGrammar.classList.add("is-hidden");
  if (selectionLemmaDiff) {
    selectionLemmaDiff.classList.add("is-hidden");
    selectionLemmaDiff.textContent = "";
  }
  if (lemmaDiffDivider) {
    lemmaDiffDivider.classList.add("is-hidden");
  }
  grammarMeta.classList.add("is-hidden");
  sheetGrammarMeta.classList.add("is-hidden");
  translationPanel.classList.add("is-hidden");
  bottomSheet.classList.add("is-hidden");
};

clearSelection.addEventListener("click", () => {
  resetTranslation();
});

resetTranslation();

const applyReaderFont = (font) => {
  document.body.dataset.readerFont = font;
  localStorage.setItem("reader_font", font);
  fontOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.font === font);
  });
};

const applyReaderSize = (size) => {
  const clamped = Math.min(30, Math.max(10, Number(size) || 20));
  document.body.dataset.readerSize = String(clamped);
  document.body.style.setProperty("--reader-size", clamped);
  localStorage.setItem("reader_size", String(clamped));
  if (readerSize) {
    readerSize.value = String(clamped);
  }
};

const applyStoryWordCount = (value) => {
  const clamped = Math.min(300, Math.max(50, Number(value) || 120));
  if (wordCountSlider) {
    wordCountSlider.value = String(clamped);
  }
  if (wordCountValue) {
    wordCountValue.textContent = String(clamped);
  }
  localStorage.setItem(STORY_WORD_COUNT_KEY, String(clamped));
};

const applyStoryLevel = (level) => {
  const allowed = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const normalized = String(level || "").toUpperCase();
  const next = allowed.includes(normalized) ? normalized : "A2";
  document.body.dataset.storyLevel = next;
  levelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.level === next);
  });
  localStorage.setItem(STORY_LEVEL_KEY, next);
};

fontOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyReaderFont(option.dataset.font);
  });
});

if (readerSize) {
  readerSize.addEventListener("input", () => {
    applyReaderSize(readerSize.value);
  });
}

const storedFont = localStorage.getItem("reader_font") || "serif";
const storedSize = localStorage.getItem("reader_size") || "20";
applyReaderFont(storedFont);
applyReaderSize(storedSize);
const storedWordCount = localStorage.getItem(STORY_WORD_COUNT_KEY) || "120";
const storedLevel = localStorage.getItem(STORY_LEVEL_KEY) || "A2";
applyStoryWordCount(storedWordCount);
applyStoryLevel(storedLevel);

const setApiKeyRequirement = (required) => {
  document.body.classList.toggle("requires-key", required);
  if (apiKeyModalClose) {
    apiKeyModalClose.disabled = required;
    apiKeyModalClose.setAttribute("aria-disabled", String(required));
  }
};

const setKeyVisibility = (shouldShow) => {
  apiKeyInput.type = shouldShow ? "text" : "password";
  toggleKeyVisibility.textContent = shouldShow ? "Hide" : "Show";
};

const openApiKeyModal = (forceRequired = false) => {
  const storedKey = localStorage.getItem("chatgpt_api_key") || "";
  apiKeyInput.value = storedKey;
  setKeyVisibility(false);
  setApiKeyRequirement(forceRequired || !storedKey);
  apiKeyModal.classList.remove("is-hidden");
  apiKeyInput.focus();
};

const closeApiKeyModal = () => {
  if (document.body.classList.contains("requires-key")) {
    return;
  }
  apiKeyModal.classList.add("is-hidden");
};

saveKey.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    return;
  }
  localStorage.setItem("chatgpt_api_key", apiKey);
  apiKeyInput.value = apiKey;
  setApiKeyRequirement(false);
  closeApiKeyModal();
});

toggleApi.addEventListener("click", () => openApiKeyModal(false));

toggleKeyVisibility.addEventListener("click", () => {
  const shouldShow = apiKeyInput.type === "password";
  setKeyVisibility(shouldShow);
});

clearKey.addEventListener("click", () => {
  localStorage.removeItem("chatgpt_api_key");
  apiKeyInput.value = "";
  setKeyVisibility(false);
  setApiKeyRequirement(true);
  apiKeyModal.classList.remove("is-hidden");
  apiKeyInput.focus();
});

apiKeyModal.addEventListener("click", (event) => {
  if (event.target === apiKeyModal || event.target.closest("[data-close-modal]")) {
    closeApiKeyModal();
  }
});

const storedKey = localStorage.getItem("chatgpt_api_key");
if (storedKey) {
  apiKeyInput.value = storedKey;
} else {
  openApiKeyModal(true);
}

if (wordCountSlider) {
  wordCountSlider.addEventListener("input", () => {
    applyStoryWordCount(wordCountSlider.value);
  });
}

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyStoryLevel(button.dataset.level);
  });
});

const setMode = (mode) => {
  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === mode);
  });
  modePaste.classList.toggle("is-hidden", mode !== "paste");
  modeGenerate.classList.toggle("is-hidden", mode !== "generate");
  modePaste.setAttribute("aria-hidden", mode !== "paste");
  modeGenerate.setAttribute("aria-hidden", mode !== "generate");
  pasteTitle.disabled = mode !== "paste";
  pasteBody.disabled = mode !== "paste";
  promptBody.disabled = mode !== "generate";
  generateStory.disabled = mode !== "generate";
  savePaste.disabled = mode !== "paste";
  if (wordCountSlider) {
    wordCountSlider.disabled = mode !== "generate";
  }
  levelButtons.forEach((button) => {
    button.disabled = mode !== "generate";
  });
};

const showAddTextModal = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  if (!storedKey) {
    openApiKeyModal(true);
    return;
  }
  addTextModal.classList.remove("is-hidden");
  setMode("generate");
};

const initializeStories = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  if (!storedKey) {
    openApiKeyModal(true);
    return;
  }
  const stories = loadStories();
  renderSavedStories(stories);
  const lastStoryId = localStorage.getItem(LAST_STORY_KEY);
  const lastStory = stories.find((story) => String(story.id) === lastStoryId);
  if (lastStory) {
    renderStory(lastStory);
    return;
  }
  if (stories.length) {
    renderStory(stories[0]);
    return;
  }
  storyTitle.textContent = "";
  reader.innerHTML = "";
  translationPanel.classList.add("is-hidden");
};

initializeStories();

addTextButton.addEventListener("click", showAddTextModal);
addStoryCta.addEventListener("click", showAddTextModal);
if (openSavedButton) {
  openSavedButton.addEventListener("click", () => {
    renderSavedStories(loadStories());
    savedTextsModal?.classList.remove("is-hidden");
  });
}

const closeSavedTextsModal = () => {
  savedTextsModal?.classList.add("is-hidden");
};

const closeAddTextModal = () => {
  addTextModal.classList.add("is-hidden");
};

closeAddText.addEventListener("click", closeAddTextModal);
if (savedTextsModalClose) {
  savedTextsModalClose.addEventListener("click", closeSavedTextsModal);
}

addTextModal.addEventListener("click", (event) => {
  if (event.target === addTextModal || event.target.closest("[data-close-modal]")) {
    closeAddTextModal();
  }
});

savedTextsModal?.addEventListener("click", (event) => {
  if (event.target === savedTextsModal || event.target.closest("[data-close-modal]")) {
    closeSavedTextsModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !addTextModal.classList.contains("is-hidden")) {
    closeAddTextModal();
  }
  if (event.key === "Escape" && savedTextsModal && !savedTextsModal.classList.contains("is-hidden")) {
    closeSavedTextsModal();
  }
  if (event.key === "Escape" && !apiKeyModal.classList.contains("is-hidden")) {
    closeApiKeyModal();
  }
});

document.addEventListener("click", (event) => {
  if (
    event.target.closest(".word") ||
    event.target.closest(".sentence") ||
    event.target.closest("#translationPanel") ||
    event.target.closest("#bottomSheet") ||
    event.target.closest(".modal")
  ) {
    return;
  }
  resetTranslation();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

const promptIdeas = [
  "A shy baker meets a curious crow at dawn, level A2.",
  "Two friends get lost in a small museum and find a secret door.",
  "A student misses the last tram and walks through a quiet city.",
  "A rainy market day where someone forgets their umbrella.",
  "A cat steals a sandwich during a picnic in the park.",
  "A family prepares a surprise dinner for a neighbor.",
  "A traveler asks for directions and learns a new word.",
  "A musician practices in the courtyard and hears applause.",
];

const getRandomPrompt = () => {
  return promptIdeas[Math.floor(Math.random() * promptIdeas.length)];
};

const suggestPromptFromChatGPT = async (options = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  if (suggestionController) {
    suggestionController.abort();
  }
  suggestionController = new AbortController();

  try {
    const level = options.level || "A2";
    const wordCount = Number(options.wordCount) || 120;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.9,
        messages: [
          {
            role: "system",
            content:
              "Generate one short story prompt in English for German learners. Respond with only the prompt text, single line, include level like A2/B1/B2 (e.g., \"A detective story in the style of Harry Potter, B2.\").",
          },
          {
            role: "user",
            content: `Give me one new prompt. Target ${wordCount} words and CEFR ${level}.`,
          },
        ],
      }),
      signal: suggestionController.signal,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Prompt suggestion failed");
    }

    const suggestion = data.choices?.[0]?.message?.content?.trim();
    if (!suggestion) {
      throw new Error("Empty suggestion");
    }
    return suggestion.replace(/\s+/g, " ");
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    return null;
  }
};

const fillPromptSuggestion = async () => {
  if (suggestPrompt.disabled) {
    return;
  }
  suggestPrompt.disabled = true;
  const originalLabel = suggestPrompt.textContent;
  suggestPrompt.textContent = "Suggesting...";
  const level = document.body.dataset.storyLevel || "A2";
  const wordCount = wordCountSlider?.value || "120";
  const suggestion =
    (await suggestPromptFromChatGPT({ level, wordCount })) || getRandomPrompt();
  const trimmedSuggestion = suggestion ? suggestion.replace(/\.$/, "") : "";
  const levelTag = trimmedSuggestion.includes(`, ${level}`)
    ? trimmedSuggestion
    : `${trimmedSuggestion}, ${level}`;
  const normalized = levelTag
    ? `${levelTag}. (~${wordCount} words)`
    : "";
  promptBody.value = normalized;
  suggestPrompt.textContent = originalLabel;
  suggestPrompt.disabled = false;
  promptBody.focus();
};

suggestPrompt.addEventListener("click", () => {
  fillPromptSuggestion();
});

savePaste.addEventListener("click", () => {
  const title = pasteTitle.value.trim() || "Custom text";
  const text = pasteBody.value.trim();
  if (!text) {
    return;
  }
  const newStory = {
    id: Date.now(),
    title,
    text,
  };
  const current = loadStories();
  const next = [newStory, ...current];
  saveStories(next);
  renderSavedStories(next);
  renderStory(newStory);
  pasteBody.value = "";
  pasteTitle.value = "";
  addTextModal.classList.add("is-hidden");
});

generateStory.addEventListener("click", async () => {
  const prompt = promptBody.value.trim();
  if (!prompt) {
    return;
  }
  generateStory.disabled = true;
  generateStory.textContent = "Generating...";
  const story = await generateStoryFromPrompt(prompt, "", {
    wordCount: wordCountSlider?.value,
    level: document.body.dataset.storyLevel || "A2",
  });
  generateStory.disabled = false;
  generateStory.textContent = "Generate";
  if (!story) {
    return;
  }
  const newStory = {
    id: Date.now(),
    title: story.title,
    text: story.text,
  };
  const current = loadStories();
  const next = [newStory, ...current];
  saveStories(next);
  renderSavedStories(next);
  renderStory(newStory);
  promptBody.value = "";
  addTextModal.classList.add("is-hidden");
});
