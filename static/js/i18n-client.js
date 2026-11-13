/**
 * Emmanuel United Church of Maryland - 4-Language Client Synchronization Engine
 * Supports English (en), Amharic (am), Tigrinya (ti), and Afaan Oromoo (om).
 * Maintains triple-layer persistence: URL ?lang=, Cookie, and localStorage.
 */
(function() {
  const SUPPORTED = ['en', 'am', 'ti', 'om'];

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function setCookie(name, val, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const isHttps = window.location.protocol === 'https:';
    const isIframe = (function() {
      try { return window.self !== window.top; } catch (e) { return true; }
    })();
    const sameSitePart = (isHttps && isIframe) ? 'SameSite=None;Secure' : (isHttps ? 'SameSite=Lax;Secure' : 'SameSite=Lax');
    document.cookie = `${name}=${val};expires=${d.toUTCString()};path=/;${sameSitePart}`;
  }

  // Priority: URL ?lang= -> server-rendered <html lang> (when URL didn't override) / localStorage -> cookie -> 'en'
  function getActiveLang() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }
    } catch (e) {}

    try {
      const localLang = localStorage.getItem('euc_lang');
      if (localLang && SUPPORTED.includes(localLang.toLowerCase())) {
        return localLang.toLowerCase();
      }
    } catch (e) {}

    const cookieLang = getCookie('lang');
    if (cookieLang && SUPPORTED.includes(cookieLang.toLowerCase())) {
      return cookieLang.toLowerCase();
    }

    const htmlLang = document.documentElement.getAttribute('lang');
    if (htmlLang && SUPPORTED.includes(htmlLang.toLowerCase())) {
      return htmlLang.toLowerCase();
    }

    return 'en';
  }

  // Apply Ethiopic font typography for Amharic & Tigrinya
  function applyFontClasses(lang) {
    if (lang === 'am' || lang === 'ti') {
      document.documentElement.classList.add('font-ethiopic');
      if (document.body) document.body.classList.add('font-ethiopic');
    } else {
      document.documentElement.classList.remove('font-ethiopic');
      if (document.body) document.body.classList.remove('font-ethiopic');
    }
  }

  // Synchronize URL / localStorage / Cookie on initial load without reload loops
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const docLang = (document.documentElement.getAttribute('lang') || 'en').toLowerCase();
    let storedLang = null;
    try {
      storedLang = localStorage.getItem('euc_lang');
    } catch (e) {}

    if (urlLang && SUPPORTED.includes(urlLang.toLowerCase())) {
      const normalized = urlLang.toLowerCase();
      try {
        localStorage.setItem('euc_lang', normalized);
      } catch (e) {}
      setCookie('lang', normalized, 365);
    } else if (storedLang && SUPPORTED.includes(storedLang.toLowerCase())) {
      const targetLang = storedLang.toLowerCase();
      const syncGuardKey = `euc_sync_${window.location.pathname}_${targetLang}`;
      let alreadySynced = false;
      try {
        alreadySynced = sessionStorage.getItem(syncGuardKey) === 'true';
      } catch (e) {}

      if (targetLang !== docLang && !alreadySynced) {
        try {
          sessionStorage.setItem(syncGuardKey, 'true');
        } catch (e) {}
        const u = new URL(window.location.href);
        u.searchParams.set('lang', targetLang);
        window.location.replace(u.toString());
        return;
      }
    }
  } catch (e) {
    console.warn('Language auto-sync note:', e);
  }

  const activeLang = getActiveLang();
  applyFontClasses(activeLang);

  // Rewrite internal hrefs cleanly, preserving ?lang= before #hash
  function preserveUrlLang(rawHref, lang) {
    if (!rawHref || typeof rawHref !== 'string') return rawHref;
    const trimmed = rawHref.trim();
    if (
      trimmed === '' ||
      trimmed.startsWith('#') ||
      trimmed.startsWith('javascript:') ||
      trimmed.startsWith('mailto:') ||
      trimmed.startsWith('tel:') ||
      trimmed.startsWith('/static/') ||
      trimmed.startsWith('/assets/') ||
      trimmed.startsWith('/set-language/') ||
      trimmed.startsWith('/api/') ||
      trimmed.startsWith('/logout')
    ) {
      return rawHref;
    }

    try {
      const isAbsoluteUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
      const targetUrl = new URL(trimmed, window.location.origin);

      if (targetUrl.origin !== window.location.origin) {
        return rawHref;
      }

      if (lang && lang !== 'en') {
        if (targetUrl.searchParams.get('lang') !== lang) {
          targetUrl.searchParams.set('lang', lang);
          return isAbsoluteUrl ? targetUrl.toString() : (targetUrl.pathname + targetUrl.search + targetUrl.hash);
        }
      } else if (lang === 'en' && targetUrl.searchParams.has('lang')) {
        targetUrl.searchParams.delete('lang');
        return isAbsoluteUrl ? targetUrl.toString() : (targetUrl.pathname + targetUrl.search + targetUrl.hash);
      }

      return rawHref;
    } catch (e) {
      return rawHref;
    }
  }

  function updateLinksInRoot(root, lang) {
    if (!root || !lang) return;
    if (root.tagName === 'A' && root.hasAttribute('href')) {
      const href = root.getAttribute('href');
      const updated = preserveUrlLang(href, lang);
      if (updated && updated !== href) root.setAttribute('href', updated);
      return;
    }
    if (typeof root.querySelectorAll === 'function') {
      root.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        const updated = preserveUrlLang(href, lang);
        if (updated && updated !== href) {
          link.setAttribute('href', updated);
        }
      });
    }
  }

  window.switchSiteLanguage = function(langCode) {
    if (!langCode || !SUPPORTED.includes(langCode.toLowerCase())) return;
    const target = langCode.toLowerCase();

    try {
      localStorage.setItem('euc_lang', target);
      // Clear stale per-page redirect guards so any future navigation syncs cleanly
      Object.keys(sessionStorage).forEach(k => {
        if (k.startsWith('euc_sync_')) sessionStorage.removeItem(k);
      });
    } catch (e) {}

    setCookie('lang', target, 365);
    document.documentElement.setAttribute('lang', target);
    applyFontClasses(target);

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('lang');
      const returnTo = url.pathname + url.search + url.hash;
      window.location.href = `/set-language/${target}?returnTo=${encodeURIComponent(returnTo)}`;
    } catch (e) {
      window.location.href = `/set-language/${target}`;
    }
  };

  window.setLanguage = function(langCode, reload = true) {
    if (!reload) {
      if (!SUPPORTED.includes(langCode)) return;
      try { localStorage.setItem('euc_lang', langCode); } catch (e) {}
      setCookie('lang', langCode, 365);
      document.documentElement.setAttribute('lang', langCode);
      applyFontClasses(langCode);
      updateLinksInRoot(document, langCode);
      return;
    }
    window.switchSiteLanguage(langCode);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getActiveLang();
    applyFontClasses(currentLang);
    updateLinksInRoot(document, currentLang);

    // Incrementally update newly injected <a> tags (ignoring countdown timer ticks)
    if (window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        const cur = getActiveLang();
        for (const m of mutations) {
          if (m.target && (m.target.id === 'hero-sunday-countdown' || m.target.id === 'progress-bar')) continue;
          for (const node of m.addedNodes) {
            if (node.nodeType === 1) {
              updateLinksInRoot(node, cur);
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Intercept language switcher clicks & internal nav links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      const dataLang = link.getAttribute('data-lang-code');
      if (dataLang && SUPPORTED.includes(dataLang.toLowerCase())) {
        e.preventDefault();
        window.switchSiteLanguage(dataLang.toLowerCase());
        return;
      }

      if (href.startsWith('/set-language/')) {
        e.preventDefault();
        const targetLang = href.split('/set-language/')[1]?.split('?')[0]?.toLowerCase();
        if (targetLang && SUPPORTED.includes(targetLang)) {
          window.switchSiteLanguage(targetLang);
        }
        return;
      }

      const curLang = getActiveLang();
      if (curLang && curLang !== 'en') {
        const updated = preserveUrlLang(href, curLang);
        if (updated && updated !== href) {
          link.setAttribute('href', updated);
        }
      }
    }, true);
  });
})();
