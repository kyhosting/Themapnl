/**
 * THEMA PANEL v2.0 - ULTRA ENGINE & ANTI-THEFT PROTECTION
 * Developer : Kicen x Thema Panel
 * Provider  : KyHosting (https://github.com/kyhosting/Themapnl)
 * Features  : Live Clock & Status in Navbar, Anti-Theft Watermark in All Menus,
 *             SubNav Tag, Persistent Ambient Footer, AdminLTE Integration,
 *             Interactive Shift+K Credits Modal, DevTools Banner
 */

(function () {
    'use strict';

    const THEMA_CONFIG = Object.freeze({
        name: 'Thema Panel',
        version: '2.0.0',
        edition: 'Ultra Edition (Nebula x Reviactyl)',
        developer: 'Kicen x Thema Panel',
        provider: 'KyHosting',
        repo: 'https://github.com/kyhosting/Themapnl',
        signature: 'KICEN-THEMAPNL-ULTRA-2026'
    });

    window.__THEMA_PANEL__ = THEMA_CONFIG;

    // DevTools Protection Banner
    function printDevToolsBanner() {
        const titleStyle = 'background: linear-gradient(135deg, #6366f1, #06b6d4); color: #fff; font-size: 15px; font-weight: 800; padding: 6px 14px; border-radius: 6px;';
        const subStyle = 'color: #38bdf8; font-size: 12px; font-weight: 600;';
        const warnStyle = 'color: #f43f5e; font-size: 11px; font-weight: 600;';

        console.log('%c⚡ ' + THEMA_CONFIG.name + ' v' + THEMA_CONFIG.version + ' - ' + THEMA_CONFIG.edition, titleStyle);
        console.log('%c👑 Developer: ' + THEMA_CONFIG.developer + ' | Hosted by ' + THEMA_CONFIG.provider, subStyle);
        console.log('%c📦 Official Repository: ' + THEMA_CONFIG.repo, subStyle);
        console.log('%c🛡️ Protected by Anti-Theft Signature. Do NOT copy or rebrand without permission.', warnStyle);
    }

    // Modal Credits Dialog
    function showCreditsModal() {
        let existing = document.getElementById('themapnl-modal');
        if (existing) {
            existing.remove();
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'themapnl-modal';
        modal.style.cssText = `
            position: fixed; inset: 0; background: rgba(4, 7, 15, 0.82);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            display: flex; align-items: center; justify-content: center;
            z-index: 100000; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            animation: themapnlFadeIn 0.25s ease-out;
        `;

        modal.innerHTML = `
            <div style="
                background: rgba(12, 18, 35, 0.96);
                border: 1px solid rgba(99, 102, 241, 0.5);
                box-shadow: 0 30px 70px rgba(0,0,0,0.85), 0 0 35px rgba(6, 182, 212, 0.35);
                border-radius: 22px; width: 90%; max-width: 480px; padding: 30px;
                color: #f8fafc; text-align: center; position: relative;
            ">
                <div style="
                    width: 56px; height: 56px; margin: 0 auto 16px;
                    border-radius: 18px; background: linear-gradient(135deg, #6366f1, #06b6d4);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.55); font-size: 26px;
                ">⚡</div>
                <h2 style="margin: 0 0 6px; font-size: 22px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ${THEMA_CONFIG.name} v${THEMA_CONFIG.version}
                </h2>
                <div style="font-size: 13px; color: #94a3b8; margin-bottom: 20px; font-weight: 500;">
                    ${THEMA_CONFIG.edition}
                </div>
                
                <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 14px; padding: 16px; margin-bottom: 22px; text-align: left; font-size: 13px; line-height: 1.8;">
                    <div>👑 <b>Developer:</b> <span style="color: #38bdf8; font-weight: 700;">${THEMA_CONFIG.developer}</span></div>
                    <div>🚀 <b>Provider:</b> <span style="color: #a78bfa; font-weight: 700;">${THEMA_CONFIG.provider}</span></div>
                    <div>🎨 <b>Aesthetics:</b> Nebula v2 + Reviactyl + Dark Glassmorphism</div>
                    <div>🛡️ <b>Anti-Theft:</b> Signature Active (All Menus Protected)</div>
                    <div>⌨️ <b>Shortcut:</b> Tekan <code>Shift + K</code> kapan saja untuk info</div>
                </div>

                <div style="display: flex; gap: 12px; justify-content: center;">
                    <a href="${THEMA_CONFIG.repo}" target="_blank" style="
                        background: linear-gradient(135deg, #6366f1, #06b6d4);
                        color: #fff; text-decoration: none; padding: 10px 20px;
                        border-radius: 12px; font-weight: 700; font-size: 13px;
                        box-shadow: 0 4px 18px rgba(99, 102, 241, 0.45);
                        display: inline-flex; align-items: center; gap: 6px;
                    ">GitHub Repository ↗</a>
                    <button id="themapnl-close-btn" style="
                        background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
                        color: #e2e8f0; padding: 10px 20px; border-radius: 12px;
                        font-weight: 600; font-size: 13px; cursor: pointer;
                    ">Tutup</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#themapnl-close-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Top Navigation Brand Tag + Live Clock
    function injectNavbarBrand() {
        const nav = document.querySelector('nav, div[class*="NavigationBar"]');
        if (!nav) return;

        if (!document.getElementById('themapnl-nav-brand')) {
            const brandBadge = document.createElement('div');
            brandBadge.id = 'themapnl-nav-brand';
            brandBadge.style.cssText = `
                display: inline-flex; align-items: center; gap: 8px;
                background: rgba(99, 102, 241, 0.14);
                border: 1px solid rgba(99, 102, 241, 0.38);
                padding: 5px 14px; border-radius: 9999px;
                font-size: 11px; font-weight: 700; color: #38bdf8;
                cursor: pointer; margin-right: 14px; transition: all 0.22s ease;
                box-shadow: 0 0 15px rgba(99, 102, 241, 0.25);
            `;
            brandBadge.innerHTML = `
                <span style="color: #a78bfa; font-size: 13px;">⚡</span>
                <span style="color: #ffffff; font-weight: 800; letter-spacing: 0.03em;">THEMA PANEL</span>
                <span style="color: #475569;">|</span>
                <span style="color: #38bdf8;">${THEMA_CONFIG.developer}</span>
            `;
            brandBadge.addEventListener('click', showCreditsModal);
            nav.appendChild(brandBadge);
        }

        // Live Clock Widget in Nav
        if (!document.getElementById('themapnl-live-clock')) {
            const clockEl = document.createElement('div');
            clockEl.id = 'themapnl-live-clock';
            clockEl.style.cssText = `
                display: inline-flex; align-items: center; gap: 6px;
                font-family: 'JetBrains Mono', monospace; font-size: 11px;
                color: #94a3b8; font-weight: 600; margin-right: 12px;
                background: rgba(255, 255, 255, 0.04); padding: 4px 10px;
                border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.06);
            `;
            
            function updateClock() {
                const now = new Date();
                const timeStr = now.toTimeString().split(' ')[0];
                clockEl.innerHTML = `<span style="color:#10b981;">●</span> <span>${timeStr}</span>`;
            }
            updateClock();
            setInterval(updateClock, 1000);
            nav.appendChild(clockEl);
        }
    }

    // SubNavigation Watermark
    function injectSubNavWatermark() {
        const subnav = document.querySelector('div[class*="SubNavigation"]');
        if (subnav && !document.getElementById('themapnl-subnav-tag')) {
            const tag = document.createElement('div');
            tag.id = 'themapnl-subnav-tag';
            tag.style.cssText = `
                margin-left: auto; display: inline-flex; align-items: center; gap: 6px;
                font-size: 11px; font-weight: 700; color: #a78bfa; padding: 4px 12px;
                cursor: pointer; opacity: 0.85; transition: opacity 0.2s;
            `;
            tag.innerHTML = `<span>👑</span> <span>${THEMA_CONFIG.developer}</span>`;
            tag.addEventListener('click', showCreditsModal);
            subnav.appendChild(tag);
        }
    }

    // Persistent Footer Watermark Injection
    function injectFooter() {
        if (document.getElementById('themapnl-footer')) return;

        const footer = document.createElement('div');
        footer.id = 'themapnl-footer';
        footer.className = 'themapnl-footer-bar';
        footer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #6366f1; font-weight: 800; font-size: 14px;">⚡</span>
                <span style="font-weight: 800; color: #f1f5f9; letter-spacing: 0.02em;">${THEMA_CONFIG.name}</span>
                <span style="color: #475569;">•</span>
                <span style="color: #94a3b8;">${THEMA_CONFIG.edition}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 14px;">
                <div class="themapnl-badge" id="themapnl-badge-click">
                    <span>👑</span>
                    <span>Dev: ${THEMA_CONFIG.developer}</span>
                </div>
                <a href="${THEMA_CONFIG.repo}" target="_blank" style="font-size: 11px; opacity: 0.9;">GitHub Repo</a>
            </div>
        `;

        document.body.appendChild(footer);
        footer.querySelector('#themapnl-badge-click')?.addEventListener('click', showCreditsModal);
    }

    // AdminLTE Branding Injection
    function injectAdminBranding() {
        const adminHeader = document.querySelector('.main-header .navbar');
        if (adminHeader && !document.getElementById('themapnl-admin-header')) {
            const adminTag = document.createElement('div');
            adminTag.id = 'themapnl-admin-header';
            adminTag.style.cssText = `
                float: left; padding: 15px; color: #38bdf8; font-weight: 800;
                font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;
                cursor: pointer;
            `;
            adminTag.innerHTML = `⚡ ${THEMA_CONFIG.name} <span style="color:#a78bfa;">by ${THEMA_CONFIG.developer}</span>`;
            adminTag.addEventListener('click', showCreditsModal);
            adminHeader.insertBefore(adminTag, adminHeader.firstChild);
        }

        const adminFooter = document.querySelector('.main-footer');
        if (adminFooter && !document.getElementById('themapnl-admin-footer')) {
            const footerCredit = document.createElement('div');
            footerCredit.id = 'themapnl-admin-footer';
            footerCredit.style.cssText = 'float: right; font-weight: 700; color: #38bdf8; cursor: pointer;';
            footerCredit.innerHTML = `Thema Panel v${THEMA_CONFIG.version} • Dev: <b style="color:#a78bfa;">${THEMA_CONFIG.developer}</b>`;
            footerCredit.addEventListener('click', showCreditsModal);
            adminFooter.appendChild(footerCredit);
        }
    }

    // Anti-Tamper Observer
    function startAntiTamperObserver() {
        const observer = new MutationObserver(() => {
            const footer = document.getElementById('themapnl-footer');
            if (!footer) {
                injectFooter();
            } else if (
                footer.style.display === 'none' ||
                footer.style.visibility === 'hidden' ||
                footer.style.opacity === '0'
            ) {
                footer.style.display = 'flex';
                footer.style.visibility = 'visible';
                footer.style.opacity = '1';
            }

            injectNavbarBrand();
            injectSubNavWatermark();
            injectAdminBranding();
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    }

    // Keyboard Shortcut (Shift + K) for Info
    window.addEventListener('keydown', (e) => {
        if (e.shiftKey && (e.key === 'K' || e.key === 'k')) {
            showCreditsModal();
        }
    });

    function init() {
        printDevToolsBanner();
        injectFooter();
        injectNavbarBrand();
        injectSubNavWatermark();
        injectAdminBranding();
        startAntiTamperObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
