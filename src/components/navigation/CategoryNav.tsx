'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { categories, tools } from '@/lib/tools-config'

interface CategoryNavProps {
  locale: Locale
  current?: string // 當前選中的分類 slug
}

export default function CategoryNav({ locale, current }: CategoryNavProps) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const categoryName = t[category.labelKey]
        const toolCount = tools.filter((tool) => tool.category === category.key).length
        const isActive = current === category.key

        return (
          <Link
            key={category.key}
            href={`${prefix}/category/${category.key}`}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-lg
              text-sm font-medium whitespace-nowrap transition-all
              ${
                isActive
                  ? 'border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold'
                  : 'border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]'
              }
            `}
          >
            <span>{categoryName}</span>
            <span
              className={`
                px-1.5 py-0.5 rounded text-xs font-semibold
                ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-background)] text-[var(--color-text-secondary)]'
                }
              `}
            >
              {toolCount}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
