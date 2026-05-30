#!/bin/bash
# Run the dev server (macOS). Double-click in Finder.
# First time only: run  chmod +x dev.command  to allow double-clicking.
cd "$(dirname "$0")" || exit 1
[ -d node_modules ] || npm install
npm run dev
