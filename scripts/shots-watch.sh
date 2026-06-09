#!/usr/bin/env bash
# scripts/shots-watch.sh — persistent screenshot SERVICE.
#
# Run it ONCE in your terminal and leave it open:   npm run shots:watch
# It builds the site, serves it locally, and then waits. Whenever the assistant
# wants a fresh capture it writes a token to `shots/request`; this service
# rebuilds, screenshots the pages with your local Chrome, writes the PNGs to
# `shots/`, and echoes the token to `shots/done`. The assistant reads the PNGs.
#
# Channel is the shared filesystem (the assistant's sandbox can't reach your
# localhost over the network, but it can read/write files in the repo).
set -uo pipefail
cd "$(dirname "$0")/.."

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=4321
URL="http://127.0.0.1:${PORT}"
OUT="shots"
REQ="${OUT}/request"
DONE="${OUT}/done"

if [ ! -x "$CHROME" ]; then
  echo "Chrome not found at: $CHROME"
  echo "Edit CHROME=... in scripts/shots-watch.sh, then re-run."
  exit 1
fi
mkdir -p "$OUT"
rm -f "$REQ" "$DONE" 2>/dev/null || true

echo "→ initial build…"
npm run build >/tmp/shots-build.log 2>&1 || { echo "build failed — see /tmp/shots-build.log"; exit 1; }

echo "→ starting local server on ${URL}…"
npm run preview -- --host 127.0.0.1 --port "$PORT" >/tmp/shots-preview.log 2>&1 &
PV=$!
trap 'kill "$PV" 2>/dev/null || true' EXIT
for _ in $(seq 1 40); do curl -sf "${URL}/" >/dev/null 2>&1 && break; sleep 1; done
curl -sf "${URL}/" >/dev/null 2>&1 || { echo "server never came up — see /tmp/shots-preview.log"; exit 1; }

echo "✅ shots service ready. LEAVE THIS RUNNING."
echo "   The assistant will trigger captures on demand (no action needed from you)."
echo "   Stop with Ctrl+C when you're done for the session."

cap () { # name url width height
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="${3},${4}" --screenshot="${OUT}/${1}.png" "${2}" >/dev/null 2>&1 || true
}

# 2x-DPI close-up — renders the page narrower so the generator fills the frame
# and small controls (checkboxes, remove buttons) are big + crisp enough to judge.
cap2 () { # name url width height
  "$CHROME" --headless=new --force-device-scale-factor=2 --disable-gpu --hide-scrollbars \
    --window-size="${3},${4}" --screenshot="${OUT}/${1}.png" "${2}" >/dev/null 2>&1 || true
}

while true; do
  if [ -f "$REQ" ]; then
    tok="$(cat "$REQ" 2>/dev/null || echo '?')"
    rm -f "$REQ"
    echo "→ request ${tok}: rebuild + capture…"
    npm run build >/tmp/shots-build.log 2>&1 || true
    if [[ "$tok" == /* ]]; then
      # Token is a URL path → capture just that page (desktop + true-390 mobile).
      cap custom-desktop "${URL}${tok}" 1280 2400
      cap custom-mobile  "${URL}${tok}" 390 1700
    else
      cap  page-desktop "${URL}/chore-chart-for-a-6-year-old/" 1280 2400
      cap  page-mobile  "${URL}/chore-chart-for-a-6-year-old/" 390 1500
      cap  page-mobile-full "${URL}/chore-chart-for-a-6-year-old/" 390 2800
      cap  home-desktop "${URL}/" 1280 1500
      cap2 page-zoom    "${URL}/chore-chart-for-a-6-year-old/" 820 1500
    fi
    printf '%s' "$tok" > "$DONE"
    echo "  ✓ request ${tok} done — PNGs in ${OUT}/"
  fi
  sleep 1
done
