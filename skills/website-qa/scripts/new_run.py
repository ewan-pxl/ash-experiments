#!/usr/bin/env python3
"""Scaffold a website-qa run folder under ~/.claude/QA/<project>/runs/.

Creates the timestamped run directory, its screenshots/ folder, a skeleton
state.json, and a placeholder report.md. Ensures the project's baseline/ folder
exists. Prints a JSON object with the paths the skill needs.

Usage:
  python new_run.py --project VanManTheme --purpose "cart flow + mobile"
"""
import argparse
import json
import re
from datetime import datetime
from pathlib import Path


def slugify(text: str, max_len: int = 40) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", text.strip().lower()).strip("-")
    return (s[:max_len].rstrip("-")) or "qa"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--project", required=True)
    ap.add_argument("--purpose", required=True)
    ap.add_argument(
        "--qa-root",
        default=str(Path.home() / ".claude" / "QA"),
        help="Root QA folder (default: ~/.claude/QA)",
    )
    args = ap.parse_args()

    now = datetime.now()
    stamp = now.strftime("%Y-%m-%d_%H%M%S")
    slug = slugify(args.purpose)

    project_dir = Path(args.qa_root) / args.project
    runs_dir = project_dir / "runs"
    baseline_dir = project_dir / "baseline"
    run_dir = runs_dir / f"{stamp}_{slug}"
    screenshots_dir = run_dir / "screenshots"

    for d in (screenshots_dir, baseline_dir / "screenshots"):
        d.mkdir(parents=True, exist_ok=True)

    run_state = run_dir / "state.json"
    baseline_state = baseline_dir / "state.json"

    skeleton = {
        "project": args.project,
        "kind": "run",
        "created": now.strftime("%Y-%m-%dT%H:%M:%S"),
        "purpose": args.purpose,
        "scope": [],
        "urls": [],
        "entries": {},
    }
    run_state.write_text(json.dumps(skeleton, indent=2), encoding="utf-8")

    report = run_dir / "report.md"
    report.write_text(
        f"# QA — {args.project} — {args.purpose}\n\n"
        f"- **When:** {now.strftime('%Y-%m-%dT%H:%M:%S')}\n"
        f"- **Scope:** _pending_\n"
        f"- **URL(s):** _pending_\n",
        encoding="utf-8",
    )

    print(json.dumps({
        "run_dir": str(run_dir),
        "run_state": str(run_state),
        "report": str(report),
        "screenshots_dir": str(screenshots_dir),
        "baseline_dir": str(baseline_dir),
        "baseline_state": str(baseline_state),
        "baseline_exists": baseline_state.exists(),
        "history": str(project_dir / "history.md"),
        "stamp": stamp,
        "slug": slug,
    }, indent=2))


if __name__ == "__main__":
    main()
