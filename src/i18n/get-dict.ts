import en from './locales/en'
import zhTw from './locales/zh-tw'
import type { Locale } from './config'

type Dictionary = Record<string, string>

const dictionaries: Record<Locale, Dictionary> = {
  en: en as unknown as Dictionary,
  'zh-tw': zhTw as unknown as Dictionary,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
