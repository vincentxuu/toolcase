import { Metadata } from 'next'
import TestCardGenerator from '@/components/tools/TestCardGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '測試卡號產生器 - 產生有效的測試信用卡號 | toolcase',
  description: '產生用於開發和測試的有效測試信用卡號。支援 Visa、MasterCard、美國運通、Discover、JCB 和 Diners Club。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/test-card-generator', languages: { en: 'https://toolcase.cc/dev/test-card-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/test-card-generator' } },
}

const faqs = [
  { question: '這些是真實的信用卡號碼嗎？', answer: '不是！這些是通過 Luhn 驗證的測試號碼，但不是真實的信用卡。它們無法用於實際交易。' },
  { question: '我可以用這些號碼做什麼？', answer: '這些號碼適用於測試支付表單、驗證信用卡輸入欄位以及開發/測試目的。' },
  { question: '這些號碼在真實的支付處理器上有效嗎？', answer: '無效。支付處理器需要的不僅僅是有效格式 - 它們會檢查實際的卡片資料庫。這些號碼在真實支付系統上會失敗。' },
  { question: '產生器如何確保號碼有效？', answer: '該工具使用 Luhn 算法計算正確的校驗碼，確保產生的號碼通過格式驗證。' },
]

export default function TestCardGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '測試卡號產生器', url: 'https://toolcase.cc/zh-tw/dev/test-card-generator' },
        ]}
      />
      <ToolSchema
        name="測試卡號產生器"
        description="產生用於開發和測試的有效測試信用卡號。支援 Visa、MasterCard、美國運通、Discover、JCB 和 Diners Club。"
        url="https://toolcase.cc/zh-tw/dev/test-card-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '測試卡號產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>測試卡號產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生用於開發和測試目的的有效測試信用卡號。</p>
      <TestCardGenerator
        labels={{
          title: '測試卡號產生器',
          cardType: '卡片類型',
          generate: '產生',
          generatedCard: '產生的卡號',
          copy: '複製',
          copied: '已複製！',
          note: '注意：這些是僅供開發用途的測試卡號。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇卡片類型（Visa、MasterCard 等）然後點擊產生。工具將創建一個通過 Luhn 驗證的有效測試卡號。使用這些號碼測試支付表單和驗證器。</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>重要警告</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>這些號碼僅供測試使用。它們不是真實的信用卡，無法用於實際購買。試圖欺詐性地使用它們是違法的。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="test-card-generator" locale="zh-tw" />
    </div>
    </>
  )
}
