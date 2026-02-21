import { Metadata } from 'next'
import PasswordGenerator from '@/components/tools/PasswordGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '密碼產生器 - 免費線上工具 | toolcase',
  description: '即時產生強密碼。自訂長度和字元類型。所有產生過程都在你的瀏覽器中完成。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/password-generator', languages: { en: 'https://toolcase.cc/password-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/password-generator' } },
}

const faqs = [
  { question: '產生的密碼安全嗎？', answer: '是的。密碼使用 Web Crypto API (crypto.getRandomValues) 產生，提供加密安全的隨機數。沒有任何資料傳送到伺服器。' },
  { question: '什麼是強密碼？', answer: '強密碼至少 12 個字元，包含大寫字母、小寫字母、數字和符號。避免使用字典單詞和個人資訊。' },
  { question: '密碼應該多長？', answer: '我們建議重要帳戶至少使用 16 個字元。更長的密碼被破解的難度呈指數級增長。' },
]

export default function PasswordGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>密碼產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生強度高的隨機密碼，可自訂長度和字元類型。</p>
      <PasswordGenerator labels={{ length: '長度', uppercase: '大寫字母 (A-Z)', lowercase: '小寫字母 (a-z)', numbers: '數字 (0-9)', symbols: '符號 (!@#$)', generate: '產生', copy: '複製', copied: '已複製！', strength: '強度', weak: '弱', fair: '普通', strong: '強', veryStrong: '非常強' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用滑桿調整密碼長度，點擊開關啟用或停用字元類型。點擊「產生」建立新密碼，使用「複製」按鈕複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="password-generator" locale="zh-tw" />
    </div>
  )
}
