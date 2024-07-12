lang := "es" # for english run `just *command* lang=en`

# default
build-all:
    lang=es just build 
    lang=en just build

build: clean
    cobalt build --config _cobalt_{{ lang }}.yml

clean:
    cobalt clean --config _cobalt_{{ lang }}.yml

serve:
    cobalt serve --config _cobalt_{{ lang }}.yml
