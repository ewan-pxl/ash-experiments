#!/usr/bin/env python3
"""First-run setup for website-qa (cross-platform, idempotent).

Does NOT install Playwright MCP — it expects the user to have already added a
`playwright` MCP server themselves. What it does:

1. Ensures the QA root (`<home>/.claude/QA`) and its `dump` staging folder exist.
2. Scans the known MCP config locations for this OS, finds wherever a `playwright`
   server is actually configured, and ensures its `--output-dir` points at `<DUMP>`.

Behavior when there is no `playwright` server anywhere we look:
  -> `playwright_found: false`. The script makes NO config changes and reports that
     the user must set up the Playwright MCP server first. The skill should stop and
     ask them to do so, then re-run.

When it does find one and has to change the `--output-dir`, it writes a timestamped
`.bak` backup of that file first and reports `restart_required: true` — the Playwright
MCP server only picks up the new path after Claude is restarted.

Usage:
  python setup_playwright.py                 # detect + fix
  python setup_playwright.py --check         # report only, never write
  python setup_playwright.py --config <path> # also search this extra config file
  python setup_playwright.py --qa-root <dir> # override QA root (default ~/.claude/QA)
"""
import argparse
import json
import os
import shutil
import sys
from datetime import datetime
from pathlib import Path


def candidate_config_paths() -> list:
    """All places a `playwright` MCP server might be configured, most-specific first.

    Covers Claude Desktop (per-OS) and Claude Code (user-level .claude.json, plus any
    project-level .mcp.json in the cwd / its parents)."""
    home = Path.home()
    paths = []

    # Claude Desktop, per platform
    if sys.platform == "win32":
        base = os.environ.get("APPDATA") or str(home / "AppData" / "Roaming")
        paths.append(Path(base) / "Claude" / "claude_desktop_config.json")
    elif sys.platform == "darwin":
        paths.append(home / "Library" / "Application Support" / "Claude" / "claude_desktop_config.json")
    else:
        paths.append(home / ".config" / "Claude" / "claude_desktop_config.json")

    # Claude Code: project-level .mcp.json walking up from cwd, then user-level .claude.json
    cwd = Path.cwd()
    for d in [cwd, *cwd.parents]:
        paths.append(d / ".mcp.json")
    paths.append(home / ".claude.json")

    # De-dupe while preserving order
    seen, out = set(), []
    for p in paths:
        key = os.path.normcase(os.path.normpath(str(p)))
        if key not in seen:
            seen.add(key)
            out.append(p)
    return out


def load_json(path: Path):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else None
    except (OSError, json.JSONDecodeError):
        return None


def find_playwright(paths: list):
    """Return (config_path, config_dict, entry_dict) for the first config that has a
    `playwright` MCP server, or (None, None, None)."""
    for p in paths:
        if not p.exists():
            continue
        data = load_json(p)
        if not data:
            continue
        servers = data.get("mcpServers")
        if isinstance(servers, dict) and isinstance(servers.get("playwright"), dict):
            return p, data, servers["playwright"]
    return None, None, None


def current_output_dir(entry: dict):
    args = (entry or {}).get("args", []) or []
    for i, a in enumerate(args):
        if a == "--output-dir" and i + 1 < len(args):
            return args[i + 1]
    return None


def same_path(a, b) -> bool:
    if not a or not b:
        return False
    norm = lambda p: os.path.normcase(os.path.normpath(str(p)))
    return norm(a) == norm(b)


def set_output_dir(entry: dict, dump_dir: str) -> bool:
    """Update/insert --output-dir in entry['args']. Returns True if it changed."""
    args = entry.setdefault("args", [])
    for i, a in enumerate(args):
        if a == "--output-dir" and i + 1 < len(args):
            if same_path(args[i + 1], dump_dir):
                return False
            args[i + 1] = dump_dir
            return True
    args.extend(["--output-dir", dump_dir])
    return True


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default="", help="Extra config file to search first")
    ap.add_argument("--qa-root", default=str(Path.home() / ".claude" / "QA"), help="QA root (default: ~/.claude/QA)")
    ap.add_argument("--check", action="store_true", help="Report only; never modify a config")
    args = ap.parse_args()

    qa_root = Path(args.qa_root)
    dump_dir = qa_root / "dump"
    dump_str = str(dump_dir)
    folders_created = []
    for d in (qa_root, dump_dir):
        if not d.exists():
            d.mkdir(parents=True, exist_ok=True)
            folders_created.append(str(d))

    paths = candidate_config_paths()
    if args.config:
        paths.insert(0, Path(args.config))

    config_path, config, entry = find_playwright(paths)

    if entry is None:
        # No Playwright MCP server anywhere — do NOT create one.
        print(json.dumps({
            "platform": sys.platform,
            "qa_root": str(qa_root),
            "dump_dir": dump_str,
            "folders_created": folders_created,
            "playwright_found": False,
            "searched": [str(p) for p in paths],
            "changed": False,
            "wrote": False,
            "restart_required": False,
            "message": "No 'playwright' MCP server found. Ask the user to set up the "
                       "Playwright MCP server first, then re-run setup.",
        }, indent=2))
        return

    was = current_output_dir(entry)
    changed = set_output_dir(entry, dump_str)
    now_dir = current_output_dir(entry)

    backup = None
    wrote = False
    if changed and not args.check:
        backup = str(config_path) + ".bak-" + datetime.now().strftime("%Y%m%d_%H%M%S")
        shutil.copy2(config_path, backup)
        config_path.write_text(json.dumps(config, indent=2), encoding="utf-8")
        wrote = True

    print(json.dumps({
        "platform": sys.platform,
        "qa_root": str(qa_root),
        "dump_dir": dump_str,
        "folders_created": folders_created,
        "playwright_found": True,
        "config_path": str(config_path),
        "output_dir_was": was,
        "output_dir_now": now_dir,
        "already_correct": same_path(was, dump_str),
        "changed": changed,
        "wrote": wrote,
        "restart_required": wrote,
        "backup": backup,
    }, indent=2))


if __name__ == "__main__":
    main()
