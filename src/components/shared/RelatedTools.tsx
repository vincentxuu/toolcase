import { tools } from '@/lib/tools-config'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import Link from 'next/link'
import ToolIcon from '@/components/shared/ToolIcon'
import { getToolPath } from '@/lib/tool-url'

type DictKey = keyof ReturnType<typeof getDictionary>

export default function RelatedTools({ current, locale }: { current: string; locale: Locale }) {
  const t = getDictionary(locale)

  // Find current tool's category
  const currentTool = tools.find((tool) => tool.slug === current)
  const currentCategory = currentTool?.category

  // Get tools from the same category first, then others
  const sameCategory = tools.filter(
    (tool) => tool.slug !== current && tool.category === currentCategory
  )
  const otherTools = tools.filter(
    (tool) => tool.slug !== current && tool.category !== currentCategory
  )

  // Combine: prioritize same category, then others
  const related = [...sameCategory, ...otherTools].slice(0, 4)

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{t.related_tools_title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={getToolPath(tool.slug, locale)}
            className="flex items-center p-4 rounded-lg border border-[var(--color-border)] no-underline text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]"
          >
            <span className="mr-2 inline-flex align-middle">
              <ToolIcon name={tool.icon} size={20} />
            </span>
            <span className="font-medium">{t[tool.nameKey as DictKey]}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
