import { Metadata } from 'next'
import PasswordStrengthChecker from '@/components/tools/PasswordStrengthChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '密碼強度檢查器 - 測試密碼安全性 | toolcase',
  description: '立即檢查密碼強度，獲得詳細的密碼安全性反饋與需求檢查清單。所有檢查都在您的瀏覽器中進行。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/password-strength-checker', languages: { en: 'https://toolcase.cc/everyday/password-strength-checker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/password-strength-checker' } },
}

const faqs = [
  { question: '密碼強度是如何計算的？', answer: '強度基於長度（8、12、16+ 個字符）、字符多樣性（大寫、小寫、數字、符號）和整體複雜度。0-6 的分數決定密碼是弱、一般、強還是非常強。' },
  { question: '我的密碼會被發送到伺服器嗎？', answer: '不會。所有密碼檢查完全在您的瀏覽器中使用 JavaScript 進行。您的密碼永遠不會離開您的設備。' },
  { question: '什麼樣的密碼才算強？', answer: '強密碼至少有 16 個字符，包含大寫字母、小寫字母、數字和符號。避免使用字典單詞、個人資訊和常見模式。' },
  { question: '我應該用這個工具檢查真實密碼嗎？', answer: '此工具有助於理解密碼強度，但永遠不要分享您的實際密碼。使用密碼管理器為每個帳戶生成和存儲唯一的密碼。' },
]

export default function PasswordStrengthCheckerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '密碼強度檢查器', url: 'https://toolcase.cc/zh-tw/everyday/password-strength-checker' },
        ]}
      />
      <ToolSchema
        name="密碼強度檢查器"
        description="立即檢查密碼強度，獲得詳細的密碼安全性反饋與需求檢查清單。所有檢查都在您的瀏覽器中進行。"
        url="https://toolcase.cc/zh-tw/everyday/password-strength-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '密碼強度檢查器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>密碼強度檢查器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>檢查密碼的強度與安全等級，並提供詳細的需求反饋。</p>
      <PasswordStrengthChecker
        labels={{
          title: '密碼強度檢查器',
          inputPlaceholder: '輸入您的密碼以檢查強度...',
          strength: '強度',
          weak: '弱',
          fair: '一般',
          strong: '強',
          veryStrong: '非常強',
          length: '長度',
          uppercase: '大寫字母',
          lowercase: '小寫字母',
          numbers: '數字',
          symbols: '符號',
          requirements: '需求清單',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>只需在輸入框中輸入或貼上您的密碼。工具將立即分析並顯示強度等級以及滿足了哪些需求。這有助於您了解什麼使您的密碼強或弱。</p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>密碼安全建議</h2>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
          <li>重要帳戶至少使用 16 個字符</li>
          <li>包含大寫、小寫、數字和符號的組合</li>
          <li>避免使用字典單詞和個人資訊</li>
          <li>每個帳戶使用唯一的密碼</li>
          <li>考慮使用密碼管理器來生成和存儲密碼</li>
          <li>盡可能啟用雙因素驗證（2FA）</li>
        </ul>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="password-strength-checker" locale="zh-tw" />
    </div>
    </>
  )
}
