import type { Metadata } from 'next'

const SITE_URL = 'https://toolcase.cc'

interface SeoParams {
  title: string
  description: string
  path: string
  locale: 'en' | 'zh-tw'
}

export function generateToolMetadata({ title, description, path, locale }: SeoParams): Metadata {
  const enPath = path.replace('/zh-tw', '')
  const zhPath = `/zh-tw${enPath}`

  return {
    title: `${title} | toolcase`,
    description,
    alternates: {
      canonical: `${SITE_URL}${locale === 'en' ? enPath : zhPath}`,
      languages: {
        en: `${SITE_URL}${enPath}`,
        'zh-Hant-TW': `${SITE_URL}${zhPath}`,
      },
    },
  }
}
