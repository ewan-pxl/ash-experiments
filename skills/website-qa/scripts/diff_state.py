#!/usr/bin/env python3
"""Diff a website-qa run's state against the baseline.

For every slice the run covered, classify each finding by matching on
`signature` within the slice key:

  regressed  - finding present now, absent in baseline, and the baseline DID
               cover this slice (so it worked before -> broke now)
  new        - finding present now, and the baseline had NO entry for this slice
               (can't tell if it's a regression)
  fixed      - finding in the baseline slice, no longer present now
  unchanged  - finding present in both

Only slices the run covered are compared. Baseline slices the run didn't
re-check are left out of the diff (they weren't tested this time).

Usage:
  python diff_state.py --baseline <baseline/state.json> --run <run/state.json>
"""
import argparse
import json
from pathlib import Path


def load(path: str) -> dict:
    p = Path(path)
    if not p.exists():
        return {}
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def load_acknowledged(path: str) -> list:
    if not path:
        return []
    p = Path(path)
    if not p.exists():
        return []
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []
    if isinstance(data, dict):
        return data.get("entries", [])
    return data or []


def is_acknowledged(sig: str, url: str, key: str, ack: list) -> bool:
    for e in ack:
        if e.get("signature") != sig:
            continue
        scope = e.get("scope", "store")
        if scope == "store":
            return True
        if scope == "url" and e.get("url") == url:
            return True
        if scope == "slice" and e.get("slice_key") == key:
            return True
    return False


def split_findings(entry: dict, key: str, ack: list):
    """Return (active_by_sig, suppressed_list) for an entry, filtering the ignore-list."""
    active, suppressed = {}, []
    url = (entry or {}).get("url", "")
    for f in (entry or {}).get("findings", []):
        sig = f.get("signature")
        if not sig:
            continue
        if ack and is_acknowledged(sig, url, key, ack):
            suppressed.append({"key": key, "signature": sig, "summary": f.get("summary")})
        else:
            active[sig] = f
    return active, suppressed


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--baseline", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--acknowledged", default="", help="Optional path to acknowledged.json ignore-list")
    args = ap.parse_args()

    baseline = load(args.baseline)
    run = load(args.run)
    ack = load_acknowledged(args.acknowledged)

    b_entries = baseline.get("entries", {})
    r_entries = run.get("entries", {})

    regressed, new, fixed, unchanged, suppressed = [], [], [], [], []
    new_coverage_keys = []

    for key, r_entry in r_entries.items():
        b_entry = b_entries.get(key)
        baseline_covered = b_entry is not None
        if not baseline_covered:
            new_coverage_keys.append(key)

        r_finds, r_suppressed = split_findings(r_entry, key, ack)
        suppressed.extend(r_suppressed)
        b_finds = split_findings(b_entry, key, ack)[0] if baseline_covered else {}

        for sig, f in r_finds.items():
            row = {"key": key, "signature": sig, "severity": f.get("severity"),
                   "summary": f.get("summary"), "detail": f.get("detail"),
                   "evidence": f.get("evidence")}
            if sig in b_finds:
                unchanged.append(row)
            elif baseline_covered:
                regressed.append(row)
            else:
                new.append(row)

        if baseline_covered:
            for sig, f in b_finds.items():
                if sig not in r_finds:
                    fixed.append({"key": key, "signature": sig,
                                  "severity": f.get("severity"),
                                  "summary": f.get("summary")})

    result = {
        "baseline_exists": bool(baseline),
        "covered_keys": list(r_entries.keys()),
        "new_coverage_keys": new_coverage_keys,
        "counts": {
            "regressed": len(regressed),
            "new": len(new),
            "fixed": len(fixed),
            "unchanged": len(unchanged),
            "suppressed": len(suppressed),
        },
        "regressed": regressed,
        "new": new,
        "fixed": fixed,
        "unchanged": unchanged,
        "suppressed": suppressed,
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    main()
