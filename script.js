const reader = document.getElementById("reader");
const selectionGerman = document.getElementById("selectionGerman");
const selectionEnglish = document.getElementById("selectionEnglish");
const selectionGrammar = document.getElementById("selectionGrammar");
const grammarMeta = document.getElementById("grammarMeta");
const metaLemma = document.getElementById("metaLemma");
const metaHead = document.getElementById("metaHead");
const metaArticle = document.getElementById("metaArticle");
const metaGender = document.getElementById("metaGender");
const metaCase = document.getElementById("metaCase");
const selectionType = document.getElementById("selectionType");
const sheetGerman = document.getElementById("sheetGerman");
const sheetEnglish = document.getElementById("sheetEnglish");
const sheetGrammar = document.getElementById("sheetGrammar");
const sheetGrammarMeta = document.getElementById("sheetGrammarMeta");
const sheetMetaLemma = document.getElementById("sheetMetaLemma");
const sheetMetaHead = document.getElementById("sheetMetaHead");
const sheetMetaArticle = document.getElementById("sheetMetaArticle");
const sheetMetaGender = document.getElementById("sheetMetaGender");
const sheetMetaCase = document.getElementById("sheetMetaCase");
const clearSelection = document.getElementById("clearSelection");
const toggleTheme = document.getElementById("toggleTheme");
const apiKeyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");
const toggleApi = document.getElementById("toggleApi");
const apiKeyModal = document.getElementById("apiKeyModal");
const apiKeyModalClose = apiKeyModal.querySelector("[data-close-modal]");
const toggleKeyVisibility = document.getElementById("toggleKeyVisibility");
const clearKey = document.getElementById("clearKey");
const emptyState = document.getElementById("emptyState");
const addTextEmpty = document.getElementById("addTextEmpty");
const translationPanel = document.getElementById("translationPanel");
const addTextButton = document.getElementById("addText");
const addTextModal = document.getElementById("addTextModal");
const closeAddText = document.getElementById("closeAddText");
const modeButtons = document.querySelectorAll("[data-mode]");
const modePaste = document.getElementById("modePaste");
const modeGenerate = document.getElementById("modeGenerate");
const pasteTitle = document.getElementById("pasteTitle");
const pasteBody = document.getElementById("pasteBody");
const savePaste = document.getElementById("savePaste");
const promptBody = document.getElementById("promptBody");
const promptTitle = document.getElementById("promptTitle");
const generateStory = document.getElementById("generateStory");
const suggestPrompt = document.getElementById("suggestPrompt");
const savedTexts = document.getElementById("savedTexts");

let lastGerman = "";
let lastTranslation = "";
let lastGrammar = "";
const translationCache = new Map();
let pendingController = null;
let generationController = null;
let suggestionController = null;
const STORY_STORAGE_KEY = "reader_texts_v1";
const LAST_STORY_KEY = "reader_last_story_id";
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

const updateTranslation = (type, german, translation, grammar, meta) => {
  lastGerman = german;
  lastTranslation = translation;
  lastGrammar = grammar;
  selectionType.textContent = type;
  selectionGerman.textContent = german;
  selectionEnglish.textContent = translation;
  selectionGrammar.textContent = grammar;
  sheetGerman.textContent = german;
  sheetEnglish.textContent = translation;
  sheetGrammar.textContent = grammar;

  const hasMeta =
    meta &&
    (meta.lemma || meta.head || meta.article || meta.gender || meta.case) &&
    type === "word";
  if (hasMeta) {
    metaLemma.textContent = meta.lemma || "—";
    metaHead.textContent = meta.head || "—";
    metaArticle.textContent = meta.article || "—";
    metaGender.textContent = meta.gender || "—";
    metaCase.textContent = meta.case || "—";
    sheetMetaLemma.textContent = meta.lemma || "—";
    sheetMetaHead.textContent = meta.head || "—";
    sheetMetaArticle.textContent = meta.article || "—";
    sheetMetaGender.textContent = meta.gender || "—";
    sheetMetaCase.textContent = meta.case || "—";
    grammarMeta.classList.remove("is-hidden");
    sheetGrammarMeta.classList.remove("is-hidden");
  } else {
    grammarMeta.classList.add("is-hidden");
    sheetGrammarMeta.classList.add("is-hidden");
  }
};

const clearActiveWord = () => {
  const active = reader.querySelector(".word.active");
  if (active) {
    active.classList.remove("active");
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
        emptyState.classList.remove("is-hidden");
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
  const matches = cleaned.match(/[^.!?]+[.!?]*/g) || [];
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

const renderStory = (story) => {
  localStorage.setItem(LAST_STORY_KEY, String(story.id));
  storyTitle.textContent = story.title;
  emptyState.classList.add("is-hidden");
  translationPanel.classList.remove("is-hidden");
  reader.innerHTML = "";
  clearActiveWord();
  clearGoverningHighlight();
  updateTranslation(
    "word",
    "Tap a word",
    "Перевод на русский появится здесь.",
    "Объяснение склонения появится здесь.",
    null
  );

  const sentences = splitIntoSentences(story.text);
  sentences.forEach((sentence) => {
    const paragraph = document.createElement("p");
    paragraph.className = "sentence";
    paragraph.dataset.translation = "";

    const tokens = sentence.match(/[\p{L}]+(?:-[\p{L}]+)?|\d+|[^\s\p{L}\d]+/gu) || [];
    let previousToken = null;

    tokens.forEach((token) => {
      const needsSpace =
        previousToken &&
        !noSpaceBefore.has(token) &&
        !noSpaceAfter.has(previousToken);

      if (needsSpace) {
        paragraph.appendChild(document.createTextNode(" "));
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
        paragraph.appendChild(span);
      } else {
        paragraph.appendChild(document.createTextNode(token));
      }

      previousToken = token;
    });

    reader.appendChild(paragraph);
  });
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
                "You are a German-to-Russian translation and grammar assistant. Respond with strict JSON: {\"translation\":\"...\",\"declension_explanation\":\"...\",\"lemma\":\"...\",\"article\":\"...\",\"gender\":\"...\",\"case\":\"...\",\"case_governing_word\":\"...\",\"gender_governing_word\":\"...\"}. The declension explanation must be in Russian, short, and if no declension applies, explain why. The case_governing_word must be the exact German word from the sentence that triggers the case (empty if none). The gender_governing_word must be the exact German word that determines gender (typically the noun lemma or head noun). Use empty strings when lemma/article/gender/case cannot be determined.",
            },
            {
              role: "user",
              content: `Translate the German word to Russian and explain its declension or case choice succinctly in Russian, referencing the specific sentence context.\nWord: ${text}\nSentence: ${context || "N/A"}`,
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

const generateStoryFromPrompt = async (prompt, fallbackTitle) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  if (generationController) {
    generationController.abort();
  }
  generationController = new AbortController();

  try {
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
              "Generate a short German story for language learners. Respond with strict JSON: {\"title\":\"...\",\"text\":\"...\"}. Keep it concise (120-180 words) and A2-friendly.",
          },
          {
            role: "user",
            content: prompt,
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
  const word = event.target.closest(".word");
  if (word) {
    clearActiveWord();
    clearGoverningHighlight();
    word.classList.add("active");
    const german = word.textContent.trim();
    updateTranslation(
      "word",
      german,
      "Переводим...",
      "Объясняем склонение...",
      null
    );
    const sentenceText = word.closest(".sentence")?.textContent.trim() || "";
    const sentenceEl = word.closest(".sentence");
    translateWithChatGPT(german, "word", sentenceText).then((result) => {
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
      updateTranslation("word", german, translation, grammar, meta);
    });
    return;
  }

  const sentence = event.target.closest(".sentence");
  if (sentence) {
    const german = sentence.textContent.trim();
    translateSentenceText(german, sentence.dataset.translation);
  }
});

const translateSentenceText = (german, fallbackTranslation = "") => {
  if (!german) {
    return;
  }
  clearActiveWord();
  clearGoverningHighlight();
  updateTranslation(
    "sentence",
    german,
    "Переводим...",
    "Объяснение склонения доступно только для отдельных слов.",
    null
  );
  translateWithChatGPT(german, "sentence").then((result) => {
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

clearSelection.addEventListener("click", () => {
  clearActiveWord();
  updateTranslation(
    "word",
    "Tap a word",
    "Перевод на русский появится здесь.",
    "Объяснение склонения появится здесь.",
    null
  );
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("theme-b");
});

updateTranslation(
  "word",
  "Tap a word",
  "Перевод на русский появится здесь.",
  "Объяснение склонения появится здесь.",
  null
);

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
  promptTitle.disabled = mode !== "generate";
  generateStory.disabled = mode !== "generate";
  savePaste.disabled = mode !== "paste";
};

const showAddTextModal = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  if (!storedKey) {
    openApiKeyModal(true);
    return;
  }
  addTextModal.classList.remove("is-hidden");
  renderSavedStories(loadStories());
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
  emptyState.classList.remove("is-hidden");
  translationPanel.classList.add("is-hidden");
};

initializeStories();

addTextButton.addEventListener("click", showAddTextModal);
addTextEmpty.addEventListener("click", showAddTextModal);

const closeAddTextModal = () => {
  addTextModal.classList.add("is-hidden");
};

closeAddText.addEventListener("click", closeAddTextModal);

addTextModal.addEventListener("click", (event) => {
  if (event.target === addTextModal || event.target.closest("[data-close-modal]")) {
    closeAddTextModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !addTextModal.classList.contains("is-hidden")) {
    closeAddTextModal();
  }
  if (event.key === "Escape" && !apiKeyModal.classList.contains("is-hidden")) {
    closeApiKeyModal();
  }
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

const suggestPromptFromChatGPT = async () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }

  if (suggestionController) {
    suggestionController.abort();
  }
  suggestionController = new AbortController();

  try {
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
            content: "Give me one new prompt.",
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
  const suggestion = (await suggestPromptFromChatGPT()) || getRandomPrompt();
  promptBody.value = suggestion;
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
  const title = promptTitle.value.trim();
  const story = await generateStoryFromPrompt(prompt, title);
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
  promptTitle.value = "";
  addTextModal.classList.add("is-hidden");
});
