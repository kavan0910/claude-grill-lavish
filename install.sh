#!/usr/bin/env bash
# Installs the grill-me, grilling and lavish skills.
# Usage: ./install.sh [--project DIR] [--agents]
#   (default)       install globally to ~/.claude/skills
#   --project DIR   install into DIR/.claude/skills instead
#   --agents        also install into the matching .agents/skills (Codex etc.)
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
BASE="$HOME"; AGENTS=0
while [ $# -gt 0 ]; do
  case "$1" in
    --project) BASE="$(cd "$2" && pwd)"; shift 2 ;;
    --agents) AGENTS=1; shift ;;
    *) echo "unknown option: $1" >&2; exit 1 ;;
  esac
done
targets=("$BASE/.claude/skills")
[ "$AGENTS" = 1 ] && targets+=("$BASE/.agents/skills")
for t in "${targets[@]}"; do
  mkdir -p "$t"
  for s in "$HERE"/skills/*/; do
    name="$(basename "$s")"
    rm -rf "$t/$name"
    cp -R "$s" "$t/$name"
    echo "installed $name -> $t/$name"
  done
done
command -v node >/dev/null || echo "note: lavish needs Node (npx -y lavish-axi). Install Node first."
echo "Done. Start a new Claude Code session, then try /grill-me or /lavish."
