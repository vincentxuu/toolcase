import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dict'
import { tools, categories } from '@/lib/tools-config'
import ToolCard from '@/components/shared/ToolCard'

export const metadata: Metadata = {
  title: 'toolcase — 免費線上工具集',
  description:
    '150+ 種免費線上工具：JSON 格式化、QR Code 產生器、計算機、圖片工具、單位轉換器等。完全免費，無需註冊，瀏覽器內執行。',
  keywords: [
    '線上工具',
    '免費工具',
    '網頁工具',
    'JSON 格式化',
    'QR Code 產生器',
    '計算機',
    '轉換器',
    '圖片工具',
    '開發者工具',
  ],
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw',
    languages: {
      en: 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

type DictKey = keyof ReturnType<typeof getDictionary>

export default function ZhTwHomePage() {
  const t = getDictionary('zh-tw')

  return (
    <div className="tool-container">
      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '3rem 0' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '0.375rem 1rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            color: 'var(--color-primary)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}
        >
          {t.hero_badge}
        </span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          {t.hero_title_1}
          <br />
          <span style={{ color: 'var(--color-primary)' }}>{t.hero_title_2}</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          {t.hero_desc}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{tools.length}+</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{t.stat_tools}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>0</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{t.stat_signup}</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>&lt;1s</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{t.stat_load}</div>
          </div>
        </div>
      </section>

      {/* All Categories */}
      {categories.map((cat) => {
        const catTools = tools.filter((tool) => tool.category === cat.key)
        if (catTools.length === 0) return null
        return (
          <section key={cat.key} style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
              {t[cat.labelKey as DictKey] as string}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}
            >
              {catTools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  slug={tool.slug}
                  name={t[tool.nameKey as DictKey] as string}
                  description={t[tool.descKey as DictKey] as string}
                  icon={tool.icon}
                  locale="zh-tw"
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
