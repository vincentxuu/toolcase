import { Metadata } from 'next'
import CreditCardValidator from '@/components/tools/CreditCardValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '信用卡號驗證器 - 檢查卡號有效性 | toolcase',
  description: '使用 Luhn 算法驗證信用卡號碼。檢測卡片類型（Visa、MasterCard、美國運通等）。所有驗證都在您的瀏覽器中進行。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/credit-card-validator', languages: { en: 'https://toolcase.cc/credit-card-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/credit-card-validator' } },
}

const faqs = [
  { question: '信用卡驗證是如何運作的？', answer: '此工具使用 Luhn 算法（也稱為模 10 或 mod 10 算法），這是一個用於驗證卡號的校驗和公式。它可以檢測卡號輸入或傳輸中的簡單錯誤。' },
  { question: '這個工具可以驗證卡片是否有效嗎？', answer: '不可以。此工具僅使用數學算法驗證卡號格式。它無法驗證卡片是否有效、是否有餘額或是否屬於真實人士。只有發卡機構才能驗證這些細節。' },
  { question: '輸入真實卡號安全嗎？', answer: '所有驗證完全在您的瀏覽器中使用 JavaScript 進行。您的卡號永遠不會離開您的設備。但是，出於安全考慮，我們建議使用測試卡號。' },
  { question: '支援哪些卡片類型？', answer: '此工具可根據號碼模式檢測 Visa、MasterCard、美國運通、Discover、Diners Club、JCB 和銀聯卡。' },
]

export default function CreditCardValidatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '信用卡號驗證器', url: 'https://toolcase.cc/zh-tw/credit-card-validator' },
        ]}
      />
      <ToolSchema
        name="信用卡號驗證器"
        description="使用 Luhn 算法驗證信用卡號碼。檢測卡片類型（Visa、MasterCard、美國運通等）。所有驗證都在您的瀏覽器中進行。"
        url="https://toolcase.cc/zh-tw/credit-card-validator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '信用卡號驗證器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>信用卡號驗證器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用 Luhn 算法驗證信用卡號碼並檢測卡片類型。</p>
      <CreditCardValidator
        labels={{
          title: '信用卡號驗證器',
          inputLabel: '卡號',
          inputPlaceholder: '輸入信用卡號碼...',
          validate: '驗證',
          clear: '清除',
          result: '結果',
          valid: '有效',
          invalid: '無效',
          cardType: '卡片類型',
          cardNumber: '卡號',
          unknown: '未知',
          visa: 'Visa',
          mastercard: 'MasterCard',
          amex: '美國運通',
          discover: 'Discover',
          dinersclub: 'Diners Club',
          jcb: 'JCB',
          unionpay: '銀聯卡',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入信用卡號碼。工具將自動使用空格格式化。點擊驗證按鈕以使用 Luhn 算法檢查號碼是否有效，並查看檢測到的卡片類型。</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>測試卡號</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>您可以使用這些測試號碼來試用驗證器：</p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>
          <li>Visa: 4532 1488 0343 6467</li>
          <li>MasterCard: 5425 2334 3010 9903</li>
          <li>美國運通: 3782 822463 10005</li>
          <li>Discover: 6011 1111 1111 1117</li>
        </ul>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="credit-card-validator" locale="zh-tw" />
    </div>
    </>
  )
}
