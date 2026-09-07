#!/usr/bin/env bash
# ==============================================================================
# THEMA PANEL v2.0 INSTALLER - NEBULA x REVIACTYL EDITION
# Developer : Kicen x Thema Panel
# Provider  : KyHosting (https://github.com/kyhosting/Themapnl)
# ==============================================================================

set -e

PTERO_DIR="/var/www/pterodactyl"
REPO_RAW="https://raw.githubusercontent.com/kyhosting/Themapnl/main"
BACKUP_DIR="$PTERO_DIR/.themapnl-backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

banner() {
    clear 2>/dev/null || true
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${CYAN}${BOLD}                  THEMA PANEL v2.0 INSTALLER                      ${NC}${PURPLE}║${NC}"
    echo -e "${PURPLE}║${BLUE}               Combo Style: Nebula v2 x Reviactyl                 ${NC}${PURPLE}║${NC}"
    echo -e "${PURPLE}║${YELLOW}                Developer: Kicen x Thema Panel                    ${NC}${PURPLE}║${NC}"
    echo -e "${PURPLE}║${GREEN}                Provider : KyHosting Hosting                       ${NC}${PURPLE}║${NC}"
    echo -e "${PURPLE}║${CYAN}         GitHub  : https://github.com/kyhosting/Themapnl          ${NC}${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}[✗] Skrip ini wajib dijalankan sebagai root / sudo!${NC}"
        exit 1
    fi
}

check_pterodactyl() {
    if [ ! -d "$PTERO_DIR" ]; then
        echo -e "${RED}[✗] Direktori Pterodactyl ($PTERO_DIR) tidak ditemukan!${NC}"
        echo -e "${YELLOW}[?] Masukkan path direktori Pterodactyl kustom Anda (default /var/www/pterodactyl):${NC}"
        read -r CUSTOM_DIR
        if [ -d "$CUSTOM_DIR" ]; then
            PTERO_DIR="$CUSTOM_DIR"
        else
            echo -e "${RED}[✗] Direktori $CUSTOM_DIR tidak valid. Instalasi dibatalkan.${NC}"
            exit 1
        fi
    fi
}

backup_files() {
    echo -e "${CYAN}[*] Membuat backup file asli Pterodactyl...${NC}"
    mkdir -p "$BACKUP_DIR/$TIMESTAMP"
    
    WRAPPER="$PTERO_DIR/resources/views/templates/wrapper.blade.php"
    ADMIN="$PTERO_DIR/resources/views/layouts/admin.blade.php"

    if [ -f "$WRAPPER" ]; then
        cp "$WRAPPER" "$BACKUP_DIR/$TIMESTAMP/wrapper.blade.php"
    fi
    if [ -f "$ADMIN" ]; then
        cp "$ADMIN" "$BACKUP_DIR/$TIMESTAMP/admin.blade.php"
    fi
    echo -e "${GREEN}[✓] Backup tersimpan di: $BACKUP_DIR/$TIMESTAMP${NC}"
}

install_assets() {
    echo -e "${CYAN}[*] Mengunduh dan menyalin asset tema...${NC}"
    mkdir -p "$PTERO_DIR/public/themes/pterodactyl/css"
    mkdir -p "$PTERO_DIR/public/themes/pterodactyl/js"

    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

    # Cek apakah file lokal tersedia (saat git clone)
    if [ -f "$SCRIPT_DIR/themapnl.css" ] && [ -f "$SCRIPT_DIR/themapnl.js" ]; then
        cp "$SCRIPT_DIR/themapnl.css" "$PTERO_DIR/public/themes/pterodactyl/css/themapnl.css"
        cp "$SCRIPT_DIR/themapnl.css" "$PTERO_DIR/public/themes/pterodactyl/css/modern-glass.css"
        cp "$SCRIPT_DIR/themapnl.js" "$PTERO_DIR/public/themes/pterodactyl/js/themapnl.js"
    else
        # Unduh langsung dari repositori publik GitHub
        echo -e "${BLUE}[*] Mengunduh aset dari GitHub (${REPO_RAW})...${NC}"
        curl -sSL "$REPO_RAW/themapnl.css" -o "$PTERO_DIR/public/themes/pterodactyl/css/themapnl.css"
        curl -sSL "$REPO_RAW/themapnl.css" -o "$PTERO_DIR/public/themes/pterodactyl/css/modern-glass.css"
        curl -sSL "$REPO_RAW/themapnl.js" -o "$PTERO_DIR/public/themes/pterodactyl/js/themapnl.js"
    fi

    chown -R www-data:www-data "$PTERO_DIR/public/themes/pterodactyl"
    chmod 644 "$PTERO_DIR/public/themes/pterodactyl/css/themapnl.css"
    chmod 644 "$PTERO_DIR/public/themes/pterodactyl/css/modern-glass.css"
    chmod 644 "$PTERO_DIR/public/themes/pterodactyl/js/themapnl.js"
    echo -e "${GREEN}[✓] Aset Thema Panel berhasil dipasang.${NC}"
}

inject_templates() {
    echo -e "${CYAN}[*] Menginjeksi CSS & JS ke Blade Templates...${NC}"
    WRAPPER="$PTERO_DIR/resources/views/templates/wrapper.blade.php"
    ADMIN="$PTERO_DIR/resources/views/layouts/admin.blade.php"

    # Injeksi ke wrapper.blade.php (Client Area)
    if [ -f "$WRAPPER" ]; then
        sed -i '/themapnl\.css/d; /themapnl\.js/d; /modern-glass\.css/d' "$WRAPPER"

        if grep -q '@yield.*assets' "$WRAPPER"; then
            sed -i '/@yield.*assets/a \        <link rel="stylesheet" href="/themes/pterodactyl/css/themapnl.css?v=2.0.0">' "$WRAPPER"
            sed -i '/themapnl\.css/a \        <script src="/themes/pterodactyl/js/themapnl.js?v=2.0.0" defer></script>' "$WRAPPER"
        else
            sed -i '/<\/head>/i \        <link rel="stylesheet" href="/themes/pterodactyl/css/themapnl.css?v=2.0.0">' "$WRAPPER"
            sed -i '/themapnl\.css/a \        <script src="/themes/pterodactyl/js/themapnl.js?v=2.0.0" defer></script>' "$WRAPPER"
        fi
        echo -e "${GREEN}[✓] Client Wrapper berhasil diinjeksi.${NC}"
    fi

    # Injeksi ke admin.blade.php (Admin Area)
    if [ -f "$ADMIN" ]; then
        sed -i '/themapnl\.css/d; /themapnl\.js/d; /modern-glass\.css/d' "$ADMIN"

        if grep -q 'ionicons\.min\.css' "$ADMIN"; then
            sed -i '/ionicons\.min\.css/a \            <link rel="stylesheet" href="/themes/pterodactyl/css/themapnl.css?v=2.0.0">' "$ADMIN"
            sed -i '/themapnl\.css/a \            <script src="/themes/pterodactyl/js/themapnl.js?v=2.0.0" defer></script>' "$ADMIN"
        else
            sed -i '/<\/head>/i \            <link rel="stylesheet" href="/themes/pterodactyl/css/themapnl.css?v=2.0.0">' "$ADMIN"
            sed -i '/themapnl\.css/a \            <script src="/themes/pterodactyl/js/themapnl.js?v=2.0.0" defer></script>' "$ADMIN"
        fi
        echo -e "${GREEN}[✓] Admin Layout berhasil diinjeksi.${NC}"
    fi
}

clear_cache() {
    echo -e "${CYAN}[*] Membersihkan cache tampilan Laravel...${NC}"
    cd "$PTERO_DIR"
    php artisan view:clear || true
    php artisan config:clear || true
    echo -e "${GREEN}[✓] Cache Laravel berhasil dibersihkan.${NC}"
}

do_install() {
    banner
    check_root
    check_pterodactyl
    backup_files
    install_assets
    inject_templates
    clear_cache

    echo ""
    echo -e "${GREEN}══════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}${BOLD} [✓] INSTALASI THEMA PANEL BERHASIL!${NC}"
    echo -e "${CYAN} Developer: ${YELLOW}Kicen x Thema Panel${NC}"
    echo -e "${CYAN} Provider : ${BLUE}KyHosting${NC}"
    echo -e "${GREEN} Silakan buka panel Pterodactyl Anda dan tekan Ctrl + F5 di browser.${NC}"
    echo -e "${GREEN}══════════════════════════════════════════════════════════════════${NC}"
}

do_uninstall() {
    banner
    check_root
    check_pterodactyl
    echo -e "${YELLOW}[!] Memulai pencopotan Thema Panel...${NC}"

    WRAPPER="$PTERO_DIR/resources/views/templates/wrapper.blade.php"
    ADMIN="$PTERO_DIR/resources/views/layouts/admin.blade.php"

    if [ -f "$WRAPPER" ]; then
        sed -i '/themapnl.css/d' "$WRAPPER"
        sed -i '/themapnl.js/d' "$WRAPPER"
        sed -i '/modern-glass.css/d' "$WRAPPER"
    fi

    if [ -f "$ADMIN" ]; then
        sed -i '/themapnl.css/d' "$ADMIN"
        sed -i '/themapnl.js/d' "$ADMIN"
        sed -i '/modern-glass.css/d' "$ADMIN"
    fi

    rm -f "$PTERO_DIR/public/themes/pterodactyl/css/themapnl.css"
    rm -f "$PTERO_DIR/public/themes/pterodactyl/css/modern-glass.css"
    rm -f "$PTERO_DIR/public/themes/pterodactyl/js/themapnl.js"

    cd "$PTERO_DIR"
    php artisan view:clear || true
    php artisan config:clear || true

    echo -e "${GREEN}[✓] Thema Panel berhasil dicopot. Tampilan kembali ke default Pterodactyl.${NC}"
}

# Argumen CLI langsung (contoh: ./install.sh --install atau --uninstall)
case "$1" in
    --install)
        do_install
        exit 0
        ;;
    --uninstall)
        do_uninstall
        exit 0
        ;;
    --repair)
        banner
        check_root
        check_pterodactyl
        install_assets
        inject_templates
        clear_cache
        echo -e "${GREEN}[✓] Thema Panel berhasil diperbaiki & cache disegarkan.${NC}"
        exit 0
        ;;
esac

# Interactive Menu jika dijalankan tanpa parameter
banner
echo -e "${CYAN}Pilih opsi:${NC}"
echo -e "  ${GREEN}[1]${NC} Pasang / Update Thema Panel (Nebula x Reviactyl)"
echo -e "  ${YELLOW}[2]${NC} Perbaiki / Refresh Cache Panel"
echo -e "  ${RED}[3]${NC} Copot Thema Panel (Uninstall & Kembali ke Default)"
echo -e "  ${BLUE}[4]${NC} Keluar"
echo ""
read -p "Masukkan pilihan [1-4]: " OPTION

case "$OPTION" in
    1)
        do_install
        ;;
    2)
        check_root
        check_pterodactyl
        install_assets
        inject_templates
        clear_cache
        echo -e "${GREEN}[✓] Perbaikan selesai.${NC}"
        ;;
    3)
        do_uninstall
        ;;
    4)
        echo -e "${BLUE}Keluar... Sampai jumpa!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}[✗] Pilihan tidak valid!${NC}"
        exit 1
        ;;
esac
