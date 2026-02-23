import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import type { ToolConfig } from './tools-config'
import { tools } from './tools-config'

/**
 * 搜尋工具
 * @param query 搜尋關鍵字
 * @param locale 語言
 * @returns 符合搜尋條件的工具列表
 */
export function searchTools(query: string, locale: Locale): ToolConfig[] {
  // 空查詢返回空陣列
  if (!query || query.trim() === '') {
    return []
  }

  const lowerQuery = query.toLowerCase().trim()
  const t = getDictionary(locale)

  // 搜尋並排序
  const results = tools
    .map((tool) => {
      const name = ((t[tool.nameKey as keyof typeof t] as string) || '').toLowerCase()
      const desc = ((t[tool.descKey as keyof typeof t] as string) || '').toLowerCase()
      const slug = tool.slug.toLowerCase()
      const tags = (tool.tags || []).join(' ').toLowerCase()

      // 計算相關性分數
      let score = 0

      // 名稱完全匹配（最高分）
      if (name === lowerQuery) score += 100
      // 名稱開頭匹配
      else if (name.startsWith(lowerQuery)) score += 50
      // 名稱包含
      else if (name.includes(lowerQuery)) score += 30

      // Slug 匹配
      if (slug === lowerQuery) score += 80
      else if (slug.startsWith(lowerQuery)) score += 40
      else if (slug.includes(lowerQuery)) score += 20

      // 描述匹配
      if (desc.includes(lowerQuery)) score += 15

      // 標籤匹配
      if (tags.includes(lowerQuery)) score += 25

      // Priority 加權（如果有設定）
      if (tool.priority) {
        score += (1000 - tool.priority) / 100
      }

      return { tool, score }
    })
    .filter((item) => item.score > 0) // 只保留有匹配的
    .sort((a, b) => b.score - a.score) // 依分數降序排序
    .map((item) => item.tool)

  return results
}

/**
 * 獲取搜尋建議（限制數量）
 * @param query 搜尋關鍵字
 * @param locale 語言
 * @param limit 返回數量限制
 * @returns 搜尋建議列表
 */
export function getSearchSuggestions(
  query: string,
  locale: Locale,
  limit: number = 8
): ToolConfig[] {
  const results = searchTools(query, locale)
  return results.slice(0, limit)
}
