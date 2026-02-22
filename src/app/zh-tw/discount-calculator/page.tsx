import { Metadata } from 'next'
import DiscountCalculator from '@/components/tools/DiscountCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '折扣計算器 - 免費線上工具 | toolcase',
  description: '即時計算折扣後價格、節省金額與折扣百分比。免費線上折扣計算器，購物省錢好幫手。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/discount-calculator', languages: { en: 'https://toolcase.cc/discount-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/discount-calculator' } },
}

const faqs = [
  { question: '如何計算折扣百分比？', answer: '將原價減去折後價格，除以原價，再乘以 100 即可得到折扣百分比。例如，原價 1000 元打折後為 750 元，折扣率為 (1000-750)/1000 × 100 = 25%。' },
  { question: '多重折扣如何計算？', answer: '多重折扣是依序計算的，每次折扣都是以上一次折後的價格為基準。例如，1000 元先打 8 折變 800 元，再打 9 折變 720 元，而不是直接打 7 折的 700 元。' },
  { question: '「打折」和「折扣」有什麼不同？', answer: '在台灣，「打 8 折」表示付原價的 80%，也就是折扣 20%。「折扣 20%」則是直接減去原價的 20%。兩者結果相同，只是說法不同。' },
]

export default function DiscountCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '折扣計算器', url: 'https://toolcase.cc/zh-tw/discount-calculator' },
        ]}
      />
      <ToolSchema
        name="折扣計算器"
        description="即時計算折扣後價格、節省金額與折扣百分比。免費線上折扣計算器，購物省錢好幫手。"
        url="https://toolcase.cc/zh-tw/discount-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '折扣計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>折扣計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算折扣後價格、省下金額與折扣比例。</p>
      <DiscountCalculator labels={{ originalPrice: '原價', discountPercent: '折扣百分比', discountAmount: '折扣金額', finalPrice: '折後價格', youSave: '您省下', result: '結果' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入商品原價與折扣百分比，計算器將即時顯示折後價格與省下的金額。您也可以輸入折後價格來反推折扣百分比。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="discount-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
