import { Metadata } from 'next'
import MenstrualCycleCalculator from '@/components/tools/MenstrualCycleCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '月經週期計算機 - 經期、排卵與受孕期追蹤 | toolcase',
  description: '計算下次經期、排卵日、受孕期和目前週期階段。免費月經週期計算機，提供日期預測。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/health/menstrual-cycle-calculator', languages: { en: 'https://toolcase.cc/health/menstrual-cycle-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/health/menstrual-cycle-calculator' } },
}

const faqs = [
  { question: '月經週期計算機的準確度如何？', answer: '此計算機基於平均週期數據和標準公式提供估算值。個人週期可能有顯著差異，結果應作為參考指南，而非絕對預測。如需醫療建議，請諮詢醫療保健專業人員。' },
  { question: '典型的週期長度是多少？', answer: '平均月經週期長度為 28 天，但正常週期可介於 21 至 35 天之間。計算機使用您自訂的週期長度提供更個人化的預測。' },
  { question: '排卵日如何計算？', answer: '排卵通常發生在下次月經前 14 天。計算機使用此標準公式:下次經期日期減去 14 天。受孕期為排卵前 5 天加上排卵日。' },
  { question: '我可以用這個來計畫或避孕嗎？', answer: '此計算機僅提供教育性估算值，不應作為計劃生育或避孕的唯一方法。關於懷孕計畫或避孕，請務必諮詢醫療保健專業人員。' },
]

export default function MenstrualCycleCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '月經週期計算機', url: 'https://toolcase.cc/zh-tw/health/menstrual-cycle-calculator' },
        ]}
      />
      <ToolSchema
        name="月經週期計算機"
        description="計算下次經期、排卵日、受孕期和目前週期階段。免費月經週期計算機，提供日期預測。"
        url="https://toolcase.cc/zh-tw/health/menstrual-cycle-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '月經週期計算機' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>月經週期計算機</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>追蹤月經週期，預測下次經期、排卵日和受孕期。</p>
      <MenstrualCycleCalculator
        labels={{
          title: '月經週期計算機',
          lastPeriodDate: '上次經期開始日期',
          cycleLength: '平均週期長度',
          periodLength: '平均經期長度',
          calculate: '計算',
          clear: '清除',
          days: '天',
          results: '結果',
          nextPeriod: '下次經期',
          ovulation: '排卵日',
          fertilityWindow: '受孕期',
          dueDate: '預產期（如果懷孕）',
          currentPhase: '目前階段',
          phaseFollicular: '濾泡期',
          phaseOvulation: '排卵期',
          phaseLuteal: '黃體期',
          phaseMenstruation: '經期',
          note: '注意',
          noteText: '此計算機基於平均週期數據提供估算值。實際週期可能有所差異。如需醫療建議，請諮詢醫療保健專業人員。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          輸入上次經期開始日期以及您的平均週期和經期長度。點擊「計算」即可查看下次經期、排卵日、受孕期、目前週期階段以及預產期（如果懷孕）的預測。計算機使用標準公式:排卵通常發生在下次經期前 14 天，受孕期為排卵前 5 天加上排卵日。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="menstrual-cycle-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
