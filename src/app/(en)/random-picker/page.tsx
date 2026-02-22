import { Metadata } from 'next'
import RandomPicker from '@/components/tools/RandomPicker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Random Picker - Free Online Tool | toolcase',
  description: 'Randomly pick items from a list. Free online random picker for decisions, raffles, team selection and more.',
  alternates: { canonical: 'https://toolcase.cc/random-picker', languages: { en: 'https://toolcase.cc/random-picker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/random-picker' } },
}

const faqs = [
  { question: 'How does the random picker work?', answer: 'Enter your list of items, one per line. The tool uses a cryptographically secure random algorithm to select one or more items from your list with equal probability. Each item has the same chance of being selected, ensuring a fair and unbiased pick.' },
  { question: 'Can I pick more than one item at a time?', answer: 'Yes, you can specify how many items to pick from your list. The tool will randomly select that many items. You can choose whether the same item can be selected more than once or if each pick should be unique.' },
  { question: 'Is this suitable for raffles and giveaways?', answer: 'Yes, the random picker uses a fair algorithm where every item has an equal chance of being selected. It is suitable for informal raffles, giveaways, team assignments, deciding where to eat, and any situation where you need an impartial random selection.' },
]

export default function RandomPickerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Random Picker', url: 'https://toolcase.cc/random-picker' },
        ]}
      />
      <ToolSchema
        name="Random Picker"
        description="Randomly pick items from a list. Free online random picker for decisions, raffles, team selection and more."
        url="https://toolcase.cc/random-picker"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Random Picker' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Random Picker</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Randomly pick one or more items from your list.</p>
      <RandomPicker />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your items into the list, with one item per line. Set how many items you want to pick, then click the pick button. The tool will randomly select from your list and display the result. Perfect for making decisions, running raffles or assigning teams.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="random-picker" locale="en" />
    </div>
    </>
  )
}
