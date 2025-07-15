lang := "es" # for english run `just lang=en *command*`

# default
build-all:
    just lang=es build-main
    just lang=en build-main

build-main: clean-main
    cobalt build --config _cobalt_{{ lang }}.yml

clean-main:
    cobalt clean --config _cobalt_{{ lang }}.yml

serve-main:
    cobalt serve --config _cobalt_{{ lang }}.yml
