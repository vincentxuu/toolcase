import { Metadata } from 'next'
import SavingsCalculator from '@/components/tools/SavingsCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '存款利息計算器 - 免費線上工具 | toolcase',
  description: '計算定期存款搭配複利的成長。免費存款成長計算器，附互動圖表。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/savings-calculator',
    languages: {
      en: 'https://toolcase.cc/savings-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/savings-calculator',
    },
  },
}

const faqs = [
  {
    question: '應該使用什麼利率？',
    answer: '使用你的銀行提供的存款年利率。高利率存款帳戶通常提供 1-2%，一般活存帳戶可能只有 0.01-0.5%。',
  },
  {
    question: '存款利息多久計算一次？',
    answer: '大多數存款帳戶每日或每月計算利息。本計算器使用月複利，對大多數帳戶來說是很好的近似值。',
  },
  {
    question: '資料會被傳送到伺服器嗎？',
    answer: '不會。所有計算都在你的瀏覽器中完成。你的財務資料永遠不會離開你的裝置。',
  },
]

export default function SavingsCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '存款利息計算器', url: 'https://toolcase.cc/zh-tw/savings-calculator' },
        ]}
      />
      <ToolSchema
        name="存款利息計算器"
        description="計算定期存款搭配複利的成長。免費存款成長計算器，附互動圖表。"
        url="https://toolcase.cc/zh-tw/savings-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '存款利息計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>存款利息計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        計算定期存款搭配複利如何隨時間成長。
      </p>

      <SavingsCalculator
        labels={{
          initialDeposit: '初始存款',
          monthlyDeposit: '每月存入',
          annualRate: '年利率 (%)',
          savingsPeriod: '存款期間',
          years: '年',
          finalBalance: '最終餘額',
          totalDeposits: '總存入金額',
          totalInterest: '利息收入',
          growthChart: '存款成長',
          year: '年',
          deposits: '存款',
          interest: '利息',
          currency: 'NT$',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入初始存款、每月存入金額、年利率和存款期間。計算器會顯示最終餘額、總存入金額和利息收入，
          以及視覺化的存款成長圖表。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="savings-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
