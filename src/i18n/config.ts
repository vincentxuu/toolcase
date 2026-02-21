export const defaultLocale = 'en'
export const locales = ['en', 'zh-tw'] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'zh-tw': '繁體中文',
}

export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  'zh-tw': 'zh-Hant-TW',
}
