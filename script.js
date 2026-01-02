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
const skipLemma = document.getElementById("skipLemma");
const apiKeyInput = document.getElementById("apiKey");
const saveKey = document.getElementById("saveKey");
const toggleApi = document.getElementById("toggleApi");
const settingsScreen = document.querySelector('[data-screen="settings"]');
const fontOptions = document.querySelectorAll("[data-font]");
const hyphenationOptions = document.querySelectorAll("[data-hyphenation]");
const justificationOptions = document.querySelectorAll("[data-justify]");
const readerSize = document.getElementById("readerSize");
const readerSizeSettings = document.getElementById("readerSizeSettings");
const readerLeading = document.getElementById("readerLeading");
const readerLeadingSettings = document.getElementById("readerLeadingSettings");
const toggleKeyVisibility = document.getElementById("toggleKeyVisibility");
const clearKey = document.getElementById("clearKey");
const translationPanel = document.getElementById("translationPanel");
const bottomSheet = document.getElementById("bottomSheet");
const readerStatus = document.getElementById("readerStatus");
const readerStatusLemmas = document.getElementById("readerStatusLemmas");
const reloadApp = document.getElementById("reloadApp");
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
const lemmaSearch = document.getElementById("lemmaSearch");
const lemmaEmptyDefaultText = lemmaEmpty?.textContent || "";
const lemmaLearnedEmptyDefaultText = lemmaLearnedEmpty?.textContent || "";
const wordCountSlider = document.getElementById("wordCount");
const wordCountValue = document.getElementById("wordCountValue");
const levelButtons = document.querySelectorAll("[data-level]");
const styleButtons = document.querySelectorAll("[data-style]");
const homeList = document.getElementById("homeList");
const homeEmpty = document.getElementById("homeEmpty");
const homeEmptyAdd = document.getElementById("homeEmptyAdd");
const homeAddText = document.getElementById("homeAddText");
const openReaderAppearance = document.getElementById("openReaderAppearance");
const readerFinish = document.getElementById("readerFinish");
const readerEnd = document.getElementById("readerEnd");
const readerView = document.getElementById("readerView");
const pageDots = document.getElementById("pageDots");
const rssRefresh = document.getElementById("rssRefresh");
const rssUrlInput = document.getElementById("rssUrlInput");
const rssAdd = document.getElementById("rssAdd");
const rssSearchInput = document.getElementById("rssSearchInput");
const rssSearch = document.getElementById("rssSearch");
const rssSearchResults = document.getElementById("rssSearchResults");
const rssSubscriptions = document.getElementById("rssSubscriptions");
const rssSubscriptionsEmpty = document.getElementById("rssSubscriptionsEmpty");
const rssFeedList = document.getElementById("rssFeedList");
const rssFeedEmpty = document.getElementById("rssFeedEmpty");
const rssFeedEmptyAction = document.getElementById("rssFeedEmptyAction");
const rssFeedStatus = document.getElementById("rssFeedStatus");
const rssModalStatus = document.getElementById("rssModalStatus");
const readerAppearanceModal = document.getElementById("readerAppearanceModal");
const closeReaderAppearance = document.getElementById("closeReaderAppearance");
const bottomSheetHandle = document.querySelector("#bottomSheet .sheet-handle");
const resetAllDataButton = document.getElementById("resetAllData");

const pageDotIcons = {
  library: "assets/icons/icon-library.svg",
  rss: "assets/icons/icon-rss.svg",
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
let currentRssItem = null;
let readObserver = null;
let lastSettingsReturnScreen = null;
let rssCurrentItems = [];
let rssSearchItems = [];
let rssAdaptController = null;
let currentReadSession = null;
let rssLoadController = null;
let rssLoadingItemId = null;
let rssLoadingMessage = "";
let rssLoadingRequestId = 0;
let libraryActiveIndex = 0;
let libraryOverscroll = 0;
let libraryIsSwitching = false;
let libraryTouchStartY = 0;
let libraryTouchStartX = 0;
let libraryTouchAxis = "";
let libraryTouchActive = false;
let sheetDragPointerId = null;
let sheetDragStartY = 0;
let sheetDragDeltaY = 0;
let sheetDragActive = false;
let resetTranslationTimer = null;
let pendingLemmaEntry = null;
const STORY_STORAGE_KEY = "reader_texts_v1";
const LAST_STORY_KEY = "reader_last_story_id";
const STORY_LEVEL_KEY = "reader_story_level";
const STORY_WORD_COUNT_KEY = "reader_story_word_count";
const STORY_STYLE_KEY = "reader_story_style";
const LEMMA_STATS_KEY = "reader_lemma_stats_v1";
const READ_STATUS_KEY = "reader_story_read_v1";
const RSS_STORAGE_KEY = "reader_rss_urls_v1";
const RSS_ARCHIVE_STORAGE_KEY = "reader_rss_archive_v1";
const RSS_LEVELS_KEY = "reader_rss_levels_v1";
const RSS_ITEM_LEVELS_KEY = "reader_rss_item_levels_v1";
const RSS_ADAPT_STORAGE_KEY = "reader_rss_adapt_v1";
const LIBRARY_VIEW_KEY = "reader_library_view_v1";
const RSS_PROXY_BASE = "https://leselampe-rss.gobedashvilibagrat.workers.dev";
const storyTitle = document.querySelector(".book-header h1");
const screenLayout = document.querySelector(".layout");
const libraryScreen = document.querySelector('[data-screen="library"]');
const libraryPanel = document.querySelector(".library-panel");
const libraryStack = document.getElementById("libraryStack");
let libraryViews = libraryStack
  ? Array.from(libraryStack.querySelectorAll(".library-view"))
  : [];
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
  const isRssLoading = Boolean(rssLoadingItemId);
  screenLayout.classList.toggle(
    "is-locked",
    hasActiveWord || hasActiveSentence || requiresKey || isRssLoading
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

const loadRssUrls = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RSS_STORAGE_KEY) || "[]");
    if (Array.isArray(stored)) {
      return stored.filter((value) => typeof value === "string" && value.trim());
    }
  } catch (error) {
    console.warn("Failed to load RSS subscriptions.", error);
  }
  return [];
};

const saveRssUrls = (urls) => {
  localStorage.setItem(RSS_STORAGE_KEY, JSON.stringify(urls));
};

const RSS_LEVELS = ["raw", "A1", "A2", "B1", "B2", "C1", "C2"];

const loadRssLevels = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RSS_LEVELS_KEY) || "{}");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to load RSS levels.", error);
  }
  return {};
};

const saveRssLevels = (levels) => {
  localStorage.setItem(RSS_LEVELS_KEY, JSON.stringify(levels));
};

const loadRssItemLevels = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RSS_ITEM_LEVELS_KEY) || "{}");
    if (!stored || typeof stored !== "object") {
      return {};
    }
    return stored;
  } catch (error) {
    console.warn("Failed to load RSS item levels.", error);
    return {};
  }
};

const saveRssItemLevels = (levels) => {
  localStorage.setItem(RSS_ITEM_LEVELS_KEY, JSON.stringify(levels));
};

const getRssItemLevel = (itemId) => {
  if (!itemId) {
    return "";
  }
  const levels = loadRssItemLevels();
  return levels[itemId] || "";
};

const setRssItemLevel = (itemId, level) => {
  if (!itemId || !RSS_LEVELS.includes(level)) {
    return false;
  }
  const levels = loadRssItemLevels();
  levels[itemId] = level;
  saveRssItemLevels(levels);
  return true;
};

const getRssLevel = (url) => {
  if (!url) {
    return "";
  }
  const levels = loadRssLevels();
  return levels[url] || "";
};

const ensureRssLevel = (url, fallback = "raw") => {
  if (!url || !RSS_LEVELS.includes(fallback)) {
    return "";
  }
  const current = getRssLevel(url);
  if (current) {
    return current;
  }
  setRssLevel(url, fallback);
  return fallback;
};

const setRssLevel = (url, level) => {
  if (!url || !RSS_LEVELS.includes(level)) {
    return false;
  }
  const levels = loadRssLevels();
  levels[url] = level;
  saveRssLevels(levels);
  return true;
};

const isRssSubscribed = (url) => {
  if (!url) {
    return false;
  }
  return loadRssUrls().includes(url);
};

const removeRssSubscriptionUrl = (rawUrl) => {
  const normalized = normalizeRssUrl(rawUrl);
  if (!normalized) {
    return false;
  }
  let url;
  try {
    url = new URL(normalized).toString();
  } catch (error) {
    setRssModalStatus("Enter a valid URL.", { isError: true });
    return false;
  }
  const urls = loadRssUrls().filter((item) => item !== url);
  saveRssUrls(urls);
  const levels = loadRssLevels();
  if (levels[url]) {
    delete levels[url];
    saveRssLevels(levels);
  }
  setRssModalStatus("");
  renderRssSubscriptions();
  loadRssItems();
  return true;
};

const loadRssArchiveItems = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RSS_ARCHIVE_STORAGE_KEY) || "[]");
    if (Array.isArray(stored)) {
      return stored.filter((item) => item && typeof item.id === "string");
    }
  } catch (error) {
    console.warn("Failed to load RSS archive.", error);
  }
  return [];
};

const saveRssArchiveItems = (items) => {
  localStorage.setItem(RSS_ARCHIVE_STORAGE_KEY, JSON.stringify(items));
};

const isRssItemId = (value) => String(value || "").startsWith("rss:");

const stripHtmlText = (value) => {
  if (!value) {
    return "";
  }
  const wrapper = document.createElement("div");
  wrapper.innerHTML = value;
  return wrapper.textContent || "";
};

const buildRssExcerpt = (item) => {
  const plain = stripHtmlText(item?.contentHtml || "");
  const fallback = plain || (item?.source ? `From ${item.source}.` : "") || item?.title || "";
  return buildStoryExcerpt(fallback);
};

const setRssLoadingState = (itemId, message) => {
  rssLoadingItemId = itemId || null;
  rssLoadingMessage = message || "";
  rssLoadingRequestId += 1;
  if (rssFeedList) {
    rssFeedList.classList.toggle("is-loading", Boolean(rssLoadingItemId));
  }
  updateScreenScrollLock();
  refreshRssFeedItems();
  return rssLoadingRequestId;
};

const clearRssLoadingState = () => {
  rssLoadingItemId = null;
  rssLoadingMessage = "";
  rssLoadingRequestId += 1;
  if (rssFeedList) {
    rssFeedList.classList.remove("is-loading");
  }
  updateScreenScrollLock();
  refreshRssFeedItems();
};

const abortRssLoading = () => {
  if (rssLoadController) {
    rssLoadController.abort();
  }
  if (rssAdaptController) {
    rssAdaptController.abort();
  }
  clearRssLoadingState();
};

const loadRssAdaptations = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(RSS_ADAPT_STORAGE_KEY) || "{}");
    if (stored && typeof stored === "object" && !Array.isArray(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Failed to load RSS adaptations.", error);
  }
  return {};
};

const saveRssAdaptations = (items) => {
  localStorage.setItem(RSS_ADAPT_STORAGE_KEY, JSON.stringify(items));
};

const getRssAdaptation = (itemId, level) => {
  if (!itemId || !level) {
    return null;
  }
  const key = `${itemId}:${level}`;
  const adaptations = loadRssAdaptations();
  return adaptations[key] || null;
};

const setRssAdaptation = (itemId, level, payload) => {
  if (!itemId || !level || !payload?.text) {
    return false;
  }
  const key = `${itemId}:${level}`;
  const adaptations = loadRssAdaptations();
  adaptations[key] = {
    title: payload.title || "",
    text: payload.text,
    level,
    usedLemmas: Array.isArray(payload.usedLemmas) ? payload.usedLemmas : [],
    updatedAt: new Date().toISOString(),
  };
  saveRssAdaptations(adaptations);
  return true;
};

const blocksToPlainText = (blocks) => {
  if (!Array.isArray(blocks)) {
    return "";
  }
  return blocks
    .map((block) => normalizeArticleText(block?.text || ""))
    .filter(Boolean)
    .join("\n\n");
};

const buildBlocksFromText = (text) => {
  const parts = String(text || "")
    .split(/\n+/)
    .map((line) => normalizeArticleText(line))
    .filter(Boolean);
  return parts.map((line) => ({ type: "paragraph", text: line }));
};

const adaptRssArticleWithChatGPT = async (title, blocks, level) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  const sourceText = blocksToPlainText(blocks);
  if (!sourceText) {
    return null;
  }
  const lemmas = getTopLemmaList(8);
  const lemmaInstruction = lemmas.length
    ? `\nIf possible, weave in a few of these lemmas without distorting the meaning (do not force): ${lemmas.join(
        ", "
      )}.`
    : "";
  if (rssAdaptController) {
    rssAdaptController.abort();
  }
  rssAdaptController = new AbortController();
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              `You are a translator and text adapter for German learners. Respond with strict JSON: {"title":"...","text":"...","used_lemmas":["..."]}. "used_lemmas" must list the lemmas you actually used from the requested list (or empty array).
If the source text is not in German, translate it into German first. Then adapt the German to CEFR ${level} vocabulary and grammar.
If the source text is already in German, adapt/simplify it to CEFR ${level}.
Keep names, places, and numbers. Preserve meaning and key details. Do not summarize or omit facts.
Keep the length very close to the original (aim for 85%-115% of the source length). If simplification is needed, split long sentences and use simpler phrasing rather than dropping content.
Use short paragraphs separated by blank lines. Do not use markdown or bullet lists.${lemmaInstruction}`,
          },
          {
            role: "user",
            content: `Title: ${title || "Untitled"}\n\n${sourceText}`,
          },
        ],
      }),
      signal: rssAdaptController.signal,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "RSS adaptation failed");
    }
    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) {
      throw new Error("Empty adaptation");
    }
    const parsed = JSON.parse(raw);
    if (!parsed.text) {
      throw new Error("Malformed adaptation");
    }
    return {
      title: parsed.title || title || "Artikel",
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

const upsertRssArchiveItem = (item, readAt) => {
  if (!item?.id) {
    return;
  }
  const id = String(item.id);
  const archive = loadRssArchiveItems();
  const entry = {
    id,
    title: item.title || "Untitled post",
    link: item.link || "",
    source: item.source || "Feed",
    date: item.date instanceof Date ? item.date.toISOString() : item.date || "",
    contentHtml: item.contentHtml || "",
    feedUrl: item.feedUrl || "",
    readAt: readAt || new Date().toISOString(),
  };
  const existingIndex = archive.findIndex((stored) => stored.id === id);
  if (existingIndex >= 0) {
    archive[existingIndex] = { ...archive[existingIndex], ...entry };
  } else {
    archive.unshift(entry);
  }
  saveRssArchiveItems(archive);
};

const removeRssArchiveItem = (itemId) => {
  if (!itemId) {
    return;
  }
  const key = String(itemId);
  const archive = loadRssArchiveItems();
  const next = archive.filter((item) => item.id !== key);
  if (next.length !== archive.length) {
    saveRssArchiveItems(next);
  }
};

const normalizeRssUrl = (value) => {
  const trimmed = String(value || "").trim();
  if (!trimmed) {
    return "";
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
};

const getCanonicalRssUrl = (value) => {
  const normalized = normalizeRssUrl(value);
  if (!normalized) {
    return "";
  }
  try {
    return new URL(normalized).toString();
  } catch (error) {
    return normalized;
  }
};

const setRssStatus = (message, { isError = false } = {}) => {
  if (!rssFeedStatus) {
    return;
  }
  rssFeedStatus.textContent = message || "";
  rssFeedStatus.classList.toggle("is-hidden", !message);
  rssFeedStatus.classList.toggle("is-error", isError);
};

const setRssModalStatus = (message, { isError = false } = {}) => {
  if (!rssModalStatus) {
    return;
  }
  rssModalStatus.textContent = message || "";
  rssModalStatus.classList.toggle("is-hidden", !message);
  rssModalStatus.classList.toggle("is-error", isError);
};

const getFeedSearchUrl = (query) =>
  `https://feedsearch.dev/api/v1/search?url=${encodeURIComponent(
    query
  )}&info=true&favicon=false&opml=false&skip_crawl=false`;

const fetchFeedSearchResults = async (query) => {
  const apiUrl = getFeedSearchUrl(query);
  const proxyUrl = `${RSS_PROXY_BASE}?url=${encodeURIComponent(apiUrl)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }
  return await response.json();
};

const renderRssSearchResults = (items) => {
  if (!rssSearchResults) {
    return;
  }
  rssSearchResults.innerHTML = "";
  if (!items.length) {
    rssSearchResults.classList.add("is-hidden");
    return;
  }
  rssSearchResults.classList.remove("is-hidden");
  items.forEach((item) => {
    const canonicalUrl = getCanonicalRssUrl(item.url);
    const isSubscribed = isRssSubscribed(canonicalUrl);
    const row = document.createElement("div");
    row.className = "rss-search-item";
    const meta = document.createElement("div");
    meta.className = "rss-search-meta";
    const title = document.createElement("div");
    title.className = "rss-search-title";
    title.textContent = item.title || "Feed";
    const url = document.createElement("div");
    url.className = "rss-search-url";
    url.textContent = item.url || "";
    meta.append(title, url);
    const levels = document.createElement("div");
    levels.className = "rss-levels";
    if (isSubscribed) {
      const selectedLevel = ensureRssLevel(canonicalUrl, "raw");
      RSS_LEVELS.forEach((level) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "rss-level";
        button.textContent = level;
        button.dataset.url = canonicalUrl;
        button.dataset.level = level;
        if (selectedLevel === level) {
          button.classList.add("is-active");
        }
        levels.appendChild(button);
      });
    }
    const actions = document.createElement("div");
    actions.className = "rss-search-actions";
    const actionButton = document.createElement("button");
    actionButton.type = "button";
    actionButton.className = "ghost mini";
    actionButton.textContent = isSubscribed ? "Remove" : "Add";
    actionButton.dataset.url = canonicalUrl || item.url || "";
    actions.appendChild(actionButton);
    row.append(meta, levels, actions);
    rssSearchResults.appendChild(row);
  });
};

const normalizeSearchItem = (item) => {
  if (!item || typeof item !== "object") {
    return null;
  }
  const url =
    item.url ||
    item.feedUrl ||
    item.feed ||
    item.rss ||
    item.link ||
    item.website ||
    item.self_url ||
    "";
  if (!url) {
    return null;
  }
  return {
    title: item.title || item.site_name || item.siteName || item.name || url,
    url,
  };
};

const searchRssFeeds = async () => {
  if (!rssSearchInput) {
    return;
  }
  const query = rssSearchInput.value.trim();
  if (!query) {
    setRssModalStatus("Enter a URL to search for feeds.", { isError: true });
    return;
  }
  setRssModalStatus("Searching...");
  renderRssSearchResults([]);
  rssSearchItems = [];
  try {
    const data = await fetchFeedSearchResults(query);
    const rawItems = Array.isArray(data) ? data : data?.feeds || data?.results || [];
    const items = rawItems
      .map(normalizeSearchItem)
      .filter(Boolean)
      .slice(0, 8);
    if (!items.length) {
      setRssModalStatus("No feeds found.", {
        isError: true,
      });
      return;
    }
    setRssModalStatus("");
    rssSearchItems = items;
    renderRssSearchResults(items);
  } catch (error) {
    setRssModalStatus("Couldn't reach feedsearch.dev.", {
      isError: true,
    });
  }
};

const renderRssSubscriptions = () => {
  if (!rssSubscriptions || !rssSubscriptionsEmpty) {
    return;
  }
  const urls = loadRssUrls();
  rssSubscriptions.innerHTML = "";
  rssSubscriptionsEmpty.classList.toggle("is-hidden", urls.length > 0);
  urls.forEach((url) => {
    const item = document.createElement("div");
    item.className = "rss-subscription-item";
    const label = document.createElement("span");
    label.className = "rss-subscription-url";
    label.textContent = url;
    const levels = document.createElement("div");
    levels.className = "rss-levels";
    const selectedLevel = ensureRssLevel(url, "raw");
    RSS_LEVELS.forEach((level) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rss-level";
      button.textContent = level;
      button.dataset.url = url;
      button.dataset.level = level;
      if (selectedLevel === level) {
        button.classList.add("is-active");
      }
      levels.appendChild(button);
    });
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "ghost mini";
    removeButton.textContent = "Remove";
    removeButton.dataset.url = url;
    const actions = document.createElement("div");
    actions.className = "rss-subscription-actions";
    actions.appendChild(removeButton);
    item.append(label, levels, actions);
    rssSubscriptions.appendChild(item);
  });
};

const renderRssFeedItems = (items) => {
  if (!rssFeedList || !rssFeedEmpty) {
    return;
  }
  rssCurrentItems = items;
  rssFeedList.innerHTML = "";
  if (rssFeedEmptyAction) {
    rssFeedEmptyAction.classList.add("is-hidden");
  }
  if (!items.length) {
    rssFeedEmpty.textContent = "No items found yet.";
    rssFeedEmpty.classList.remove("is-hidden");
    return;
  }
  const readStatus = loadReadStatus();
  rssFeedEmpty.classList.add("is-hidden");
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "home-item";
    card.dataset.id = item.id;
    if (readStatus[item.id]?.isRead) {
      card.classList.add("is-read");
    }
    const isLoading = rssLoadingItemId && String(item.id) === String(rssLoadingItemId);
    if (isLoading) {
      card.classList.add("is-loading");
    }
    const overrideLevel = getRssItemLevel(item.id);
    const effectiveLevel = overrideLevel || getRssLevel(item.feedUrl) || "raw";
    const cached = getRssAdaptation(item.id, effectiveLevel);
    const isReady = Boolean(cached?.text);

    const content = document.createElement("button");
    content.className = "home-item-content";
    content.type = "button";

    const head = document.createElement("div");
    head.className = "home-item-head";

    const title = document.createElement("p");
    title.className = "home-item-title";
    title.textContent = item.title || "Untitled post";

    head.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "rss-feed-meta";
    const source = document.createElement("span");
    source.className = "rss-feed-source";
    source.textContent = item.source || "Feed";
    meta.appendChild(source);
    if (isReady && !isLoading) {
      const ready = document.createElement("span");
      ready.className = "rss-feed-check";
      ready.textContent = `✓ ${effectiveLevel.toUpperCase()}`;
      meta.appendChild(ready);
    }
    if (item.date) {
      const date = document.createElement("span");
      date.textContent = item.date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
      meta.appendChild(date);
    }

    const excerpt = document.createElement("p");
    excerpt.className = "home-item-excerpt";
    excerpt.textContent = buildRssExcerpt(item);

    content.appendChild(head);
    content.appendChild(meta);
    if (isLoading) {
      const loadingRow = document.createElement("div");
      loadingRow.className = "rss-item-loading-row";
      const loading = document.createElement("p");
      loading.className = "rss-item-loading";
      loading.textContent = rssLoadingMessage || "Loading...";
      const abortButton = document.createElement("button");
      abortButton.type = "button";
      abortButton.className = "rss-item-abort";
      abortButton.textContent = "Abort";
      abortButton.dataset.abort = "true";
      loadingRow.append(loading, abortButton);
      content.appendChild(loadingRow);
    } else {
      content.appendChild(excerpt);
    }

    const actions = document.createElement("div");
    actions.className = "home-item-actions";
    if (!isLoading) {
      const toggleButton = document.createElement("button");
      toggleButton.className = "home-action toggle";
      toggleButton.type = "button";
      toggleButton.textContent = "Mark as read";
      toggleButton.addEventListener("click", (event) => {
        event.stopPropagation();
        markStoryRead(item.id);
        closeAllHomeMenus(undefined, rssFeedList);
      });
      actions.appendChild(toggleButton);
      const levelActions = document.createElement("div");
      levelActions.className = "rss-item-levels";
      RSS_LEVELS.forEach((level) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "rss-level rss-item-level";
        button.textContent = level.toLowerCase();
        button.dataset.level = level;
        if (effectiveLevel === level) {
          button.classList.add("is-active");
        }
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          if (setRssItemLevel(item.id, level)) {
            requestRssItemOpen(item, { levelOverride: level });
          }
        });
        levelActions.appendChild(button);
      });
      actions.appendChild(levelActions);
    }

    card.appendChild(content);
    if (actions.childNodes.length) {
      card.appendChild(actions);
    }
    setupHomeItemLongPress(card, rssFeedList);
    rssFeedList.appendChild(card);
  });
};

const parseRssDate = (value) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const getElementsByTag = (parent, tag) => {
  if (!parent) {
    return [];
  }
  if (parent.getElementsByTagNameNS) {
    return Array.from(parent.getElementsByTagNameNS("*", tag));
  }
  return Array.from(parent.getElementsByTagName(tag));
};

const getFirstByTag = (parent, tag) => getElementsByTag(parent, tag)[0] || null;

const getTextFromTag = (parent, tag) =>
  getFirstByTag(parent, tag)?.textContent?.trim() || "";

const getLinkFromNode = (node) => {
  if (!node) {
    return "";
  }
  return node.getAttribute("href") || node.textContent?.trim() || "";
};

const getAtomEntryLink = (entry) => {
  const links = getElementsByTag(entry, "link");
  if (!links.length) {
    return "";
  }
  const alternate = links.find((link) => link.getAttribute("rel") === "alternate");
  const preferred =
    alternate ||
    links.find((link) => link.getAttribute("rel") !== "self") ||
    links[0];
  return getLinkFromNode(preferred);
};

const parseFeedItems = (doc, sourceUrl) => {
  const channel = getFirstByTag(doc, "channel");
  const channelTitle = getTextFromTag(channel, "title") || sourceUrl;
  const rssItems = getElementsByTag(doc, "item").map((item) => {
    const title = getTextFromTag(item, "title");
    const link = getLinkFromNode(getFirstByTag(item, "link"));
    const date = parseRssDate(
      getTextFromTag(item, "pubDate") || getTextFromTag(item, "date")
    );
    const contentHtml =
      getTextFromTag(item, "encoded") || getTextFromTag(item, "description");
    return {
      title,
      link,
      date,
      source: channelTitle,
      contentHtml,
      feedUrl: sourceUrl,
    };
  });
  if (rssItems.length) {
    return rssItems;
  }
  const feed = getFirstByTag(doc, "feed");
  const feedTitle = getTextFromTag(feed, "title") || sourceUrl;
  return getElementsByTag(doc, "entry").map((entry) => {
    const title = getTextFromTag(entry, "title");
    const link = getAtomEntryLink(entry);
    const date = parseRssDate(
      getTextFromTag(entry, "updated") || getTextFromTag(entry, "published")
    );
    const contentHtml =
      getTextFromTag(entry, "content") || getTextFromTag(entry, "summary");
    return {
      title,
      link,
      date,
      source: feedTitle,
      contentHtml,
      feedUrl: sourceUrl,
    };
  });
};

const normalizeArticleText = (value) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();

const extractArticleBlocks = (html) => {
  if (!html) {
    return [];
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc
    .querySelectorAll(
      "script, style, noscript, svg, img, figure, video, audio, canvas, iframe, nav, header, footer, form, button, aside"
    )
    .forEach((node) => node.remove());
  const selectors = [
    "article",
    "main",
    "[role='main']",
    ".entry-content",
    ".post-content",
    ".article-content",
    "#content",
    ".content",
  ];
  const target =
    selectors.map((selector) => doc.querySelector(selector)).find(Boolean) ||
    doc.body;
  if (!target) {
    return [];
  }
  const tags = new Set(["H1", "H2", "H3", "H4", "P", "LI", "BLOCKQUOTE"]);
  const blocks = [];
  const matched = new Set();
  const walker = doc.createTreeWalker(target, NodeFilter.SHOW_ELEMENT);
  let node = walker.nextNode();
  while (node) {
    if (tags.has(node.tagName)) {
      const hasMatchedAncestor = Array.from(matched).some((ancestor) =>
        ancestor.contains(node)
      );
      if (!hasMatchedAncestor) {
        const text = normalizeArticleText(node.textContent || "");
        if (text) {
          blocks.push({
            type: ["H1", "H2", "H3", "H4"].includes(node.tagName)
              ? "heading"
              : "paragraph",
            text,
          });
          matched.add(node);
        }
      }
    }
    node = walker.nextNode();
  }
  return blocks;
};

const renderRssStory = (title, blocks, itemId) => {
  currentStoryId = itemId || null;
  storyTitle.innerHTML = "";
  if (title) {
    storyTitle.appendChild(buildSentenceSpan(title));
  }
  reader.innerHTML = "";
  resetTranslation();
  if (!blocks || !blocks.length) {
    const empty = document.createElement("p");
    empty.className = "story";
    empty.textContent = "No readable text found for this article.";
    reader.appendChild(empty);
    return;
  }
  blocks.forEach((block) => {
    if (block.type === "heading") {
      const heading = document.createElement("h2");
      heading.className = "story-heading";
      heading.appendChild(buildSentenceSpan(block.text));
      reader.appendChild(heading);
      return;
    }
    const sentences = splitIntoSentences(block.text);
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
  });
};

const openRssReaderScreen = (
  title,
  blocks,
  itemId,
  { behavior = "smooth", usedLemmas = [] } = {}
) => {
  if (readerStatus) {
    readerStatus.classList.add("is-hidden");
    readerStatus.classList.remove("is-visible");
  }
  readerPanel?.classList.remove("is-hidden");
  syncPageDots();
  startReadSession(itemId, usedLemmas);
  if (readerFinish) {
    readerFinish.classList.remove("is-hidden");
  }
  renderRssStory(title, blocks, itemId);
  setView("reader");
  requestAnimationFrame(() => {
    scrollToScreen(readerScreen, behavior);
  });
};

const showRssLoading = (title, message = "Loading article...") => {
  currentStoryId = null;
  readerPanel?.classList.remove("is-hidden");
  syncPageDots();
  storyTitle.innerHTML = "";
  if (title) {
    storyTitle.appendChild(buildSentenceSpan(title));
  }
  reader.innerHTML = "";
  const paragraph = document.createElement("p");
  paragraph.className = "story";
  paragraph.textContent = message;
  reader.appendChild(paragraph);
};

const requestRssItemOpen = (item, options = {}) => {
  if (rssLoadingItemId) {
    return;
  }
  closeAllHomeMenus(undefined, rssFeedList);
  openRssItem(item, options);
};

const openRssItem = async (item, { markUnread = true, levelOverride = "" } = {}) => {
  if (!item?.link) {
    return;
  }
  setRssStatus("");
  currentRssItem = item || null;
  const feedUrl = item.feedUrl || "";
  const selectedLevel = levelOverride || getRssLevel(feedUrl) || "raw";
  const wantsAdaptation = selectedLevel && selectedLevel !== "raw";
  const canAdapt = wantsAdaptation && Boolean(getApiKey());
  if (markUnread && item.id) {
    markStoryUnread(item.id);
  }
  const loadingMessage = wantsAdaptation
    ? `Adapting for ${selectedLevel}...`
    : "Loading article...";
  const requestId = setRssLoadingState(item.id, loadingMessage);
  if (wantsAdaptation && !canAdapt) {
    setRssStatus("Add an API key to adapt RSS articles.", { isError: true });
  }
  try {
    if (rssLoadController) {
      rssLoadController.abort();
    }
    rssLoadController = new AbortController();
    if (canAdapt && item.id) {
      const cached = getRssAdaptation(item.id, selectedLevel);
      if (cached?.text) {
        if (requestId !== rssLoadingRequestId) {
          return;
        }
        clearRssLoadingState();
        openRssReaderScreen(
          cached.title || item.title,
          buildBlocksFromText(cached.text),
          item.id,
          { usedLemmas: cached.usedLemmas || [] }
        );
        return;
      }
    }
    const html = await fetchRssText(item.link, rssLoadController.signal);
    if (requestId !== rssLoadingRequestId) {
      return;
    }
    const blocks = extractArticleBlocks(html);
    const usableBlocks =
      blocks.length
        ? blocks
        : item.contentHtml
          ? extractArticleBlocks(item.contentHtml)
          : [];
    if (usableBlocks.length) {
      if (canAdapt) {
        const adapted = await adaptRssArticleWithChatGPT(
          item.title,
          usableBlocks,
          selectedLevel
        );
        if (requestId !== rssLoadingRequestId) {
          return;
        }
        if (adapted?.text) {
          setRssAdaptation(item.id, selectedLevel, adapted);
          clearRssLoadingState();
          openRssReaderScreen(
            adapted.title || item.title,
            buildBlocksFromText(adapted.text),
            item.id,
            { usedLemmas: adapted.usedLemmas || [] }
          );
          return;
        }
        setRssStatus("Couldn't adapt this article.", { isError: true });
      }
      clearRssLoadingState();
      setRssAdaptation(item.id, "raw", {
        title: item.title || "",
        text: blocksToPlainText(usableBlocks),
        usedLemmas: [],
      });
      openRssReaderScreen(item.title, usableBlocks, item.id, { usedLemmas: [] });
      return;
    }
    if (item.contentHtml) {
      const fallbackBlocks = extractArticleBlocks(item.contentHtml);
      if (canAdapt) {
        const adapted = await adaptRssArticleWithChatGPT(
          item.title,
          fallbackBlocks,
          selectedLevel
        );
        if (requestId !== rssLoadingRequestId) {
          return;
        }
        if (adapted?.text) {
          setRssAdaptation(item.id, selectedLevel, adapted);
          clearRssLoadingState();
          openRssReaderScreen(
            adapted.title || item.title,
            buildBlocksFromText(adapted.text),
            item.id,
            { usedLemmas: adapted.usedLemmas || [] }
          );
          return;
        }
        setRssStatus("Couldn't adapt this article.", { isError: true });
      }
      clearRssLoadingState();
      setRssAdaptation(item.id, "raw", {
        title: item.title || "",
        text: blocksToPlainText(fallbackBlocks),
        usedLemmas: [],
      });
      openRssReaderScreen(item.title, fallbackBlocks, item.id, { usedLemmas: [] });
      return;
    }
    setRssStatus("Couldn't extract article text.", { isError: true });
    clearRssLoadingState();
    openRssReaderScreen(item.title, [], item.id, { usedLemmas: [] });
  } catch (error) {
    if (error?.name === "AbortError") {
      setRssStatus("Canceled.", { isError: false });
      return;
    }
    const fallbackBlocks = extractArticleBlocks(item.contentHtml || "");
    if (canAdapt && fallbackBlocks.length) {
      const adapted = await adaptRssArticleWithChatGPT(
        item.title,
        fallbackBlocks,
        selectedLevel
      );
      if (requestId !== rssLoadingRequestId) {
        return;
      }
      if (adapted?.text) {
        setRssAdaptation(item.id, selectedLevel, adapted);
        clearRssLoadingState();
        openRssReaderScreen(
          adapted.title || item.title,
          buildBlocksFromText(adapted.text),
          item.id,
          { usedLemmas: adapted.usedLemmas || [] }
        );
        return;
      }
    }
    setRssStatus("Couldn't load the article content.", { isError: true });
    clearRssLoadingState();
    if (fallbackBlocks.length) {
      setRssAdaptation(item.id, "raw", {
        title: item.title || "",
        text: blocksToPlainText(fallbackBlocks),
        usedLemmas: [],
      });
    }
    openRssReaderScreen(item.title, fallbackBlocks, item.id, { usedLemmas: [] });
  }
};

const fetchRssText = async (url, signal) => {
  const proxyUrl = `${RSS_PROXY_BASE}?url=${encodeURIComponent(url)}`;
  const response = await fetch(proxyUrl, { signal });
  if (!response.ok) {
    throw new Error(`Proxy HTTP ${response.status}`);
  }
  return await response.text();
};

const loadRssItems = async () => {
  if (!rssFeedList || !rssFeedEmpty) {
    return;
  }
  const urls = loadRssUrls();
  if (!urls.length) {
    rssFeedList.innerHTML = "";
    rssFeedEmpty.textContent = "Add a feed to start reading.";
    rssFeedEmpty.classList.remove("is-hidden");
    rssFeedEmptyAction?.classList.remove("is-hidden");
    setRssStatus("");
    return;
  }
  rssFeedList.innerHTML = "";
  rssFeedEmpty.textContent = "Loading feeds...";
  rssFeedEmpty.classList.remove("is-hidden");
  rssFeedEmptyAction?.classList.add("is-hidden");
  setRssStatus("");
  const parser = new DOMParser();
  const results = await Promise.allSettled(
    urls.map(async (url) => {
    const xmlText = await fetchRssText(url);
      const doc = parser.parseFromString(xmlText, "text/xml");
      if (doc.querySelector("parsererror")) {
        throw new Error("Invalid RSS XML");
      }
      return parseFeedItems(doc, url);
    })
  );
  let errors = 0;
  const items = [];
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      result.value
        .filter((item) => item.link)
        .forEach((item) => items.push(item));
    } else {
      errors += 1;
    }
  });
  items.sort((a, b) => {
    const aTime = a.date ? a.date.getTime() : 0;
    const bTime = b.date ? b.date.getTime() : 0;
    return bTime - aTime;
  });
  const sliced = items.slice(0, 30);
  sliced.forEach((item) => {
    item.id = createRssItemId(item);
  });
  renderRssFeedItems(sliced);
  if (errors) {
    setRssStatus(
      `Couldn't load ${errors} feed${errors === 1 ? "" : "s"}.`,
      { isError: true }
    );
  }
};

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

const syncReaderBottomPadding = () => {
  if (!readerPanel) {
    return;
  }
  const panelVisible =
    translationPanel && !translationPanel.classList.contains("is-hidden");
  const sheetVisible = bottomSheet && !bottomSheet.classList.contains("is-hidden");
  if (!panelVisible || !sheetVisible) {
    readerPanel.style.paddingBottom = "";
    return;
  }
  const sheetRect = bottomSheet.getBoundingClientRect();
  const extra = Math.max(0, Math.round(sheetRect.height) + 24);
  readerPanel.style.paddingBottom = `${extra}px`;
};

const getActiveReaderScrollContainer = (element) =>
  element?.closest(".book-panel") || null;

const getEffectiveReaderBottom = (containerRect) => {
  if (!bottomSheet || bottomSheet.classList.contains("is-hidden")) {
    return containerRect.bottom;
  }
  const sheetRect = bottomSheet.getBoundingClientRect();
  if (sheetRect.height <= 0) {
    return containerRect.bottom;
  }
  const overlaps =
    sheetRect.top < containerRect.bottom && sheetRect.bottom > containerRect.top;
  return overlaps ? Math.min(containerRect.bottom, sheetRect.top) : containerRect.bottom;
};

const getActiveSentenceTarget = () =>
  document.querySelector(".sentence.active") ||
  document.querySelector(".sentence.sentence-translation") ||
  document.querySelector(".word.active")?.closest(".sentence") ||
  document.querySelector(".word.active");

const ensureActiveWordVisible = (behavior = "smooth") => {
  const target = getActiveSentenceTarget();
  if (!target) {
    return;
  }
  const container = getActiveReaderScrollContainer(target);
  if (!container) {
    target.scrollIntoView({ behavior, block: "center" });
    return;
  }
  const containerRect = container.getBoundingClientRect();
  const wordRect = target.getBoundingClientRect();
  const topPadding = 16;
  const bottomPadding = 16;
  const visibleTop = containerRect.top + topPadding;
  const visibleBottom = getEffectiveReaderBottom(containerRect) - bottomPadding;

  const isTallerThanView = wordRect.height > visibleBottom - visibleTop;

  if (wordRect.top < visibleTop || isTallerThanView) {
    container.scrollBy({ top: wordRect.top - visibleTop, behavior });
  } else if (wordRect.bottom > visibleBottom) {
    container.scrollBy({ top: wordRect.bottom - visibleBottom, behavior });
  }
};

let activeWordScrollFrame = null;
const scheduleActiveWordScroll = () => {
  if (activeWordScrollFrame) {
    return;
  }
  activeWordScrollFrame = requestAnimationFrame(() => {
    activeWordScrollFrame = null;
    ensureActiveWordVisible();
  });
};

const hashString = (value) => {
  const text = String(value || "");
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
};

const createRssItemId = (item) => {
  const link = item?.link || "";
  const signature =
    link ||
    `${item?.title || ""}|${item?.source || ""}|${item?.date?.toISOString() || ""}`;
  return `rss:${hashString(signature)}`;
};

const updateTranslation = (type, german, translation, grammar, meta, options = {}) => {
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
  if (skipLemma) {
    skipLemma.classList.toggle("is-hidden", !isWord);
  }
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
  const shouldShowSheet = options.show !== false;
  if (shouldShowSheet) {
    translationPanel.classList.remove("is-hidden");
    bottomSheet.classList.remove("is-hidden", "is-closing");
    bottomSheet.classList.add("is-visible");
  }
  translationPanel.classList.toggle("is-sentence", isSentence);
  bottomSheet.classList.toggle("is-sentence", isSentence);
  sentenceDivider?.classList.toggle("is-hidden", !isSentence);
  sheetSentenceDivider?.classList.toggle("is-hidden", !isSentence);
  translationDivider?.classList.toggle("is-hidden", !isWord);
  sheetDivider?.classList.toggle("is-hidden", !isWord);
  updateCopyButtonLabel(type);
  syncPageDots();
  syncReaderBottomPadding();

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
  scheduleActiveWordScroll();
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
  startReadSession(story.id, story.usedLemmas || []);
  if (readerFinish) {
    readerFinish.classList.remove("is-hidden");
  }
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

const saveLibraryViewPreference = (value) => {
  if (!value) {
    return;
  }
  try {
    localStorage.setItem(LIBRARY_VIEW_KEY, String(value));
  } catch (error) {
    console.warn("Failed to save library view preference.", error);
  }
};

const loadLibraryViewPreference = () => {
  try {
    return localStorage.getItem(LIBRARY_VIEW_KEY) || "";
  } catch (error) {
    console.warn("Failed to load library view preference.", error);
    return "";
  }
};

const refreshLibraryViews = () => {
  if (!libraryStack) {
    libraryViews = [];
    return;
  }
  libraryViews = Array.from(libraryStack.querySelectorAll(".library-view"));
};

const setLibraryView = (index) => {
  if (!libraryPanel || !libraryStack) {
    return;
  }
  refreshLibraryViews();
  if (!libraryViews.length) {
    return;
  }
  const normalized =
    ((index % libraryViews.length) + libraryViews.length) % libraryViews.length;
  const activeView = libraryViews[normalized];
  if (!activeView) {
    return;
  }
  libraryActiveIndex = normalized;
  const viewName = activeView.dataset.libraryView || String(normalized);
  libraryPanel.dataset.libraryView = viewName;
  saveLibraryViewPreference(viewName);
  libraryViews.forEach((view, viewIndex) => {
    const isActive = viewIndex === normalized;
    view.classList.toggle("is-active", isActive);
    view.setAttribute("aria-hidden", isActive ? "false" : "true");
    if (isActive) {
      view.removeAttribute("inert");
    } else {
      view.setAttribute("inert", "");
    }
  });
};

const setLibraryPull = (value) => {
  if (!libraryPanel) {
    return;
  }
  const clamped = Math.max(0, Math.min(value, 90));
  libraryPanel.style.setProperty("--library-pull", `${clamped}px`);
  libraryPanel.classList.toggle("is-pulling", clamped > 0);
};

const resetLibraryPull = () => {
  libraryOverscroll = 0;
  setLibraryPull(0);
};

const switchLibraryView = () => {
  if (libraryIsSwitching || !libraryViews.length) {
    return;
  }
  libraryIsSwitching = true;
  resetLibraryPull();
  const nextIndex = (libraryActiveIndex + 1) % libraryViews.length;
  setLibraryView(nextIndex);
  window.setTimeout(() => {
    libraryIsSwitching = false;
  }, 520);
};

const handleLibraryScroll = (event) => {
  const view = event.currentTarget;
  if (!view || view.scrollTop > 0) {
    resetLibraryPull();
  }
};

const handleLibraryWheel = (event) => {
  const view = event.currentTarget;
  if (!view || libraryViews[libraryActiveIndex] !== view) {
    return;
  }
  if (view.scrollTop > 0 || event.deltaY >= 0) {
    if (libraryOverscroll !== 0) {
      resetLibraryPull();
    }
    return;
  }
  libraryOverscroll += Math.abs(event.deltaY);
  setLibraryPull(libraryOverscroll);
  if (libraryOverscroll > 110) {
    switchLibraryView();
  }
};

const handleLibraryTouchStart = (event) => {
  if (libraryViews[libraryActiveIndex] !== event.currentTarget) {
    return;
  }
  const touch = event.touches[0];
  libraryTouchActive = true;
  libraryTouchStartY = touch.clientY;
  libraryTouchStartX = touch.clientX;
  libraryTouchAxis = "";
  libraryOverscroll = 0;
};

const handleLibraryTouchMove = (event) => {
  if (!libraryTouchActive || libraryViews[libraryActiveIndex] !== event.currentTarget) {
    return;
  }
  const touch = event.touches[0];
  const deltaY = touch.clientY - libraryTouchStartY;
  const deltaX = touch.clientX - libraryTouchStartX;
  if (!libraryTouchAxis && (Math.abs(deltaY) > 6 || Math.abs(deltaX) > 6)) {
    libraryTouchAxis = Math.abs(deltaX) > Math.abs(deltaY) ? "x" : "y";
  }
  if (libraryTouchAxis === "x") {
    return;
  }
  if (event.currentTarget.scrollTop <= 0 && deltaY > 0) {
    event.preventDefault();
    libraryOverscroll = deltaY;
    setLibraryPull(libraryOverscroll);
    if (libraryOverscroll > 110) {
      libraryTouchActive = false;
      switchLibraryView();
    }
    return;
  }
  if (libraryOverscroll !== 0) {
    resetLibraryPull();
  }
};

const handleLibraryTouchEnd = () => {
  libraryTouchActive = false;
  libraryTouchAxis = "";
  resetLibraryPull();
};

const initializeLibraryViews = () => {
  if (!libraryPanel || libraryViews.length < 2) {
    return;
  }
  const preferred = loadLibraryViewPreference();
  const startIndex = libraryViews.findIndex((view) => {
    if (preferred) {
      return view.dataset.libraryView === preferred;
    }
    return view.dataset.libraryView === libraryPanel.dataset.libraryView;
  });
  setLibraryView(startIndex >= 0 ? startIndex : 0);
  libraryViews.forEach((view) => {
    view.addEventListener("scroll", handleLibraryScroll, { passive: true });
    view.addEventListener("wheel", handleLibraryWheel, { passive: true });
    view.addEventListener("touchstart", handleLibraryTouchStart, { passive: true });
    view.addEventListener("touchmove", handleLibraryTouchMove, { passive: false });
    view.addEventListener("touchend", handleLibraryTouchEnd, { passive: true });
    view.addEventListener("touchcancel", handleLibraryTouchEnd, { passive: true });
  });
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

const setupReadObserver = () => {};

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
      if (!Array.isArray(entry.originals)) {
        entry.originals = [];
      }
      if (!entry.originals.length && entry.original) {
        entry.originals = [{ word: entry.original, translation: "" }];
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

const setReaderStatusMessage = (lemmas = []) => {
  if (!readerStatus) {
    return;
  }
  const labelEl = readerStatus.querySelector(".reader-status-label");
  if (labelEl) {
    labelEl.textContent = "Marked as read.";
  } else {
    readerStatus.textContent = "Marked as read.";
  }
  if (!readerStatusLemmas) {
    return;
  }
  if (Array.isArray(lemmas) && lemmas.length) {
    readerStatusLemmas.textContent = `Learned: ${lemmas.join(", ")}`;
    readerStatusLemmas.classList.remove("is-hidden");
  } else {
    readerStatusLemmas.textContent = "";
    readerStatusLemmas.classList.add("is-hidden");
  }
};

const startReadSession = (storyId, usedLemmas = []) => {
  currentReadSession = {
    storyId: String(storyId || ""),
    usedLemmas: Array.isArray(usedLemmas) ? usedLemmas : [],
    clickedLemmas: new Set(),
  };
  setReaderStatusMessage([]);
};

const recordLemmaTranslation = (lemma, originalWord, translation) => {
  const normalized = normalizeLemmaKey(lemma);
  if (!normalized) {
    return;
  }
  if (currentReadSession && currentReadSession.storyId === String(currentStoryId)) {
    currentReadSession.clickedLemmas.add(normalized);
  }
  const stats = loadLemmaStats();
  const existing = stats[normalized];
  const nextCount = existing?.count ? Number(existing.count) + 1 : 1;
  const trimmedLemma = String(lemma).trim();
  const trimmedOriginal = String(originalWord || lemma).trim();
  const trimmedTranslation = String(translation || "").trim();
  const originals = Array.isArray(existing?.originals) ? existing.originals : [];
  const originalKey = normalizeLemmaKey(trimmedOriginal);
  const existingOriginal = originals.find(
    (entry) => normalizeLemmaKey(entry?.word) === originalKey
  );
  if (originalKey) {
    if (existingOriginal) {
      if (!existingOriginal.translation && trimmedTranslation) {
        existingOriginal.translation = trimmedTranslation;
      }
    } else {
      originals.push({
        word: trimmedOriginal,
        translation: trimmedTranslation,
      });
    }
  }
  stats[normalized] = {
    lemma: existing?.lemma || trimmedLemma,
    original: existing?.original || trimmedOriginal,
    originals,
    count: Number.isFinite(nextCount) ? nextCount : 1,
    lastTranslatedAt: new Date().toISOString(),
    isLearned: existing?.isLearned ?? false,
  };
  saveLemmaStats(stats);
  updateLemmaBadge();
  renderLemmaList();
};

const setPendingLemmaEntry = (lemma, originalWord, translation, sourceEl) => {
  const normalized = normalizeLemmaKey(lemma);
  if (!normalized) {
    pendingLemmaEntry = null;
    return;
  }
  pendingLemmaEntry = {
    lemma,
    originalWord,
    translation,
    sourceEl,
  };
};

const commitPendingLemmaEntry = () => {
  if (!pendingLemmaEntry) {
    return;
  }
  recordLemmaTranslation(
    pendingLemmaEntry.lemma,
    pendingLemmaEntry.originalWord,
    pendingLemmaEntry.translation
  );
  pendingLemmaEntry = null;
};

const commitPendingLemmaIfNeeded = (nextWordEl) => {
  if (!pendingLemmaEntry) {
    return;
  }
  if (nextWordEl && pendingLemmaEntry.sourceEl === nextWordEl) {
    return;
  }
  commitPendingLemmaEntry();
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

const markLearnedLemmasAndGetNew = (lemmas) => {
  if (!Array.isArray(lemmas) || !lemmas.length) {
    return [];
  }
  const stats = loadLemmaStats();
  let changed = false;
  const newlyLearned = [];
  lemmas.forEach((lemma) => {
    const normalized = normalizeLemmaKey(lemma);
    if (!normalized || !stats[normalized] || stats[normalized].isLearned) {
      return;
    }
    stats[normalized].isLearned = true;
    changed = true;
    newlyLearned.push(stats[normalized].lemma || String(lemma).trim());
  });
  if (!changed) {
    return [];
  }
  saveLemmaStats(stats);
  renderLemmaList();
  updateLemmaBadge();
  return newlyLearned;
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

const setLemmaLearnedStatus = (lemma, isLearned) => {
  const key = normalizeLemmaKey(lemma);
  if (!key) {
    return;
  }
  const stats = loadLemmaStats();
  if (!stats[key] || stats[key].isLearned === isLearned) {
    return;
  }
  stats[key].isLearned = isLearned;
  saveLemmaStats(stats);
  renderLemmaList();
  updateLemmaBadge();
};

const deleteLemmaEntry = (lemma) => {
  const key = normalizeLemmaKey(lemma);
  if (!key) {
    return;
  }
  const stats = loadLemmaStats();
  if (!stats[key]) {
    return;
  }
  delete stats[key];
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
  const readStories = stories.filter((story) =>
    Boolean(statusMap[String(story.id)]?.isRead)
  );
  const orderedStories = [...unreadStories, ...readStories];
  orderedStories.forEach((story) => {
    const item = document.createElement("div");
    item.className = "home-item";
    item.dataset.storyId = String(story.id);
    const isRead = Boolean(statusMap[String(story.id)]?.isRead);
    if (isRead) {
      item.classList.add("is-read");
    }

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

  const addCta = document.createElement("button");
  addCta.className = "primary home-empty-action";
  addCta.type = "button";
  addCta.textContent = "Add new story";
  addCta.addEventListener("click", () => {
    showAddTextModal();
  });
  homeList.appendChild(addCta);
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

const updateRssReadStatus = (itemId, isRead) => {
  if (!rssFeedList || !itemId) {
    return;
  }
  const item = rssFeedList.querySelector(`.home-item[data-id="${itemId}"]`);
  if (!item) {
    return;
  }
  item.classList.toggle("is-read", isRead);
  const toggleButton = item.querySelector(".home-action.toggle");
  if (toggleButton) {
    toggleButton.textContent = isRead ? "Mark as unread" : "Mark as read";
  }
};

const refreshRssFeedItems = () => {
  if (!rssFeedList) {
    return;
  }
  if (!Array.isArray(rssCurrentItems) || !rssCurrentItems.length) {
    return;
  }
  renderRssFeedItems(rssCurrentItems);
};

const getReaderTextForLearning = () => {
  const titleText = storyTitle?.textContent || "";
  const bodyText = reader?.textContent || "";
  return `${titleText}\n${bodyText}`.trim();
};

const markStoryRead = (storyId) => {
  if (!storyId) {
    return;
  }
  if (readerFinish) {
    readerFinish.classList.add("is-hidden");
  }
  const status = loadReadStatus();
  const key = String(storyId);
  if (status[key]?.isRead) {
    return;
  }
  status[key] = {
    isRead: true,
    readAt: new Date().toISOString(),
  };
  saveReadStatus(status);
  let newlyLearned = [];
  if (currentReadSession && currentReadSession.storyId === key) {
    const stats = loadLemmaStats();
    const clicked = currentReadSession.clickedLemmas;
    const candidateKeys = new Set();
    currentReadSession.usedLemmas
      .map((lemma) => normalizeLemmaKey(lemma))
      .filter((lemmaKey) => lemmaKey && !clicked.has(lemmaKey))
      .forEach((lemmaKey) => {
        if (stats[lemmaKey]) {
          candidateKeys.add(lemmaKey);
        }
      });
    const storyText = getReaderTextForLearning();
    if (storyText) {
      Object.entries(stats).forEach(([lemmaKey, entry]) => {
        if (!entry || clicked.has(lemmaKey) || entry.isLearned) {
          return;
        }
        if (textIncludesLemma(storyText, entry.lemma)) {
          candidateKeys.add(lemmaKey);
          return;
        }
        const originals = Array.isArray(entry.originals) ? entry.originals : [];
        const legacyOriginal = entry.original && !originals.length
          ? [{ word: entry.original, translation: "" }]
          : [];
        const originalList = originals.length ? originals : legacyOriginal;
        const hasOriginalMatch = originalList.some((original) =>
          textIncludesLemma(storyText, original?.word || original)
        );
        if (hasOriginalMatch) {
          candidateKeys.add(lemmaKey);
        }
      });
    }
    const candidates = Array.from(candidateKeys).map(
      (lemmaKey) => stats[lemmaKey]?.lemma || lemmaKey
    );
    newlyLearned = markLearnedLemmasAndGetNew(candidates);
  }
  setReaderStatusMessage(newlyLearned);
  if (isRssItemId(key)) {
    const rssItem =
      currentRssItem?.id === key
        ? currentRssItem
        : rssCurrentItems.find((entry) => String(entry.id) === key);
    if (rssItem) {
      upsertRssArchiveItem(rssItem, status[key].readAt);
    }
  }
  if (readerStatus) {
    readerStatus.classList.remove("is-hidden");
    readerStatus.classList.remove("is-visible");
    requestAnimationFrame(() => {
      readerStatus.classList.add("is-visible");
    });
  }
  updateHomeReadStatus(String(storyId), true);
  updateRssReadStatus(String(storyId), true);
  if (isRssItemId(key)) {
    refreshRssFeedItems();
  }
  renderHomeStories(loadStories());
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
  if (isRssItemId(key)) {
    removeRssArchiveItem(key);
  }
  if (readerStatus) {
    readerStatus.classList.add("is-hidden");
  }
  updateHomeReadStatus(key, false);
  updateRssReadStatus(key, false);
  if (isRssItemId(key)) {
    refreshRssFeedItems();
  }
  renderHomeStories(loadStories());
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

const getLemmaSearchQuery = () =>
  String(lemmaSearch?.value || "").trim().toLowerCase();

const getLemmaMatchInfo = (entry, query) => {
  if (!query) {
    return { matches: true, matchesOriginal: false };
  }
  const lemmaText = String(entry?.lemma || "").toLowerCase();
  if (lemmaText.includes(query)) {
    return { matches: true, matchesOriginal: false };
  }
  const originals = Array.isArray(entry?.originals) ? entry.originals : [];
  const legacyOriginal = entry?.original ? [{ word: entry.original, translation: "" }] : [];
  const list = originals.length ? originals : legacyOriginal;
  const matchesOriginal = list.some((item) => {
    if (!item) {
      return false;
    }
    if (typeof item === "string") {
      return item.toLowerCase().includes(query);
    }
    const word = String(item.word || "").toLowerCase();
    const translation = String(item.translation || "").toLowerCase();
    return word.includes(query) || translation.includes(query);
  });
  return { matches: matchesOriginal, matchesOriginal };
};

const buildLemmaOriginals = (entry) => {
  const originals = Array.isArray(entry?.originals) ? entry.originals : [];
  if (!originals.length) {
    return null;
  }
  const details = document.createElement("div");
  details.className = "lemma-originals";
  originals.forEach((original) => {
    const row = document.createElement("div");
    row.className = "lemma-original";

    const word = document.createElement("span");
    word.className = "lemma-original-word";
    word.textContent = original?.word || "";

    row.appendChild(word);

    const translationText = String(original?.translation || "").trim();
    if (translationText) {
      const translation = document.createElement("span");
      translation.className = "lemma-original-translation";
      translation.textContent = `- ${translationText}`;
      row.appendChild(translation);
    }

    details.appendChild(row);
  });
  const actions = document.createElement("div");
  actions.className = "lemma-original-actions";
  const deleteButton = document.createElement("button");
  deleteButton.className = "ghost mini lemma-action lemma-delete";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete lemma";
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    deleteLemmaEntry(entry?.lemma);
  });
  actions.appendChild(deleteButton);
  details.appendChild(actions);
  return details;
};

const attachLemmaDetailsToggle = (item, details, toggleEl) => {
  if (!details) {
    return;
  }
  const setExpanded = (expanded) => {
    item.classList.toggle("is-expanded", expanded);
  };
  const toggleExpanded = () => {
    setExpanded(!item.classList.contains("is-expanded"));
  };

  item.classList.add("is-collapsible");
  item.setAttribute("role", "button");
  item.setAttribute("tabindex", "0");
  item.addEventListener("click", toggleExpanded);
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleExpanded();
    }
  });
  setExpanded(false);
};

const renderLemmaList = () => {
  if (!lemmaList) {
    return;
  }
  const query = getLemmaSearchQuery();
  const entries = getLemmaEntries()
    .map((entry) => ({ entry, match: getLemmaMatchInfo(entry, query) }))
    .filter((item) => item.match.matches);
  const total = entries.length;
  lemmaList.innerHTML = "";
  if (!entries.length) {
    if (lemmaEmpty) {
      lemmaEmpty.textContent = query ? "No matches." : lemmaEmptyDefaultText;
    }
    lemmaEmpty?.classList.remove("is-hidden");
  } else {
    lemmaEmpty?.classList.add("is-hidden");
    const fragment = document.createDocumentFragment();
    entries.forEach(({ entry, match }, index) => {
      const position = index + 1;
      const countValue = Number(entry.count) || 1;
      const item = document.createElement("div");
      item.className = "lemma-item";

      const row = document.createElement("div");
      row.className = "lemma-row";

      const name = document.createElement("span");
      name.className = "lemma-name";
      name.textContent = entry.lemma;

      const metrics = document.createElement("div");
      metrics.className = "lemma-metrics";

      const count = document.createElement("span");
      count.className = "lemma-count";
      count.textContent = `×${countValue}`;

      metrics.appendChild(count);
      const markLearned = document.createElement("button");
      markLearned.className = "ghost mini lemma-action";
      markLearned.type = "button";
      markLearned.textContent = "Mark as learned";
      markLearned.addEventListener("click", (event) => {
        event.stopPropagation();
        setLemmaLearnedStatus(entry.lemma, true);
      });
      metrics.appendChild(markLearned);
      const toggle = document.createElement("span");
      toggle.className = "lemma-toggle";
      metrics.appendChild(toggle);

      row.appendChild(name);
      row.appendChild(metrics);
      item.appendChild(row);
      const details = buildLemmaOriginals(entry);
      if (details) {
        item.appendChild(details);
        attachLemmaDetailsToggle(item, details, toggle);
        if (query && match.matchesOriginal) {
          item.classList.add("is-expanded");
        }
      } else {
        toggle.remove();
      }
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
  const query = getLemmaSearchQuery();
  const entries = getLemmaEntries({ includeLearned: true })
    .map((entry) => ({ entry, match: getLemmaMatchInfo(entry, query) }))
    .filter((item) => item.match.matches);
  lemmaLearnedList.innerHTML = "";
  if (!entries.length) {
    if (lemmaLearnedEmpty) {
      lemmaLearnedEmpty.textContent = query
        ? "No matches."
        : lemmaLearnedEmptyDefaultText;
    }
    lemmaLearnedEmpty?.classList.remove("is-hidden");
    return;
  }
  lemmaLearnedEmpty?.classList.add("is-hidden");
  const fragment = document.createDocumentFragment();
  entries.forEach(({ entry, match }) => {
    const item = document.createElement("div");
    item.className = "lemma-item";

    const row = document.createElement("div");
    row.className = "lemma-row";

    const name = document.createElement("span");
    name.className = "lemma-name";
    name.textContent = entry.lemma;

    const metrics = document.createElement("div");
    metrics.className = "lemma-metrics";

    const count = document.createElement("span");
    count.className = "lemma-count";
    count.textContent = `×${Number(entry.count) || 1}`;

    metrics.appendChild(count);
    const markUnlearned = document.createElement("button");
    markUnlearned.className = "ghost mini lemma-action";
    markUnlearned.type = "button";
    markUnlearned.textContent = "Mark as unlearned";
    markUnlearned.addEventListener("click", (event) => {
      event.stopPropagation();
      setLemmaLearnedStatus(entry.lemma, false);
    });
    metrics.appendChild(markUnlearned);
    const toggle = document.createElement("span");
    toggle.className = "lemma-toggle";
    metrics.appendChild(toggle);

    row.appendChild(name);
    row.appendChild(metrics);
    item.appendChild(row);
    const details = buildLemmaOriginals(entry);
    if (details) {
      item.appendChild(details);
      attachLemmaDetailsToggle(item, details, toggle);
      if (query && match.matchesOriginal) {
        item.classList.add("is-expanded");
      }
    } else {
      toggle.remove();
    }
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

const buildStoryBlocks = (text) => {
  const raw = String(text || "").replace(/\r\n/g, "\n").trim();
  if (!raw) {
    return [];
  }
  const hasParagraphBreaks = /\n\s*\n/.test(raw);
  const chunks = hasParagraphBreaks ? raw.split(/\n\s*\n/) : raw.split(/\n+/);
  return chunks
    .map((chunk) => normalizeArticleText(chunk.replace(/\n+/g, " ")))
    .filter(Boolean)
    .map((line) => ({ type: "paragraph", text: line }));
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

  const blocks = buildStoryBlocks(story.text);
  if (!blocks.length) {
    const empty = document.createElement("p");
    empty.className = "story";
    empty.textContent = "No readable text available.";
    reader.appendChild(empty);
    return;
  }
  blocks.forEach((block) => {
    const sentences = splitIntoSentences(block.text);
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
  const sentence = event.target.closest(".sentence");
  commitPendingLemmaIfNeeded(word);
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
      setPendingLemmaEntry(meta.lemma || displayGerman, german, translation, word);
      setWordLoading(word, false);
      updateTranslation("word", displayGerman, translation, grammar, meta);
    });
    return;
  }

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
    commitPendingLemmaIfNeeded(null);
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

const startBottomSheetDrag = (event) => {
  if (!bottomSheet || bottomSheet.classList.contains("is-hidden")) {
    return;
  }
  if (event.button && event.button !== 0) {
    return;
  }
  if (event.target.closest("button, a, input, textarea, select")) {
    return;
  }
  sheetDragPointerId = event.pointerId;
  sheetDragStartY = event.clientY;
  sheetDragDeltaY = 0;
  sheetDragActive = true;
  bottomSheet.classList.add("is-dragging");
  bottomSheet.setPointerCapture?.(event.pointerId);
};

const moveBottomSheetDrag = (event) => {
  if (!sheetDragActive || event.pointerId !== sheetDragPointerId) {
    return;
  }
  const delta = Math.max(0, event.clientY - sheetDragStartY);
  sheetDragDeltaY = delta;
  bottomSheet.style.transform = `translateY(${delta}px)`;
};

const endBottomSheetDrag = (event) => {
  if (!sheetDragActive || event.pointerId !== sheetDragPointerId) {
    return;
  }
  bottomSheet.releasePointerCapture?.(event.pointerId);
  bottomSheet.classList.remove("is-dragging");
  const threshold = Math.max(80, bottomSheet.getBoundingClientRect().height * 0.25);
  const shouldClose = sheetDragDeltaY > threshold;
  sheetDragActive = false;
  sheetDragPointerId = null;
  sheetDragStartY = 0;
  sheetDragDeltaY = 0;
  bottomSheet.style.transform = "";
  if (shouldClose) {
    resetTranslation({ animate: false });
  }
};

const startBottomSheetTouchDrag = (event) => {
  if (!bottomSheet || bottomSheet.classList.contains("is-hidden")) {
    return;
  }
  const touch = event.touches?.[0];
  if (!touch) {
    return;
  }
  if (event.target.closest("button, a, input, textarea, select")) {
    return;
  }
  sheetDragPointerId = "touch";
  sheetDragStartY = touch.clientY;
  sheetDragDeltaY = 0;
  sheetDragActive = true;
  bottomSheet.classList.add("is-dragging");
};

const moveBottomSheetTouchDrag = (event) => {
  if (!sheetDragActive || sheetDragPointerId !== "touch") {
    return;
  }
  const touch = event.touches?.[0];
  if (!touch) {
    return;
  }
  const delta = Math.max(0, touch.clientY - sheetDragStartY);
  sheetDragDeltaY = delta;
  bottomSheet.style.transform = `translateY(${delta}px)`;
  if (delta > 0) {
    event.preventDefault();
  }
};

const endBottomSheetTouchDrag = () => {
  if (!sheetDragActive || sheetDragPointerId !== "touch") {
    return;
  }
  bottomSheet.classList.remove("is-dragging");
  const threshold = Math.max(80, bottomSheet.getBoundingClientRect().height * 0.25);
  const shouldClose = sheetDragDeltaY > threshold;
  sheetDragActive = false;
  sheetDragPointerId = null;
  sheetDragStartY = 0;
  sheetDragDeltaY = 0;
  bottomSheet.style.transform = "";
  if (shouldClose) {
    resetTranslation({ animate: false });
  }
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

if (bottomSheet) {
  bottomSheet.addEventListener("pointerdown", startBottomSheetDrag);
  bottomSheet.addEventListener("pointermove", moveBottomSheetDrag);
  bottomSheet.addEventListener("pointerup", endBottomSheetDrag);
  bottomSheet.addEventListener("pointercancel", endBottomSheetDrag);
  bottomSheet.addEventListener("touchstart", startBottomSheetTouchDrag, { passive: true });
  bottomSheet.addEventListener("touchmove", moveBottomSheetTouchDrag, { passive: false });
  bottomSheet.addEventListener("touchend", endBottomSheetTouchDrag);
  bottomSheet.addEventListener("touchcancel", endBottomSheetTouchDrag);
}

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

const resetTranslation = ({ animate = true, commitLemma = true } = {}) => {
  if (pendingController) {
    pendingController.abort();
  }
  if (commitLemma) {
    commitPendingLemmaEntry();
  } else {
    pendingLemmaEntry = null;
  }
  translationRequestId += 1;
  clearActiveWord();
  clearSentenceTranslationHighlight();
  clearActiveSentence();
  clearGoverningHighlight();
  const applyEmptyTranslation = () => {
    updateTranslation(
      "word",
      "Tap a word",
      "Перевод на русский появится здесь.",
      "Объяснение склонения появится здесь.",
      null,
      { show: false }
    );
  };
  if (resetTranslationTimer) {
    window.clearTimeout(resetTranslationTimer);
    resetTranslationTimer = null;
  }
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
  if (bottomSheet) {
    bottomSheet.classList.remove("is-dragging");
    bottomSheet.style.transform = "";
    if (bottomSheet.classList.contains("is-visible") && animate) {
      bottomSheet.classList.add("is-closing");
      resetTranslationTimer = window.setTimeout(() => {
        applyEmptyTranslation();
        bottomSheet.classList.add("is-hidden");
        bottomSheet.classList.remove("is-visible", "is-closing");
        resetTranslationTimer = null;
      }, 360);
    } else {
      applyEmptyTranslation();
      bottomSheet.classList.add("is-hidden");
      bottomSheet.classList.remove("is-visible", "is-closing");
    }
  } else {
    applyEmptyTranslation();
  }
  syncReaderBottomPadding();
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

skipLemma?.addEventListener("click", () => {
  resetTranslation({ commitLemma: false });
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
  if (readerSizeSettings) {
    readerSizeSettings.value = String(clamped);
  }
};

const applyReaderLeading = (leading) => {
  const clamped = Math.min(2, Math.max(1.1, Number(leading) || 1.45));
  document.body.style.setProperty("--reader-leading", clamped);
  localStorage.setItem("reader_leading", String(clamped));
  if (readerLeading) {
    readerLeading.value = String(clamped);
  }
  if (readerLeadingSettings) {
    readerLeadingSettings.value = String(clamped);
  }
};

const applyReaderHyphenation = (mode) => {
  const normalized = mode === "off" ? "off" : "on";
  document.body.dataset.readerHyphenation = normalized;
  localStorage.setItem("reader_hyphenation", normalized);
  hyphenationOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.hyphenation === normalized);
  });
};

const applyReaderJustification = (mode) => {
  const normalized = mode === "justify" ? "justify" : "left";
  document.body.dataset.readerJustify = normalized;
  localStorage.setItem("reader_justify", normalized);
  justificationOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.justify === normalized);
  });
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

hyphenationOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyReaderHyphenation(option.dataset.hyphenation);
  });
});

justificationOptions.forEach((option) => {
  option.addEventListener("click", () => {
    applyReaderJustification(option.dataset.justify);
  });
});

if (readerSize) {
  readerSize.addEventListener("input", () => {
    applyReaderSize(readerSize.value);
  });
}
if (readerSizeSettings) {
  readerSizeSettings.addEventListener("input", () => {
    applyReaderSize(readerSizeSettings.value);
  });
}

if (readerLeading) {
  readerLeading.addEventListener("input", () => {
    applyReaderLeading(readerLeading.value);
  });
}
if (readerLeadingSettings) {
  readerLeadingSettings.addEventListener("input", () => {
    applyReaderLeading(readerLeadingSettings.value);
  });
}

const storedFont = localStorage.getItem("reader_font") || "serif";
const storedSize = localStorage.getItem("reader_size") || "20";
const storedLeading = localStorage.getItem("reader_leading") || "1.45";
const storedHyphenation = localStorage.getItem("reader_hyphenation") || "on";
const storedJustify = localStorage.getItem("reader_justify") || "left";
applyReaderFont(storedFont);
applyReaderSize(storedSize);
applyReaderLeading(storedLeading);
applyReaderHyphenation(storedHyphenation);
applyReaderJustification(storedJustify);
const storedWordCount = localStorage.getItem(STORY_WORD_COUNT_KEY) || "120";
const storedLevel = localStorage.getItem(STORY_LEVEL_KEY) || "A2";
const storedStyle = localStorage.getItem(STORY_STYLE_KEY) || "casual";
applyStoryWordCount(storedWordCount);
applyStoryLevel(storedLevel);
applyStoryStyle(storedStyle);

const setApiKeyRequirement = (required) => {
  document.body.classList.toggle("requires-key", required);
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

const openReaderAppearanceModal = () => {
  if (!readerAppearanceModal) {
    return;
  }
  readerAppearanceModal.classList.remove("is-hidden");
};

const closeReaderAppearanceModal = () => {
  if (!readerAppearanceModal) {
    return;
  }
  readerAppearanceModal.classList.add("is-hidden");
};

const addRssSubscription = () => {
  if (!rssUrlInput) {
    return;
  }
  const normalized = normalizeRssUrl(rssUrlInput.value);
  if (!normalized) {
    setRssModalStatus("Paste a feed URL to add it.", { isError: true });
    return;
  }
  let url;
  try {
    url = new URL(normalized).toString();
  } catch (error) {
    setRssModalStatus("Enter a valid URL.", { isError: true });
    return;
  }
  const urls = loadRssUrls();
  let added = false;
  if (!urls.includes(url)) {
    urls.push(url);
    saveRssUrls(urls);
    ensureRssLevel(url, "raw");
    added = true;
  }
  rssUrlInput.value = "";
  setRssModalStatus("");
  renderRssSubscriptions();
  loadRssItems();
  return added;
};

const openRssManagerInSettings = () => {
  openSettingsScreen(false);
  requestAnimationFrame(() => {
    rssUrlInput?.focus();
    rssUrlInput?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
};

const addRssSubscriptionUrl = (rawUrl) => {
  const normalized = normalizeRssUrl(rawUrl);
  if (!normalized) {
    return false;
  }
  let url;
  try {
    url = new URL(normalized).toString();
  } catch (error) {
    setRssModalStatus("Enter a valid URL.", { isError: true });
    return false;
  }
  const urls = loadRssUrls();
  let added = false;
  if (!urls.includes(url)) {
    urls.push(url);
    saveRssUrls(urls);
    ensureRssLevel(url, "raw");
    added = true;
  }
  setRssModalStatus("");
  renderRssSubscriptions();
  loadRssItems();
  return added;
};

const initializeStories = () => {
  const storedKey = localStorage.getItem("chatgpt_api_key");
  const stories = loadStories();
  renderHomeStories(stories);
  renderLemmaList();
  renderRssSubscriptions();
  loadRssItems();
  if (!stories.length) {
    storyTitle.textContent = "";
    reader.innerHTML = "";
    translationPanel.classList.add("is-hidden");
  }
  handleRoute();
  if (!storedKey) {
    openSettingsScreen(true, "auto");
  }
  setInitialScreen();
  syncPageDots();
};

let hasSetInitialScreen = false;
const setInitialScreen = () => {
  if (hasSetInitialScreen || !screenLayout) {
    return;
  }
  const requiresKey = document.body.classList.contains("requires-key");
  const targetScreen = requiresKey ? settingsScreen : libraryScreen;
  if (
    !targetScreen ||
    (!requiresKey && document.body.classList.contains("view-reader"))
  ) {
    return;
  }
  hasSetInitialScreen = true;
  requestAnimationFrame(() => {
    const previousBehavior = screenLayout.style.scrollBehavior;
    screenLayout.style.scrollBehavior = "auto";
    screenLayout.scrollLeft = targetScreen.offsetLeft;
    screenLayout.style.scrollBehavior = previousBehavior;
    requestPageDotsUpdate();
  });
};

initializeLibraryViews();
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
if (rssRefresh) {
  rssRefresh.addEventListener("click", () => {
    loadRssItems();
  });
}
if (rssFeedEmptyAction) {
  rssFeedEmptyAction.addEventListener("click", openRssManagerInSettings);
}
if (openReaderAppearance) {
  openReaderAppearance.addEventListener("click", () => {
    openReaderAppearanceModal();
  });
}
if (readerFinish) {
  readerFinish.addEventListener("click", () => {
    if (currentStoryId) {
      markStoryRead(currentStoryId);
      setTimeout(() => {
        if (readerStatusLemmas) {
          readerStatusLemmas.scrollIntoView({ behavior: "smooth", block: "end" });
          return;
        }
        if (readerView) {
          readerView.scrollTo({
            top: readerView.scrollHeight,
            behavior: "smooth",
          });
          return;
        }
        readerEnd?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 500);
    }
  });
}
if (homeList) {
  homeList.addEventListener("contextmenu", (event) => {
    if (event.target.closest(".home-item")) {
      event.preventDefault();
    }
  });
}

if (rssFeedList) {
  rssFeedList.addEventListener("contextmenu", (event) => {
    if (event.target.closest(".home-item")) {
      event.preventDefault();
    }
  });
}
if (reloadApp) {
  reloadApp.addEventListener("click", () => {
    window.location.reload();
  });
}

window.addEventListener("resize", () => {
  syncReaderBottomPadding();
  scheduleActiveWordScroll();
});


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
if (lemmaSearch) {
  lemmaSearch.addEventListener("input", () => {
    renderLemmaList();
  });
  lemmaSearch.addEventListener("focus", () => {
    const panel = lemmaSearch.closest(".book-panel");
    if (!panel) {
      return;
    }
    const stickyOffset = -20;
    setTimeout(() => {
      const panelRect = panel.getBoundingClientRect();
      const inputRect = lemmaSearch.getBoundingClientRect();
      const delta = inputRect.top - panelRect.top;
      const targetTop = Math.max(0, panel.scrollTop + delta + stickyOffset);
      panel.scrollTo({ top: targetTop, behavior: "smooth" });
    }, 60);
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

if (closeReaderAppearance) {
  closeReaderAppearance.addEventListener("click", closeReaderAppearanceModal);
}

if (readerAppearanceModal) {
  readerAppearanceModal.addEventListener("click", (event) => {
    if (
      event.target === readerAppearanceModal ||
      event.target.closest("[data-close-modal]")
    ) {
      closeReaderAppearanceModal();
    }
  });
}

resetAllDataButton?.addEventListener("click", () => {
  const shouldReset = window.confirm(
    "Reset all stored data (stories, lemmas, RSS, and reader settings)? This will keep your API key."
  );
  if (!shouldReset) {
    return;
  }
  const apiKey = localStorage.getItem("chatgpt_api_key");
  localStorage.clear();
  if (apiKey) {
    localStorage.setItem("chatgpt_api_key", apiKey);
  }
  window.location.reload();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !addTextModal.classList.contains("is-hidden")) {
    closeAddTextModal();
  }
  if (event.key === "Escape" && readerAppearanceModal && !readerAppearanceModal.classList.contains("is-hidden")) {
    closeReaderAppearanceModal();
  }
});

if (rssAdd) {
  rssAdd.addEventListener("click", addRssSubscription);
}

if (rssUrlInput) {
  rssUrlInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addRssSubscription();
    }
  });
}

if (rssSubscriptions) {
  rssSubscriptions.addEventListener("click", (event) => {
    const levelButton = event.target.closest("button[data-level]");
    if (levelButton) {
      const url = levelButton.dataset.url;
      const level = levelButton.dataset.level;
      if (setRssLevel(url, level)) {
        renderRssSubscriptions();
      }
      return;
    }
    const removeButton = event.target.closest("button[data-url]");
    if (!removeButton) {
      return;
    }
    removeRssSubscriptionUrl(removeButton.dataset.url);
  });
}

if (rssSearch) {
  rssSearch.addEventListener("click", searchRssFeeds);
}

if (rssSearchInput) {
  rssSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchRssFeeds();
    }
  });
}

if (rssSearchResults) {
  rssSearchResults.addEventListener("click", (event) => {
    const levelButton = event.target.closest("button[data-level]");
    if (levelButton) {
      const url = levelButton.dataset.url;
      const level = levelButton.dataset.level;
      if (setRssLevel(url, level)) {
        renderRssSubscriptions();
        renderRssSearchResults(rssSearchItems);
      }
      return;
    }
    const addButton = event.target.closest("button[data-url]");
    if (!addButton) {
      return;
    }
    const url = addButton.dataset.url;
    const isSubscribed = isRssSubscribed(url);
    const updated = isSubscribed
      ? removeRssSubscriptionUrl(url)
      : addRssSubscriptionUrl(url);
    if (updated) {
      renderRssSearchResults(rssSearchItems);
    }
  });
}

if (rssFeedList) {
  rssFeedList.addEventListener("click", (event) => {
    if (event.target.closest("[data-abort]")) {
      abortRssLoading();
      return;
    }
    if (rssLoadingItemId) {
      return;
    }
    if (event.target.closest(".home-action")) {
      return;
    }
    const content = event.target.closest(".home-item-content");
    if (!content) {
      return;
    }
    const card = event.target.closest(".home-item");
    if (!card || !rssFeedList.contains(card)) {
      return;
    }
    const itemId = card.dataset.id;
    if (!itemId) {
      return;
    }
    const item = rssCurrentItems.find((entry) => String(entry.id) === itemId);
    if (!item) {
      return;
    }
    event.preventDefault();
    requestRssItemOpen(item, { levelOverride: getRssItemLevel(item.id) });
  });
}

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
  const newStory = {
    id: Date.now(),
    title: story.title,
    text: story.text,
    usedLemmas: Array.isArray(story.usedLemmas) ? story.usedLemmas : [],
  };
  const current = loadStories();
  const next = [newStory, ...current];
  saveStories(next);
  renderHomeStories(next);
  openReaderScreen(newStory);
  promptBody.value = "";
  addTextModal.classList.add("is-hidden");
});

window.addEventListener("hashchange", handleRoute);

document.addEventListener(
  "click",
  (event) => {
    const lists = [homeList, rssFeedList].filter(Boolean);
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
