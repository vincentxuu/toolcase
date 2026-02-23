import { Metadata } from 'next'
import UnitPriceCalculator from '@/components/tools/UnitPriceCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '單價計算器 - 免費線上工具 | toolcase',
  description: '比較商品單價，找出最划算的選擇。輸入價格、數量和單位，即可比較哪個商品每單位成本最低。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/unit-price-calculator', languages: { en: 'https://toolcase.cc/everyday/unit-price-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/unit-price-calculator' } },
}

const faqs = [
  { question: '什麼是單價？', answer: '單價是每個計量單位的成本（每克、每盎司、每個等）。它讓您能公平地比較不同大小的商品。單價最低的商品代表您花的錢能獲得最多的商品量。' },
  { question: '為什麼計算器會轉換單位？', answer: '為了準確比較商品，數量必須使用相同的單位。計算器會自動將 kg 轉換為 g、L 轉換為 mL、lb 轉換為 oz，讓所有商品在相同基準上比較。如果商品使用不相容的單位（例如克和個），則無法直接比較。' },
  { question: '大包裝一定比較便宜嗎？', answer: '不一定。雖然大包裝通常單價較低，但這並非絕對。有些商店會在促銷時將小包裝定價更優惠。購物時應該比較單價，而不是假設最大包裝就是最便宜的。' },
]

export default function UnitPriceCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '單價計算器', url: 'https://toolcase.cc/zh-tw/everyday/unit-price-calculator' },
        ]}
      />
      <ToolSchema
        name="單價計算器"
        description="比較商品單價，找出最划算的選擇。輸入價格、數量和單位，即可比較哪個商品每單位成本最低。"
        url="https://toolcase.cc/zh-tw/everyday/unit-price-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '單價計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>單價計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>比較商品單價，找出最划算的選擇。</p>
      <UnitPriceCalculator labels={{ itemName: '商品名稱', price: '價格', quantity: '數量', unit: '單位', unitPrice: '單價', bestDeal: '最划算', addItem: '新增商品', remove: '移除', item: '商品', compareItems: '比較商品' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>為每個要比較的商品輸入名稱、價格、數量和單位。計算器會計算每個商品的單價，並以綠色標示最划算的選擇。最多可比較 4 個商品。請確保商品使用相容的單位（例如 g/kg 或 mL/L）以獲得準確的比較結果。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="unit-price-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
