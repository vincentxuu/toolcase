'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import type { ToolConfig } from '@/lib/tools-config'
import ToolIcon from '@/components/shared/ToolIcon'
import { getToolPath } from '@/lib/tool-url'

interface SearchSuggestionsProps {
  suggestions: ToolConfig[]
  locale: Locale
  onClose: () => void
}

export default function SearchSuggestions({
  suggestions,
  locale,
  onClose,
}: SearchSuggestionsProps) {
  const t = getDictionary(locale)

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.1)] max-h-[400px] overflow-y-auto z-50">
      {/* 建議標題 */}
      <div className="px-4 py-3 border-b border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] uppercase">
        {t.search_suggestions}
      </div>

      {/* 建議列表 */}
      <div>
        {suggestions.map((tool) => {
          const name = t[tool.nameKey as keyof typeof t] as string || tool.slug
          const description = t[tool.descKey as keyof typeof t] as string || ''

          return (
            <Link
              key={tool.slug}
              href={getToolPath(tool.slug, locale)}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 no-underline text-[var(--color-text)] border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-background)]"
            >
              {/* 圖標 */}
              <div className="shrink-0">
                <ToolIcon name={tool.icon} size={20} />
              </div>

              {/* 內容 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium mb-0.5">
                  {name}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] overflow-hidden text-ellipsis whitespace-nowrap">
                  {description}
                </div>
              </div>

              {/* 箭頭 */}
              <div className="shrink-0 text-[var(--color-text-secondary)]">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
