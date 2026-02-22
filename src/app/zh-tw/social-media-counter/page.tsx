import { Metadata } from 'next'
import SocialMediaCounter from '@/components/tools/SocialMediaCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '社群媒體字數計算器 - 免費線上工具 | toolcase',
  description: '計算文字在各社群平台的字元數，支援 Twitter、Instagram、Facebook 等平台的字數限制檢查。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/social-media-counter', languages: { en: 'https://toolcase.cc/social-media-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/social-media-counter' } },
}

const faqs = [
  { question: '各社群平台的字數限制是多少？', answer: 'Twitter/X 的推文限制為 280 字元，Instagram 貼文說明為 2,200 字元，Facebook 貼文約 63,206 字元，LinkedIn 貼文為 3,000 字元，YouTube 影片說明為 5,000 字元，TikTok 說明為 4,000 字元。' },
  { question: '中文字和英文字母的計算方式一樣嗎？', answer: '在大多數平台上，中文字和英文字母都算一個字元。但在 Twitter 上，中文字佔 2 個字元，所以用中文發推時實際可用的字數會較少。本工具會根據各平台規則正確計算。' },
  { question: '超過字數限制會怎樣？', answer: '工具會以紅色顯示超出限制的部分，讓您清楚知道需要刪減多少字。建議在發佈前先用本工具檢查，避免貼文被截斷或無法發佈。' },
]

export default function SocialMediaCounterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '社群媒體字數計算器', url: 'https://toolcase.cc/zh-tw/social-media-counter' },
        ]}
      />
      <ToolSchema
        name="社群媒體字數計算器"
        description="計算文字在各社群平台的字元數，支援 Twitter、Instagram、Facebook 等平台的字數限制檢查。"
        url="https://toolcase.cc/zh-tw/social-media-counter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '社群媒體字數計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>社群媒體字數計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>即時檢查文字是否符合各社群平台的字數限制。</p>
      <SocialMediaCounter labels={{ input: '輸入文字', characters: '字元數', twitter: 'Twitter/X', instagram: 'Instagram', linkedin: 'LinkedIn', facebook: 'Facebook', youtube: 'YouTube', tiktok: 'TikTok', remaining: '剩餘', overLimit: '超出限制' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入區域貼上或輸入文字，工具會即時顯示各社群平台的字元數及剩餘可用字數。當文字超出某個平台的限制時，會以紅色標示超出的字數。適合社群小編在發佈貼文前確認內容長度是否符合各平台要求。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="social-media-counter" locale="zh-tw" />
    </div>
    </>
  )
}
