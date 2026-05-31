#!/usr/bin/env python3
"""Promote covered slices from a run into the baseline (partial-safe).

Only the slices present in the run (or the subset named with --keys) are copied
into the baseline. Every other baseline entry is left untouched, so a partial
run patches just its slices ("partial baseline addition"). Screenshots
referenced by the promoted slices are copied from the run's screenshots/ into
the baseline's screenshots/.

ALWAYS called only after the user has confirmed promotion — this script does
not ask. The skill is responsible for getting consent first.

Usage:
  python promote_baseline.py --baseline <baseline/state.json> --run <run/state.json>
  python promote_baseline.py --baseline ... --run ... --keys "key1,key2"
"""
import argparse
import json
import shutil
from datetime import datetime
from pathlib import Path


def load(path: Path) -> dict:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def referenced_images(entry: dict):
    names = set()
    shot = entry.get("screenshot")
    if shot:
        names.add(Path(shot).name)
    for f in entry.get("findings", []):
        ev = f.get("evidence")
        if ev:
            names.add(Path(ev).name)
    return names


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--baseline", required=True)
    ap.add_argument("--run", required=True)
    ap.add_argument("--keys", default="", help="Comma-separated slice keys to promote (default: all in run)")
    args = ap.parse_args()

    baseline_path = Path(args.baseline)
    run_path = Path(args.run)
    run = load(run_path)
    if not run:
        raise SystemExit(f"Run state not found or empty: {run_path}")

    baseline = load(baseline_path)
    if not baseline:
        baseline = {
            "project": run.get("project"),
            "kind": "baseline",
            "created": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
            "entries": {},
        }
    baseline["kind"] = "baseline"
    baseline.setdefault("entries", {})
    baseline["updated"] = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    r_entries = run.get("entries", {})
    if args.keys.strip():
        keys = [k.strip() for k in args.keys.split(",") if k.strip()]
    else:
        keys = list(r_entries.keys())

    run_shots = run_path.parent / "screenshots"
    baseline_shots = baseline_path.parent / "screenshots"
    baseline_shots.mkdir(parents=True, exist_ok=True)

    promoted = []
    copied_imgs = []
    run_id = run_path.parent.name
    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")

    for key in keys:
        entry = r_entries.get(key)
        if entry is None:
            continue
        new_entry = json.loads(json.dumps(entry))  # deep copy
        new_entry["promoted_from"] = run_id
        new_entry["promoted_at"] = now
        baseline["entries"][key] = new_entry
        promoted.append(key)

        for name in referenced_images(entry):
            src = run_shots / name
            if src.exists():
                shutil.copy2(src, baseline_shots / name)
                copied_imgs.append(name)

    baseline_path.parent.mkdir(parents=True, exist_ok=True)
    baseline_path.write_text(json.dumps(baseline, indent=2), encoding="utf-8")

    print(json.dumps({
        "promoted_keys": promoted,
        "copied_images": copied_imgs,
        "baseline_state": str(baseline_path),
        "total_baseline_entries": len(baseline["entries"]),
    }, indent=2))


if __name__ == "__main__":
    main()
