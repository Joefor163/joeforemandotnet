#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# autopush.sh — Auto-commit and push any changes to GitHub
#
# Triggered automatically by macOS launchd whenever files change.
# Do not run this manually — use setup-autopush.sh to install it.
# ─────────────────────────────────────────────────────────────────

# Path is written in by setup-autopush.sh
REPO="__REPO_PATH__"
LOG="$HOME/.claude-autopush.log"
MAX_LOG=500  # lines to keep

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG"
}

# Trim log so it doesn't grow forever
if [ -f "$LOG" ] && [ "$(wc -l < "$LOG")" -gt "$MAX_LOG" ]; then
  tail -n $MAX_LOG "$LOG" > "$LOG.tmp" && mv "$LOG.tmp" "$LOG"
fi

cd "$REPO" || { log "ERROR: repo not found at $REPO"; exit 1; }

# Check for any uncommitted changes (modified, new, or deleted files)
if git diff --quiet && git diff --cached --quiet && \
   [ -z "$(git ls-files --others --exclude-standard)" ]; then
  exit 0  # Nothing to do
fi

log "Changes detected — committing..."

git add -A

# Build a smart commit message listing changed files
CHANGED=$(git diff --cached --name-only | head -5 | tr '\n' ', ' | sed 's/,$//')
FILE_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
if [ "$FILE_COUNT" -gt 5 ]; then
  MSG="Site update: $FILE_COUNT files changed ($(date '+%b %d, %Y'))"
else
  MSG="Site update: $CHANGED ($(date '+%b %d, %Y'))"
fi

git commit -m "$MSG"

if git push origin main >> "$LOG" 2>&1; then
  log "Pushed successfully: $MSG"
else
  log "ERROR: push failed — check log above for details"
  exit 1
fi
