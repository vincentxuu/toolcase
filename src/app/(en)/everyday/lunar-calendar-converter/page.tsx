import { Metadata } from 'next'
import LunarCalendarConverter from '@/components/tools/LunarCalendarConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Lunar Calendar Converter - Free Online Tool | toolcase',
  description: 'Convert between solar (Gregorian) and lunar (Chinese) calendar dates. Shows Heavenly Stems, Earthly Branches, and Chinese Zodiac for any date from 1901 to 2100.',
  alternates: { canonical: 'https://toolcase.cc/everyday/lunar-calendar-converter', languages: { en: 'https://toolcase.cc/everyday/lunar-calendar-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/lunar-calendar-converter' } },
}

const faqs = [
  { question: 'What is the Chinese lunar calendar?', answer: 'The Chinese lunar calendar (also called the agricultural calendar or 農曆) is a lunisolar calendar used in Chinese culture. It combines lunar months with solar year corrections through leap months. It is used to determine traditional Chinese holidays such as Chinese New Year and the Mid-Autumn Festival.' },
  { question: 'What are Heavenly Stems and Earthly Branches?', answer: 'Heavenly Stems (天干) and Earthly Branches (地支) form the traditional Chinese sexagenary cycle used to count years. The 10 Heavenly Stems and 12 Earthly Branches combine to create a 60-year cycle. Each year also corresponds to one of the 12 Chinese Zodiac animals.' },
  { question: 'What is a leap month in the lunar calendar?', answer: 'Because a lunar year (12 lunar months) is about 11 days shorter than a solar year, an extra leap month (閏月) is added roughly every 2-3 years to keep the calendar aligned with the seasons. The leap month takes the same number as the preceding month.' },
]

export default function LunarCalendarConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Lunar Calendar Converter', url: 'https://toolcase.cc/everyday/lunar-calendar-converter' },
        ]}
      />
      <ToolSchema
        name="Lunar Calendar Converter"
        description="Convert between solar (Gregorian) and lunar (Chinese) calendar dates. Shows Heavenly Stems, Earthly Branches, and Chinese Zodiac for any date from 1901 to 2100."
        url="https://toolcase.cc/everyday/lunar-calendar-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Lunar Calendar Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lunar Calendar Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between solar (Gregorian) and Chinese lunar calendar dates.</p>
      <LunarCalendarConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Choose a conversion direction: Solar to Lunar or Lunar to Solar. For solar to lunar, pick a date from the date picker. For lunar to solar, select the lunar year, month, and day from the dropdowns, and check the leap month box if applicable. Click Convert to see the result, including Heavenly Stems, Earthly Branches, and Chinese Zodiac animal. Supports dates from 1901 to 2100.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="lunar-calendar-converter" locale="en" />
    </div>
    </>
  )
}
