#!/usr/bin/env bash

set -euo pipefail

if ! command -v jmeter >/dev/null 2>&1; then
  echo "JMeter n'est pas installé. Installe-le avec: brew install jmeter"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PLAN_FILE="$ROOT_DIR/tests/perf/jmeter-static-site.jmx"
OUTPUT_DIR="$ROOT_DIR/tests/perf/results"
mkdir -p "$OUTPUT_DIR"

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RESULTS_FILE="$OUTPUT_DIR/jmeter-$TIMESTAMP.jtl"
REPORT_DIR="$OUTPUT_DIR/jmeter-report-$TIMESTAMP"

jmeter -n \
  -t "$PLAN_FILE" \
  -Jprotocol="${JMETER_PROTOCOL:-http}" \
  -Jhost="${JMETER_HOST:-127.0.0.1}" \
  -Jport="${JMETER_PORT:-4173}" \
  -Jusers="${JMETER_USERS:-50}" \
  -Jrampup="${JMETER_RAMPUP:-30}" \
  -Jloops="${JMETER_LOOPS:-10}" \
  -l "$RESULTS_FILE" \
  -e -o "$REPORT_DIR"

echo "JMeter results: $RESULTS_FILE"
echo "JMeter report:  $REPORT_DIR/index.html"
