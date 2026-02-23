import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/get-dict'
import { tools, categories } from '@/lib/tools-config'
import ToolGrid from '@/components/tools/ToolGrid'
import CategoryNav from '@/components/navigation/CategoryNav'

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.key }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.key === slug)
  if (!category) return {}

  const t = getDictionary('zh-tw')
  const categoryName = t[category.labelKey]
  const toolCount = tools.filter((tool) => tool.category === slug).length

  return {
    title: `${categoryName} - ${toolCount} 個免費工具 | toolcase`,
    description: `瀏覽 ${toolCount} 個免費${categoryName}工具。無需註冊，瀏覽器內執行。`,
    alternates: {
      canonical: `https://toolcase.cc/zh-tw/category/${slug}`,
      languages: {
        en: `https://toolcase.cc/category/${slug}`,
        'zh-Hant-TW': `https://toolcase.cc/zh-tw/category/${slug}`,
      },
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = getDictionary('zh-tw')
  const category = categories.find((c) => c.key === slug)

  if (!category) notFound()

  const categoryTools = tools.filter((tool) => tool.category === slug)
  const categoryName = t[category.labelKey]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Header */}
      <section style={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '0.5rem',
          }}
        >
          {categoryName}
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '0',
          }}
        >
          {categoryTools.length} {t.tool_count.replace('{count}', '')}
        </p>
      </section>

      {/* Category Navigation */}
      <CategoryNav locale="zh-tw" current={slug} />

      {/* Tools Grid */}
      <section style={{ marginTop: '2rem' }}>
        <ToolGrid tools={categoryTools} locale="zh-tw" columns={4} />
      </section>
    </div>
  )
}
