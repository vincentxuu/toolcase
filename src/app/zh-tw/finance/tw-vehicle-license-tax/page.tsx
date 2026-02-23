import { Metadata } from 'next'
import TwVehicleLicenseTax from '@/components/tools/TwVehicleLicenseTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '使用牌照稅 - 汽車/機車/電動車稅額表 | toolcase',
  description: '使用牌照稅稅額對照表，含汽車（自用/營業用）、機車、電動車年度稅額，依排氣量或馬力分級。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-vehicle-license-tax', languages: { en: 'https://toolcase.cc/finance/tw-vehicle-license-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-vehicle-license-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '使用牌照稅', url: 'https://toolcase.cc/zh-tw/finance/tw-vehicle-license-tax' },
        ]}
      />
      <ToolSchema
        name="使用牌照稅"
        description="使用牌照稅稅額對照表，含汽車（自用/營業用）、機車、電動車年度稅額，依排氣量或馬力分級。"
        url="https://toolcase.cc/zh-tw/finance/tw-vehicle-license-tax"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '使用牌照稅' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>使用牌照稅</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>汽車、機車、電動車使用牌照稅稅額對照表，依排氣量或馬達馬力分級。</p>
      <TwVehicleLicenseTax />
      <RelatedTools current="tw-vehicle-license-tax" locale="zh-tw" />
    </div>
    </>
  )
}
