#!/usr/bin/env bash
# Take a screenshot of a page.
# Usage: cdp-screenshot.sh <page_title_or_id> <output_file> [--format jpeg|png|webp] [--quality 0-100]
#   Default format: jpeg, quality: 90

set -euo pipefail

cdp_cli="cdp-cli"
if ! command -v "$cdp_cli" >/dev/null 2>&1; then
    echo "Error: cdp-cli not found. Install with: npm install -g @myerscarpenter/cdp-cli" >&2
    exit 1
fi

if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <page_title_or_id> <output_file> [--format jpeg|png|webp] [--quality 0-100]" >&2
    exit 1
fi

page="$1"
output="$2"
format="jpeg"
quality="90"
shift 2

while [[ $# -gt 0 ]]; do
    case "$1" in
        --format)
            format="$2"
            shift 2
            ;;
        --quality)
            quality="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1" >&2
            exit 1
            ;;
    esac
done

"$cdp_cli" screenshot "$page" "$output" --format "$format" --quality "$quality"