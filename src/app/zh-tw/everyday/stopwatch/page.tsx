import { Metadata } from 'next'
import Stopwatch from '@/components/tools/Stopwatch'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '碼錶 - 免費線上工具 | toolcase',
  description: '精確的線上碼錶，支援分段計時功能。免費線上碼錶，適合運動計時和各種計時需求。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/stopwatch', languages: { en: 'https://toolcase.cc/everyday/stopwatch', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/stopwatch' } },
}

const faqs = [
  { question: '分段計時（Lap）功能是什麼？', answer: '分段計時功能可以在碼錶持續運行的同時記錄每個分段的時間。例如跑步時，您可以在每一圈按下分段按鈕，記錄每圈的時間，同時碼錶會繼續計時顯示總時間。' },
  { question: '線上碼錶的精確度如何？', answer: '本線上碼錶的精確度取決於您的瀏覽器和裝置性能，通常可達到毫秒級的精確度。對於一般日常使用（如運動計時、烹飪計時）完全足夠，但不適用於需要專業計時設備的正式比賽。' },
  { question: '可以同時使用碼錶和倒數計時器嗎？', answer: '可以。您可以在不同的瀏覽器分頁中同時開啟碼錶和倒數計時器，兩者會各自獨立運行，互不影響。' },
]

export default function StopwatchPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '碼錶', url: 'https://toolcase.cc/zh-tw/everyday/stopwatch' },
        ]}
      />
      <ToolSchema
        name="碼錶"
        description="精確的線上碼錶，支援分段計時功能。免費線上碼錶，適合運動計時和各種計時需求。"
        url="https://toolcase.cc/zh-tw/everyday/stopwatch"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '碼錶' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>碼錶</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>精確計時，支援分段記錄功能。</p>
      <Stopwatch labels={{ start: '開始', stop: '停止', reset: '重置', lap: '分段', lapNumber: '圈數', lapTime: '分段時間', totalTime: '累計時間' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>點擊「開始」按鈕啟動碼錶，「停止」暫停計時，「重置」歸零。計時過程中可以按「分段」按鈕記錄每個分段的時間和累計時間，方便比較各段表現。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="stopwatch" locale="zh-tw" />
    </div>
    </>
  )
}
