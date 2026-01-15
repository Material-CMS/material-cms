#!/usr/bin/env bash
# Capture console errors from a page.
# Usage: cdp-console-errors.sh <page_title_or_id> [--duration seconds] [--verbose]
#   Default duration: 2 seconds

set -euo pipefail

cdp_cli="cdp-cli"
if ! command -v "$cdp_cli" >/dev/null 2>&1; then
    echo "Error: cdp-cli not found. Install with: npm install -g @myerscarpenter/cdp-cli" >&2
    exit 1
fi

if [[ $# -eq 0 ]]; then
    echo "Usage: $0 <page_title_or_id> [--duration seconds] [--verbose]" >&2
    exit 1
fi

page="$1"
duration=2
verbose=""
shift

while [[ $# -gt 0 ]]; do
    case "$1" in
        --duration)
            duration="$2"
            shift 2
            ;;
        --verbose)
            verbose="--verbose"
            shift
            ;;
        *)
            echo "Unknown option: $1" >&2
            exit 1
            ;;
    esac
done

"$cdp_cli" console "$page" --type error --duration "$duration" $verbose