import { Metadata } from 'next'
import EmojiSearch from '@/components/tools/EmojiSearch'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Emoji Search - Free Online Tool | toolcase',
  description:
    'Search and discover emojis by keyword. Browse categories, copy emojis to your clipboard with one click, and find the perfect emoji for any occasion.',
  alternates: {
    canonical: 'https://toolcase.cc/emoji-search',
    languages: {
      en: 'https://toolcase.cc/emoji-search',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/emoji-search',
    },
  },
}

const faqs = [
  {
    question: 'How do I search for an emoji?',
    answer:
      'Type a keyword into the search box — for example "smile", "heart", or "rocket". The tool will instantly filter and display all matching emojis. You can also browse by category such as Smileys, Animals, Food, Travel, and more.',
  },
  {
    question: 'How do I copy an emoji?',
    answer:
      'Simply click on any emoji in the results and it will be copied to your clipboard automatically. You can then paste it into any application, document, or social media post.',
  },
  {
    question: 'Are all emojis supported?',
    answer:
      'The tool includes the full set of Unicode emojis. However, the appearance of each emoji depends on your operating system and browser. Some newer emojis may not render on older devices.',
  },
]

export default function EmojiSearchPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Emoji Search</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Find and copy the perfect emoji by searching with keywords or browsing categories.
      </p>

      <EmojiSearch />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Start typing a keyword in the search bar to filter emojis in real time. You can also browse emojis by
          selecting a category from the tabs below the search bar. Click any emoji to copy it to your clipboard. A
          confirmation will appear so you know it was copied successfully. Paste the emoji wherever you need it — in
          messages, documents, social media posts, or code.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="emoji-search" locale="en" />
    </div>
  )
}
