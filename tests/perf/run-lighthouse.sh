#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
OUTPUT_DIR="$ROOT_DIR/tests/perf/results"
mkdir -p "$OUTPUT_DIR"

TARGET_URL="${1:-http://127.0.0.1:4173/index.html}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
REPORT_BASENAME="$OUTPUT_DIR/lighthouse-$TIMESTAMP"
JSON_REPORT="$REPORT_BASENAME.report.json"
HTML_REPORT="$REPORT_BASENAME.report.html"

SERVER_PID=""
cleanup() {
  if [[ -n "$SERVER_PID" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

if [[ "$TARGET_URL" == "http://127.0.0.1:4173"* || "$TARGET_URL" == "http://localhost:4173"* ]]; then
  if ! curl -sSf "http://127.0.0.1:4173/index.html" >/dev/null 2>&1; then
    (
      cd "$ROOT_DIR"
      python3 -m http.server 4173 >/tmp/portfolio-http-server.log 2>&1
    ) &
    SERVER_PID=$!
    sleep 2
  fi
fi

npx --yes lighthouse "$TARGET_URL" \
  --quiet \
  --chrome-flags="--headless=new --no-sandbox" \
  --output=json \
  --output=html \
  --output-path="$REPORT_BASENAME"

echo "Lighthouse JSON: $JSON_REPORT"
echo "Lighthouse HTML: $HTML_REPORT"
