import { Metadata } from 'next'
import WorldClock from '@/components/tools/WorldClock'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '世界時鐘 - 查看全球主要城市當前時間 | toolcase',
  description: '查看全球主要城市的當前時間。即時顯示不同時區的時間更新。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/world-clock', languages: { en: 'https://toolcase.cc/world-clock', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/world-clock' } },
}

const faqs = [
  { question: '時間多久更新一次？', answer: '所有城市的時間每秒實時更新一次，因此您始終看到當前時間。' },
  { question: '可以搜尋特定城市嗎？', answer: '可以！使用搜尋框篩選列表，快速找到您要找的城市。' },
  { question: '是否包含日光節約時間變更？', answer: '是的，時間會根據每個城市的時區規則自動調整日光節約時間。' },
]

export default function WorldClockPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '世界時鐘', url: 'https://toolcase.cc/zh-tw/world-clock' },
        ]}
      />
      <ToolSchema
        name="世界時鐘"
        description="查看全球主要城市的當前時間。即時顯示不同時區的時間更新。"
        url="https://toolcase.cc/zh-tw/world-clock"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '世界時鐘' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>世界時鐘</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>查看全球主要城市的當前時間，並即時更新。</p>
      <WorldClock
        labels={{
          title: '世界時鐘',
          searchPlaceholder: '搜尋城市...',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>世界時鐘顯示全球熱門城市的當前時間。時間每秒自動更新。使用搜尋框快速找到特定城市。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="world-clock" locale="zh-tw" />
    </div>
    </>
  )
}
