import { Metadata } from 'next'
import TaxIdValidator from '@/components/tools/TaxIdValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '統一編號驗證器 - 驗證台灣商業登記號碼 | toolcase',
  description: '使用官方算法驗證台灣公司行號統一編號。立即檢查8位數統一編號是否有效。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tax-id-validator', languages: { en: 'https://toolcase.cc/finance/tax-id-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tax-id-validator' } },
}

const faqs = [
  { question: '什麼是統一編號？', answer: '台灣統一編號是分配給在台灣註冊的企業和組織的8位數唯一識別碼。它類似於美國的 EIN 或歐洲的 VAT 號碼。' },
  { question: '統一編號如何驗證？', answer: '驗證使用財政部制定的官方算法，對每個數字應用特定權重並計算校驗和。對於第7位數字為7的編號有特殊規則。' },
  { question: '這個工具可以驗證公司是否有效嗎？', answer: '不可以。此工具僅使用校驗和算法驗證號碼格式。它無法驗證企業目前是否已註冊或有效。若需此資訊，您需要向台灣財政部或稅務局查詢。' },
]

export default function TaxIdValidatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '統一編號驗證器', url: 'https://toolcase.cc/zh-tw/finance/tax-id-validator' },
        ]}
      />
      <ToolSchema
        name="統一編號驗證器"
        description="使用官方算法驗證台灣公司行號統一編號。立即檢查8位數統一編號是否有效。"
        url="https://toolcase.cc/zh-tw/finance/tax-id-validator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '統一編號驗證器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>統一編號驗證器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用官方算法驗證台灣公司行號統一編號。</p>
      <TaxIdValidator
        labels={{
          title: '統一編號驗證器',
          inputLabel: '統一編號',
          inputPlaceholder: '輸入8位數統一編號...',
          validate: '驗證',
          clear: '清除',
          result: '結果',
          valid: '有效',
          invalid: '無效',
          format: '格式',
          status: '狀態',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入8位數台灣統一編號，然後點擊驗證。工具將使用財政部官方算法檢查號碼是否有效。</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>關於統一編號</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>統一編號由8位數字組成。驗證算法使用加權校驗和，對第7位數字為7的號碼有特殊處理。這確保號碼符合台灣稅務機關指定的正確格式。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="tax-id-validator" locale="zh-tw" />
    </div>
    </>
  )
}
