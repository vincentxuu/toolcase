import { Metadata } from 'next'
import ChineseZodiacLookup from '@/components/tools/ChineseZodiacLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Chinese Zodiac Lookup - Find Your Animal Sign | toolcase',
  description: 'Enter your birth year to find your Chinese zodiac animal sign! Complete reference with all 12 animals, five elements, personality traits, and compatibility.',
  alternates: { canonical: 'https://toolcase.cc/chinese-zodiac-lookup', languages: { en: 'https://toolcase.cc/chinese-zodiac-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/chinese-zodiac-lookup' } },
}

const faqs = [
  { question: 'How is the Chinese zodiac calculated?', answer: 'The Chinese zodiac follows a 12-year cycle, with each year assigned an animal: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, and Pig. Your zodiac animal is determined by dividing your birth year by 12 and checking the remainder.' },
  { question: 'What are the Five Elements?', answer: 'The Five Elements (Wu Xing) are Metal, Water, Wood, Fire, and Earth. They combine with the 12 animals to form a 60-year cycle (Sexagenary cycle). Each element pair lasts two years and adds a layer of personality characteristics to the animal sign.' },
  { question: 'What does zodiac compatibility mean?', answer: 'Zodiac compatibility is a traditional Chinese cultural concept where certain animal pairs are considered harmonious (compatible) while others may clash (incompatible). It\'s a cultural reference — real relationships depend on individual character and communication.' },
]

export default function ChineseZodiacLookupPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Chinese Zodiac Lookup', url: 'https://toolcase.cc/chinese-zodiac-lookup' },
        ]}
      />
      <ToolSchema
        name="Chinese Zodiac Lookup"
        description="Enter your birth year to find your Chinese zodiac animal sign! Complete reference with all 12 animals, five elements, personality traits, and compatibility."
        url="https://toolcase.cc/chinese-zodiac-lookup"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Chinese Zodiac Lookup' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Chinese Zodiac Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Enter your birth year to find your Chinese zodiac animal, element, and personality traits.</p>
      <ChineseZodiacLookup labels={{
        enterYear: 'Enter your birth year',
        yearPlaceholder: 'e.g. 1990',
        lookup: 'Look Up',
        yourZodiac: 'Your Zodiac',
        element: 'Element',
        traits: 'Personality Traits',
        compatible: 'Compatible',
        incompatible: 'Incompatible',
        allAnimals: 'All 12 Chinese Zodiac Animals',
        animals: [
          { name: 'Rat', traits: 'Clever, resourceful, versatile, charming, sociable and adaptable', compatible: 'Dragon, Monkey, Ox', incompatible: 'Horse, Goat' },
          { name: 'Ox', traits: 'Diligent, dependable, reliable, patient, determined and trustworthy', compatible: 'Rat, Snake, Rooster', incompatible: 'Goat, Horse' },
          { name: 'Tiger', traits: 'Brave, confident, natural leader, passionate, courageous and adventurous', compatible: 'Horse, Dog, Pig', incompatible: 'Monkey, Snake' },
          { name: 'Rabbit', traits: 'Gentle, elegant, kind, cautious, artistic and popular', compatible: 'Goat, Dog, Pig', incompatible: 'Rooster, Dragon' },
          { name: 'Dragon', traits: 'Confident, ambitious, energetic, lucky, charismatic and born leader', compatible: 'Rat, Monkey, Rooster', incompatible: 'Dog, Rabbit' },
          { name: 'Snake', traits: 'Wise, elegant, intuitive, mysterious, analytical and insightful', compatible: 'Ox, Rooster, Monkey', incompatible: 'Tiger, Pig' },
          { name: 'Horse', traits: 'Energetic, freedom-loving, enthusiastic, active and optimistic', compatible: 'Tiger, Goat, Dog', incompatible: 'Rat, Ox' },
          { name: 'Goat', traits: 'Gentle, empathetic, creative, peaceful, artistic and values harmony', compatible: 'Rabbit, Horse, Pig', incompatible: 'Ox, Rat' },
          { name: 'Monkey', traits: 'Clever, witty, humorous, versatile, creative and a great problem-solver', compatible: 'Rat, Dragon, Snake', incompatible: 'Tiger, Pig' },
          { name: 'Rooster', traits: 'Hardworking, practical, observant, organized, punctual and detail-oriented', compatible: 'Ox, Dragon, Snake', incompatible: 'Rabbit, Dog' },
          { name: 'Dog', traits: 'Loyal, honest, responsible, brave, trustworthy and just', compatible: 'Tiger, Rabbit, Horse', incompatible: 'Dragon, Rooster' },
          { name: 'Pig', traits: 'Kind, generous, sincere, optimistic, compassionate and warmhearted', compatible: 'Tiger, Rabbit, Goat', incompatible: 'Snake, Monkey' },
        ],
        elements: ['Metal', 'Water', 'Wood', 'Fire', 'Earth'],
      }} />
      <FaqSection items={faqs} />
      <RelatedTools current="chinese-zodiac-lookup" locale="en" />
    </div>
    </>
  )
}
