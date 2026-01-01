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
const sentenceDivider = document.getElementById("sentenceDivider");
const translationDivider = document.getElementById("translationDivider");
const sheetSentenceDivider = document.getElementById("sheetSentenceDivider");
const sheetDivider = document.getElementById("sheetDivider");
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
const copySelection = document.getElementById("copySelection");
const apiKeyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");
const toggleApi = document.getElementById("toggleApi");
const settingsScreen = document.querySelector('[data-screen="settings"]');
const settingsBack = document.getElementById("settingsBack");
const fontOptions = document.querySelectorAll("[data-font]");
const readerSize = document.getElementById("readerSize");
const toggleKeyVisibility = document.getElementById("toggleKeyVisibility");
const clearKey = document.getElementById("clearKey");
const translationPanel = document.getElementById("translationPanel");
const bottomSheet = document.getElementById("bottomSheet");
const readerStatus = document.getElementById("readerStatus");
const addTextButton = document.getElementById("addText");
const openLemmasButton = document.getElementById("openLemmas");
const addTextModal = document.getElementById("addTextModal");
const closeAddText = document.getElementById("closeAddText");
const modeButtons = document.querySelectorAll("[data-mode]");
const modePaste = document.getElementById("modePaste");
const modeGenerate = document.getElementById("modeGenerate");
const pasteTitle = document.getElementById("pasteTitle");
const pasteBody = document.getElementById("pasteBody");
const savePaste = document.getElementById("savePaste");
const promptBody = document.getElementById("promptBody");
const generateStory = document.getElementById("generateStory");
const suggestPrompt = document.getElementById("suggestPrompt");
const lemmaList = document.getElementById("lemmaList");
const lemmaEmpty = document.getElementById("lemmaEmpty");
const lemmaLearnedList = document.getElementById("lemmaLearnedList");
const lemmaLearnedEmpty = document.getElementById("lemmaLearnedEmpty");
const clearLemmasButton = document.getElementById("clearLemmas");
const wordCountSlider = document.getElementById("wordCount");
const wordCountValue = document.getElementById("wordCountValue");
const levelButtons = document.querySelectorAll("[data-level]");
const styleButtons = document.querySelectorAll("[data-style]");
const homeList = document.getElementById("homeList");
const homeEmpty = document.getElementById("homeEmpty");
const homeEmptyAdd = document.getElementById("homeEmptyAdd");
const homeAddText = document.getElementById("homeAddText");
const backToLibrary = document.getElementById("backToLibrary");
const readerEnd = document.getElementById("readerEnd");
const archiveList = document.getElementById("archiveList");
const archiveEmpty = document.getElementById("archiveEmpty");
const pageDots = document.getElementById("pageDots");

const pageDotIcons = {
  archive: "assets/icons/icon-archive.svg",
  library: "assets/icons/icon-library.svg",
  reader: "assets/icons/icon-reader.svg",
  lemmas: "assets/icons/icon-lemmas.svg",
  settings: "assets/icons/icon-settings.svg",
};

const updateStandaloneMode = () => {
  const isStandaloneMatch =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  const isIosStandalone = window.navigator.standalone === true;
  document.body.classList.toggle("is-standalone", isStandaloneMatch || isIosStandalone);
};

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
let currentStoryId = null;
let readObserver = null;
let lastSettingsReturnScreen = null;
const STORY_STORAGE_KEY = "reader_texts_v1";
const LAST_STORY_KEY = "reader_last_story_id";
const STORY_LEVEL_KEY = "reader_story_level";
const STORY_WORD_COUNT_KEY = "reader_story_word_count";
const STORY_STYLE_KEY = "reader_story_style";
const LEMMA_STATS_KEY = "reader_lemma_stats_v1";
const READ_STATUS_KEY = "reader_story_read_v1";
const storyTitle = document.querySelector(".book-header h1");
const screenLayout = document.querySelector(".layout");
const libraryScreen = document.querySelector('[data-screen="library"]');
const readerScreen = document.querySelector('[data-screen="reader"]');
const readerPanel = document.querySelector(".reader-panel");
const lemmasScreen = document.querySelector('[data-screen="lemmas"]');

const updateScreenScrollLock = () => {
  if (!screenLayout) {
    return;
  }
  const hasActiveWord = Boolean(document.querySelector(".word.active"));
  const hasActiveSentence = Boolean(document.querySelector(".sentence.active"));
  const requiresKey = document.body.classList.contains("requires-key");
  screenLayout.classList.toggle(
    "is-locked",
    hasActiveWord || hasActiveSentence || requiresKey
  );
};

const clearGoverningHighlight = () => {
  document
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

  const normalized = stripTokenPunctuation(targetText).trim().toLowerCase();
  const candidates = Array.from(sentenceEl.querySelectorAll(".word"));
  const match = candidates.find((candidate) => {
    if (candidate === clickedWord) {
      return false;
    }
    const lemma = candidate.dataset.lemma?.toLowerCase() || "";
    const text = getCleanWordText(candidate).toLowerCase();
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

const updateCopyButtonLabel = (type) => {
  if (!copySelection) {
    return;
  }
  const label = type === "sentence" ? "Copy sentence" : "Copy word";
  copySelection.textContent = label;
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
  sentenceDivider?.classList.toggle("is-hidden", !isSentence);
  sheetSentenceDivider?.classList.toggle("is-hidden", !isSentence);
  translationDivider?.classList.toggle("is-hidden", !isWord);
  sheetDivider?.classList.toggle("is-hidden", !isWord);
  updateCopyButtonLabel(type);
  syncPageDots();

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
  const active = document.querySelector(".word.active");
  if (active) {
    active.classList.remove("active", "loading");
  }
  document.querySelectorAll(".word.loading").forEach((word) => {
    word.classList.remove("loading");
  });
  document.querySelectorAll(".word.separable").forEach((word) => {
    word.classList.remove("separable");
  });
  updateScreenScrollLock();
};

const clearActiveSentence = () => {
  document.querySelectorAll(".sentence.active").forEach((sentence) => {
    sentence.classList.remove("active");
  });
  reader.classList.remove("has-active-sentence");
  updateScreenScrollLock();
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

const setView = (view) => {
  document.body.classList.toggle("view-reader", view === "reader");
  document.body.classList.toggle("view-home", view === "home");
};

const scrollToScreen = (screen, behavior = "smooth") => {
  if (!screenLayout || !screen) {
    return;
  }
  screenLayout.scrollTo({
    left: screen.offsetLeft,
    behavior,
  });
};

let pageDotsScreens = [];
let pageDotsSignature = "";
let pageDotsScrollFrame = null;

const getVisibleScreens = () => {
  if (!screenLayout) {
    return [];
  }
  return Array.from(screenLayout.querySelectorAll("[data-screen]")).filter(
    (screen) =>
      screen.offsetParent !== null &&
      !screen.classList.contains("is-hidden") &&
      screen.dataset.screen !== "translation"
  );
};

const getCurrentScreen = () => {
  if (!screenLayout) {
    return null;
  }
  const screens = getVisibleScreens();
  if (!screens.length) {
    return null;
  }
  const currentCenter = screenLayout.scrollLeft + screenLayout.clientWidth / 2;
  let closestScreen = screens[0];
  let closestDistance = Infinity;
  screens.forEach((screen) => {
    const screenCenter = screen.offsetLeft + screen.clientWidth / 2;
    const distance = Math.abs(screenCenter - currentCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestScreen = screen;
    }
  });
  return closestScreen;
};

const buildPageDots = (screens) => {
  if (!pageDots) {
    return;
  }
  pageDots.innerHTML = "";
  const total = screens.length;
  pageDots.classList.toggle("is-hidden", total <= 1);
  screens.forEach((screen, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "page-dot";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", "false");
    const label =
      screen.getAttribute("aria-label") || screen.dataset.screen || "Page";
    dot.setAttribute("aria-label", `${label} (${index + 1} of ${total})`);
    const icon = pageDotIcons[screen.dataset.screen];
    if (icon) {
      dot.style.setProperty("--dot-icon", `url("${icon}")`);
      const iconEl = document.createElement("span");
      iconEl.className = "page-dot-icon";
      iconEl.setAttribute("aria-hidden", "true");
      dot.appendChild(iconEl);
    }
    dot.addEventListener("click", () => {
      scrollToScreen(screen);
    });
    pageDots.appendChild(dot);
  });
};

const updateActivePageDot = () => {
  if (!pageDots || !screenLayout || !pageDotsScreens.length) {
    return;
  }
  const currentCenter = screenLayout.scrollLeft + screenLayout.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;
  pageDotsScreens.forEach((screen, index) => {
    const screenCenter = screen.offsetLeft + screen.clientWidth / 2;
    const distance = Math.abs(screenCenter - currentCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });
  const dots = pageDots.querySelectorAll(".page-dot");
  dots.forEach((dot, index) => {
    const isActive = index === closestIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-selected", isActive ? "true" : "false");
  });
};

const syncPageDots = () => {
  if (!pageDots || !screenLayout) {
    return;
  }
  const screens = getVisibleScreens();
  const signature = screens
    .map((screen) => screen.dataset.screen || screen.getAttribute("aria-label") || "")
    .join("|");
  if (signature !== pageDotsSignature) {
    pageDotsSignature = signature;
    pageDotsScreens = screens;
    buildPageDots(screens);
  }
  updateActivePageDot();
};

const requestPageDotsUpdate = () => {
  if (pageDotsScrollFrame) {
    return;
  }
  pageDotsScrollFrame = requestAnimationFrame(() => {
    pageDotsScrollFrame = null;
    updateActivePageDot();
  });
};

const openReaderScreen = (story, { behavior = "smooth" } = {}) => {
  if (!story) {
    return;
  }
  markStoryUnread(story.id);
  if (readerStatus) {
    readerStatus.classList.add("is-hidden");
    readerStatus.classList.remove("is-visible");
  }
  readerPanel?.classList.remove("is-hidden");
  syncPageDots();
  renderStory(story);
  setView("reader");
  requestAnimationFrame(() => {
    scrollToScreen(readerScreen, behavior);
  });
};

const showLibraryScreen = (behavior = "smooth") => {
  setView("home");
  scrollToScreen(libraryScreen, behavior);
};

const handleRoute = () => {
  closeAllHomeMenus();
  const hash = window.location.hash || "";
  const match = hash.match(/^#reader\/(.+)/);
  if (match) {
    const storyId = match[1];
    const story = loadStories().find((item) => String(item.id) === storyId);
    if (story) {
      openReaderScreen(story, { behavior: "auto" });
      return;
    }
  }
  showLibraryScreen("auto");
};

const setupReadObserver = () => {
  if (!readerEnd || typeof IntersectionObserver === "undefined") {
    return;
  }
  if (readObserver) {
    readObserver.disconnect();
  }
  readObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          document.body.classList.contains("view-reader") &&
          currentStoryId
        ) {
          markStoryRead(currentStoryId);
        }
      });
    },
    { threshold: 0.6 }
  );
  readObserver.observe(readerEnd);
};

const isWithinReader = (element) => reader && element && reader.contains(element);

const setActiveSentence = (sentenceEl) => {
  if (!sentenceEl) {
    return;
  }
  clearActiveSentence();
  sentenceEl.classList.add("active");
  if (isWithinReader(sentenceEl)) {
    reader.classList.add("has-active-sentence");
  }
  updateScreenScrollLock();
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

const loadReadStatus = () => {
  try {
    const raw = localStorage.getItem(READ_STATUS_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    return parsed;
  } catch (error) {
    return {};
  }
};

const saveReadStatus = (status) => {
  localStorage.setItem(READ_STATUS_KEY, JSON.stringify(status));
};

const deleteStoryById = (storyId) => {
  if (!storyId) {
    return;
  }
  const next = loadStories().filter((saved) => String(saved.id) !== String(storyId));
  saveStories(next);
  renderHomeStories(next);
  renderArchiveStories(next);
  const status = loadReadStatus();
  if (status[String(storyId)]) {
    delete status[String(storyId)];
    saveReadStatus(status);
  }
  const lastStoryId = localStorage.getItem(LAST_STORY_KEY);
  if (String(storyId) === lastStoryId) {
    localStorage.removeItem(LAST_STORY_KEY);
  }
  if (!next.length) {
    storyTitle.textContent = "";
    reader.innerHTML = "";
    translationPanel.classList.add("is-hidden");
    syncPageDots();
  }
  if (currentStoryId && String(storyId) === currentStoryId) {
    currentStoryId = null;
    showLibraryScreen("auto");
  }
};

const loadLemmaStats = () => {
  try {
    const raw = localStorage.getItem(LEMMA_STATS_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }
    Object.values(parsed).forEach((entry) => {
      if (!entry || typeof entry !== "object") {
        return;
      }
      if (typeof entry.isLearned !== "boolean") {
        entry.isLearned = false;
      }
    });
    return parsed;
  } catch (error) {
    return {};
  }
};

const saveLemmaStats = (stats) => {
  localStorage.setItem(LEMMA_STATS_KEY, JSON.stringify(stats));
};

const normalizeLemmaKey = (value) =>
  String(value || "").trim().toLowerCase();

const recordLemmaTranslation = (lemma) => {
  const normalized = normalizeLemmaKey(lemma);
  if (!normalized) {
    return;
  }
  const stats = loadLemmaStats();
  const existing = stats[normalized];
  const nextCount = existing?.count ? Number(existing.count) + 1 : 1;
  stats[normalized] = {
    lemma: existing?.lemma || String(lemma).trim(),
    count: Number.isFinite(nextCount) ? nextCount : 1,
    lastTranslatedAt: new Date().toISOString(),
    isLearned: existing?.isLearned ?? false,
  };
  saveLemmaStats(stats);
  updateLemmaBadge();
};

const updateLemmaBadge = () => {
  if (!openLemmasButton) {
    return;
  }
  const total = Object.values(loadLemmaStats()).filter(
    (entry) => entry && !entry.isLearned
  ).length;
  openLemmasButton.dataset.badge = String(total);
};

const textIncludesLemma = (text, lemma) => {
  if (!text || !lemma) {
    return false;
  }
  const escaped = escapeRegExp(String(lemma).trim());
  if (!escaped) {
    return false;
  }
  const regex = new RegExp(
    `(^|[^\\p{L}\\d])(${escaped})(?=$|[^\\p{L}\\d])`,
    "giu"
  );
  return regex.test(text);
};

const markLearnedLemmas = (lemmas) => {
  if (!Array.isArray(lemmas) || !lemmas.length) {
    return;
  }
  const stats = loadLemmaStats();
  let changed = false;
  lemmas.forEach((lemma) => {
    const normalized = normalizeLemmaKey(lemma);
    if (!normalized || !stats[normalized] || stats[normalized].isLearned) {
      return;
    }
    stats[normalized].isLearned = true;
    changed = true;
  });
  if (!changed) {
    return;
  }
  saveLemmaStats(stats);
  renderLemmaList();
  updateLemmaBadge();
};

const markLearnedLemmasInText = (text, lemmas) => {
  if (!text || !Array.isArray(lemmas) || !lemmas.length) {
    return;
  }
  const stats = loadLemmaStats();
  let changed = false;
  lemmas.forEach((lemma) => {
    const normalized = normalizeLemmaKey(lemma);
    if (!normalized || !stats[normalized] || stats[normalized].isLearned) {
      return;
    }
    if (textIncludesLemma(text, lemma)) {
      stats[normalized].isLearned = true;
      changed = true;
    }
  });
  if (!changed) {
    return;
  }
  saveLemmaStats(stats);
  renderLemmaList();
  updateLemmaBadge();
};

const buildStoryExcerpt = (text, maxLength = 180) => {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "No preview available.";
  }
  if (normalized.length <= maxLength) {
    return normalized;
  }
  const clipped = normalized.slice(0, maxLength).replace(/[\s.,;:!?-]+$/, "");
  return `${clipped}...`;
};

const closeAllHomeMenus = (except, list = homeList) => {
  document.querySelectorAll(".home-item.is-menu-open").forEach((item) => {
    if (item === except) {
      return;
    }
    item.classList.remove("is-menu-open");
  });
  if (list && !except) {
    list.classList.remove("has-active");
    list.querySelectorAll(".home-item.is-active").forEach((item) => {
      item.classList.remove("is-active");
    });
  }
};

const setActiveHomeItem = (item, list = homeList) => {
  if (!list || !item) {
    return;
  }
  list.classList.add("has-active");
  list.querySelectorAll(".home-item.is-active").forEach((entry) => {
    if (entry !== item) {
      entry.classList.remove("is-active");
    }
  });
  item.classList.add("is-active");
};

const setupHomeItemLongPress = (item, list = homeList) => {
  const content = item.querySelector(".home-item-content");
  if (!content) {
    return;
  }
  let timer = null;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let triggered = false;

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const cancelPress = () => {
    clearTimer();
  };

  const startPress = (clientX, clientY) => {
    startX = clientX;
    startY = clientY;
    moved = false;
    triggered = false;
    clearTimer();
    timer = setTimeout(() => {
      triggered = true;
      item.classList.add("is-menu-open");
      setActiveHomeItem(item, list);
    }, 450);
  };

  content.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    closeAllHomeMenus(item, list);
    startPress(event.clientX, event.clientY);
  });

  content.addEventListener("pointermove", (event) => {
    if (!timer) {
      return;
    }
    const deltaX = Math.abs(event.clientX - startX);
    const deltaY = Math.abs(event.clientY - startY);
    if (deltaX > 8 || deltaY > 8) {
      moved = true;
      cancelPress();
    }
  });

  content.addEventListener("pointerup", (event) => {
    if (triggered) {
      event.preventDefault();
    }
    clearTimer();
  });

  content.addEventListener("pointercancel", cancelPress);
  content.addEventListener("mouseleave", cancelPress);
  content.addEventListener("contextmenu", (event) => {
    if (triggered) {
      event.preventDefault();
    }
  });
};

const toggleReadStatus = (storyId) => {
  if (!storyId) {
    return false;
  }
  const status = loadReadStatus();
  const key = String(storyId);
  const isRead = Boolean(status[key]?.isRead);
  if (isRead) {
    delete status[key];
  } else {
    status[key] = {
      isRead: true,
      readAt: new Date().toISOString(),
    };
  }
  saveReadStatus(status);
  return !isRead;
};

const renderHomeStories = (stories) => {
  if (!homeList) {
    return;
  }
  homeList.innerHTML = "";
  if (!stories.length) {
    homeEmpty?.classList.remove("is-hidden");
    homeEmptyAdd?.classList.remove("is-hidden");
    return;
  }
  homeEmpty?.classList.add("is-hidden");
  homeEmptyAdd?.classList.add("is-hidden");
  const statusMap = loadReadStatus();
  const unreadStories = stories.filter(
    (story) => !statusMap[String(story.id)]?.isRead
  );
  if (!unreadStories.length) {
    homeEmpty?.classList.remove("is-hidden");
    homeEmptyAdd?.classList.remove("is-hidden");
    return;
  }
  homeEmpty?.classList.add("is-hidden");
  homeEmptyAdd?.classList.add("is-hidden");
  unreadStories.forEach((story) => {
    const item = document.createElement("div");
    item.className = "home-item";
    item.dataset.storyId = String(story.id);
    const isRead = Boolean(statusMap[String(story.id)]?.isRead);

    const content = document.createElement("button");
    content.className = "home-item-content";
    content.type = "button";

    const head = document.createElement("div");
    head.className = "home-item-head";

    const title = document.createElement("p");
    title.className = "home-item-title";
    title.textContent = story.title || "Untitled";

    head.appendChild(title);

    const excerpt = document.createElement("p");
    excerpt.className = "home-item-excerpt";
    excerpt.textContent = buildStoryExcerpt(story.text);

    content.appendChild(head);
    content.appendChild(excerpt);
    content.addEventListener("click", () => {
      closeAllHomeMenus(undefined, homeList);
      openReaderScreen(story);
    });

    const actions = document.createElement("div");
    actions.className = "home-item-actions";
    const toggleButton = document.createElement("button");
    toggleButton.className = "home-action toggle";
    toggleButton.type = "button";
    toggleButton.textContent = isRead ? "Mark as unread" : "Mark as read";
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextValue = toggleReadStatus(story.id);
      updateHomeReadStatus(String(story.id), nextValue);
      const nextStories = loadStories();
      renderHomeStories(nextStories);
      renderArchiveStories(nextStories);
      closeAllHomeMenus(undefined, homeList);
    });
    const deleteButton = document.createElement("button");
    deleteButton.className = "home-action delete";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteStoryById(story.id);
      closeAllHomeMenus(undefined, homeList);
    });
    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);

    item.appendChild(content);
    item.appendChild(actions);
    setupHomeItemLongPress(item);
    homeList.appendChild(item);
  });
};

const renderArchiveStories = (stories) => {
  if (!archiveList) {
    return;
  }
  archiveList.innerHTML = "";
  const statusMap = loadReadStatus();
  const readStories = stories.filter((story) =>
    Boolean(statusMap[String(story.id)]?.isRead)
  );
  if (!readStories.length) {
    archiveEmpty?.classList.remove("is-hidden");
    return;
  }
  archiveEmpty?.classList.add("is-hidden");
  readStories.forEach((story) => {
    const item = document.createElement("div");
    item.className = "home-item is-read";
    item.dataset.storyId = String(story.id);

    const content = document.createElement("button");
    content.className = "home-item-content";
    content.type = "button";

    const head = document.createElement("div");
    head.className = "home-item-head";

    const title = document.createElement("p");
    title.className = "home-item-title";
    title.textContent = story.title || "Untitled";

    head.appendChild(title);

    const excerpt = document.createElement("p");
    excerpt.className = "home-item-excerpt";
    excerpt.textContent = buildStoryExcerpt(story.text);

    content.appendChild(head);
    content.appendChild(excerpt);
    content.addEventListener("click", () => {
      closeAllHomeMenus(undefined, archiveList);
      openReaderScreen(story);
    });

    const actions = document.createElement("div");
    actions.className = "home-item-actions";
    const toggleButton = document.createElement("button");
    toggleButton.className = "home-action toggle";
    toggleButton.type = "button";
    toggleButton.textContent = "Mark as unread";
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const nextValue = toggleReadStatus(story.id);
      updateHomeReadStatus(String(story.id), nextValue);
      const nextStories = loadStories();
      renderHomeStories(nextStories);
      renderArchiveStories(nextStories);
      closeAllHomeMenus(undefined, archiveList);
    });
    const deleteButton = document.createElement("button");
    deleteButton.className = "home-action delete";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteStoryById(story.id);
      closeAllHomeMenus(undefined, archiveList);
    });
    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);

    item.appendChild(content);
    item.appendChild(actions);
    setupHomeItemLongPress(item, archiveList);
    archiveList.appendChild(item);
  });
};

const updateHomeReadStatus = (storyId, isRead) => {
  if (!homeList) {
    return;
  }
  const item = homeList.querySelector(
    `.home-item[data-story-id="${storyId}"]`
  );
  if (!item) {
    return;
  }
  item.classList.toggle("is-read", isRead);
  const toggleButton = item.querySelector(".home-action.toggle");
  if (toggleButton) {
    toggleButton.textContent = isRead ? "Mark as unread" : "Mark as read";
  }
};

const markStoryRead = (storyId) => {
  if (!storyId) {
    return;
  }
  const status = loadReadStatus();
  if (status[String(storyId)]?.isRead) {
    return;
  }
  status[String(storyId)] = {
    isRead: true,
    readAt: new Date().toISOString(),
  };
  saveReadStatus(status);
  if (readerStatus) {
    readerStatus.classList.remove("is-hidden");
    readerStatus.classList.remove("is-visible");
    requestAnimationFrame(() => {
      readerStatus.classList.add("is-visible");
    });
  }
  updateHomeReadStatus(String(storyId), true);
  renderHomeStories(loadStories());
  renderArchiveStories(loadStories());
};

const markStoryUnread = (storyId) => {
  if (!storyId) {
    return;
  }
  const status = loadReadStatus();
  const key = String(storyId);
  if (!status[key]?.isRead) {
    return;
  }
  delete status[key];
  saveReadStatus(status);
  if (readerStatus) {
    readerStatus.classList.add("is-hidden");
  }
  updateHomeReadStatus(key, false);
  renderHomeStories(loadStories());
  renderArchiveStories(loadStories());
};

const getLemmaEntries = (options = {}) => {
  const stats = loadLemmaStats();
  const includeLearned = options.includeLearned === true;
  return Object.values(stats)
    .filter((entry) => {
      if (!entry || !entry.lemma) {
        return false;
      }
      if (includeLearned) {
        return entry.isLearned;
      }
      return !entry.isLearned;
    })
    .sort((a, b) => {
      const timeA = Date.parse(a.lastTranslatedAt || "") || 0;
      const timeB = Date.parse(b.lastTranslatedAt || "") || 0;
      return timeB - timeA;
    });
};

const getTopLemmaList = (limit = 10) => {
  const entries = getLemmaEntries();
  const total = entries.length;
  const scored = entries.map((entry, index) => {
    const position = index + 1;
    const countValue = Number(entry.count) || 1;
    const score = (total / position) * countValue;
    return { lemma: entry.lemma, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.lemma);
};

const renderLemmaList = () => {
  if (!lemmaList) {
    return;
  }
  const entries = getLemmaEntries();
  const total = entries.length;
  lemmaList.innerHTML = "";
  if (!entries.length) {
    lemmaEmpty?.classList.remove("is-hidden");
  } else {
    lemmaEmpty?.classList.add("is-hidden");
    const fragment = document.createDocumentFragment();
    entries.forEach((entry, index) => {
      const position = index + 1;
      const countValue = Number(entry.count) || 1;
      const score = (total / position) * countValue;
      const item = document.createElement("div");
      item.className = "lemma-item";

      const name = document.createElement("span");
      name.className = "lemma-name";
      name.textContent = entry.lemma;

      const metrics = document.createElement("div");
      metrics.className = "lemma-metrics";

      const count = document.createElement("span");
      count.className = "lemma-count";
      count.textContent = `×${countValue}`;

      const scoreEl = document.createElement("span");
      scoreEl.className = "lemma-score";
      scoreEl.textContent = `Score ${score.toFixed(2)}`;

      item.appendChild(name);
      metrics.appendChild(count);
      metrics.appendChild(scoreEl);
      item.appendChild(metrics);
      fragment.appendChild(item);
    });
    lemmaList.appendChild(fragment);
  }
  updateLemmaBadge();
  renderLearnedLemmaList();
};

const renderLearnedLemmaList = () => {
  if (!lemmaLearnedList) {
    return;
  }
  const entries = getLemmaEntries({ includeLearned: true });
  lemmaLearnedList.innerHTML = "";
  if (!entries.length) {
    lemmaLearnedEmpty?.classList.remove("is-hidden");
    return;
  }
  lemmaLearnedEmpty?.classList.add("is-hidden");
  const fragment = document.createDocumentFragment();
  entries.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "lemma-item";

    const name = document.createElement("span");
    name.className = "lemma-name";
    name.textContent = entry.lemma;

    const metrics = document.createElement("div");
    metrics.className = "lemma-metrics";

    const count = document.createElement("span");
    count.className = "lemma-count";
    count.textContent = `×${Number(entry.count) || 1}`;

    item.appendChild(name);
    metrics.appendChild(count);
    item.appendChild(metrics);
    fragment.appendChild(item);
  });
  lemmaLearnedList.appendChild(fragment);
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
const stripTokenPunctuation = (token) =>
  String(token || "").replace(/^[^\p{L}\d]+|[^\p{L}\d]+$/gu, "");
const getCleanWordText = (wordEl) =>
  stripTokenPunctuation(wordEl?.dataset.clean || wordEl?.textContent || "").trim();

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
const nonVerbTokens = new Set([
  "mich",
  "dich",
  "sich",
  "uns",
  "euch",
  "mir",
  "dir",
  "ihm",
  "ihr",
  "ihnen",
  "mich",
  "dich",
  "sich",
  "uns",
  "euch",
  "mein",
  "meine",
  "meinen",
  "meinem",
  "meines",
  "dein",
  "deine",
  "deinen",
  "deinem",
  "deines",
  "sein",
  "seine",
  "seinen",
  "seinem",
  "seines",
  "ihr",
  "ihre",
  "ihren",
  "ihrem",
  "ihres",
  "unser",
  "unsere",
  "unseren",
  "unserem",
  "unseres",
  "euer",
  "eure",
  "euren",
  "eurem",
  "eures",
]);
const clauseBreakers = new Set([
  "aber",
  "als",
  "bevor",
  "bis",
  "damit",
  "dann",
  "dass",
  "denn",
  "doch",
  "falls",
  "indem",
  "nachdem",
  "ob",
  "obwohl",
  "oder",
  "sobald",
  "sodass",
  "sofern",
  "sowie",
  "sondern",
  "trotzdem",
  "und",
  "waehrend",
  "waehrenddessen",
  "weil",
  "wenn",
  "wobei",
  "wodurch",
  "worauf",
  "woran",
  "worum",
  "wo",
  "da",
]);

const normalizeUmlauts = (text) =>
  text
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

const normalizeWordText = (wordEl) =>
  normalizeUmlauts(getCleanWordText(wordEl).toLowerCase());

const isVerbLikeWord = (wordEl) => {
  if (!wordEl) {
    return false;
  }
  const text = normalizeWordText(wordEl);
  if (!text) {
    return false;
  }
  if (wordEl.dataset.pos === "article" || wordEl.dataset.pos === "noun") {
    return false;
  }
  if (clauseBreakers.has(text)) {
    return false;
  }
  if (nonVerbTokens.has(text)) {
    return false;
  }
  if (separablePrefixes.has(text)) {
    return false;
  }
  return true;
};

const findNextClauseBoundary = (words, startIndex) => {
  for (let i = startIndex; i < words.length; i += 1) {
    if (clauseBreakers.has(normalizeWordText(words[i]))) {
      return i;
    }
  }
  return words.length;
};

const findPrevClauseBoundary = (words, startIndex) => {
  for (let i = startIndex; i >= 0; i -= 1) {
    if (clauseBreakers.has(normalizeWordText(words[i]))) {
      return i;
    }
  }
  return -1;
};

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
  const isVerbCandidate = isVerbLikeWord(clickedWord);

  const isTerminalPrefix = (prefixIndex) => {
    const boundaryIndex = findNextClauseBoundary(words, prefixIndex + 1);
    return prefixIndex === boundaryIndex - 1;
  };

  if (isPrefix && isTerminalPrefix(index)) {
    const prevBoundary = findPrevClauseBoundary(words, index - 1);
    for (let i = index - 1; i > prevBoundary; i -= 1) {
      const candidate = words[i];
      if (isVerbLikeWord(candidate)) {
        return { verbSpan: candidate, prefixSpan: clickedWord };
      }
    }
  }

  if (isVerbCandidate) {
    const nextBoundary = findNextClauseBoundary(words, index + 1);
    const prefixIndex = nextBoundary - 1;
    if (prefixIndex > index && prefixIndex <= lastIndex) {
      const candidate = words[prefixIndex];
      const candidateText = normalizeWordText(candidate);
      if (separablePrefixes.has(candidateText)) {
        return { verbSpan: clickedWord, prefixSpan: candidate };
      }
    }
  }

  return null;
};

const buildSentenceSpan = (sentence) => {
  const sentenceSpan = document.createElement("span");
  sentenceSpan.className = "sentence";
  sentenceSpan.dataset.translation = "";

  const tokens = sentence.match(/\S+/g) || [];

  tokens.forEach((token) => {
    if (sentenceSpan.childNodes.length) {
      sentenceSpan.appendChild(document.createTextNode(" "));
    }

    const cleanToken = stripTokenPunctuation(token);
    if (isWordToken(cleanToken)) {
      const span = document.createElement("span");
      span.className = "word";
      span.dataset.translation = "";
      span.textContent = token;
      span.dataset.clean = cleanToken;
      const lower = cleanToken.toLowerCase();
      if (articleMap[lower]) {
        span.dataset.pos = "article";
        span.dataset.articleBase = articleMap[lower];
      } else if (/^\p{Lu}/u.test(cleanToken)) {
        span.dataset.pos = "noun";
        span.dataset.lemma = cleanToken;
      }
      sentenceSpan.appendChild(span);
    } else {
      sentenceSpan.appendChild(document.createTextNode(token));
    }
  });

  return sentenceSpan;
};

const renderStory = (story) => {
  localStorage.setItem(LAST_STORY_KEY, String(story.id));
  currentStoryId = String(story.id);
  storyTitle.innerHTML = "";
  if (story.title) {
    storyTitle.appendChild(buildSentenceSpan(story.title));
  }
  reader.innerHTML = "";
  resetTranslation();

  const sentences = splitIntoSentences(story.text);
  const paragraph = document.createElement("p");
  paragraph.className = "story";
  sentences.forEach((sentence, index) => {
    const sentenceSpan = buildSentenceSpan(sentence);
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
                "You are a German-to-Russian translation and grammar assistant. " +
                "Respond with strict JSON: {\"translation\":\"...\",\"declension_explanation\":\"...\",\"form_explanation\":\"...\",\"lemma\":\"...\",\"article\":\"...\",\"gender\":\"...\",\"case\":\"...\",\"case_governing_word\":\"...\",\"gender_governing_word\":\"...\",\"has_detached_prefix\":false,\"detached_prefix_word\":\"...\",\"combined_word\":\"...\"}. " +
                "LANGUAGE REQUIREMENTS: translation, declension_explanation, and form_explanation must be in Russian. ALL OTHER FIELDS (lemma, article, gender, case, case_governing_word, gender_governing_word, detached_prefix_word, combined_word) must be in GERMAN only - never translate these to Russian. " +
                "The declension explanation must be in Russian, short, and if no declension applies, explain why. " +
                "The form_explanation must be in Russian and explain how the word form differs from its lemma (tense, case, number, or other change); if the form matches the lemma, return an empty string. " +
                "The case_governing_word must be the exact German word from the sentence that triggers the case (empty if none). " +
                "The gender_governing_word must be the exact German word that determines gender (typically the noun lemma or head noun). " +
                "For separable verbs: CRITICAL - Check if the clicked word is part of a separable verb construction where the prefix is separated from the verb in the sentence. The prefix typically appears at the END of the clause. This applies to verbs in ANY tense/form (steigen, stieg, gestiegen, schauen, schaute, geschaut) AND separated prefixes. If found, set has_detached_prefix=true, provide the OTHER part in detached_prefix_word (exact text from sentence), and provide the combined infinitive in combined_word. Examples: (1) clicking 'steigen' in 'Sie steigen aus' → detached_prefix_word='aus', combined_word='aussteigen'. (2) clicking 'schauten' in 'Sie schauten sich an' → detached_prefix_word='an', combined_word='anschauen'. (3) clicking 'kommt' in 'Sie kommt an' → detached_prefix_word='an', combined_word='ankommen'. (4) clicking 'an' in 'Sie schauten sich an' → detached_prefix_word='schauten', combined_word='anschauen'. The translation should be for the combined word. " +
                "Use empty strings when lemma/article/gender/case cannot be determined.",
            },
            {
              role: "user",
              content: `Translate the German word to Russian and explain its declension or case choice succinctly in Russian, referencing the specific sentence context. Also explain how the word form differs from its lemma (tense, case, number, or other change). CRITICAL: If the word is a VERB (in any tense), check very carefully if it's part of a separable verb where the prefix has been separated and appears elsewhere in the clause (typically at the END). Common separable prefixes include: ab, an, auf, aus, bei, ein, fest, fort, her, hin, los, mit, nach, vor, weg, zu, zurück, zusammen. If the word is one of these prefixes, check if there's a verb earlier in the clause. If found, identify the other part and provide the combined infinitive.\nWord: ${text}\nSentence: ${context || "N/A"}`,
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

    if (!parsed.translation) {
      throw new Error("Malformed translation");
    }
    if (typeof parsed.declension_explanation !== "string") {
      parsed.declension_explanation = "";
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
    const style = options.style || "literary";
    const lemmas = Array.isArray(options.lemmas) ? options.lemmas : [];
    const lemmaRequest = lemmas.length
      ? `\nTry to include up to ${Math.min(10, lemmas.length)} of these lemmas (if possible, do not force): ${lemmas.join(
          ", "
        )}.`
      : "";
    const styleInstruction =
      style === "casual"
        ? "Use a casual, conversational spoken style in German. Prefer Perfekt for past events and avoid heavy Präteritum."
        : "Use a literary, bookish style in German. Prefer Präteritum for narration.";
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
              `Generate a short German story for language learners. Respond with strict JSON: {"title":"...","text":"...","used_lemmas":["..."]}. "used_lemmas" must list the lemmas you actually used from the requested list (or empty array). Target about ${wordCount} words (±10%). Use CEFR ${level} vocabulary and grammar. ${styleInstruction} Make the story more intricate and engaging: give a clear setting, a small tension or mystery, and a turning point with a satisfying resolution. Use concrete sensory details (sound, light, texture), a mix of short and longer sentences, and at least one line of natural dialogue. Avoid clichés and repetitive phrasing. Keep clarity high for learners. If target lemmas are provided, try to use them naturally.`,
          },
          {
            role: "user",
            content: `${prompt}\nLength: ${wordCount} words.\nLevel: ${level}.${lemmaRequest}`,
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
      usedLemmas: Array.isArray(parsed.used_lemmas) ? parsed.used_lemmas : [],
    };
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }
    return null;
  }
};

const handleSentenceContainerClick = (event) => {
  if (longPressTriggered) {
    longPressTriggered = false;
    return;
  }
  const activeSentence = document.querySelector(".sentence.active");
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
    setActiveSentence(sentenceEl);
    word.classList.add("active");
    setWordLoading(word, true);
    const german = getCleanWordText(word);
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
      
      // Handle detached prefix based on ChatGPT response
      let detachedPrefixEl = null;
      if (result?.has_detached_prefix && result?.detached_prefix_word) {
        const detachedWord = result.detached_prefix_word.trim();
        if (detachedWord) {
          const normalized = detachedWord.toLowerCase();
          // Find the detached prefix/verb element in the same sentence
          let candidateEl = null;
          for (const candidate of sentenceEl.querySelectorAll(".word")) {
            if (
              candidate !== word &&
              getCleanWordText(candidate).toLowerCase() === normalized
            ) {
              candidateEl = candidate;
              break;
            }
          }
          
          if (candidateEl) {
            word.classList.add("separable");
            candidateEl.classList.add("separable");
            detachedPrefixEl = candidateEl;
          }
        }
      }
      
      const fallback = word.dataset.translation;
      const translation = result?.translation || fallback;
      const grammar =
        result?.declension_explanation ||
        "Нет объяснения склонения для этого слова.";
      const displayGerman = (result?.has_detached_prefix && result?.combined_word)
        ? result.combined_word
        : german;
      const meta = {
        lemma: (result?.has_detached_prefix && result?.combined_word) ? result.combined_word : (result?.lemma || ""),
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
          meta.head = headWord.dataset.lemma || getCleanWordText(headWord);
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
      recordLemmaTranslation(meta.lemma || displayGerman);
      setWordLoading(word, false);
      updateTranslation("word", displayGerman, translation, grammar, meta);
    });
    return;
  }

  const sentence = event.target.closest(".sentence");
  if (sentence) {
    const german = sentence.textContent.trim();
    setActiveSentence(sentence);
    translateSentenceText(german, sentence.dataset.translation, sentence);
  }
};

reader.addEventListener("click", handleSentenceContainerClick);
storyTitle.addEventListener("click", handleSentenceContainerClick);

const handleSentencePointerDown = (event) => {
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
    setActiveSentence(sentenceEl);
    translateSentenceText(
      sentenceEl.textContent.trim(),
      sentenceEl.dataset.translation,
      sentenceEl
    );
  }, 450);
};

const handleSentencePointerCancel = () => {
  clearLongPress();
};

const handleSentenceContextMenu = (event) => {
  event.preventDefault();
};

reader.addEventListener("pointerdown", handleSentencePointerDown);
reader.addEventListener("pointerup", handleSentencePointerCancel);
reader.addEventListener("pointerleave", handleSentencePointerCancel);
reader.addEventListener("pointercancel", handleSentencePointerCancel);
reader.addEventListener("contextmenu", handleSentenceContextMenu);

storyTitle.addEventListener("pointerdown", handleSentencePointerDown);
storyTitle.addEventListener("pointerup", handleSentencePointerCancel);
storyTitle.addEventListener("pointerleave", handleSentencePointerCancel);
storyTitle.addEventListener("pointercancel", handleSentencePointerCancel);
storyTitle.addEventListener("contextmenu", handleSentenceContextMenu);

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
  updateCopyButtonLabel("word");
  syncPageDots();
};

const copyTextToClipboard = async (text) => {
  const value = String(text || "").trim();
  if (!value) {
    return;
  }
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch (error) {
      // Fall back to the legacy path below.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

copySelection?.addEventListener("click", () => {
  const type = translationPanel.classList.contains("is-sentence")
    ? "sentence"
    : "word";
  const text = type === "sentence" ? lastGerman : lastGerman;
  copyTextToClipboard(text);
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
  const clamped = Math.min(600, Math.max(50, Number(value) || 120));
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

const applyStoryStyle = (style) => {
  const allowed = ["literary", "casual"];
  const normalized = String(style || "").toLowerCase();
  const next = allowed.includes(normalized) ? normalized : "casual";
  document.body.dataset.storyStyle = next;
  styleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.style === next);
  });
  localStorage.setItem(STORY_STYLE_KEY, next);
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
const storedStyle = localStorage.getItem(STORY_STYLE_KEY) || "casual";
applyStoryWordCount(storedWordCount);
applyStoryLevel(storedLevel);
applyStoryStyle(storedStyle);

const setApiKeyRequirement = (required) => {
  document.body.classList.toggle("requires-key", required);
  if (settingsBack) {
    settingsBack.disabled = required;
    settingsBack.setAttribute("aria-disabled", String(required));
  }
  updateScreenScrollLock();
  if (required && settingsScreen) {
    const currentScreen = getCurrentScreen();
    if (currentScreen && currentScreen.dataset.screen !== "settings") {
      lastSettingsReturnScreen = currentScreen;
    }
    scrollToScreen(settingsScreen, "auto");
  }
};

const setKeyVisibility = (shouldShow) => {
  apiKeyInput.type = shouldShow ? "text" : "password";
  toggleKeyVisibility.textContent = shouldShow ? "Hide" : "Show";
};

const openSettingsScreen = (forceRequired = false, behavior = "smooth") => {
  const storedKey = localStorage.getItem("chatgpt_api_key") || "";
  apiKeyInput.value = storedKey;
  setKeyVisibility(false);
  setApiKeyRequirement(forceRequired || !storedKey);
  const currentScreen = getCurrentScreen();
  if (currentScreen && currentScreen.dataset.screen !== "settings") {
    lastSettingsReturnScreen = currentScreen;
  }
  if (settingsScreen) {
    scrollToScreen(settingsScreen, behavior);
  }
};

const closeSettingsScreen = (behavior = "smooth", forceLibrary = false) => {
  if (document.body.classList.contains("requires-key")) {
    return;
  }
  if (forceLibrary) {
    showLibraryScreen(behavior);
  } else if (lastSettingsReturnScreen) {
    scrollToScreen(lastSettingsReturnScreen, behavior);
  } else {
    showLibraryScreen(behavior);
  }
};

const validateApiKey = async (apiKey) => {
  if (!apiKey || !apiKey.trim()) {
    return { valid: false, error: "API key is required" };
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey.trim()}`,
      },
    });
    
    if (response.ok) {
      return { valid: true };
    } else {
      const data = await response.json().catch(() => ({}));
      return { valid: false, error: data.error?.message || "Invalid API key" };
    }
  } catch (error) {
    return { valid: false, error: "Failed to validate API key. Please check your connection." };
  }
};

saveKey.addEventListener("click", async () => {
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    return;
  }
  
  // Disable button and show loading state
  saveKey.disabled = true;
  const originalText = saveKey.textContent;
  saveKey.textContent = "Validating...";
  
  // Validate the API key
  const validation = await validateApiKey(apiKey);
  
  if (validation.valid) {
    localStorage.setItem("chatgpt_api_key", apiKey);
    apiKeyInput.value = apiKey;
    setApiKeyRequirement(false);
    saveKey.textContent = originalText;
    saveKey.disabled = false;
    closeSettingsScreen("smooth", true);
  } else {
    // Show error message
    alert(validation.error);
    saveKey.textContent = originalText;
    saveKey.disabled = false;
  }
});

if (toggleApi) {
  toggleApi.addEventListener("click", () => openSettingsScreen(false));
}

if (settingsBack) {
  settingsBack.addEventListener("click", () => closeSettingsScreen());
}

toggleKeyVisibility.addEventListener("click", () => {
  const shouldShow = apiKeyInput.type === "password";
  setKeyVisibility(shouldShow);
});

clearKey.addEventListener("click", () => {
  localStorage.removeItem("chatgpt_api_key");
  apiKeyInput.value = "";
  setKeyVisibility(false);
  setApiKeyRequirement(true);
  openSettingsScreen(true);
});

const storedKey = localStorage.getItem("chatgpt_api_key");
if (storedKey) {
  apiKeyInput.value = storedKey;
} else {
  openSettingsScreen(true, "auto");
}
updateLemmaBadge();

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

styleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyStoryStyle(button.dataset.style);
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
  styleButtons.forEach((button) => {
    button.disabled = mode !== "generate";
  });
};

const showAddTextModal = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  if (!storedKey) {
    openSettingsScreen(true);
    return;
  }
  addTextModal.classList.remove("is-hidden");
  setMode("generate");
};

const initializeStories = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  const stories = loadStories();
  renderHomeStories(stories);
  renderArchiveStories(stories);
  renderLemmaList();
  if (!stories.length) {
    storyTitle.textContent = "";
    reader.innerHTML = "";
    translationPanel.classList.add("is-hidden");
  }
  handleRoute();
  if (!storedKey) {
    openSettingsScreen(true, "auto");
  }
  setupReadObserver();
  setInitialScreen();
  syncPageDots();
};

let hasSetInitialScreen = false;
const setInitialScreen = () => {
  if (
    hasSetInitialScreen ||
    !screenLayout ||
    !libraryScreen ||
    document.body.classList.contains("view-reader") ||
    document.body.classList.contains("requires-key")
  ) {
    return;
  }
  hasSetInitialScreen = true;
  requestAnimationFrame(() => {
    const previousBehavior = screenLayout.style.scrollBehavior;
    screenLayout.style.scrollBehavior = "auto";
    screenLayout.scrollLeft = libraryScreen.offsetLeft;
    screenLayout.style.scrollBehavior = previousBehavior;
    requestPageDotsUpdate();
  });
};

initializeStories();

if (addTextButton) {
  addTextButton.addEventListener("click", showAddTextModal);
}
if (homeAddText) {
  homeAddText.addEventListener("click", showAddTextModal);
}
if (homeEmptyAdd) {
  homeEmptyAdd.addEventListener("click", showAddTextModal);
}
if (backToLibrary) {
  backToLibrary.addEventListener("click", () => {
    showLibraryScreen();
  });
}
if (homeList) {
  homeList.addEventListener("contextmenu", (event) => {
    if (event.target.closest(".home-item")) {
      event.preventDefault();
    }
  });
}

if (archiveList) {
  archiveList.addEventListener("contextmenu", (event) => {
    if (event.target.closest(".home-item")) {
      event.preventDefault();
    }
  });
}

if (openLemmasButton) {
  openLemmasButton.addEventListener("click", () => {
    renderLemmaList();
    scrollToScreen(lemmasScreen);
  });
}

if (screenLayout) {
  screenLayout.addEventListener("scroll", requestPageDotsUpdate, { passive: true });
}

updateStandaloneMode();
if (typeof window.matchMedia === "function") {
  const standaloneQuery = window.matchMedia("(display-mode: standalone)");
  if (typeof standaloneQuery.addEventListener === "function") {
    standaloneQuery.addEventListener("change", updateStandaloneMode);
  } else if (typeof standaloneQuery.addListener === "function") {
    standaloneQuery.addListener(updateStandaloneMode);
  }
}

window.addEventListener("resize", () => {
  syncPageDots();
});

if (clearLemmasButton) {
  clearLemmasButton.addEventListener("click", () => {
    localStorage.removeItem(LEMMA_STATS_KEY);
    renderLemmaList();
  });
}

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

const promptGenres = [
  "slice-of-life",
  "adventure",
  "comedy",
  "romance",
  "mystery",
  "fantasy",
  "sci-fi",
  "historical",
  "thriller",
  "folklore",
  "coming-of-age",
  "travel",
  "workplace",
  "sports",
  "food",
  "music",
  "nature",
  "family",
  "friendship",
  "surreal",
];

const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

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
              "Write one short story prompt in English for German learners. Return only the prompt text on one line, include a level tag like A2/B1/B2. Keep it concise (max 16 words). Use the given genre; aim for variety; do not refuse any theme.",
          },
          {
            role: "user",
            content: `New prompt. Target ${wordCount} words. CEFR ${level}. Genre: ${getRandomItem(
              promptGenres
            )}.`,
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
  const levelRegex = /\b(?:A1|A2|B1|B2|C1|C2)\b/i;
  const levelTag = levelRegex.test(trimmedSuggestion)
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
  renderHomeStories(next);
  renderArchiveStories(next);
  openReaderScreen(newStory);
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
  const lemmas = getTopLemmaList(10);
  const story = await generateStoryFromPrompt(prompt, "", {
    wordCount: wordCountSlider?.value,
    level: document.body.dataset.storyLevel || "A2",
    style: document.body.dataset.storyStyle || "literary",
    lemmas,
  });
  generateStory.disabled = false;
  generateStory.textContent = "Generate";
  if (!story) {
    return;
  }
  if (Array.isArray(story.usedLemmas) && story.usedLemmas.length) {
    markLearnedLemmas(story.usedLemmas);
  } else {
    markLearnedLemmasInText(story.text, lemmas);
  }
  const newStory = {
    id: Date.now(),
    title: story.title,
    text: story.text,
  };
  const current = loadStories();
  const next = [newStory, ...current];
  saveStories(next);
  renderHomeStories(next);
  renderArchiveStories(next);
  openReaderScreen(newStory);
  promptBody.value = "";
  addTextModal.classList.add("is-hidden");
});

window.addEventListener("hashchange", handleRoute);

document.addEventListener(
  "click",
  (event) => {
    const lists = [homeList, archiveList].filter(Boolean);
    const activeList = lists.find((list) => list.classList.contains("has-active"));
    if (!activeList) {
      return;
    }
    const activeItem = activeList.querySelector(".home-item.is-active");
    if (activeItem && activeItem.contains(event.target)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    closeAllHomeMenus(undefined, activeList);
  },
  true
);
