#!/bin/sh
# Fetch latest Kunekt Book docs from Codeberg and generate Zola content pages
set -e

REPO_RAW="https://codeberg.org/Virto/kunekt/raw/branch/master/docs"
OUT_DIR="content/kunekt"

mkdir -p "$OUT_DIR"

# Fetch SUMMARY.md for ordering
curl -sL "$REPO_RAW/SUMMARY.md" -o /tmp/kunekt-summary.md

# Create section index
cat > "$OUT_DIR/_index.md" << 'FRONT'
+++
title = "Kunekt Book"
template = "kunekt-section.html"
page_template = "kunekt-page.html"
sort_by = "weight"
+++
FRONT

# Parse SUMMARY.md — extract ordered list of markdown files
weight=1
grep -oP '\(([a-z0-9_-]+\.md)\)' /tmp/kunekt-summary.md | tr -d '()' | while read -r file; do
    slug="${file%.md}"
    echo "Fetching $file (weight=$weight)..."
    content=$(curl -sL "$REPO_RAW/$file")

    # Extract title from first heading
    title=$(echo "$content" | grep -m1 '^#' | sed 's/^#\+ *//')

    # Write Zola page with frontmatter
    {
        echo "+++"
        echo "title = \"$title\""
        echo "weight = $weight"
        echo "+++"
        echo ""
        echo "$content" | tail -n +2  # skip the first heading (used as title)
    } > "$OUT_DIR/$slug.md"

    weight=$((weight + 1))
done

echo "Fetched $((weight - 1)) Kunekt docs into $OUT_DIR/"
