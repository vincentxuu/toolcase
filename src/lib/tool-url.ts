import { tools } from '@/lib/tools-config'
import type { Locale } from '@/i18n/config'

const toolCategoryMap = new Map<string, string>(
  tools.map((tool) => [tool.slug, tool.category])
)

export function getToolPath(slug: string, locale: Locale) {
  const category = toolCategoryMap.get(slug)
  const prefix = locale === 'en' ? '' : `/${locale}`
  if (!category) return `${prefix}/${slug}`
  return `${prefix}/${category}/${slug}`
}

export function getToolUrl(slug: string, locale: Locale) {
  return `https://toolcase.cc${getToolPath(slug, locale)}`
}
