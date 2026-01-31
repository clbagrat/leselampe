#!/usr/bin/env python3
"""Benchmark adjective training generation prompt.

Usage:
  OPENAI_API_KEY=... python3 benchmarks/adjective_training_benchmark.py

Optional env vars:
  TARGET=100    # number of items to gather
  BATCH=40      # request batch size per API call
  MODEL=gpt-4o-mini
  TEMPERATURE=0.4
  OUT_DIR=benchmarks/results
  SAMPLE_COUNT=10
"""

import json
import os
import time
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

TARGET = int(os.environ.get("TARGET", "100"))
BATCH = int(os.environ.get("BATCH", "40"))
MODEL = os.environ.get("MODEL", "gpt-4o-mini")
TEMPERATURE = float(os.environ.get("TEMPERATURE", "0.4"))
OUT_DIR = os.environ.get("OUT_DIR", "benchmarks/results")
SAMPLE_COUNT = int(os.environ.get("SAMPLE_COUNT", "10"))

api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise SystemExit("OPENAI_API_KEY not set")

case_counts = Counter()
gender_counts = Counter()
determiner_counts = Counter()
items_all = []
items_total = 0

seed_base = int(time.time() * 1000)
run_started = datetime.now(timezone.utc).isoformat()

targets = {
    "cases": {"nominative": 25, "accusative": 55, "dative": 25},
    "determiners": {"definite": 25},
}

while items_total < TARGET:
    remaining = TARGET - items_total
    count = min(BATCH, remaining)
    seed = seed_base + items_total
    target_nominative = round(count * 0.25)
    target_accusative = round(count * 0.55)
    target_dative = max(0, count - target_nominative - target_accusative)
    target_definite = round(count * 0.25)
    determiner_remaining = max(0, count - target_definite)
    target_indefinite = determiner_remaining // 3
    target_possessive = (determiner_remaining - target_indefinite) // 2
    target_none = (
        determiner_remaining - target_indefinite - target_possessive
    )

    system_prompt = (
        "You create short German grammar drills. Respond with strict JSON: "
        '{"items":[{"sentence":"...","adjective_base":"gut","ending":"e","case":"nominative","gender":"feminine","noun":"Frau","determiner_type":"definite"}]}'
        f" Rules: Write {count} short, natural German sentences (max 12 words) for A2 learners. "
        "Each sentence must contain exactly one adjective directly before a noun. "
        "Use only these cases: nominative, accusative, dative. "
        "Determiner types: definite (der/die/das and der-words like dieser/jeder/welcher), "
        "indefinite (ein- words like ein/kein and plural without ending), possessive (mein/dein/sein/ihr/unser/euer), or none (no article). "
        "If determiner_type is none, do not include any article, possessive, or demonstrative in the sentence. "
        f"Distribution targets in this batch of {count}: "
        f"{target_nominative} nominative, {target_accusative} accusative, {target_dative} dative. "
        f"Determiners in this batch: {target_definite} definite, "
        f"{target_indefinite} indefinite, {target_possessive} possessive, {target_none} none. "
        "Double-check counts before returning. "
        "Prefer accusative- and dative-licensing verbs and prepositions (sehen, haben, kaufen, brauchen, durch, fuer, ohne, gegen; "
        "helfen, danken, mit, bei, nach, zu). "
        "Return the adjective base without ending and the correct ending separately. "
        "Ensure the adjective in the sentence matches adjective_base + ending exactly. "
        "Return gender as masculine, feminine, neuter, or plural. "
        f"Random seed: {seed}."
    )

    payload = {
        "model": MODEL,
        "temperature": TEMPERATURE,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": "Generate a new set."},
        ],
    }

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode("utf-8")

    response = json.loads(body)
    raw = response["choices"][0]["message"]["content"].strip()
    if raw.startswith("```"):
        raw = raw.strip("`\n")
        if raw.startswith("json"):
            raw = raw[4:].lstrip()

    parsed = json.loads(raw)
    items = parsed["items"] if isinstance(parsed, dict) and "items" in parsed else parsed

    for item in items:
        case_counts[str(item.get("case", "")).strip().lower()] += 1
        gender_counts[str(item.get("gender", "")).strip().lower()] += 1
        determiner_counts[str(item.get("determiner_type", "")).strip().lower()] += 1
        items_all.append(item)

    items_total += len(items)

def format_counts(counter):
    return {key: counter[key] for key in sorted(counter.keys())}


def compute_deltas(actual, target):
    return {key: actual.get(key, 0) - target.get(key, 0) for key in target.keys()}


case_actual = format_counts(case_counts)
gender_actual = format_counts(gender_counts)
determiner_actual = format_counts(determiner_counts)

case_deltas = compute_deltas(case_actual, targets["cases"])
determiner_deltas = compute_deltas(determiner_actual, targets["determiners"])

samples = [
    {
        "sentence": item.get("sentence"),
        "adjective_base": item.get("adjective_base"),
        "ending": item.get("ending"),
        "case": item.get("case"),
        "gender": item.get("gender"),
        "noun": item.get("noun"),
        "determiner_type": item.get("determiner_type"),
    }
    for item in items_all[: max(1, SAMPLE_COUNT)]
]

result = {
    "run_started": run_started,
    "model": MODEL,
    "temperature": TEMPERATURE,
    "target": TARGET,
    "batch": BATCH,
    "prompt": system_prompt,
    "counts": {
        "cases": case_actual,
        "genders": gender_actual,
        "determiners": determiner_actual,
    },
    "deltas": {
        "cases": case_deltas,
        "determiners": determiner_deltas,
    },
    "samples": samples,
}

out_dir = Path(OUT_DIR)
out_dir.mkdir(parents=True, exist_ok=True)
timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
out_path = out_dir / f"adjective_training_{timestamp}.json"
out_path.write_text(json.dumps(result, ensure_ascii=True, indent=2))

print("Generated items:", items_total)
print("Cases:")
for key, value in case_counts.most_common():
    print(f"  {key}: {value}")
print("Genders:")
for key, value in gender_counts.most_common():
    print(f"  {key}: {value}")
print("Determiner types:")
for key, value in determiner_counts.most_common():
    print(f"  {key}: {value}")
print("Case deltas vs target:")
for key, value in case_deltas.items():
    print(f"  {key}: {value:+d}")
print("Determiner deltas vs target:")
for key, value in determiner_deltas.items():
    print(f"  {key}: {value:+d}")
print(f"Results saved: {out_path}")
