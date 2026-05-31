#!/usr/bin/env python3
"""Add entries to a project's acknowledged.json ignore-list.

Findings the user dismisses as "not an issue" are recorded here so future runs
filter them out (see diff_state.py --acknowledged). Entries are deduped by
(signature, scope, url, slice_key).

An entry looks like:
  {"signature": "...", "scope": "store"|"url"|"slice",
   "url": "...",        # required when scope == "url"
   "slice_key": "...",  # required when scope == "slice"
   "reason": "why it's not an issue"}

Usage:
  python acknowledge.py --file <project>/acknowledged.json --add entries.json
  python acknowledge.py --file <project>/acknowledged.json --add -   # read entries from stdin

`entries.json` is a JSON list of entry objects (or a single object).
"""
import argparse
import json
import sys
from datetime import datetime
from pathlib import Path


def dedupe_key(e: dict):
    return (e.get("signature"), e.get("scope", "store"), e.get("url", ""), e.get("slice_key", ""))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", required=True, help="Path to the project's acknowledged.json")
    ap.add_argument("--add", required=True, help="Path to a JSON list of entries, or '-' for stdin")
    args = ap.parse_args()

    raw = sys.stdin.read() if args.add == "-" else Path(args.add).read_text(encoding="utf-8")
    incoming = json.loads(raw)
    if isinstance(incoming, dict):
        incoming = [incoming]

    path = Path(args.file)
    if path.exists():
        try:
            doc = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            doc = {}
    else:
        doc = {}
    if not isinstance(doc, dict):
        doc = {"entries": doc}
    doc.setdefault("entries", [])

    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    existing = {dedupe_key(e) for e in doc["entries"]}
    added = 0
    for e in incoming:
        if not e.get("signature"):
            continue
        e.setdefault("scope", "store")
        e.setdefault("added", now)
        if dedupe_key(e) in existing:
            continue
        doc["entries"].append(e)
        existing.add(dedupe_key(e))
        added += 1

    doc["updated"] = now
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(doc, indent=2), encoding="utf-8")

    print(json.dumps({"added": added, "total": len(doc["entries"]), "file": str(path)}, indent=2))


if __name__ == "__main__":
    main()
