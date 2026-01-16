#!/usr/bin/env bash
# List open Chrome/Chromium pages via cdp-cli with formatted output.
# Usage: cdp-tabs.sh [--json]
#   --json   Output raw NDJSON (default: human-readable table)

set -euo pipefail

cdp_cli="cdp-cli"
if ! command -v "$cdp_cli" >/dev/null 2>&1; then
    echo "Error: cdp-cli not found. Install with: npm install -g @myerscarpenter/cdp-cli" >&2
    exit 1
fi

if [[ "${1:-}" == "--json" ]]; then
    "$cdp_cli" tabs
else
    "$cdp_cli" tabs | jq -r '"\(.id)\t\(.title)\t\(.url)"' | column -t -s $'\t'
fi