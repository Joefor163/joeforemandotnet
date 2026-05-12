#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# install.sh — one-time setup for the auto-push daemon
# Run this once from Terminal: bash .auto-push/install.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PLIST_SRC="$REPO_DIR/.auto-push/com.joeforeman.autopush.plist"
PLIST_DST="$HOME/Library/LaunchAgents/com.joeforeman.autopush.plist"
SCRIPT="$REPO_DIR/.auto-push/auto-push.sh"

echo ""
echo "  Installing Joe Foreman site auto-push daemon..."
echo "  Repo: $REPO_DIR"
echo ""

# Make the push script executable
chmod +x "$SCRIPT"

# Patch the plist with the real repo path and home dir
sed \
  -e "s|REPO_PATH|$REPO_DIR|g" \
  -e "s|HOME_PATH|$HOME|g" \
  "$PLIST_SRC" > "$PLIST_DST"

# Unload old version if running
launchctl unload "$PLIST_DST" 2>/dev/null || true

# Load the new agent
launchctl load "$PLIST_DST"

echo "  ✓ Daemon installed and running."
echo ""
echo "  From now on, any changes Claude makes to the site will be"
echo "  automatically pushed to GitHub and deployed within ~3 minutes."
echo ""
echo "  To check the log:  tail -f ~/Library/Logs/joeforeman-auto-push.log"
echo "  To stop:           launchctl unload ~/Library/LaunchAgents/com.joeforeman.autopush.plist"
echo "  To restart:        launchctl load ~/Library/LaunchAgents/com.joeforeman.autopush.plist"
echo ""
