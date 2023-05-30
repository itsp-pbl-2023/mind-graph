#!/usr/bin/env bash

client() {
  cd client
  sudo npm run dev
}

server() {
  cd server
  go run .
}

(trap 'kill 0' SIGINT; client & server)
