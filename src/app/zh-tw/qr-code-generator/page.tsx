import { Metadata } from 'next'
import QrGenerator from '@/components/tools/QrGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'QR Code 產生器 - 免費線上工具 | toolcase',
  description: '從任何文字或網址即時產生 QR Code。免費線上 QR Code 產生器，支援自訂顏色與大小。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/qr-code-generator',
    languages: {
      en: 'https://toolcase.cc/qr-code-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/qr-code-generator',
    },
  },
}

const faqs = [
  {
    question: '什麼是 QR Code？',
    answer: 'QR Code（快速回應碼）是一種二維條碼，可以儲存網址、文字、聯絡資訊等資料。可以用智慧手機相機或 QR Code 掃描器讀取。',
  },
  {
    question: '可以編碼哪些類型的資料？',
    answer: '你可以編碼任何文字，包括網址、電子郵件地址、電話號碼、Wi-Fi 憑證、純文字等。QR Code 會根據資料量自動調整大小。',
  },
  {
    question: '可以自訂 QR Code 顏色嗎？',
    answer: '可以！你可以使用顏色選擇器更改 QR Code 的前景色和背景色。請確保兩種顏色之間有足夠的對比度，以便可靠掃描。',
  },
  {
    question: 'QR Code 是在本地產生的嗎？',
    answer: '是的，所有 QR Code 都直接在你的瀏覽器中產生。沒有任何資料會被傳送到伺服器，確保你的資訊保持隱私。',
  },
]

export default function QrCodeGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'QR Code 產生器', url: 'https://toolcase.cc/zh-tw/qr-code-generator' },
        ]}
      />
      <ToolSchema
        name="QR Code 產生器"
        description="從任何文字或網址即時產生 QR Code。免費線上 QR Code 產生器，支援自訂顏色與大小。"
        url="https://toolcase.cc/zh-tw/qr-code-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'QR Code 產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>QR Code 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        輸入任何文字或網址，即時產生 QR Code。
      </p>

      <QrGenerator
        labels={{
          generate: '產生',
          download: '下載 PNG',
          clear: '清除',
          placeholder: '輸入文字或網址...',
          size: '大小',
          color: '顏色',
          bgColor: '背景色',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何產生 QR Code</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在上方的輸入欄位中輸入或貼上你的文字、網址或資料。QR Code 會在你輸入時自動產生。
          你可以自訂大小（128px 到 1024px）和顏色以符合你的品牌或偏好。產生後，點擊「下載 PNG」將 QR Code 圖片儲存到你的裝置。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="qr-code-generator" locale="zh-tw" />
    </div>
    </>
  )
}
