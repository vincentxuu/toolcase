import { Metadata } from 'next'
import ClothingSizeChart from '@/components/tools/ClothingSizeChart'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Clothing Size Chart - International Size Converter | toolcase',
  description: 'International clothing size chart for men and women. Convert between TW, US, EU, UK, and JP sizes for tops and bottoms.',
  alternates: { canonical: 'https://toolcase.cc/clothing-size-chart', languages: { en: 'https://toolcase.cc/clothing-size-chart', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/clothing-size-chart' } },
}

const faqs = [
  { question: 'How do international clothing sizes compare?', answer: 'Different countries use different sizing systems. This chart shows approximate conversions between TW, US, EU, UK, and JP sizing for both tops and bottoms.' },
  { question: 'Are these sizes exact?', answer: 'These are approximate conversions. Actual sizing varies by brand, cut, and fabric. Always check the brand\'s specific size chart when possible.' },
]

export default function ClothingSizeChartPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Clothing Size Chart</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>International clothing size conversions for men and women. TW, US, EU, UK, and JP sizes.</p>
      <ClothingSizeChart labels={{ gender: 'Gender', men: 'Men', women: 'Women', category: 'Category', tops: 'Tops', bottoms: 'Bottoms', size: 'Size', chest: 'Chest (cm)', waist: 'Waist (cm)', hips: 'Hips (cm)', note: '※ Sizes are approximate and may vary by brand' }} />
      <FaqSection items={faqs} title="FAQ" />
      <RelatedTools current="clothing-size-chart" locale="en" />
    </div>
  )
}
