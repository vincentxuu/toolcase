'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { tools } from '@/lib/tools-config'
import { NEW_TOOLS } from '@/lib/featured-tools'
import ToolGrid from '@/components/tools/ToolGrid'

interface NewToolsSectionProps {
  locale: Locale
}

export default function NewToolsSection({ locale }: NewToolsSectionProps) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  // 從 tools 中篩選出新增工具
  const newTools = tools.filter((tool) => NEW_TOOLS.includes(tool.slug as any))

  return (
    <section className="mb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold m-0">
          {t.new_tools_title}
        </h2>
        <Link
          href={`${prefix}/category/dev`}
          className="text-[var(--color-primary)] no-underline text-sm font-medium whitespace-nowrap"
        >
          {t.view_all} →
        </Link>
      </div>
      <ToolGrid tools={newTools} locale={locale} columns={4} />
    </section>
  )
}
