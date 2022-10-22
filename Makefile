.PHONY: build release

build:
	yarn build

release: build
	npm run release