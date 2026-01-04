const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });

const safeValue = (value) => {
  if (value === null || value === undefined) {
    return "—";
  }
  const text = String(value).trim();
  return text || "—";
};

const formatCompoundParts = (parts) => {
  if (!Array.isArray(parts) || parts.length === 0) {
    return "—";
  }
  const formatted = parts
    .map((part) => {
      const word = safeValue(part?.word);
      const translation = safeValue(part?.translation);
      return `${word} (${translation})`;
    })
    .filter((item) => item !== "— (—)");
  return formatted.length ? formatted.join(" + ") : "—";
};

const buildIssueBody = (payload) => {
  const meta = payload?.meta || {};
  const compoundParts = meta?.compoundParts || meta?.compound_parts || [];
  const note = payload?.note ? payload.note.trim() : "";
  const lines = [
    "## Report",
    note ? `**Note:** ${note}` : "_No note provided._",
    "",
    "## Context",
    `- Type: ${safeValue(payload?.type)}`,
    `- German: ${safeValue(payload?.german)}`,
    `- Translation: ${safeValue(payload?.translation)}`,
    `- Grammar: ${safeValue(payload?.grammar)}`,
    `- Sentence: ${safeValue(payload?.sentence)}`,
    `- UI language: ${safeValue(payload?.uiLanguage)}`,
    `- Story ID: ${safeValue(payload?.storyId)}`,
    `- Story title: ${safeValue(payload?.storyTitle)}`,
    `- RSS item title: ${safeValue(payload?.rssItemTitle)}`,
    `- RSS item link: ${safeValue(payload?.rssItemLink)}`,
    `- Reported at: ${safeValue(payload?.reportedAt)}`,
    "",
    "## Meta",
    `- Lemma: ${safeValue(meta?.lemma)}`,
    `- Article: ${safeValue(meta?.article)}`,
    `- Gender: ${safeValue(meta?.gender)}`,
    `- Case: ${safeValue(meta?.case)}`,
    `- Is compound: ${safeValue(meta?.isCompound ?? meta?.is_compound)}`,
    `- Compound parts: ${formatCompoundParts(compoundParts)}`,
    "",
    "## Raw payload",
    "```json",
    JSON.stringify(payload, null, 2),
    "```",
  ];
  return lines.join("\n");
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }
    const token = env.GITHUB_TOKEN;
    const repo = env.GITHUB_REPO;
    if (!token || !repo) {
      return jsonResponse({ error: "Missing GitHub configuration" }, 500);
    }
    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }
    const rawTitle = safeValue(payload?.german || payload?.sentence);
    const shortTitle = rawTitle.slice(0, 80);
    const title = `Translation report: ${shortTitle}`;
    const body = buildIssueBody(payload);

    const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "leselampe-report-worker",
      },
      body: JSON.stringify({ title, body }),
    });

    const data = await response.json();
    if (!response.ok) {
      return jsonResponse(
        { error: data?.message || "Failed to create issue" },
        response.status
      );
    }
    const issueUrl = data?.html_url || "";
    if (issueUrl) {
      fetch("https://ntfy.sh/bagrat_leselampe_report", {
        method: "POST",
        headers: {
          Click: issueUrl,
        },
        body: "New issue",
      }).catch(() => {});
    }
    return jsonResponse({ url: issueUrl });
  },
};
