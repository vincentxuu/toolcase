import { Metadata } from 'next'
import JwtEncoder from '@/components/tools/JwtEncoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JWT 編碼器 - 免費線上工具 | toolcase',
  description: '使用 HMAC 演算法編碼和簽署 JWT（JSON Web Token）。從標頭和載荷 JSON 建構 Token，並在瀏覽器中完成簽署。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/dev/jwt-encoder',
    languages: {
      en: 'https://toolcase.cc/dev/jwt-encoder',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/jwt-encoder',
    },
  },
}

const faqs = [
  {
    question: 'JWT 編碼如何運作？',
    answer: 'JWT 編碼會取得標頭（指定演算法）和載荷（包含聲明），對兩者進行 Base64URL 編碼，然後使用你的密鑰建立 HMAC 簽名。三個部分用點號連接形成完整的 Token。',
  },
  {
    question: '這可以用於正式環境嗎？',
    answer: '此工具是為開發、測試和學習目的而設計的。簽署完全在你的瀏覽器中進行，不會將任何資料傳送到伺服器。但正式環境的 JWT Token 應在伺服器端使用適當的密鑰管理來生成。',
  },
  {
    question: '支援哪些演算法？',
    answer: '此工具支援基於 HMAC 的演算法：HS256（使用 SHA-256 的 HMAC）、HS384（使用 SHA-384 的 HMAC）和 HS512（使用 SHA-512 的 HMAC）。這些使用 Web Crypto API 進行安全的瀏覽器端簽署。',
  },
]

export default function JwtEncoderPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'JWT 編碼器', url: 'https://toolcase.cc/zh-tw/dev/jwt-encoder' },
        ]}
      />
      <ToolSchema
        name="JWT 編碼器"
        description="使用 HMAC 演算法編碼和簽署 JWT（JSON Web Token）。從標頭和載荷 JSON 建構 Token，並在瀏覽器中完成簽署。"
        url="https://toolcase.cc/zh-tw/dev/jwt-encoder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'JWT 編碼器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JWT 編碼器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        從標頭和載荷 JSON 建構並簽署 JWT Token。輸入你的聲明和密鑰來生成 Token。
      </p>

      <JwtEncoder
        labels={{
          encode: '編碼',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          headerLabel: '標頭',
          payloadLabel: '載荷',
          secretLabel: '密鑰',
          tokenLabel: 'JWT Token',
          algorithm: '演算法',
          headerPlaceholder: 'JWT 標頭 JSON...',
          payloadPlaceholder: 'JWT 載荷 JSON...',
          secretPlaceholder: '輸入用於簽署的密鑰...',
          tokenPlaceholder: '生成的 JWT Token 會顯示在這裡...',
          invalidJson: 'JSON 格式錯誤',
          note: '注意：簽署在瀏覽器端進行，僅供示範用途。請勿用於正式環境的 Token 生成。',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在輸入面板中編輯標頭和載荷 JSON。標頭應包含演算法和 Token 類型，載荷則包含主題、名稱和過期時間等聲明。
          輸入密鑰，選擇 HMAC 演算法，然後點擊「編碼」。生成的 JWT Token 會顯示在下方，
          並以顏色區分三個部分：標頭（紅色）、載荷（紫色）和簽名（藍色）。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="jwt-encoder" locale="zh-tw" />
    </div>
    </>
  )
}
