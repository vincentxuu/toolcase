import { Metadata } from 'next'
import UtmBuilder from '@/components/tools/UtmBuilder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'UTM Builder - Free Online Tool | toolcase',
  description:
    'Build UTM-tagged URLs for Google Analytics campaign tracking. Generate properly formatted links with source, medium, campaign, term, and content parameters.',
  alternates: {
    canonical: 'https://toolcase.cc/utm-builder',
    languages: {
      en: 'https://toolcase.cc/utm-builder',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/utm-builder',
    },
  },
}

const faqs = [
  {
    question: 'What are UTM parameters?',
    answer:
      'UTM (Urchin Tracking Module) parameters are tags added to the end of a URL that help analytics tools like Google Analytics track where your traffic comes from. The five standard parameters are utm_source, utm_medium, utm_campaign, utm_term, and utm_content.',
  },
  {
    question: 'Which UTM parameters are required?',
    answer:
      'Google recommends at least utm_source, utm_medium, and utm_campaign. The utm_term and utm_content parameters are optional and typically used for paid search keyword tracking and A/B testing of ad creatives respectively.',
  },
  {
    question: 'Will UTM parameters affect my SEO or page behaviour?',
    answer:
      'UTM parameters do not affect how your page functions or how it is indexed by search engines if you have proper canonical tags. However, it is good practice to use them consistently and avoid using UTM tags on internal links, as that can break session attribution in analytics.',
  },
]

export default function UtmBuilderPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>UTM Builder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate UTM-tagged URLs to track your marketing campaigns in Google Analytics.
      </p>

      <UtmBuilder />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter your destination URL in the base URL field. Fill in the campaign source (e.g., &quot;google&quot;,
          &quot;newsletter&quot;), medium (e.g., &quot;cpc&quot;, &quot;email&quot;), and campaign name. Optionally add
          term and content parameters for more granular tracking. The tool generates the complete UTM-tagged URL in real
          time. Click &quot;Copy&quot; to copy it to your clipboard, ready to use in your ads, emails, or social posts.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="utm-builder" locale="en" />
    </div>
  )
}
