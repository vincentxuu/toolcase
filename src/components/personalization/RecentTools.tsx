'use client'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import { useRecentTools } from '@/hooks/useRecentTools'
import ToolGrid from '@/components/tools/ToolGrid'

interface RecentToolsProps {
  locale: Locale
}

export default function RecentTools({ locale }: RecentToolsProps) {
  const t = getDictionary(locale)
  const { recentTools } = useRecentTools()

  // 如果沒有最近使用的工具，不渲染
  if (recentTools.length === 0) {
    return null
  }

  return (
    <section style={{ marginBottom: '4rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            margin: 0,
          }}
        >
          🕒 {locale === 'en' ? 'Recently Used' : '最近使用'}
        </h2>
      </div>
      <ToolGrid tools={recentTools.slice(0, 8)} locale={locale} columns={4} />
    </section>
  )
}
