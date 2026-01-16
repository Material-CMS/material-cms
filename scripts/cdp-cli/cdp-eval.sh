#!/usr/bin/env bash
# Evaluate JavaScript expression on a page.
# Usage: cdp-eval.sh <page_title_or_id> "<expression>"
# Outputs the raw NDJSON result; use jq to extract .value.

set -euo pipefail

cdp_cli="cdp-cli"
if ! command -v "$cdp_cli" >/dev/null 2>&1; then
    echo "Error: cdp-cli not found. Install with: npm install -g @myerscarpenter/cdp-cli" >&2
    exit 1
fi

if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <page_title_or_id> \"<javascript expression>\"" >&2
    exit 1
fi

page="$1"
expression="$2"

"$cdp_cli" eval "$page" "$expression"