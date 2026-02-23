import { Metadata } from 'next'
import FarmerAlmanac from '@/components/tools/FarmerAlmanac'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Farmer Almanac - Chinese Lunar Calendar & Auspicious Days | toolcase',
  description: 'Check Chinese lunar calendar dates, zodiac animals, constellations, and auspicious/inauspicious activities based on traditional almanac wisdom.',
  alternates: { canonical: 'https://toolcase.cc/farmer-almanac', languages: { en: 'https://toolcase.cc/farmer-almanac', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/farmer-almanac' } },
}

const faqs = [
  { question: 'What is a farmer almanac?', answer: 'A farmer almanac (農民曆) is a traditional Chinese calendar that combines lunar calendar dates with auspicious and inauspicious day guidance based on ancient Chinese astrology and almanac wisdom. It has been used for centuries to help plan important activities and events.' },
  { question: 'How accurate is the lunar date conversion?', answer: 'This tool provides a simplified approximation of lunar dates for educational and cultural reference purposes. For precise lunar calendar calculations, especially for important events, please consult official almanacs or cultural experts.' },
  { question: 'What are appropriate and avoid activities?', answer: 'Based on traditional Chinese almanac wisdom, each day has activities that are considered auspicious (appropriate) or inauspicious (avoid). These include events like weddings, moving house, starting businesses, and other significant life activities. This guidance is based on historical cultural practices.' },
  { question: 'Should I follow the almanac guidance?', answer: 'The almanac represents traditional cultural wisdom and beliefs. Whether to follow its guidance is a personal choice based on your cultural background and beliefs. This tool provides information for cultural education and reference purposes only.' },
]

export default function FarmerAlmanacPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Farmer Almanac', url: 'https://toolcase.cc/farmer-almanac' },
        ]}
      />
      <ToolSchema
        name="Farmer Almanac"
        description="Check Chinese lunar calendar dates, zodiac animals, constellations, and auspicious/inauspicious activities based on traditional almanac wisdom."
        url="https://toolcase.cc/farmer-almanac"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Farmer Almanac' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Farmer Almanac</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Check Chinese lunar calendar dates and traditional auspicious/inauspicious day guidance.</p>
      <FarmerAlmanac
        labels={{
          title: 'Farmer Almanac',
          date: 'Date',
          today: 'Today',
          query: 'Query',
          results: 'Results',
          lunarDate: 'Lunar Date',
          zodiac: 'Zodiac',
          constellation: 'Constellation',
          auspicious: 'Auspicious',
          inauspicious: 'Inauspicious',
          appropriate: 'Appropriate Activities',
          avoid: 'Activities to Avoid',
          note: 'Note',
          noteText: 'This almanac provides traditional Chinese calendar information and auspicious/inauspicious guidance based on historical almanac data. Use as cultural reference only.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select a date to query (or click &quot;Today&quot; for the current date) and click &quot;Query&quot; to see the lunar calendar date, Chinese zodiac animal for the year, constellation, and lists of appropriate and avoid activities based on traditional almanac wisdom. The tool provides cultural and educational information about traditional Chinese calendar practices.
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="farmer-almanac" locale="en" />
    </div>
    </>
  )
}
