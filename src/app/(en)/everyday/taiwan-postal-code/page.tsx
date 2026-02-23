import { Metadata } from 'next'
import TaiwanPostalCode from '@/components/tools/TaiwanPostalCode'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Postal Code Lookup - ZIP Codes | toolcase',
  description: 'Look up Taiwan postal codes (ZIP codes) by city and district. Search, filter, and click to copy.',
  alternates: { canonical: 'https://toolcase.cc/everyday/taiwan-postal-code', languages: { en: 'https://toolcase.cc/everyday/taiwan-postal-code', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/taiwan-postal-code' } },
}

const faqs = [
  { question: 'How many digits are Taiwan postal codes?', answer: 'Taiwan uses 3-digit postal codes (e.g., 100 for Zhongzheng District, Taipei) and extended 3+2 digit codes. This tool provides the 3-digit codes.' },
  { question: 'How do I search for a postal code?', answer: 'You can type a city name, district name, or postal code in the search box, or use the dropdown to filter by city.' },
]

export default function TaiwanPostalCodePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Postal Code Lookup', url: 'https://toolcase.cc/everyday/taiwan-postal-code' },
        ]}
      />
      <ToolSchema
        name="Taiwan Postal Code Lookup"
        description="Look up Taiwan postal codes (ZIP codes) by city and district. Search, filter, and click to copy."
        url="https://toolcase.cc/everyday/taiwan-postal-code"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Postal Code Lookup' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Postal Code Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Look up Taiwan postal codes by city and district. Search, filter, and click to copy.</p>
      <TaiwanPostalCode labels={{ search: 'Search', searchPlaceholder: 'Type district name or postal code...', city: 'City', district: 'District', postalCode: 'Postal Code', allCities: 'All Cities', noResults: 'No results found', clickToCopy: 'Click to copy', copied: 'Copied!' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="taiwan-postal-code" locale="en" />
    </div>
    </>
  )
}
