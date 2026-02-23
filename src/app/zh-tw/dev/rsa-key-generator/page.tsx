import { Metadata } from 'next'
import RsaKeyGenerator from '@/components/tools/RsaKeyGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'RSA 金鑰對產生器 - 免費線上工具 | toolcase',
  description: '在瀏覽器中使用 Web Crypto API 產生 RSA 金鑰對（2048 或 4096 位元）。以 PEM 格式匯出公鑰和私鑰。資料不會傳送到伺服器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/rsa-key-generator', languages: { en: 'https://toolcase.cc/dev/rsa-key-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/rsa-key-generator' } },
}

const faqs = [
  { question: '有哪些金鑰大小可選？', answer: '可以產生 2048 位元或 4096 位元的 RSA 金鑰對。2048 位元適用於大多數應用程式且產生速度較快。4096 位元提供更強的安全性但產生時間較長。' },
  { question: '產生的金鑰安全嗎？', answer: '是的。金鑰使用瀏覽器內建的 Web Crypto API 產生，其使用密碼學安全的亂數產生器。金鑰不會離開您的裝置，所有產生過程都在客戶端完成。' },
  { question: '金鑰是什麼格式？', answer: '公鑰以 SPKI 格式匯出，私鑰以 PKCS#8 格式匯出，皆以 base64 編碼並包裝在標準 PEM 標頭中。這些格式與 OpenSSL、SSH 和大多數密碼學函式庫相容。' },
]

export default function RsaKeyGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'RSA 金鑰對產生器', url: 'https://toolcase.cc/zh-tw/dev/rsa-key-generator' },
        ]}
      />
      <ToolSchema
        name="RSA 金鑰對產生器"
        description="在瀏覽器中使用 Web Crypto API 產生 RSA 金鑰對（2048 或 4096 位元）。以 PEM 格式匯出公鑰和私鑰。資料不會傳送到伺服器。"
        url="https://toolcase.cc/zh-tw/dev/rsa-key-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'RSA 金鑰對產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>RSA 金鑰對產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在瀏覽器中產生 RSA 公鑰和私鑰對，以 PEM 格式輸出。</p>
      <RsaKeyGenerator labels={{ keySize: '金鑰大小', generate: '產生金鑰對', publicKey: '公鑰', privateKey: '私鑰', copy: '複製', copied: '已複製！', generating: '產生中...', bits: '位元' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇金鑰大小（2048 或 4096 位元），點擊「產生金鑰對」。工具使用 Web Crypto API 產生 RSA 金鑰對，並以 PEM 格式顯示公鑰和私鑰。使用「複製」按鈕將金鑰複製到剪貼簿。4096 位元選項提供更強的安全性，但產生時間可能稍長。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="rsa-key-generator" locale="zh-tw" />
    </div>
    </>
  )
}
