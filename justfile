# default
build: fetch-kunekt
    zola build

serve: fetch-kunekt
    zola serve

fetch-kunekt:
    bash scripts/fetch-kunekt.sh

clean:
    rm -rf public content/kunekt
