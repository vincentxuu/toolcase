import { Metadata } from 'next'
import OpenGraphPreview from '@/components/tools/OpenGraphPreview'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Open Graph Preview - Free Online Tool | toolcase',
  description:
    'Preview how your website will appear when shared on Facebook, Twitter, LinkedIn, and other social platforms. Validate Open Graph and Twitter Card tags instantly.',
  alternates: {
    canonical: 'https://toolcase.cc/open-graph-preview',
    languages: {
      en: 'https://toolcase.cc/open-graph-preview',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/open-graph-preview',
    },
  },
}

const faqs = [
  {
    question: 'What is the Open Graph protocol?',
    answer:
      'Open Graph is a protocol created by Facebook that allows web pages to control how they appear when shared on social media. By adding Open Graph meta tags (og:title, og:description, og:image, etc.) to your HTML, you determine the title, description, and image that appear in link previews.',
  },
  {
    question: 'How do I use this preview tool?',
    answer:
      'Enter a URL and the tool will fetch the Open Graph and Twitter Card meta tags from that page. It then renders a visual preview showing exactly how the link will look when shared on platforms like Facebook, Twitter, and LinkedIn.',
  },
  {
    question: 'Why does my preview look wrong or show missing data?',
    answer:
      'If the preview is missing a title, description, or image, it means those Open Graph meta tags are either absent or incorrectly configured on the target page. Check that your HTML includes og:title, og:description, and og:image tags in the <head> section.',
  },
]

export default function OpenGraphPreviewPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Open Graph Preview', url: 'https://toolcase.cc/open-graph-preview' },
        ]}
      />
      <ToolSchema
        name="Open Graph Preview"
        description="Preview how your website will appear when shared on Facebook, Twitter, LinkedIn, and other social platforms. Validate Open Graph and Twitter Card tags instantly."
        url="https://toolcase.cc/open-graph-preview"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Open Graph Preview' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Open Graph Preview</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        See how your links will appear on social media before you share them.
      </p>

      <OpenGraphPreview />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter the URL of the web page you want to preview and click &quot;Fetch&quot;. The tool will retrieve the
          Open Graph and Twitter Card meta tags and display a visual preview for Facebook, Twitter, and LinkedIn. Review
          the results to ensure your title, description, and image look correct. If something is missing, update the
          meta tags on your website and re-check with this tool.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="open-graph-preview" locale="en" />
    </div>
    </>
  )
}
