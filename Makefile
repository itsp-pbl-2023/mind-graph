GO_REPO_ROOT_PACKAGE := "github.com/itsp-pbl-2023/mind-graph"
PROTOC_OPTS := -I ./api --go_out=./server --go_opt=module=$(GO_REPO_ROOT_PACKAGE) \
	--connect-go_out=./server --connect-go_opt=module=$(GO_REPO_ROOT_PACKAGE) \
	--es_out=./client/src/lib/api --es_opt=target=ts \
	--connect-es_out=./client/src/lib/api --connect-es_opt=target=ts \
	--connect-query_out=./client/src/lib/api --connect-query_opt=target=ts
PROTOC_SOURCES ?= $(shell find ./api -type f -name "*.proto" -print)

.DEFAULT_GOAL := help

.PHONY: help
help: ## Display this help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init: ## Install commands
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest
	yarn global add @bufbuild/protoc-gen-connect-es @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-query
	go install github.com/ktr0731/evans@latest

.PHONY: protoc
protoc: ## Generate proto sources
	protoc $(PROTOC_OPTS) $(PROTOC_SOURCES)
