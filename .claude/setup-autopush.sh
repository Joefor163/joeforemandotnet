#!/bin/bash
# ─────────────────────────────────────────────────────────────────
# setup-autopush.sh — One-time setup for automatic git push
#
# Run this ONCE from Terminal, from inside the joeforemandotnet folder:
#
#   cd path/to/joeforemandotnet
#   bash .claude/setup-autopush.sh
#
# After setup, any file changes Claude makes will be automatically
# committed and pushed to GitHub — no action needed from you.
# ─────────────────────────────────────────────────────────────────

set -e

REPO_PATH="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPT_SRC="$REPO_PATH/.claude/autopush.sh"
SCRIPT_DEST="$HOME/.claude-autopush.sh"
PLIST_PATH="$HOME/Library/LaunchAgents/net.joeforeman.autopush.plist"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║     Joe Foreman — Auto-push Setup            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Repo path: $REPO_PATH"
echo ""

# ── 1. Write the real repo path into the push script ──
sed "s|__REPO_PATH__|$REPO_PATH|g" "$SCRIPT_SRC" > "$SCRIPT_DEST"
chmod +x "$SCRIPT_DEST"
echo "✓ Push script installed at $SCRIPT_DEST"

# ── 2. Configure git credential helper (uses macOS keychain) ──
git -C "$REPO_PATH" config credential.helper osxkeychain
echo "✓ Git credential helper set to osxkeychain"

# ── 3. Test that we can reach GitHub ──
echo ""
echo "Testing GitHub connection..."
if git -C "$REPO_PATH" ls-remote --exit-code origin > /dev/null 2>&1; then
  echo "✓ GitHub connection OK"
else
  echo ""
  echo "⚠  Could not reach GitHub. Your credentials may need refreshing."
  echo "   Open GitHub Desktop, sign out and back in, then re-run this script."
  exit 1
fi

# ── 4. Install the launchd plist (watches repo, fires on any change) ──
cat > "$PLIST_PATH" << PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>net.joeforeman.autopush</string>

  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$SCRIPT_DEST</string>
  </array>

  <!-- Fire whenever any file in the repo changes -->
  <key>WatchPaths</key>
  <array>
    <string>$REPO_PATH</string>
  </array>

  <!-- Also run once at login, in case changes were made while Mac was off -->
  <key>RunAtLoad</key>
  <true/>

  <!-- Throttle: wait 30 seconds after a change before pushing,
       so rapid edits are batched into one commit -->
  <key>ThrottleInterval</key>
  <integer>30</integer>

  <key>StandardOutPath</key>
  <string>$HOME/.claude-autopush.log</string>
  <key>StandardErrorPath</key>
  <string>$HOME/.claude-autopush.log</string>
</dict>
</plist>
PLIST

echo "✓ LaunchAgent plist written"

# ── 5. Load (or reload) the LaunchAgent ──
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"
echo "✓ LaunchAgent loaded and running"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅  Auto-push is active!                    ║"
echo "║                                              ║"
echo "║  From now on, Claude's changes push          ║"
echo "║  automatically — no action needed from you.  ║"
echo "║                                              ║"
echo "║  To watch it work:                           ║"
echo "║    tail -f ~/.claude-autopush.log            ║"
echo "║                                              ║"
echo "║  To stop it:                                 ║"
echo "║    launchctl unload ~/Library/LaunchAgents/  ║"
echo "║      net.joeforeman.autopush.plist           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
