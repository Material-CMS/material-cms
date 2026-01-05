#!/bin/bash

# html_inspect.sh - Inspect system endpoints and display responses
# Shows JSON responses prettified, shows error responses as rendered

# Default URL if none provided
DEFAULT_URL="http://localhost:3000/"

# Check for required commands
check_dependencies() {
    if ! command -v curl &> /dev/null; then
        echo "Error: curl is required but not installed" >&2
        return 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo "Error: jq is required but not installed" >&2
        return 1
    fi
    
    return 0
}

# Fetch content from URL
fetch_content() {
    local url="$1"
    local response
    local exit_code
    local http_code
    
    # Use curl with timeout and follow redirects, capture HTTP status
    # Note: removed -f flag to not fail on HTTP errors
    response=$(curl -s -L --max-time 10 --connect-timeout 5 -w "%{http_code}" "$url" 2>&1)
    exit_code=$?
    
    # Extract HTTP status code (last 3 characters)
    http_code="${response: -3}"
    # Remove the HTTP code from response
    response="${response%???}"
    
    # Return HTTP code and response
    echo "$http_code"
    echo "$response"
    return $exit_code
}

# Check if content is valid JSON
is_valid_json() {
    local content="$1"
    echo "$content" | jq . >/dev/null 2>&1
}

# Extract error message from HTML (simple extraction for Lapis error pages)
extract_html_error() {
    local html="$1"
    
    # Try to extract content from <pre> tags (common in error pages)
    if echo "$html" | grep -q '<pre>'; then
        # Extract all <pre> content and remove HTML tags
        # Use sed to get content between <pre> and </pre> tags
        echo "$html" | sed -n '/<pre>/,/<\/pre>/p' | sed 's/<[^>]*>//g' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | grep -v '^$' | \
            perl -MHTML::Entities -pe 'decode_entities($_);'
    else
        # Fallback: strip all HTML tags and show first 20 lines
        echo "$html" | sed 's/<[^>]*>//g' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | head -20 | \
            perl -MHTML::Entities -pe 'decode_entities($_);'
    fi
}

# Generate human-readable output
generate_human_output() {
    local response="$1"
    local http_code="$2"
    local url="$3"
    
    echo "=== Endpoint Inspection ==="
    echo "URL: $url"
    echo "HTTP Status: $http_code"
    echo "Timestamp: $(date)"
    echo "=========================================="
    echo ""
    
    # Check if response is valid JSON
    if is_valid_json "$response"; then
        # Pretty print JSON with jq
        echo "$response" | jq .
    else
        # Not JSON - could be HTML, plain text, etc.
        if [[ "$http_code" =~ ^2 ]]; then
            echo "Response (non-JSON):"
            echo "$response"
        else
            echo "Error Response:"
            extract_html_error "$response"
            echo ""
            echo "(Full response available with --raw flag)"
        fi
    fi
}

# Generate JSON output (for --json flag)
generate_json_output() {
    local response="$1"
    local http_code="$2"
    local url="$3"
    
    local timestamp=$(date)
    local is_json=false
    
    # Check if response is valid JSON
    if is_valid_json "$response"; then
        is_json=true
        # Parse JSON to ensure it's valid for embedding
        local json_response=$(echo "$response" | jq -c . 2>/dev/null || echo "$response")
        # Create JSON structure with parsed JSON as response field
        jq -n \
          --arg url "$url" \
          --arg status "$http_code" \
          --arg timestamp "$timestamp" \
          --argjson response "$json_response" \
          --arg is_json "$is_json" \
          '{
            url: $url,
            status: $status,
            timestamp: $timestamp,
            response: $response,
            is_json: ($is_json == "true")
          }'
    else
        # Response is not JSON, include as string
        jq -n \
          --arg url "$url" \
          --arg status "$http_code" \
          --arg timestamp "$timestamp" \
          --arg response "$response" \
          --arg is_json "$is_json" \
          '{
            url: $url,
            status: $status,
            timestamp: $timestamp,
            response: $response,
            is_json: ($is_json == "true")
          }'
    fi
}

# Generate raw response output (new --raw flag)
generate_raw_response_output() {
    local response="$1"
    echo "$response"
}

# Show usage information
show_usage() {
    cat << EOF
html_inspect.sh - Inspect system endpoints and display responses

Usage:
  ./html_inspect.sh [OPTIONS] [URL]

Options:
  --json       Output structured JSON with response metadata
  --raw        Output raw response regardless of content type
  --help       Show this help message

Arguments:
  URL          Endpoint URL to inspect (default: $DEFAULT_URL)

Examples:
  ./html_inspect.sh                          # Inspect default health endpoint
  ./html_inspect.sh --json                   # Output structured JSON from default endpoint
  ./html_inspect.sh --raw                    # Output raw response
  ./html_inspect.sh http://localhost:3000 # Inspect custom URL
  ./html_inspect.sh --json http://localhost:3000  # Structured JSON from stats

Exit Codes:
  0 - Success (request completed, regardless of HTTP status)
  1 - Missing dependencies (curl or jq)
  2 - Connection failed or timeout
  3 - Invalid arguments

Note: The script shows error responses as rendered on the page, not just HTTP status codes.
For JSON responses, it pretty-prints with jq. For HTML errors, it extracts error messages.
The --json flag always outputs valid JSON with metadata (url, status, timestamp, response).

EOF
}

# Main logic
main() {
    local output_mode="human"  # human, json, raw
    local url=""
    
    # Parse arguments
    while [ $# -gt 0 ]; do
        case "$1" in
            --json)
                output_mode="json"
                shift
                ;;
            --raw)
                output_mode="raw"
                shift
                ;;
            --help)
                show_usage
                return 0
                ;;
            -*)
                echo "Error: Unknown option $1" >&2
                show_usage
                return 3
                ;;
            *)
                # Assume it's a URL
                if [ -z "$url" ]; then
                    url="$1"
                else
                    echo "Error: Multiple URLs specified" >&2
                    show_usage
                    return 3
                fi
                shift
                ;;
        esac
    done
    
    # Set default URL if none provided
    if [ -z "$url" ]; then
        url="$DEFAULT_URL"
    fi
    
    # Check dependencies
    if ! check_dependencies; then
        return 1
    fi
    
    # Fetch content
    local fetch_result
    fetch_result=$(fetch_content "$url")
    local fetch_exit=$?
    
    # Parse fetch result (first line is HTTP code, rest is response)
    local http_code=$(echo "$fetch_result" | head -1)
    local response=$(echo "$fetch_result" | tail -n +2)
    
    # Check for connection failures
    if [ $fetch_exit -ne 0 ]; then
        echo "Error: Failed to connect to $url" >&2
        if [ "$http_code" = "000" ]; then
            echo "Connection refused or timeout" >&2
        fi
        return 2
    fi
    
    # Generate output based on mode
    case "$output_mode" in
        "human")
            generate_human_output "$response" "$http_code" "$url"
            return 0
            ;;
        "json")
            generate_json_output "$response" "$http_code" "$url"
            return 0
            ;;
        "raw")
            generate_raw_response_output "$response"
            return 0
            ;;
    esac
}

# Run main function
main "$@"
