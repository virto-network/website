lang := "es" # for english run `just lang=en *command*`

# default
build-all:
    just lang=es build 
    just lang=en build

build: clean
    cobalt build --config _cobalt_{{ lang }}.yml

clean:
    cobalt clean --config _cobalt_{{ lang }}.yml

serve:
    cobalt serve --config _cobalt_{{ lang }}.yml
