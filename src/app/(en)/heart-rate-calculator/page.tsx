import { Metadata } from 'next'
import HeartRateZoneCalculator from '@/components/tools/HeartRateZoneCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Heart Rate Zone Calculator - Free Online Tool | toolcase',
  description: 'Find your optimal heart rate training zones. Free online calculator for fat burn, cardio and peak heart rate zones.',
  alternates: { canonical: 'https://toolcase.cc/heart-rate-calculator', languages: { en: 'https://toolcase.cc/heart-rate-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/heart-rate-calculator' } },
}

const faqs = [
  { question: 'What are heart rate training zones?', answer: 'Heart rate training zones are ranges of heartbeats per minute that correspond to different exercise intensities. There are typically five zones: Zone 1 (50-60% max HR) for warm-up, Zone 2 (60-70%) for fat burning, Zone 3 (70-80%) for aerobic endurance, Zone 4 (80-90%) for anaerobic threshold, and Zone 5 (90-100%) for maximum effort.' },
  { question: 'How do I calculate my maximum heart rate?', answer: 'The most common formula is 220 minus your age. For example, if you are 30 years old, your estimated maximum heart rate is 190 bpm. More accurate formulas like Tanaka (208 - 0.7 x age) exist and may give better results, especially for older adults.' },
  { question: 'Which heart rate zone is best for fat burning?', answer: 'Zone 2 (60-70% of max heart rate) is often called the "fat-burning zone" because a higher proportion of calories burned come from fat. However, higher-intensity zones burn more total calories per minute. For overall fat loss, a mix of intensities combined with a calorie deficit is most effective.' },
]

export default function HeartRateCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Heart Rate Zone Calculator', url: 'https://toolcase.cc/heart-rate-calculator' },
        ]}
      />
      <ToolSchema
        name="Heart Rate Zone Calculator"
        description="Find your optimal heart rate training zones. Free online calculator for fat burn, cardio and peak heart rate zones."
        url="https://toolcase.cc/heart-rate-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Heart Rate Zone Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Heart Rate Zone Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Find your optimal heart rate training zones.</p>
      <HeartRateZoneCalculator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your age and optionally your resting heart rate. The calculator will determine your maximum heart rate and display all five training zones with their corresponding beats-per-minute ranges, helping you train at the right intensity for your fitness goals.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="heart-rate-calculator" locale="en" />
    </div>
    </>
  )
}
