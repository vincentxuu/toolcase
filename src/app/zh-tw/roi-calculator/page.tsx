import { Metadata } from 'next'
import RoiCalculator from '@/components/tools/RoiCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '投資報酬率計算器 - 免費線上工具 | toolcase',
  description: '計算投資報酬率（ROI）和年化報酬率。簡單好用的免費投資回報計算器。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/roi-calculator',
    languages: {
      en: 'https://toolcase.cc/roi-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/roi-calculator',
    },
  },
}

const faqs = [
  {
    question: '什麼是 ROI？',
    answer: 'ROI（投資報酬率）衡量投資相對於成本的百分比收益或損失。計算方式為 (最終價值 - 成本) / 成本 × 100%。',
  },
  {
    question: '什麼是年化報酬率？',
    answer: '年化報酬率將總 ROI 轉換為年度報酬率，讓你更容易比較不同時間長度的投資。它考慮了複利效果。',
  },
  {
    question: '什麼是好的 ROI？',
    answer: '「好的」ROI 取決於投資類型和風險。S&P 500 歷史平均年報酬率約 10%。房地產通常回報 8-12%。任何正的 ROI 都代表你有獲利。',
  },
]

export default function RoiCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>投資報酬率計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時計算你的投資報酬率（ROI）和年化報酬率。
      </p>

      <RoiCalculator
        labels={{
          investmentCost: '投資成本',
          returnAmount: '最終價值（回報）',
          investmentPeriod: '投資期間',
          years: '年',
          roi: '總 ROI',
          annualizedRoi: '年化報酬率',
          netProfit: '淨利潤',
          profitOrLoss: '結果',
          profit: '獲利',
          loss: '虧損',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入你的初始投資成本、最終回報金額和投資期間（年）。
          計算器會即時顯示你的總 ROI 百分比、年化報酬率和淨利潤或虧損。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="roi-calculator" locale="zh-tw" />
    </div>
  )
}
