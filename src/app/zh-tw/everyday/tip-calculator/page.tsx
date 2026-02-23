import { Metadata } from 'next'
import TipCalculator from '@/components/tools/TipCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '小費計算器 - 免費線上工具 | toolcase',
  description: '輕鬆計算小費金額與分帳。免費線上小費計算器，適用於餐廳、酒吧及各種服務場合。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/tip-calculator', languages: { en: 'https://toolcase.cc/everyday/tip-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/tip-calculator' } },
}

const faqs = [
  { question: '在國外用餐應該給多少小費？', answer: '在美國，餐廳的標準小費為帳單金額的 15-20%。服務特別好可以給 20-25%。在歐洲和日本，小費文化不同，有些地方不需要額外給小費。出國前建議先了解當地的小費習慣。' },
  { question: '小費應該以稅前還是稅後金額計算？', answer: '一般建議以稅前金額為基準計算小費，但以稅後金額計算也很常見，差異通常不大。許多人為了方便會直接以總額計算。' },
  { question: '多人聚餐時如何分攤小費？', answer: '先以總帳單金額計算小費，再平均分攤給每位用餐者。或者每個人可以依照自己點的餐點個別計算小費。本計算器可以自動幫您處理分帳。' },
]

export default function TipCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '小費計算器', url: 'https://toolcase.cc/zh-tw/everyday/tip-calculator' },
        ]}
      />
      <ToolSchema
        name="小費計算器"
        description="輕鬆計算小費金額與分帳。免費線上小費計算器，適用於餐廳、酒吧及各種服務場合。"
        url="https://toolcase.cc/zh-tw/everyday/tip-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '小費計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>小費計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算小費金額，輕鬆分攤帳單。</p>
      <TipCalculator labels={{ billAmount: '帳單金額', tipPercent: '小費比例', numberOfPeople: '人數', tipAmount: '小費金額', totalWithTip: '含小費總額', perPerson: '每人分攤', result: '結果' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入帳單金額並選擇小費比例。如果需要分帳，請輸入用餐人數。計算器會即時顯示小費金額、含小費總額及每人分攤金額。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="tip-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
