import { Metadata } from 'next'
import TwSecuritiesTax from '@/components/tools/TwSecuritiesTax'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Securities Transaction Tax - Stock & Bond Tax Rates | toolcase',
  description: 'Taiwan securities transaction tax rates for stocks, bonds, ETFs, and futures. Includes a quick calculator for transaction tax on sales.',
  alternates: { canonical: 'https://toolcase.cc/tw-securities-tax', languages: { en: 'https://toolcase.cc/tw-securities-tax', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-securities-tax' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Securities Transaction Tax', url: 'https://toolcase.cc/tw-securities-tax' },
        ]}
      />
      <ToolSchema
        name="Taiwan Securities Transaction Tax"
        description="Taiwan securities transaction tax rates for stocks, bonds, ETFs, and futures. Includes a quick calculator for transaction tax on sales."
        url="https://toolcase.cc/tw-securities-tax"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Securities Transaction Tax' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Securities Transaction Tax</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan securities transaction tax rates for tax year 2024 (ROC year 113). Calculate transaction tax on stocks, bonds, and ETFs.</p>
      <TwSecuritiesTax labels={{ title: 'Securities Transaction Tax', desc: 'Tax Year 2024 (ROC 113)', securityType: 'Security Type', rate: 'Rate', note: 'Note', quickCalc: 'Quick Calculator', tradeAmount: 'Sale Amount', secType: 'Security Type', taxDue: 'Transaction Tax', netProceeds: 'Net Proceeds', relatedTitle: 'Stock Investment Related Taxes & Fees', type: 'Tax/Fee', description: 'Description' }} />
      <RelatedTools current="tw-securities-tax" locale="en" />
    </div>
    </>
  )
}
