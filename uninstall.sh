#!/usr/bin/env bash
# ==============================================================================
# THEMA PANEL UNINSTALLER
# Developer : Kicen x Thema Panel
# Provider  : KyHosting (https://github.com/kyhosting/Themapnl)
# ==============================================================================

set -e

PTERO_DIR="/var/www/pterodactyl"

echo -e "\033[1;33m[!] Mencopot Thema Panel (Kicen x Thema Panel)...\033[0m"

if [ "$EUID" -ne 0 ]; then
    echo -e "\033[1;31m[-] Skrip ini harus dijalankan sebagai root!\033[0m"
    exit 1
fi

WRAPPER="$PTERO_DIR/resources/views/templates/wrapper.blade.php"
if [ -f "$WRAPPER" ]; then
    sed -i '/themapnl.css/d' "$WRAPPER"
    sed -i '/themapnl.js/d' "$WRAPPER"
    sed -i '/modern-glass.css/d' "$WRAPPER"
fi

ADMIN="$PTERO_DIR/resources/views/layouts/admin.blade.php"
if [ -f "$ADMIN" ]; then
    sed -i '/themapnl.css/d' "$ADMIN"
    sed -i '/themapnl.js/d' "$ADMIN"
    sed -i '/modern-glass.css/d' "$ADMIN"
fi

rm -f "$PTERO_DIR/public/themes/pterodactyl/css/themapnl.css"
rm -f "$PTERO_DIR/public/themes/pterodactyl/css/modern-glass.css"
rm -f "$PTERO_DIR/public/themes/pterodactyl/js/themapnl.js"

if [ -d "$PTERO_DIR" ]; then
    cd "$PTERO_DIR"
    php artisan view:clear || true
    php artisan config:clear || true
fi

echo -e "\033[1;32m[✓] Thema Panel berhasil dicopot dan kembali ke tampilan default Pterodactyl.\033[0m"
