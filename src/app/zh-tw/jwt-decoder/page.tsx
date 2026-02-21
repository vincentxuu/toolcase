import { Metadata } from 'next'
import JwtDecoder from '@/components/tools/JwtDecoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'JWT 解碼器 - 免費線上工具 | toolcase',
  description: '即時解碼與檢視 JWT（JSON Web Token）。查看標頭、載荷、過期時間和聲明，所有處理在瀏覽器中完成。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/jwt-decoder',
    languages: {
      en: 'https://toolcase.cc/jwt-decoder',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/jwt-decoder',
    },
  },
}

const faqs = [
  {
    question: '什麼是 JWT？',
    answer: 'JWT（JSON Web Token）是一種緊湊的、URL 安全的 Token 格式，用於在各方之間安全傳輸資訊。它由三部分組成：標頭（演算法和類型）、載荷（聲明和資料）和簽名（用於驗證）。',
  },
  {
    question: '在這裡貼上我的 JWT 安全嗎？',
    answer: '是的。所有解碼都在你的瀏覽器中完成。沒有任何 Token 會被傳送到伺服器。但你不應該公開分享你的 JWT Token，因為它們可能包含敏感資訊。',
  },
  {
    question: '這個工具可以驗證 JWT 簽名嗎？',
    answer: '這個工具解碼並顯示 JWT 內容，但不驗證簽名，因為驗證需要簽名密鑰或公鑰。它是為檢查和除錯目的而設計的。',
  },
  {
    question: '過期檢查顯示什麼？',
    answer: '如果 JWT 載荷包含 "exp"（過期）聲明，工具會自動檢查 Token 是否已過期，並顯示過期日期和時間。',
  },
]

export default function JwtDecoderPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JWT 解碼器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        貼上你的 JWT Token，即時解碼並檢視其標頭、載荷和過期狀態。
      </p>

      <JwtDecoder
        labels={{
          decode: '解碼',
          copy: '複製',
          clear: '清除',
          copied: '已複製！',
          placeholder: '在此貼上你的 JWT Token...',
          header: '標頭',
          payload: '載荷',
          signature: '簽名',
          expired: '已過期',
          valid: '有效',
          expiresAt: '過期時間',
          issuedAt: '簽發時間',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何解碼 JWT Token</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          將完整的 JWT Token 貼到上方的輸入欄位。工具會自動解碼並以格式化的 JSON 顯示標頭和載荷。
          如果存在 &quot;exp&quot; 聲明，它還會檢查 Token 的過期狀態。你可以使用複製按鈕複製各個部分。
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>了解 JWT 結構</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          JWT 由三個用點號分隔的部分組成：標頭（指定演算法和 Token 類型）、載荷（包含簽發者、主題、過期時間和自訂資料等聲明）
          和簽名（用於驗證 Token 的完整性）。每個部分都經過 Base64URL 編碼。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="jwt-decoder" locale="zh-tw" />
    </div>
  )
}
