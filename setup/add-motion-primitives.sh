#!/usr/bin/env bash
# Add recommended Motion Primitives to a new project (selective).
# Prefer: node essentials/setup/init.mjs --motion text-scramble,dock,in-view
# Docs: https://motion-primitives.com/docs

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

exec node "$SCRIPT_DIR/init.mjs" --motion dock,glow-effect,text-loop,in-view,text-scramble,animated-number,scroll-progress,animated-group,morphing-dialog,spotlight "$@"
