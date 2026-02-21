import { tools } from '@/lib/tools-config'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import Link from 'next/link'

type DictKey = keyof ReturnType<typeof getDictionary>

export default function RelatedTools({ current, locale }: { current: string; locale: Locale }) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`
  const related = tools.filter((tool) => tool.slug !== current).slice(0, 4)

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
        {locale === 'en' ? 'Related Tools' : '相關工具'}
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`${prefix}/${tool.slug}`}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              color: 'var(--color-text)',
            }}
          >
            <span style={{ fontSize: '1.25rem', marginRight: '0.5rem' }}>{tool.icon}</span>
            <span style={{ fontWeight: 500 }}>{t[tool.nameKey as DictKey]}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
