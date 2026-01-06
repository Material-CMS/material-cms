#!/bin/bash
# Enhanced search.sh with smart scoring (Integer-based version)
# Usage: ./search.sh "keyword" [directory]

KEYWORD="${1}"
SEARCH_ROOT="${2:-.}"

if [[ -z "$KEYWORD" ]]; then
    echo "Usage: $0 <keyword> [<directory>]" >&2
    exit 1
fi

# Weighting factors for scoring (integers only)
declare -A WEIGHTS=(
    [exact_match]=10      # Exact case match
    [variable_assign]=8   # Variable assignment
    [function_def]=7      # Function definition
    [comment]=5          # In comments
    [config_value]=9     # Configuration values
    [doc_string]=6       # Documentation
    [import_export]=4    # Import/export statements
)

echo "["
first=true

# Main grep with scoring logic
grep -r -n -i \
    --exclude-dir=.git --exclude-dir=node_modules \
    --exclude-dir=__pycache__ --exclude-dir=dist \
    --include="*.js" --include="*.ts" --include="*.py" \
    --include="*.java" --include="*.go" --include="*.rs" \
    --include="*.md" --include="*.txt" --include="*.json" \
    --include="*.yml" --include="*.yaml" --include="*.xml" \
    "$KEYWORD" "$SEARCH_ROOT" 2>/dev/null | \
while IFS=: read -r file line_num content; do
    [[ -z "$file" ]] && continue
    
    # Calculate relevance score (integer only)
    score=1
    
    # Exact case match
    [[ "$content" =~ $KEYWORD ]] && ((score += WEIGHTS[exact_match]))
    
    # In variable assignment (e.g., exposeTranslations =)
    if [[ "$content" =~ $KEYWORD[[:space:]]*=[[:space:]]* ]]; then
        ((score += WEIGHTS[variable_assign]))
    fi
    
    # In function definition
    if [[ "$content" =~ (function|def|const|let|var)[[:space:]]+$KEYWORD ]]; then
        ((score += WEIGHTS[function_def]))
    fi
    
    # In comment
    if [[ "$content" =~ ^[[:space:]]*(\/\/|#|\/\*|\*)[[:space:]]*.*$KEYWORD ]]; then
        ((score += WEIGHTS[comment]))
    fi
    
    # Configuration value
    if [[ "$content" =~ $KEYWORD[[:space:]]*:[[:space:]]*(true|false|[0-9]) ]]; then
        ((score += WEIGHTS[config_value]))
    fi
    
    # Documentation string
    if [[ "$file" =~ \.md$ ]] || [[ "$content" =~ \`$KEYWORD\` ]]; then
        ((score += WEIGHTS[doc_string]))
    fi
    
    # Get context (2 lines before and after) - simplified to avoid sed issues
    context=""
    if [[ -f "$file" ]]; then
        # Use awk for safe context extraction
        context=$(awk -v line="$line_num" -v before=2 -v after=2 '
            NR >= line-before && NR <= line+after {
                # Escape for JSON
                gsub(/"/, "\\\"", $0);
                gsub(/\\/, "\\\\", $0);
                gsub(/\t/, "\\t", $0);
                gsub(/\n/, "\\n", $0);
                gsub(/\r/, "\\r", $0);
                if (NR == line) {
                    printf "[MATCH] %s", $0;
                } else {
                    printf "%s", $0;
                }
                if (NR < line+after) printf "\\n";
            }' "$file" 2>/dev/null)
    fi
    
    # File importance weighting (integer only)
    file_multiplier=10  # Base multiplier (for integer math)
    [[ "$file" =~ (config|local|settings)\. ]] && file_multiplier=20  # 2.0
    [[ "$file" =~ \.md$ ]] && file_multiplier=8  # 0.8
    
    final_score=$(( (score * file_multiplier) / 10 ))
    
    # Determine match type
    match_type="tertiary"
    [[ $score -ge 15 ]] && match_type="primary"
    [[ $score -ge 10 && $score -lt 15 ]] && match_type="secondary"
    
    # JSON output
    if [[ "$first" == "true" ]]; then
        first=false
    else
        echo ","
    fi
    
    cat <<EOF
  {
    "file": "$(echo "$file" | sed 's/"/\\"/g; s/\\/\\\\/g')",
    "line": $line_num,
    "score": $final_score,
    "match_type": "$match_type",
    "context": "$context",
    "content": "$(echo "$content" | sed 's/"/\\"/g; s/\\/\\\\/g; s/\t/\\t/g')"
  }
EOF
done

echo "]"