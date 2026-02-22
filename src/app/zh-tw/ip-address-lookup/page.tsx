import { Metadata } from 'next'
import IpAddressLookup from '@/components/tools/IpAddressLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'IP 位址查詢 - 免費線上工具 | toolcase',
  description: '查詢任何 IP 位址的地理位置、ISP、時區和座標資訊。自動偵測您的 IP 位址。免費即時查詢。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/ip-address-lookup', languages: { en: 'https://toolcase.cc/ip-address-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ip-address-lookup' } },
}

const faqs = [
  { question: 'IP 地理位置的準確度如何？', answer: 'IP 地理位置對大多數商業 ISP 通常精確到城市等級。但使用 VPN、行動網路或企業代理的使用者，可能會顯示 VPN 伺服器或網路閘道的位置，而非實際使用者位置。' },
  { question: '可以查詢任何 IP 位址嗎？', answer: '可以查詢任何公開的 IPv4 或 IPv6 位址。私有 IP 位址（如 192.168.x.x 或 10.x.x.x）用於區域網路，無法進行地理定位。' },
  { question: '我的 IP 位址會被儲存或記錄嗎？', answer: '此工具會將 IP 傳送至第三方地理定位 API（ipapi.co）以取得位置資料。我們不會在伺服器上儲存或記錄任何 IP 位址。有關資料處理方式，請參閱 ipapi.co 的隱私政策。' },
]

export default function IpAddressLookupPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'IP 位址查詢', url: 'https://toolcase.cc/zh-tw/ip-address-lookup' },
        ]}
      />
      <ToolSchema
        name="IP 位址查詢"
        description="查詢任何 IP 位址的地理位置、ISP、時區和座標資訊。自動偵測您的 IP 位址。免費即時查詢。"
        url="https://toolcase.cc/zh-tw/ip-address-lookup"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'IP 位址查詢' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>IP 位址查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>查詢任何 IP 位址的地理位置、ISP 和時區資訊，或偵測您自己的 IP。</p>
      <IpAddressLookup labels={{ yourIp: '您的 IP 位址', lookupIp: '查詢 IP 位址', lookup: '查詢', detectMyIp: '偵測我的 IP', ip: 'IP 位址', city: '城市', region: '地區', country: '國家', isp: 'ISP / 組織', timezone: '時區', coordinates: '座標', loading: '載入中...', error: '查詢 IP 資訊時發生錯誤，請重試。', placeholder: '輸入 IP 位址...' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>頁面載入時會自動偵測您的 IP 位址。若要查詢其他 IP，在輸入欄位中輸入後點擊「查詢」。工具會顯示該 IP 位址關聯的城市、地區、國家、ISP、時區和地理座標。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="ip-address-lookup" locale="zh-tw" />
    </div>
    </>
  )
}
