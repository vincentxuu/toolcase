'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { tools } from '@/lib/tools-config'
import { POPULAR_TOOLS } from '@/lib/featured-tools'
import ToolGrid from '@/components/tools/ToolGrid'

interface PopularToolsSectionProps {
  locale: Locale
}

export default function PopularToolsSection({ locale }: PopularToolsSectionProps) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  // 從 tools 中篩選出熱門工具
  const popularTools = tools.filter((tool) => POPULAR_TOOLS.includes(tool.slug as any))

  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold m-0">
          {t.popular_tools_title}
        </h2>
        <Link
          href={`${prefix}/category/everyday`}
          className="text-[var(--color-primary)] no-underline text-sm font-medium whitespace-nowrap"
        >
          {t.view_all} →
        </Link>
      </div>
      <ToolGrid tools={popularTools} locale={locale} columns={4} />
    </section>
  )
}
