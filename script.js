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
const listenButton = document.getElementById("listen");
const toggleTheme = document.getElementById("toggleTheme");
const apiKeyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");

let lastGerman = "";
let lastTranslation = "";
let lastGrammar = "";
const translationCache = new Map();
let pendingController = null;

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
    clearActiveWord();
    clearGoverningHighlight();
    const german = sentence.textContent.trim();
    updateTranslation(
      "sentence",
      german,
      "Переводим...",
      "Объяснение склонения доступно только для отдельных слов.",
      null
    );
    translateWithChatGPT(german, "sentence").then((result) => {
      const fallback = sentence.dataset.translation;
      const translation = result?.translation || fallback;
      const grammar =
        result?.declension_explanation ||
        "Объяснение склонения доступно только для отдельных слов.";
      updateTranslation("sentence", german, translation, grammar, null);
    });
  }
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

listenButton.addEventListener("click", () => {
  if (!lastGerman) {
    return;
  }

  const utterance = new SpeechSynthesisUtterance(lastGerman);
  utterance.lang = "de-DE";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
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

saveKey.addEventListener("click", () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    return;
  }
  localStorage.setItem("chatgpt_api_key", apiKey);
  apiKeyInput.value = "";
});

const storedKey = localStorage.getItem("chatgpt_api_key");
if (storedKey) {
  apiKeyInput.value = storedKey;
}
