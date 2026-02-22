import { Metadata } from 'next'
import TwMinimumWage from '@/components/tools/TwMinimumWage'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Minimum Wage History - Monthly & Hourly Rates (2011–2025) | toolcase',
  description: 'Taiwan minimum wage history from 2011 to 2025, including monthly and hourly rates, effective dates, and year-over-year increases.',
  alternates: { canonical: 'https://toolcase.cc/tw-minimum-wage', languages: { en: 'https://toolcase.cc/tw-minimum-wage', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-minimum-wage' } },
}

export default function Page() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Minimum Wage</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Taiwan minimum wage history from 2011 to 2025, with monthly and hourly rates, effective dates, and annual increases.</p>
      <TwMinimumWage labels={{ title: 'Minimum Wage History', desc: '2011 – 2025', year: 'Year', monthlyWage: 'Monthly (NTD)', hourlyWage: 'Hourly (NTD)', effectiveDate: 'Effective Date', increase: 'Increase', keyInfoTitle: 'Key Information', item: 'Item', value: 'Details' }} />
      <RelatedTools current="tw-minimum-wage" locale="en" />
    </div>
  )
}
