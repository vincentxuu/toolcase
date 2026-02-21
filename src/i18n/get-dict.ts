import en from './locales/en'
import zhTw from './locales/zh-tw'
import type { Locale } from './config'

type Dictionary = { readonly [K in keyof typeof en]: string }

const dictionaries: Record<Locale, Dictionary> = {
  en,
  'zh-tw': zhTw,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
