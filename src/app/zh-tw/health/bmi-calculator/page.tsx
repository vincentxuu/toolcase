import { Metadata } from 'next'
import BmiCalculator from '@/components/tools/BmiCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'BMI 計算器 - 免費線上工具 | toolcase',
  description: '即時計算你的身體質量指數 (BMI)。免費 BMI 計算器，附視覺化量表與分類。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/health/bmi-calculator', languages: { en: 'https://toolcase.cc/health/bmi-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/bmi-calculator' } },
}

const faqs = [
  { question: '什麼是 BMI？', answer: 'BMI（身體質量指數）是根據身高和體重來衡量體脂肪的指標。計算方式為體重（公斤）除以身高（公尺）的平方。' },
  { question: 'BMI 準確嗎？', answer: 'BMI 是有用的篩選工具，但有其限制。它無法區分肌肉和脂肪，因此運動員可能 BMI 偏高但身體健康。' },
  { question: '健康的 BMI 範圍是多少？', answer: 'BMI 18.5 到 24.9 通常被認為是正常體重。低於 18.5 為過輕，25-29.9 為過重，30 以上為肥胖。' },
]

export default function BmiCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'BMI 計算器', url: 'https://toolcase.cc/zh-tw/health/bmi-calculator' },
        ]}
      />
      <ToolSchema
        name="BMI 計算器"
        description="即時計算你的身體質量指數 (BMI)。免費 BMI 計算器，附視覺化量表與分類。"
        url="https://toolcase.cc/zh-tw/health/bmi-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'BMI 計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>BMI 計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算你的身體質量指數，了解你屬於哪個分類。</p>
      <BmiCalculator labels={{ height: '身高', weight: '體重', cm: '公分', kg: '公斤', yourBmi: '你的 BMI', category: '分類', underweight: '過輕', normal: '正常', overweight: '過重', obese: '肥胖', disclaimer: '本工具僅供參考，不能替代專業醫療建議。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入你的身高（公分）和體重（公斤），即時計算 BMI 並以視覺化量表顯示你的位置。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="bmi-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
