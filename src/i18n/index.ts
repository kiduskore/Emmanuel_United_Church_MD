import type { Request, Response, NextFunction } from 'express';
import { SUPPORTED_LANGUAGES } from './types.ts';
import type { SupportedLanguage, LanguageInfo } from './types.ts';
import { en } from './locales/en.ts';
import { enPartials } from './locales/en-partials.ts';
import { enPagesHome } from './locales/en-pages-home.ts';
import { enPagesSub } from './locales/en-pages-sub.ts';
import { enExtra } from './locales/en-extra.ts';
import { am } from './locales/am.ts';
import { amPartials } from './locales/am-partials.ts';
import { amPagesHome } from './locales/am-pages-home.ts';
import { amPagesSub } from './locales/am-pages-sub.ts';
import { amExtra } from './locales/am-extra.ts';
import { ti } from './locales/ti.ts';
import { tiPartials } from './locales/ti-partials.ts';
import { tiPagesHome } from './locales/ti-pages-home.ts';
import { tiPagesSub } from './locales/ti-pages-sub.ts';
import { tiExtra } from './locales/ti-extra.ts';
import { om } from './locales/om.ts';
import { omPartials } from './locales/om-partials.ts';
import { omPagesHome } from './locales/om-pages-home.ts';
import { omPagesSub } from './locales/om-pages-sub.ts';
import { omExtra } from './locales/om-extra.ts';

export * from './types.ts';

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  en: { ...en, ...enPartials, ...enPagesHome, ...enPagesSub, ...enExtra },
  am: { ...am, ...amPartials, ...amPagesHome, ...amPagesSub, ...amExtra },
  ti: { ...ti, ...tiPartials, ...tiPagesHome, ...tiPagesSub, ...tiExtra },
  om: { ...om, ...omPartials, ...omPagesHome, ...omPagesSub, ...omExtra }
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function isSupportedLanguage(lang: any): lang is SupportedLanguage {
  return typeof lang === 'string' && ['en', 'am', 'ti', 'om'].includes(lang.toLowerCase());
}

export function translate(key: string, lang: SupportedLanguage = DEFAULT_LANGUAGE, params?: Record<string, string>): string {
  const normalizedLang = isSupportedLanguage(lang) ? (lang.toLowerCase() as SupportedLanguage) : DEFAULT_LANGUAGE;
  const langDict = translations[normalizedLang] || translations[DEFAULT_LANGUAGE];
  let text = langDict[key] || translations[DEFAULT_LANGUAGE][key] || key;

  if (params) {
    Object.keys(params).forEach(paramKey => {
      text = text.replace(new RegExp(`{${paramKey}}`, 'g'), params[paramKey]);
    });
  }

  return text;
}

export function getLanguageInfo(lang: string = DEFAULT_LANGUAGE): LanguageInfo {
  const code = isSupportedLanguage(lang) ? (lang.toLowerCase() as SupportedLanguage) : DEFAULT_LANGUAGE;
  return SUPPORTED_LANGUAGES[code] || SUPPORTED_LANGUAGES.en;
}

export function i18nMiddleware(req: Request, res: Response, next: NextFunction) {
  let lang: SupportedLanguage = DEFAULT_LANGUAGE;

  const isIframe = !!process.env.APPLET_ID;
  const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
  const cookieSameSite: 'none' | 'lax' = (isIframe && isHttps) ? 'none' : 'lax';
  const cookieSecure = Boolean(isHttps);

  // 1. Query parameter (?lang=am|ti|om|en)
  const queryLang = typeof req.query.lang === 'string' ? req.query.lang.trim() : '';
  const hasExplicitQueryLang = !!(queryLang && isSupportedLanguage(queryLang));
  if (hasExplicitQueryLang) {
    lang = queryLang.toLowerCase() as SupportedLanguage;
    res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, path: '/', sameSite: cookieSameSite, secure: cookieSecure, httpOnly: false });
    if (req.session) {
      (req.session as any).lang = lang;
    }
  }
  // 2. Cookie
  else if (req.cookies?.lang && isSupportedLanguage(req.cookies.lang)) {
    lang = req.cookies.lang.toLowerCase() as SupportedLanguage;
    if (req.session) {
      (req.session as any).lang = lang;
    }
  }
  // 3. Session
  else if ((req.session as any)?.lang && isSupportedLanguage((req.session as any).lang)) {
    lang = (req.session as any).lang.toLowerCase() as SupportedLanguage;
    res.cookie('lang', lang, { maxAge: 365 * 24 * 60 * 60 * 1000, path: '/', sameSite: cookieSameSite, secure: cookieSecure, httpOnly: false });
  }
  // 4. Accept-Language header matching
  else if (req.headers['accept-language']) {
    const acceptHeader = req.headers['accept-language'].toLowerCase();
    if (acceptHeader.includes('am')) lang = 'am';
    else if (acceptHeader.includes('ti')) lang = 'ti';
    else if (acceptHeader.includes('om')) lang = 'om';
    else lang = 'en';
  }

  const langInfo = getLanguageInfo(lang);
  const langQuery = (lang && lang !== 'en') ? `?lang=${lang}` : '';
  const langParam = (lang && lang !== 'en') ? `&lang=${lang}` : '';

  const ogLocaleMap: Record<SupportedLanguage, string> = {
    en: 'en_US',
    am: 'am_ET',
    ti: 'ti_ET',
    om: 'om_ET'
  };

  const linkWithLang = (urlPath: string) => {
    if (!urlPath) return urlPath;
    if (!lang || lang === 'en') return urlPath;
    if (
      urlPath.startsWith('http://') ||
      urlPath.startsWith('https://') ||
      urlPath.startsWith('mailto:') ||
      urlPath.startsWith('tel:') ||
      urlPath.startsWith('#') ||
      urlPath.startsWith('javascript:') ||
      urlPath.startsWith('/set-language/') ||
      urlPath.startsWith('/static/') ||
      urlPath.startsWith('/assets/')
    ) {
      return urlPath;
    }
    const hashIdx = urlPath.indexOf('#');
    const baseAndQuery = hashIdx >= 0 ? urlPath.slice(0, hashIdx) : urlPath;
    const hashPart = hashIdx >= 0 ? urlPath.slice(hashIdx) : '';
    const qIdx = baseAndQuery.indexOf('?');
    const pathname = qIdx >= 0 ? baseAndQuery.slice(0, qIdx) : baseAndQuery;
    const queryPart = qIdx >= 0 ? baseAndQuery.slice(qIdx + 1) : '';
    const params = new URLSearchParams(queryPart);
    params.set('lang', lang);
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ''}${hashPart}`;
  };

  // Bind to res.locals for EJS templates
  res.locals.lang = lang;
  res.locals.currentLang = langInfo;
  res.locals.ogLocale = ogLocaleMap[lang] || 'en_US';
  res.locals.hasExplicitQueryLang = hasExplicitQueryLang;
  res.locals.languages = Object.values(SUPPORTED_LANGUAGES);
  res.locals.isEthiopic = langInfo.script === 'ethiopic';
  res.locals.t = (key: string, params?: Record<string, string>) => translate(key, lang, params);
  res.locals.translate = translate;
  res.locals.allTranslations = translations;
  res.locals.langQuery = langQuery;
  res.locals.langParam = langParam;
  res.locals.linkWithLang = linkWithLang;

  next();
}
