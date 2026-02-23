import { Metadata } from 'next'
import CurrencyConverter from '@/components/tools/CurrencyConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '匯率換算器 - 免費線上工具 | toolcase',
  description: '使用即時匯率在各國貨幣之間進行換算。免費線上匯率換算工具，支援美元、歐元、新台幣、日圓、英鎊等超過 30 種貨幣。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/currency-converter', languages: { en: 'https://toolcase.cc/finance/currency-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/currency-converter' } },
}

const faqs = [
  { question: '匯率資料來自哪裡？', answer: '我們的匯率資料來自歐洲中央銀行（ECB），透過 Frankfurter API 取得。匯率在工作日每日更新，並快取一小時以確保快速載入。' },
  { question: '匯率有多準確？', answer: '匯率反映的是歐洲中央銀行的官方參考匯率，被廣泛用於金融機構。但實際在銀行或匯兌服務處兌換時，可能因手續費和匯差而略有不同。' },
  { question: '支援哪些貨幣？', answer: '我們支援超過 30 種貨幣，包括美元、歐元、新台幣、日圓、英鎊、人民幣、韓元、港幣、新加坡幣、澳幣、加幣、瑞士法郎等。最常用的貨幣會優先顯示在下拉選單頂部。' },
]

export default function CurrencyConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '匯率換算器', url: 'https://toolcase.cc/zh-tw/finance/currency-converter' },
        ]}
      />
      <ToolSchema
        name="匯率換算器"
        description="使用即時匯率在各國貨幣之間進行換算。免費線上匯率換算工具，支援美元、歐元、新台幣、日圓、英鎊等超過 30 種貨幣。"
        url="https://toolcase.cc/zh-tw/finance/currency-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '匯率換算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>匯率換算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用即時匯率，輕鬆換算各國貨幣。</p>
      <CurrencyConverter labels={{ amount: '金額', from: '來源幣別', to: '目標幣別', swap: '交換', result: '換算結果', rate: '匯率', lastUpdated: '最後更新', loading: '正在載入匯率資料...', error: '無法載入匯率資料。', retry: '重試' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入要換算的金額，選擇來源和目標貨幣，結果會自動更新。使用交換按鈕可快速反轉換算方向。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="currency-converter" locale="zh-tw" />
    </div>
    </>
  )
}
