#!/usr/bin/env bash
# Install the three deck fonts so headless Chromium renders them correctly.
#
# WHY THIS MATTERS: Funnel Display, Geist Mono and Inter are loaded by the deck
# via Google Fonts, but fonts.googleapis.com / fonts.gstatic.com are NOT on the
# container network allowlist. github.com IS. Google mirrors every font in the
# google/fonts repo, so we pull the TTFs from raw.githubusercontent.com and
# install them locally. Without this, headless renders silently fall back to
# Arial/system fonts and every overflow check is wrong.
#
# LOCAL NOTE (macOS / a machine with internet): you usually DON'T need this.
# Any browser, including the headless render check, fetches the web fonts from
# Google Fonts itself. Only run this if you're offline or the render comes out
# in the wrong font. On macOS the user-dir fallback below installs to ~/.fonts;
# if fc-cache isn't present, copy the TTFs into ~/Library/Fonts instead.
#
# Idempotent: safe to run on every build. Never hard-fails the skill.

set -u

have_fonts() {
  fc-list 2>/dev/null | grep -qi "Funnel Display" \
    && fc-list 2>/dev/null | grep -qi "Geist Mono" \
    && fc-list 2>/dev/null | grep -qi "Inter:"
}

if have_fonts; then
  echo "fonts: already installed"
  exit 0
fi

TMP="$(mktemp -d)"
base="https://raw.githubusercontent.com/google/fonts/main/ofl"
echo "fonts: downloading from google/fonts (github raw)…"
curl -fsSL -o "$TMP/FunnelDisplay.ttf" "$base/funneldisplay/FunnelDisplay%5Bwght%5D.ttf" || echo "  FunnelDisplay download failed"
curl -fsSL -o "$TMP/GeistMono.ttf"     "$base/geistmono/GeistMono%5Bwght%5D.ttf"        || echo "  GeistMono download failed"
curl -fsSL -o "$TMP/Inter.ttf"         "$base/inter/Inter%5Bopsz,wght%5D.ttf"           || echo "  Inter download failed"

# Prefer a global writable font dir; fall back to a fontconfig user dir.
if cp "$TMP"/*.ttf /usr/local/share/fonts/ 2>/dev/null; then
  fc-cache -f /usr/local/share/fonts >/dev/null 2>&1
  echo "fonts: installed to /usr/local/share/fonts"
else
  mkdir -p "$HOME/.fonts" "$HOME/.config/fontconfig"
  cp "$TMP"/*.ttf "$HOME/.fonts/" 2>/dev/null
  cat > "$HOME/.config/fontconfig/fonts.conf" <<EOF
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig><dir>$HOME/.fonts</dir></fontconfig>
EOF
  fc-cache -f >/dev/null 2>&1
  echo "fonts: installed to \$HOME/.fonts"
fi

rm -rf "$TMP"
if have_fonts; then
  echo "fonts: ready"
else
  echo "fonts: WARNING — not all families resolved; render will use fallbacks and fit checks will be approximate"
fi
