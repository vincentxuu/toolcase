import { Metadata } from 'next'
import SocialMediaCounter from '@/components/tools/SocialMediaCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Social Media Character Counter - Free Online Tool | toolcase',
  description:
    'Count characters for Twitter/X, Instagram, Facebook, LinkedIn, and YouTube. Stay within platform limits and optimise your posts before publishing.',
  alternates: {
    canonical: 'https://toolcase.cc/social-media-counter',
    languages: {
      en: 'https://toolcase.cc/social-media-counter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/social-media-counter',
    },
  },
}

const faqs = [
  {
    question: 'What character limits does each platform have?',
    answer:
      'Twitter/X allows 280 characters per post. Instagram captions can be up to 2,200 characters. Facebook posts support up to 63,206 characters. LinkedIn posts allow 3,000 characters, and YouTube titles are limited to 100 characters with descriptions up to 5,000 characters.',
  },
  {
    question: 'Do URLs and emojis count differently?',
    answer:
      'On Twitter/X, URLs are shortened to 23 characters regardless of their actual length. Emojis typically count as 2 characters on most platforms due to Unicode encoding. This tool accounts for these differences and gives you an accurate count.',
  },
  {
    question: 'Can I check the character count for multiple platforms at once?',
    answer:
      'Yes. As you type, the tool displays the character count and remaining characters for all supported platforms simultaneously, so you can craft your message to fit multiple platforms at the same time.',
  },
]

export default function SocialMediaCounterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Social Media Character Counter', url: 'https://toolcase.cc/social-media-counter' },
        ]}
      />
      <ToolSchema
        name="Social Media Character Counter"
        description="Count characters for Twitter/X, Instagram, Facebook, LinkedIn, and YouTube. Stay within platform limits and optimise your posts before publishing."
        url="https://toolcase.cc/social-media-counter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Social Media Character Counter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Social Media Character Counter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Write your post and see real-time character counts for every major social platform.
      </p>

      <SocialMediaCounter />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Type or paste your text into the input area. The tool will instantly show the character count alongside the
          limits for Twitter/X, Instagram, Facebook, LinkedIn, and YouTube. A progress bar indicates how close you are
          to each platform&apos;s limit. If you exceed a limit, it will be highlighted in red so you can trim your text
          before posting. Use this tool to craft the perfect message that works across all your social channels.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="social-media-counter" locale="en" />
    </div>
    </>
  )
}
