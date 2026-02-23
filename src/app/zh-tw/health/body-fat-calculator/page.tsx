import { Metadata } from 'next'
import BodyFatCalculator from '@/components/tools/BodyFatCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '體脂率計算器 - 免費線上工具 | toolcase',
  description: '使用美國海軍公式計算體脂肪百分比。免費線上體脂率計算器，輸入身高和圍度即可估算。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/health/body-fat-calculator', languages: { en: 'https://toolcase.cc/health/body-fat-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/body-fat-calculator' } },
}

const faqs = [
  { question: '體脂率多少算正常？', answer: '男性體脂率 10-20% 為健康範圍，女性為 18-28%。運動員通常更低，男性 6-13%，女性 14-20%。體脂率會隨年齡增長而自然上升。' },
  { question: '體脂率和 BMI 有什麼不同？', answer: 'BMI 僅根據身高和體重計算，無法區分肌肉和脂肪。體脂率直接衡量身體脂肪的比例，對健康評估更為準確。肌肉量大的人 BMI 可能偏高，但體脂率可能很低。' },
  { question: '如何有效降低體脂率？', answer: '降低體脂率的關鍵是維持適度的熱量赤字，結合重量訓練保持肌肉量，並搭配有氧運動增加熱量消耗。建議每週減重不超過 0.5-1 公斤，以確保健康且持久的效果。' },
]

export default function BodyFatCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '體脂率計算器', url: 'https://toolcase.cc/zh-tw/health/body-fat-calculator' },
        ]}
      />
      <ToolSchema
        name="體脂率計算器"
        description="使用美國海軍公式計算體脂肪百分比。免費線上體脂率計算器，輸入身高和圍度即可估算。"
        url="https://toolcase.cc/zh-tw/health/body-fat-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '體脂率計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>體脂率計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入身高與圍度，估算您的體脂肪百分比。</p>
      <BodyFatCalculator labels={{ gender: '性別', male: '男性', female: '女性', height: '身高', neck: '頸圍', waist: '腰圍', hip: '臀圍', bodyFat: '體脂率', category: '分類', essential: '必需脂肪', athletes: '運動員', fitness: '健身', average: '一般', obese: '肥胖', disclaimer: '本工具僅供參考，請諮詢醫療專業人員獲取準確的醫療建議。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇性別後，輸入身高、頸圍、腰圍（女性需額外輸入臀圍）。計算器會使用美國海軍公式估算您的體脂率，並顯示對應的分類。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="body-fat-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
