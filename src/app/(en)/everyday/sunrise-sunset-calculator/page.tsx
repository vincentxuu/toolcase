import { Metadata } from 'next'
import SunriseSunsetCalculator from '@/components/tools/SunriseSunsetCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Sunrise & Sunset Calculator - Astronomical Time Calculator | toolcase',
  description: 'Calculate sunrise, sunset, solar noon, civil twilight times, and day length for any location and date using precise astronomical formulas.',
  alternates: { canonical: 'https://toolcase.cc/everyday/sunrise-sunset-calculator', languages: { en: 'https://toolcase.cc/everyday/sunrise-sunset-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/sunrise-sunset-calculator' } },
}

const faqs = [
  { question: 'How accurate are the sunrise and sunset times?', answer: 'The calculator uses precise astronomical formulas including solar mean anomaly, equation of center, and ecliptic longitude calculations. Times are accurate to within 1-2 minutes for most locations. Actual times may vary slightly due to atmospheric refraction and local terrain.' },
  { question: 'What is civil twilight?', answer: 'Civil twilight is the period when the sun is between 0° and 6° below the horizon. During civil twilight begin (dawn), there is enough natural light for most outdoor activities without artificial lighting. Civil twilight end (dusk) is when it becomes too dark for such activities.' },
  { question: 'Can I use my current location?', answer: 'Yes! Click the "Use My Location" button to automatically fill in your latitude and longitude using your browser\'s geolocation API. You may need to grant location permission.' },
  { question: 'What is solar noon?', answer: 'Solar noon is when the sun reaches its highest point in the sky (maximum altitude) for that day at your location. It\'s not necessarily 12:00 PM clock time due to time zones, daylight saving time, and the equation of time.' },
]

export default function SunriseSunsetCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Sunrise & Sunset Calculator', url: 'https://toolcase.cc/everyday/sunrise-sunset-calculator' },
        ]}
      />
      <ToolSchema
        name="Sunrise & Sunset Calculator"
        description="Calculate sunrise, sunset, solar noon, civil twilight times, and day length for any location and date using precise astronomical formulas."
        url="https://toolcase.cc/everyday/sunrise-sunset-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Sunrise & Sunset Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sunrise & Sunset Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate sunrise, sunset, twilight times, and day length using astronomical formulas.</p>
      <SunriseSunsetCalculator
        labels={{
          title: 'Sunrise & Sunset Calculator',
          date: 'Date',
          latitude: 'Latitude',
          longitude: 'Longitude',
          getLocation: 'Use My Location',
          calculate: 'Calculate',
          results: 'Results',
          sunrise: 'Sunrise',
          sunset: 'Sunset',
          solarNoon: 'Solar Noon',
          dayLength: 'Day Length',
          twilightBegin: 'Civil Twilight Begin',
          twilightEnd: 'Civil Twilight End',
          hours: 'hours',
          minutes: 'minutes',
          note: 'Note',
          noteText: 'Times are calculated for the specified location and date using astronomical formulas. Actual times may vary slightly due to atmospheric conditions.',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Select a date and enter latitude/longitude coordinates (or click &quot;Use My Location&quot;). Click &quot;Calculate&quot; to see sunrise, sunset, solar noon, day length, and civil twilight times. The calculator uses precise astronomical algorithms including solar position calculations, equation of center, and ecliptic longitude. Default location is Taipei (25.033°N, 121.5654°E).
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="sunrise-sunset-calculator" locale="en" />
    </div>
    </>
  )
}
