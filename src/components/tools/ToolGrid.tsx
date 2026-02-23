'use client'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import type { ToolConfig } from '@/lib/tools-config'
import ToolCard from '@/components/shared/ToolCard'

interface ToolGridProps {
  tools: ToolConfig[]
  locale: Locale
  columns?: 2 | 3 | 4
  variant?: 'default' | 'compact'
  showBadges?: boolean
}

export default function ToolGrid({
  tools,
  locale,
  columns = 3,
  variant = 'default',
  showBadges = false,
}: ToolGridProps) {
  const t = getDictionary(locale)

  // 根據 columns 映射 Tailwind classes
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  const gapClass = variant === 'compact' ? 'gap-4' : 'gap-6'

  return (
    <div className={`grid ${gridClasses[columns]} ${gapClass}`}>
      {tools.map((tool) => {
        const name = (t[tool.nameKey as keyof typeof t] as string) || tool.slug
        const description = (t[tool.descKey as keyof typeof t] as string) || ''

        // 決定 badge
        let badge: 'new' | 'popular' | 'featured' | undefined
        if (showBadges) {
          if (tool.isFeatured) badge = 'featured'
          else if (tool.isPopular) badge = 'popular'
          else if (tool.isNew) badge = 'new'
        }

        return (
          <ToolCard
            key={tool.slug}
            slug={tool.slug}
            name={name}
            description={description}
            icon={tool.icon}
            locale={locale}
            badge={badge}
          />
        )
      })}
    </div>
  )
}
