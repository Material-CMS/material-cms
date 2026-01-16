#!/usr/bin/env bash
# Get text snapshot of a page.
# Usage: cdp-snapshot-text.sh <page_title_or_id> [--format ax|text|dom]
#   Default format: text

set -euo pipefail

cdp_cli="cdp-cli"
if ! command -v "$cdp_cli" >/dev/null 2>&1; then
    echo "Error: cdp-cli not found. Install with: npm install -g @myerscarpenter/cdp-cli" >&2
    exit 1
fi

if [[ $# -eq 0 ]]; then
    echo "Usage: $0 <page_title_or_id> [--format ax|text|dom]" >&2
    exit 1
fi

page="$1"
format="text"
if [[ "${2:-}" == "--format" && -n "${3:-}" ]]; then
    format="$3"
fi

"$cdp_cli" snapshot "$page" --format "$format"