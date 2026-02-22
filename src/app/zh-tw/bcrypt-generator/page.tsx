import { Metadata } from 'next'
import BcryptGenerator from '@/components/tools/BcryptGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '密碼雜湊產生器 - 免費線上工具 | toolcase',
  description: '從密碼生成 SHA-256、SHA-384 和 SHA-512 雜湊值。支援加鹽以增強安全性。所有處理在瀏覽器中完成。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/bcrypt-generator',
    languages: {
      en: 'https://toolcase.cc/bcrypt-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/bcrypt-generator',
    },
  },
}

const faqs = [
  {
    question: '為什麼需要對密碼進行雜湊？',
    answer: '以明文儲存密碼是重大安全風險。雜湊將密碼轉換為固定長度的字串，無法被逆向還原。即使資料庫被入侵，實際密碼仍然受到保護。',
  },
  {
    question: '什麼是鹽值，為什麼要使用它？',
    answer: '鹽值是在雜湊前添加到密碼前面的隨機字串。它確保即使相同的密碼也會產生不同的雜湊值，防止彩虹表攻擊，並使暴力破解更加困難。',
  },
  {
    question: '我的密碼安全嗎？',
    answer: '所有雜湊運算都在你的瀏覽器中使用 Web Crypto API 完成。你的密碼不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function BcryptGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '密碼雜湊產生器', url: 'https://toolcase.cc/zh-tw/bcrypt-generator' },
        ]}
      />
      <ToolSchema
        name="密碼雜湊產生器"
        description="從密碼生成 SHA-256、SHA-384 和 SHA-512 雜湊值。支援加鹽以增強安全性。所有處理在瀏覽器中完成。"
        url="https://toolcase.cc/zh-tw/bcrypt-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '密碼雜湊產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>密碼雜湊產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        從密碼生成安全的 SHA-256、SHA-384 或 SHA-512 雜湊值，支援可選的鹽值功能。
      </p>

      <BcryptGenerator
        labels={{
          generate: '產生雜湊',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          password: '密碼',
          algorithm: '演算法',
          hash: '雜湊結果',
          useSalt: '使用鹽值',
          salt: '鹽值',
          generateSalt: '產生鹽值',
          saltedInput: '加鹽後的輸入',
          passwordPlaceholder: '輸入要雜湊的密碼...',
          saltPlaceholder: '輸入或產生鹽值...',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在輸入欄位中輸入密碼，選擇雜湊演算法（SHA-256、SHA-384 或 SHA-512），然後點擊「產生雜湊」。
          可選擇啟用鹽值選項，在雜湊前將隨機或自訂鹽值添加到密碼前面。工具會為你生成隨機鹽值，你也可以輸入自己的。
          生成的雜湊值可以一鍵複製。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="bcrypt-generator" locale="zh-tw" />
    </div>
    </>
  )
}
