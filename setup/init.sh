#!/usr/bin/env bash
# Selective essentials installer — copies only what you need into src/
# Usage: bash essentials/setup/init.sh --preset dashboard

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/init.mjs" "$@"
