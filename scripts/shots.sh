#!/usr/bin/env bash
# scripts/shots.sh — capture rendered screenshots for the design-review gate.
#
# WHY: the build agents (and the assistant) run in a sandbox that can't launch a
# browser or bind a server, so all design QA was code-only. This script runs in
# the USER's (non-sandboxed) shell, uses the local Chrome to render the real
# pages at desktop + mobile, and drops PNGs in ./shots/ for an agent to review.
#
# Usage:  npm run shots
# Then tell the assistant the shots are ready; it Reads ./shots/*.png and reviews
# them against docs/ui-quality-checklist.md BEFORE anything is called "done".
set -uo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=4321
URL="http://127.0.0.1:${PORT}"
OUT="shots"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME"
  echo "Edit CHROME=... in scripts/shots.sh to point at your browser, then re-run."
  exit 1
fi

mkdir -p "$OUT"
rm -f "$OUT"/*.png 2>/dev/null || true

echo "→ building…"
npm run build >/tmp/shots-build.log 2>&1 || { echo "build failed — see /tmp/shots-build.log"; exit 1; }

echo "→ starting preview on ${URL}…"
npm run preview -- --host 127.0.0.1 --port "$PORT" >/tmp/shots-preview.log 2>&1 &
PV=$!
trap 'kill "$PV" 2>/dev/null || true' EXIT

# wait for the server to actually answer
up=""
for _ in $(seq 1 30); do
  if curl -sf "${URL}/" >/dev/null 2>&1; then up=1; break; fi
  sleep 1
done
if [ -z "$up" ]; then echo "preview never came up — see /tmp/shots-preview.log"; cat /tmp/shots-preview.log; exit 1; fi

shoot () { # name  url  width  height
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="${3},${4}" --screenshot="${OUT}/${1}.png" "${2}" >/dev/null 2>&1 || true
  [ -f "${OUT}/${1}.png" ] && echo "  ✓ ${OUT}/${1}.png" || echo "  ✗ ${1} (no file)"
}

echo "→ capturing…"
shoot page-desktop "${URL}/chores-for-a-6-year-old/" 1280 2400
shoot page-mobile  "${URL}/chores-for-a-6-year-old/" 390 2600
shoot home-desktop "${URL}/" 1280 1500

echo "Done. Screenshots in ./${OUT}/ — tell the assistant they're ready for review."
