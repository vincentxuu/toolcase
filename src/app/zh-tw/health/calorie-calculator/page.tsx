import { Metadata } from 'next'
import CalorieCalculator from '@/components/tools/CalorieCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '熱量計算器 - 免費線上工具 | toolcase',
  description: '根據個人資料與活動量計算每日所需熱量。免費線上熱量計算器，含巨量營養素分配建議。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/health/calorie-calculator', languages: { en: 'https://toolcase.cc/health/calorie-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/calorie-calculator' } },
}

const faqs = [
  { question: '每天需要攝取多少熱量？', answer: '每日所需熱量因人而異，取決於性別、年齡、身高、體重和活動量。一般成年男性約需 2000-2500 大卡，女性約需 1600-2000 大卡。本計算器可根據您的個人資料提供更精確的估算。' },
  { question: '什麼是巨量營養素？', answer: '巨量營養素包括蛋白質、碳水化合物和脂肪，是身體所需的三大主要營養素。一般建議蛋白質佔每日熱量的 10-35%，碳水化合物佔 45-65%，脂肪佔 20-35%。' },
  { question: '減重時應該減少多少熱量？', answer: '建議每天減少 500-750 大卡的熱量攝取，這樣每週約可減重 0.5-0.75 公斤。不建議每日攝取低於 1200 大卡（女性）或 1500 大卡（男性），以免影響健康。' },
]

export default function CalorieCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '熱量計算器', url: 'https://toolcase.cc/zh-tw/health/calorie-calculator' },
        ]}
      />
      <ToolSchema
        name="熱量計算器"
        description="根據個人資料與活動量計算每日所需熱量。免費線上熱量計算器，含巨量營養素分配建議。"
        url="https://toolcase.cc/zh-tw/health/calorie-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '熱量計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>熱量計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算每日所需熱量與巨量營養素分配。</p>
      <CalorieCalculator labels={{ gender: '性別', male: '男性', female: '女性', age: '年齡', height: '身高', weight: '體重', activity: '活動量', sedentary: '久坐', light: '輕度活動', moderate: '中度活動', active: '高度活動', veryActive: '非常活躍', goal: '目標', lose: '減重', maintain: '維持', gain: '增重', maintenanceCalories: '維持熱量', targetCalories: '目標熱量', protein: '蛋白質', carbs: '碳水化合物', fat: '脂肪', disclaimer: '本工具僅供參考，請諮詢營養師獲取個人化的飲食建議。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入您的性別、年齡、身高、體重和活動量，再選擇您的目標（減重、維持或增重）。計算器將計算出每日建議熱量攝取及蛋白質、碳水化合物、脂肪的分配比例。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="calorie-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
