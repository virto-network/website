build: fetch-kunekt
    zola build

serve: fetch-kunekt
    zola serve

fetch-kunekt:
    #!/usr/bin/env nu
    let raw = "https://codeberg.org/Virto/kunekt/raw/branch/master/docs"
    mkdir content/kunekt

    let summary = http get $"($raw)/SUMMARY.md"
    let files = $summary | lines | parse --regex '\((?P<file>[a-z0-9_-]+\.md)\)' | get file

    for entry in ($files | enumerate) {
        let file = $entry.item
        let weight = $entry.index + 1
        let content = http get $"($raw)/($file)"
        let title = $content | lines | where {|l| $l | str starts-with '#'} | first | str replace -r '^#+ *' ''
        let body = $content | lines | skip 1 | str join "\n"
        let slug = $file | str replace '.md' ''
        $"+++\ntitle = \"($title)\"\nweight = ($weight)\n+++\n($body)" | save -f $"content/kunekt/($slug).md"
    }

    [
        "+++"
        "title = \"Kunekt Book\""
        "template = \"kunekt-section.html\""
        "page_template = \"kunekt-page.html\""
        "sort_by = \"weight\""
        "+++"
    ] | str join "\n" | save -f content/kunekt/_index.md

clean:
    rm -rf public content/kunekt
