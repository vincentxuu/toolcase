import { Metadata } from 'next'
import TaiwanPostalCode from '@/components/tools/TaiwanPostalCode'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Taiwan Postal Code Lookup - ZIP Codes | toolcase',
  description: 'Look up Taiwan postal codes (ZIP codes) by city and district. Search, filter, and click to copy.',
  alternates: { canonical: 'https://toolcase.cc/taiwan-postal-code', languages: { en: 'https://toolcase.cc/taiwan-postal-code', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/taiwan-postal-code' } },
}

const faqs = [
  { question: 'How many digits are Taiwan postal codes?', answer: 'Taiwan uses 3-digit postal codes (e.g., 100 for Zhongzheng District, Taipei) and extended 3+2 digit codes. This tool provides the 3-digit codes.' },
  { question: 'How do I search for a postal code?', answer: 'You can type a city name, district name, or postal code in the search box, or use the dropdown to filter by city.' },
]

export default function TaiwanPostalCodePage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Postal Code Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Look up Taiwan postal codes by city and district. Search, filter, and click to copy.</p>
      <TaiwanPostalCode labels={{ search: 'Search', searchPlaceholder: 'Type district name or postal code...', city: 'City', district: 'District', postalCode: 'Postal Code', allCities: 'All Cities', noResults: 'No results found', clickToCopy: 'Click to copy', copied: 'Copied!' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="taiwan-postal-code" locale="en" />
    </div>
  )
}
