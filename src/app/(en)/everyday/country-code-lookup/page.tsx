import { Metadata } from 'next'
import CountryCodeLookup from '@/components/tools/CountryCodeLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Country Code Lookup - International Dialing Codes | toolcase',
  description: 'Find international dialing codes for any country. Quick search for country calling codes with flags and country names.',
  alternates: { canonical: 'https://toolcase.cc/everyday/country-code-lookup', languages: { en: 'https://toolcase.cc/everyday/country-code-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/country-code-lookup' } },
}

const faqs = [
  { question: 'How do I use international dialing codes?', answer: 'To call internationally, dial your country\'s exit code (e.g., 011 for US), then the country code (e.g., +44 for UK), then the local phone number without the leading 0.' },
  { question: 'Why do some countries have the same code?', answer: 'Some countries share the same dialing code. For example, US and Canada both use +1, and several territories share codes with their parent countries.' },
  { question: 'Can I search by dialing code?', answer: 'Yes! You can search by country name, country code (US, GB, etc.), or the dialing code (+44, +1, etc.).' },
]

export default function CountryCodeLookupPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Country Code Lookup', url: 'https://toolcase.cc/everyday/country-code-lookup' },
        ]}
      />
      <ToolSchema
        name="Country Code Lookup"
        description="Find international dialing codes for any country. Quick search for country calling codes with flags and country names."
        url="https://toolcase.cc/everyday/country-code-lookup"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Country Code Lookup' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Country Code Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Find international dialing codes for countries around the world.</p>
      <CountryCodeLookup
        labels={{
          title: 'Country Code Lookup',
          searchPlaceholder: 'Search country or dial code...',
          country: 'Country',
          dialCode: 'Dial Code',
          flag: 'Flag',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Browse the list or use the search box to find a specific country. The table shows the country flag, name, and international dialing code for each country.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="country-code-lookup" locale="en" />
    </div>
    </>
  )
}
