import { Metadata } from 'next'
import TaxCalculator from '@/components/tools/TaxCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '所得稅計算器 - 台灣綜合所得稅 / 美國聯邦稅 | toolcase',
  description:
    '線上計算台灣綜合所得稅或美國聯邦所得稅。支援免稅額、標準/列舉扣除額、薪資所得特別扣除額，即時顯示稅率級距明細與有效稅率。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/finance/tax-calculator',
    languages: {
      en: 'https://toolcase.cc/finance/tax-calculator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tax-calculator',
    },
  },
}

const faqs = [
  {
    question: '台灣綜合所得稅的稅率級距是什麼？',
    answer:
      '113年度（2024年）台灣綜合所得稅採累進稅率：所得淨額 0~59萬適用5%、59萬~133萬適用12%、133萬~266萬適用20%、266萬~498萬適用30%、498萬以上適用40%。',
  },
  {
    question: '免稅額和扣除額有什麼不同？',
    answer:
      '免稅額是依申報人數（本人、配偶、受扶養親屬）計算，每人 97,000 元（70歲以上為 145,500 元）。扣除額分為標準扣除額（單身 131,000 元、有配偶 262,000 元）和列舉扣除額（如捐贈、保險費、醫療費等），兩者擇一適用。',
  },
  {
    question: '薪資所得特別扣除額是什麼？',
    answer:
      '薪資所得特別扣除額是專門針對有薪資收入者的扣除項目，每人上限 218,000 元。夫妻合併申報時，若雙方都有薪資收入，則可各自扣除，最多扣除 436,000 元。',
  },
  {
    question: '什麼是有效稅率？',
    answer:
      '有效稅率是您的總收入實際繳納稅款的百分比。由於採用累進稅制，有效稅率一定低於最高邊際稅率級距。例如所得淨額 100 萬元，有效稅率約為 5.9%，遠低於邊際稅率 12%。',
  },
]

export default function TaxCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '所得稅計算器', url: 'https://toolcase.cc/zh-tw/finance/tax-calculator' },
        ]}
      />
      <ToolSchema
        name="所得稅計算器"
        description="線上計算台灣綜合所得稅或美國聯邦所得稅。支援免稅額、標準/列舉扣除額、薪資所得特別扣除額，即時顯示稅率級距明細與有效稅率。"
        url="https://toolcase.cc/zh-tw/finance/tax-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '所得稅計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>所得稅計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        計算台灣綜合所得稅或美國聯邦所得稅，包含詳細的稅率級距明細。支援免稅額、扣除額、薪資特別扣除額設定。
      </p>

      <TaxCalculator
        defaultTaxSystem="tw"
        labels={{
          taxSystem: '稅制',
          us: '美國聯邦稅',
          taiwan: '台灣綜合所得稅',
          grossIncome: '年度總所得',
          filingStatus: '申報方式',
          single: '單身',
          married: '夫妻合併申報',
          deductions: '扣除額',
          standardDeduction: '標準扣除額',
          itemized: '列舉扣除額',
          deductionAmount: '扣除金額',
          calculate: '計算',
          taxableIncome: '應稅所得',
          totalTax: '應納稅額',
          effectiveRate: '有效稅率',
          afterTax: '稅後所得',
          bracketBreakdown: '稅率級距明細',
          bracket: '級距',
          taxableAt: '應稅金額',
          taxAmount: '稅額',
          exemptions: '免稅額',
          generalExemptions: '免稅額人數',
          seniorExemptions: '70歲以上人數',
          salaryDeduction: '薪資所得特別扣除額',
          salaryEarners: '薪資所得人數',
          deductionSummary: '扣除額明細',
          exemptionSubtotal: '免稅額小計',
          deductionSubtotal: '扣除額小計',
          specialDeductionSubtotal: '薪資特別扣除額',
          netTaxableIncome: '綜合所得淨額',
          person: '人',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇稅制（台灣或美國），輸入年度總所得，設定申報方式與扣除項目。台灣稅制支援免稅額人數（含70歲以上）、標準/列舉扣除額、薪資所得特別扣除額設定。計算器即時顯示綜合所得淨額、應納稅額、有效稅率與稅後所得，以及詳細的稅率級距明細。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="tax-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
