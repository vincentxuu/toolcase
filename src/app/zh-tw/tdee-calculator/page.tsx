import { Metadata } from 'next'
import TdeeCalculator from '@/components/tools/TdeeCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'TDEE / BMR 計算器 - 免費線上工具 | toolcase',
  description: '計算你的每日總消耗熱量 (TDEE) 和基礎代謝率 (BMR)。精確了解你每天需要多少熱量。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tdee-calculator', languages: { en: 'https://toolcase.cc/tdee-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tdee-calculator' } },
}

const faqs = [
  { question: '什麼是 TDEE？', answer: 'TDEE（每日總消耗熱量）是你每天消耗的總卡路里，包括基礎代謝、身體活動和食物消化。' },
  { question: '什麼是 BMR？', answer: 'BMR（基礎代謝率）是你的身體在休息狀態下維持基本功能（如呼吸和血液循環）所需的卡路里。' },
  { question: 'TDEE 如何計算？', answer: '使用 Mifflin-St Jeor 公式計算 BMR，再乘以根據你的運動量而定的活動因子。' },
]

export default function TdeeCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>TDEE / BMR 計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>根據活動量計算你每天所需的卡路里。</p>
      <TdeeCalculator labels={{ age: '年齡', gender: '性別', male: '男性', female: '女性', height: '身高', weight: '體重', cm: '公分', kg: '公斤', activityLevel: '活動量', sedentary: '久坐（辦公室）', light: '輕度（1-3 天/週）', moderate: '中度（3-5 天/週）', active: '活躍（6-7 天/週）', veryActive: '非常活躍（運動員）', bmr: 'BMR', tdee: 'TDEE', toMaintain: '維持體重', toLose: '減重 (-500 卡)', toGain: '增重 (+500 卡)', calories: '卡/天', disclaimer: '本工具僅供參考，不能替代專業醫療建議。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入年齡、性別、身高、體重和活動量。計算器會顯示你的 BMR、TDEE，以及減重、維持和增重的卡路里目標。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="tdee-calculator" locale="zh-tw" />
    </div>
  )
}
