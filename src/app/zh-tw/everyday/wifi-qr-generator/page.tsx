import { Metadata } from 'next'
import WifiQrGenerator from '@/components/tools/WifiQrGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'WiFi QR 碼產生器 - 分享 WiFi 密碼 | toolcase',
  description: '為您的 WiFi 網路產生 QR 碼。來賓掃描即可立即連線，無需輸入密碼。支援 WPA、WEP 和開放網路。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/wifi-qr-generator', languages: { en: 'https://toolcase.cc/everyday/wifi-qr-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/wifi-qr-generator' } },
}

const faqs = [
  { question: 'WiFi QR 碼如何運作？', answer: 'QR 碼以標準格式（WIFI:S:ssid;T:encryption;P:password;;）編碼您的 WiFi 網路憑證。當別人用手機相機掃描此 QR 碼時，裝置會自動連接到您的 WiFi 網路。' },
  { question: '透過 QR 碼分享 WiFi 安全嗎？', answer: 'QR 碼完全在您的瀏覽器中產生，不會將任何資料傳送至伺服器。不過，請注意誰能看到 QR 碼，因為任何掃描它的人都能連接到您的網路。' },
  { question: '支援哪些加密類型？', answer: '產生器支援 WPA/WPA2（最常見）、WEP（舊式）和開放（無密碼）網路。' },
]

export default function WifiQrGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'WiFi QR 碼產生器', url: 'https://toolcase.cc/zh-tw/everyday/wifi-qr-generator' },
        ]}
      />
      <ToolSchema
        name="WiFi QR 碼產生器"
        description="為您的 WiFi 網路產生 QR 碼。來賓掃描即可立即連線，無需輸入密碼。支援 WPA、WEP 和開放網路。"
        url="https://toolcase.cc/zh-tw/everyday/wifi-qr-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'WiFi QR 碼產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WiFi QR 碼產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>為您的 WiFi 網路產生 QR 碼，來賓掃描即可立即連線。</p>
      <WifiQrGenerator labels={{ ssid: '網路名稱（SSID）', password: '密碼', encryption: '加密方式', generate: '產生', copy: '複製', wifiString: 'WiFi 字串', copied: '已複製！', none: '無' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入您的 WiFi 網路名稱（SSID）、密碼，並選擇加密類型。工具會產生一個 QR 碼，來賓用手機相機掃描即可立即連接您的 WiFi 網路，無需手動輸入密碼。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="wifi-qr-generator" locale="zh-tw" />
    </div>
    </>
  )
}
