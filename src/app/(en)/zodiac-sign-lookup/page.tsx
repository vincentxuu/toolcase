import { Metadata } from 'next'
import ZodiacSignLookup from '@/components/tools/ZodiacSignLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Zodiac Sign Lookup - Find Your Star Sign | toolcase',
  description: 'Enter your birthday to find your zodiac sign instantly! Complete reference table with all 12 zodiac signs, date ranges, elements, and personality traits.',
  alternates: { canonical: 'https://toolcase.cc/zodiac-sign-lookup', languages: { en: 'https://toolcase.cc/zodiac-sign-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/zodiac-sign-lookup' } },
}

const faqs = [
  { question: 'How are zodiac signs determined?', answer: 'Western astrology divides the year into 12 zodiac signs based on the position of the Sun along the ecliptic. Each sign spans roughly one month, starting with Aries (March 21) and ending with Pisces (March 20).' },
  { question: 'What are the four zodiac elements?', answer: 'The 12 signs are grouped into four elements: Fire (Aries, Leo, Sagittarius) representing passion and action; Earth (Taurus, Virgo, Capricorn) representing practicality; Air (Gemini, Libra, Aquarius) representing intellect and communication; Water (Cancer, Scorpio, Pisces) representing emotion and intuition.' },
  { question: 'What if I was born on the cusp between two signs?', answer: 'People born on the boundary between two signs are called "cusp" babies. The exact sign depends on the precise year and time of birth, as the Sun\'s transition varies slightly each year. This tool uses the most commonly accepted date ranges.' },
]

export default function ZodiacSignLookupPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Zodiac Sign Lookup', url: 'https://toolcase.cc/zodiac-sign-lookup' },
        ]}
      />
      <ToolSchema
        name="Zodiac Sign Lookup"
        description="Enter your birthday to find your zodiac sign instantly! Complete reference table with all 12 zodiac signs, date ranges, elements, and personality traits."
        url="https://toolcase.cc/zodiac-sign-lookup"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Zodiac Sign Lookup' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Zodiac Sign Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Enter your birthday to find your zodiac sign, element, and personality traits.</p>
      <ZodiacSignLookup labels={{
        title: 'Zodiac Sign Lookup',
        selectMonth: 'Select month',
        selectDay: 'Select day',
        month: 'Month',
        day: 'Day',
        lookup: 'Look Up',
        yourSign: 'Your Sign',
        dateRange: 'Date Range',
        element: 'Element',
        traits: 'Personality Traits',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        signs: [
          { name: 'Capricorn', traits: 'Practical, disciplined, patient, responsible, goal-oriented and determined' },
          { name: 'Aquarius', traits: 'Independent, innovative, humanitarian, progressive, values freedom and social ideals' },
          { name: 'Pisces', traits: 'Sensitive, empathetic, intuitive, romantic, imaginative and compassionate' },
          { name: 'Aries', traits: 'Brave, energetic, assertive, natural leader, direct and action-oriented' },
          { name: 'Taurus', traits: 'Stable, reliable, patient, enjoys life, values material security and beauty' },
          { name: 'Gemini', traits: 'Intelligent, communicative, adaptable, curious, versatile and quick-witted' },
          { name: 'Cancer', traits: 'Emotional, nurturing, intuitive, protective, gentle and sympathetic' },
          { name: 'Leo', traits: 'Confident, generous, charismatic, passionate, loves attention and has strong creativity' },
          { name: 'Virgo', traits: 'Detail-oriented, analytical, perfectionist, practical, attentive and service-minded' },
          { name: 'Libra', traits: 'Fair, elegant, social, peace-loving, seeks balance and harmonious relationships' },
          { name: 'Scorpio', traits: 'Mysterious, strong-willed, perceptive, focused, emotionally deep and loyal' },
          { name: 'Sagittarius', traits: 'Optimistic, adventurous, freedom-loving, philosophical, loves travel and exploration' },
        ],
        fire: 'Fire',
        earth: 'Earth',
        air: 'Air',
        water: 'Water',
      }} />
      <FaqSection items={faqs} />
      <RelatedTools current="zodiac-sign-lookup" locale="en" />
    </div>
    </>
  )
}
