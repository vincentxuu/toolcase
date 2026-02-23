'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { tools } from '@/lib/tools-config'
import { FEATURED_TOOLS } from '@/lib/featured-tools'
import ToolGrid from '@/components/tools/ToolGrid'

interface FeaturedToolsSectionProps {
  locale: Locale
}

export default function FeaturedToolsSection({ locale }: FeaturedToolsSectionProps) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  // 從 tools 中篩選出精選工具
  const featuredTools = tools.filter((tool) => FEATURED_TOOLS.includes(tool.slug as any))

  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold m-0">
          {t.featured_tools_title}
        </h2>
        <Link
          href={`${prefix}/category/dev`}
          className="text-[var(--color-primary)] no-underline text-sm font-medium whitespace-nowrap"
        >
          {t.view_all} →
        </Link>
      </div>
      <ToolGrid tools={featuredTools} locale={locale} columns={4} />
    </section>
  )
}
