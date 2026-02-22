import { Metadata } from 'next'
import IpSubnetCalculator from '@/components/tools/IpSubnetCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'IP 子網路計算器 - CIDR、網路與主機 | toolcase',
  description: '根據任何 IP 位址和 CIDR 表示法計算子網路詳情，包括網路位址、廣播位址、子網路遮罩、主機範圍和可用主機總數。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/ip-subnet-calculator', languages: { en: 'https://toolcase.cc/ip-subnet-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ip-subnet-calculator' } },
}

const faqs = [
  { question: '什麼是 CIDR 表示法？', answer: 'CIDR（無類別域間路由）表示法使用斜線後接數字（如 /24）來表示子網路遮罩的位元數。/24 表示前 24 位元為網路部分，剩餘 8 位元給主機（254 個可用主機）。' },
  { question: '網路位址和廣播位址有什麼區別？', answer: '網路位址是子網路中的第一個位址（所有主機位元為 0），用於識別網路本身。廣播位址是最後一個位址（所有主機位元為 1），用於向子網路上的所有主機發送資料。' },
]

export default function IpSubnetCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'IP 子網路計算器', url: 'https://toolcase.cc/zh-tw/ip-subnet-calculator' },
        ]}
      />
      <ToolSchema
        name="IP 子網路計算器"
        description="根據任何 IP 位址和 CIDR 表示法計算子網路詳情，包括網路位址、廣播位址、子網路遮罩、主機範圍和可用主機總數。"
        url="https://toolcase.cc/zh-tw/ip-subnet-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'IP 子網路計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>IP 子網路計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>根據任何 IPv4 位址和 CIDR 前綴計算子網路詳情。查看網路範圍、遮罩和主機數量。</p>
      <IpSubnetCalculator labels={{ ipAddress: 'IP 位址', cidr: 'CIDR', subnetMask: '子網路遮罩', networkAddress: '網路位址', broadcastAddress: '廣播位址', firstHost: '第一個主機', lastHost: '最後一個主機', totalHosts: '可用主機總數', ipClass: 'IP 類別', placeholder: '192.168.1.0', invalid: '請輸入有效的 IPv4 位址' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="ip-subnet-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
