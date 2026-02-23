'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { categories, tools } from '@/lib/tools-config'
import ToolIcon from '@/components/shared/ToolIcon'

interface CategoryGridSectionProps {
  locale: Locale
}

export default function CategoryGridSection({ locale }: CategoryGridSectionProps) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  // 分類圖標映射
  const categoryIcons: Record<string, string> = {
    dev: 'code',
    css: 'palette',
    finance: 'banknote',
    health: 'heart-pulse',
    image: 'image',
    text: 'file-text',
    units: 'ruler',
    everyday: 'star',
  }

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.browse_categories_title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const categoryName = t[category.labelKey]
          const toolCount = tools.filter((tool) => tool.category === category.key).length
          const icon = categoryIcons[category.key] || 'folder'

          return (
            <Link
              key={category.key}
              href={`${prefix}/category/${category.key}`}
              className="block p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] no-underline text-[var(--color-text)] transition-all hover:border-[var(--color-primary)] hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="mb-4">
                <ToolIcon name={icon} size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{categoryName}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] m-0">
                {toolCount} {t.tool_count.replace('{count}', '')}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
