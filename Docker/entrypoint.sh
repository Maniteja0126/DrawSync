#!/bin/sh

echo "Starting project: $PROJECT"

case "$PROJECT" in
  frontend)
    pnpm start-frontend
    ;;
  http-backend)
    pnpm start-http
    ;;
  ws-backend)
    pnpm start-ws
    ;;
  *)
    echo "Unknown project: $PROJECT"
    exit 1
    ;;
esac
