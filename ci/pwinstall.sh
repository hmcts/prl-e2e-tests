#!/usr/bin/env bash

set -euo pipefail

echo "pwinstall: ensuring Playwright browsers are available"

if [ -d "/ms-playwright" ] && [ -n "$(ls -A /ms-playwright 2>/dev/null || true)" ]; then
  echo "pwinstall: detected pre-baked browsers in /ms-playwright; skipping download"
  exit 0
fi

if [ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && [ "${PLAYWRIGHT_BROWSERS_PATH}" != "0" ] && [ -d "${PLAYWRIGHT_BROWSERS_PATH}" ]; then
  if [ -n "$(ls -A "${PLAYWRIGHT_BROWSERS_PATH}" 2>/dev/null || true)" ]; then
    echo "pwinstall: detected browsers in PLAYWRIGHT_BROWSERS_PATH=${PLAYWRIGHT_BROWSERS_PATH}; skipping download"
    exit 0
  fi
fi

echo "pwinstall: downloading browsers (no OS deps install)"
yarn playwright install "$@"
