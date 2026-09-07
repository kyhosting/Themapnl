/**
 * THEMA PANEL v2.0 - Core Engine & Anti-Theft Watermark
 * Developer : Kicen x Thema Panel
 * Provider  : KyHosting (https://github.com/kyhosting/Themapnl)
 * Features  : Navigation Branding, SubNavigation Watermark, Persistent Glass Footer,
 *             AdminLTE Integration, Anti-Tamper Observer, DevTools Signature
 */

(function () {
    'use strict';

    // Anti-Tamper Developer Signature
    const THEMA_CONFIG = Object.freeze({
        name: 'Thema Panel',
        version: '2.0.0',
        edition: 'Nebula x Reviactyl Combo',
        developer: 'Kicen x Thema Panel',
        provider: 'KyHosting',
        repo: 'https://github.com/kyhosting/Themapnl',
        signature: 'THEMA-PNL-KICEN-VERIFIED-2026'
    });

    window.__THEMA_PANEL__ = THEMA_CONFIG;

    // DevTools Protection Banner
    function printDevToolsBanner() {
        const titleStyle = 'background: linear-gradient(135deg, #6366f1, #06b6d4); color: #fff; font-size: 14px; font-weight: 800; padding: 6px 14px; border-radius: 6px;';
        const subStyle = 'color: #38bdf8; font-size: 12px; font-weight: 600;';
        const warnStyle = 'color: #f43f5e; font-size: 11px; font-weight: 500;';

        console.log('%c🚀 ' + THEMA_CONFIG.name + ' v' + THEMA_CONFIG.version + ' (' + THEMA_CONFIG.edition + ')', titleStyle);
        console.log('%c⚡ Developed by: ' + THEMA_CONFIG.developer + ' | Powered by ' + THEMA_CONFIG.provider, subStyle);
        console.log('%c📦 Official Repository: ' + THEMA_CONFIG.repo, subStyle);
        console.log('%c🔒 Anti-Theft Protection Active. Unauthorized removal or tampering of brand credits is strictly prohibited.', warnStyle);
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
            position: fixed; inset: 0; background: rgba(5, 8, 16, 0.78);
            backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
            display: flex; align-items: center; justify-content: center;
            z-index: 100000; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            animation: themapnlFadeIn 0.25s ease-out;
        `;

        modal.innerHTML = `
            <div style="
                background: rgba(14, 21, 38, 0.95);
                border: 1px solid rgba(99, 102, 241, 0.45);
                box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(99, 102, 241, 0.35);
                border-radius: 20px; width: 90%; max-width: 460px; padding: 28px;
                color: #f8fafc; text-align: center; position: relative;
            ">
                <div style="
                    width: 52px; height: 52px; margin: 0 auto 16px;
                    border-radius: 16px; background: linear-gradient(135deg, #6366f1, #06b6d4);
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 25px rgba(6, 182, 212, 0.5); font-size: 24px;
                ">⚡</div>
                <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 800; background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                    ${THEMA_CONFIG.name} v${THEMA_CONFIG.version}
                </h2>
                <div style="font-size: 12px; color: #94a3b8; margin-bottom: 18px;">
                    ${THEMA_CONFIG.edition}
                </div>
                
                <div style="background: rgba(99, 102, 241, 0.10); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 12px; padding: 14px; margin-bottom: 20px; text-align: left; font-size: 13px; line-height: 1.6;">
                    <div>👑 <b>Developer:</b> <span style="color: #38bdf8;">${THEMA_CONFIG.developer}</span></div>
                    <div>🚀 <b>Provider:</b> <span style="color: #a78bfa;">${THEMA_CONFIG.provider}</span></div>
                    <div>🎨 <b>Design:</b> Nebula v2 + Reviactyl + Dark Glass</div>
                    <div>🛡️ <b>Status:</b> Official Public Release</div>
                </div>

                <div style="display: flex; gap: 10px; justify-content: center;">
                    <a href="${THEMA_CONFIG.repo}" target="_blank" style="
                        background: linear-gradient(135deg, #6366f1, #06b6d4);
                        color: #fff; text-decoration: none; padding: 9px 18px;
                        border-radius: 10px; font-weight: 600; font-size: 13px;
                        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
                        display: inline-flex; align-items: center; gap: 6px;
                    ">GitHub Repo ↗</a>
                    <button id="themapnl-close-btn" style="
                        background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15);
                        color: #e2e8f0; padding: 9px 18px; border-radius: 10px;
                        font-weight: 600; font-size: 13px; cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#themapnl-close-btn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Persistent Footer Watermark Injection
    function injectFooter() {
        if (document.getElementById('themapnl-footer')) return;

        const footer = document.createElement('div');
        footer.id = 'themapnl-footer';
        footer.className = 'themapnl-footer-bar';
        footer.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #6366f1; font-weight: 800;">⚡</span>
                <span style="font-weight: 700; color: #f1f5f9;">${THEMA_CONFIG.name}</span>
                <span style="color: #475569;">•</span>
                <span style="color: #94a3b8;">${THEMA_CONFIG.edition}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 14px;">
                <div class="themapnl-badge" id="themapnl-badge-click">
                    <span>👑</span>
                    <span>Dev: ${THEMA_CONFIG.developer}</span>
                </div>
                <a href="${THEMA_CONFIG.repo}" target="_blank" style="font-size: 11px; opacity: 0.85;">GitHub</a>
            </div>
        `;

        document.body.appendChild(footer);

        footer.querySelector('#themapnl-badge-click')?.addEventListener('click', showCreditsModal);
    }

    // Top Navigation Brand Tag Injection
    function injectNavbarBrand() {
        if (document.getElementById('themapnl-nav-brand')) return;

        const nav = document.querySelector('nav, div[class*="NavigationBar"]');
        if (!nav) return;

        const brandBadge = document.createElement('div');
        brandBadge.id = 'themapnl-nav-brand';
        brandBadge.style.cssText = `
            display: inline-flex; align-items: center; gap: 6px;
            background: rgba(99, 102, 241, 0.12);
            border: 1px solid rgba(99, 102, 241, 0.35);
            padding: 4px 12px; border-radius: 9999px;
            font-size: 11px; font-weight: 700; color: #38bdf8;
            cursor: pointer; margin-right: 12px; transition: all 0.2s ease;
            box-shadow: 0 0 12px rgba(99, 102, 241, 0.2);
        `;
        brandBadge.innerHTML = `
            <span style="color: #a78bfa;">⚡</span>
            <span>${THEMA_CONFIG.developer}</span>
        `;

        brandBadge.addEventListener('click', showCreditsModal);

        // Append to nav
        nav.appendChild(brandBadge);
    }

    // AdminLTE Branding Injection
    function injectAdminBranding() {
        const adminHeader = document.querySelector('.main-header .navbar');
        if (adminHeader && !document.getElementById('themapnl-admin-header')) {
            const adminTag = document.createElement('div');
            adminTag.id = 'themapnl-admin-header';
            adminTag.style.cssText = `
                float: left; padding: 15px; color: #38bdf8; font-weight: 700;
                font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase;
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
            footerCredit.style.cssText = 'float: right; font-weight: 600; color: #38bdf8; cursor: pointer;';
            footerCredit.innerHTML = `Thema Panel v${THEMA_CONFIG.version} • Dev: <b>${THEMA_CONFIG.developer}</b>`;
            footerCredit.addEventListener('click', showCreditsModal);
            adminFooter.appendChild(footerCredit);
        }
    }

    // Anti-Tamper MutationObserver
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

    // Initialize Theme System
    function init() {
        printDevToolsBanner();
        injectFooter();
        injectNavbarBrand();
        injectAdminBranding();
        startAntiTamperObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
