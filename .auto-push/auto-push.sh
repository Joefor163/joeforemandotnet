#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# auto-push.sh — Joe Foreman's site auto-push daemon
#
# Runs every few minutes via launchd. Detects any uncommitted changes in the
# git repo, commits them automatically, and pushes to GitHub — which triggers
# the Cloudflare Pages deploy workflow.
#
# Claude makes changes → this script notices → pushes → GitHub Action deploys.
# Joe doesn't need to do anything.
# ─────────────────────────────────────────────────────────────────────────────

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_FILE="$HOME/Library/Logs/joeforeman-auto-push.log"
LOCK_FILE="/tmp/joeforeman-auto-push.lock"
MIN_AGE_SECONDS=15   # only push if last change was at least this many seconds ago

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Prevent overlapping runs
if [ -f "$LOCK_FILE" ]; then
  log "Another instance is running, skipping."
  exit 0
fi
touch "$LOCK_FILE"
trap 'rm -f "$LOCK_FILE"' EXIT

cd "$REPO_DIR" || { log "ERROR: Cannot cd to $REPO_DIR"; exit 1; }

# Check if there are any uncommitted changes (staged, unstaged, or untracked)
if git diff --quiet HEAD 2>/dev/null && [ -z "$(git status --porcelain 2>/dev/null)" ]; then
  # Nothing to do
  exit 0
fi

# Wait until files have settled (no writes in the last MIN_AGE_SECONDS seconds)
# Finds the most recently modified tracked file
NEWEST=$(find . \
  -not -path './.git/*' \
  -not -name '.DS_Store' \
  -not -name '*.lock' \
  -newer ".git/index" \
  -type f \
  -print0 2>/dev/null \
  | xargs -0 stat -f '%m %N' 2>/dev/null \
  | sort -rn \
  | head -1 \
  | awk '{print $1}')

if [ -n "$NEWEST" ]; then
  NOW=$(date +%s)
  AGE=$(( NOW - NEWEST ))
  if [ "$AGE" -lt "$MIN_AGE_SECONDS" ]; then
    log "Changes found but files still being written (age=${AGE}s < ${MIN_AGE_SECONDS}s). Waiting."
    exit 0
  fi
fi

# Stage all changes
git add -A

# Build a smart commit message from what changed
CHANGED_FILES=$(git diff --cached --name-only 2>/dev/null | head -10)
FILE_COUNT=$(git diff --cached --name-only 2>/dev/null | wc -l | tr -d ' ')

if [ "$FILE_COUNT" -eq 1 ]; then
  COMMIT_MSG="Update $CHANGED_FILES"
elif [ "$FILE_COUNT" -le 4 ]; then
  SUMMARY=$(echo "$CHANGED_FILES" | tr '\n' ', ' | sed 's/, $//')
  COMMIT_MSG="Update $SUMMARY"
else
  COMMIT_MSG="Update $FILE_COUNT files"
fi

COMMIT_MSG="$COMMIT_MSG [auto]"

# Commit
git -c user.name="Joe Foreman" \
    -c user.email="j@rocketscicom.com" \
    commit -m "$COMMIT_MSG" >> "$LOG_FILE" 2>&1

if [ $? -ne 0 ]; then
  log "ERROR: git commit failed"
  exit 1
fi

log "Committed: $COMMIT_MSG"

# Push
git push origin main >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
  log "SUCCESS: Pushed to GitHub. Cloudflare deploy triggered."
else
  log "ERROR: git push failed. Will retry next run."
  # Roll back the commit so we try again cleanly next time
  git reset HEAD~1 >> "$LOG_FILE" 2>&1
fi
