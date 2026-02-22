import { Metadata } from 'next'
import AddressTranslator from '@/components/tools/AddressTranslator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Taiwan Address Translator - Chinese to English | toolcase',
  description: 'Translate Taiwan Chinese addresses to English format. Auto-detects cities and districts for international mail and forms.',
  alternates: { canonical: 'https://toolcase.cc/address-translator', languages: { en: 'https://toolcase.cc/address-translator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/address-translator' } },
}

const faqs = [
  { question: 'What is the English address format for Taiwan?', answer: 'English addresses are written in reverse order compared to Chinese: Floor, Number, Lane/Alley, Section, Road/Street, District, City, Postal Code, Taiwan.' },
  { question: 'Is the road name translation accurate?', answer: 'Cities and districts are auto-translated accurately. Road names may need minor adjustments as they involve romanization. For official translations, refer to the Chunghwa Post website.' },
]

export default function AddressTranslatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Taiwan Address Translator', url: 'https://toolcase.cc/address-translator' },
        ]}
      />
      <ToolSchema
        name="Taiwan Address Translator"
        description="Translate Taiwan Chinese addresses to English format. Auto-detects cities and districts for international mail and forms."
        url="https://toolcase.cc/address-translator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Taiwan Address Translator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Taiwan Address Translator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Translate Taiwan Chinese addresses to English format for international mail and forms.</p>
      <AddressTranslator labels={{ inputLabel: 'Chinese Address', inputPlaceholder: 'e.g., 100 台北市中正區重慶南路一段122號3樓', result: 'English Address', copy: 'Copy', copied: 'Copied!', note: '※ Road name translations are approximate. For official translations, check Chunghwa Post.', city: 'City', district: 'District', road: 'Road/Street' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="address-translator" locale="en" />
    </div>
    </>
  )
}
