import { Metadata } from 'next'
import MetaTagGenerator from '@/components/tools/MetaTagGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Meta Tag Generator - Free Online Tool | toolcase',
  description:
    'Generate HTML meta tags for SEO, social sharing, and search engine optimisation. Preview how your page will appear in search results and on social media.',
  alternates: {
    canonical: 'https://toolcase.cc/meta-tag-generator',
    languages: {
      en: 'https://toolcase.cc/meta-tag-generator',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/meta-tag-generator',
    },
  },
}

const faqs = [
  {
    question: 'What are meta tags and why do they matter?',
    answer:
      'Meta tags are HTML elements that provide metadata about a web page. Search engines use them to understand the content and purpose of a page. Well-crafted meta tags improve search engine rankings, click-through rates, and how your page appears when shared on social media.',
  },
  {
    question: 'Which meta tags does this tool generate?',
    answer:
      'The tool generates essential meta tags including title, description, keywords, viewport, robots directives, Open Graph tags for Facebook and LinkedIn, and Twitter Card tags. You can customise each field and see a live preview of the generated HTML.',
  },
  {
    question: 'How do I add the generated meta tags to my website?',
    answer:
      'Copy the generated HTML code and paste it inside the <head> section of your web page. If you use a CMS like WordPress, you can paste the tags into the custom header code area of your theme or SEO plugin settings.',
  },
]

export default function MetaTagGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Meta Tag Generator', url: 'https://toolcase.cc/meta-tag-generator' },
        ]}
      />
      <ToolSchema
        name="Meta Tag Generator"
        description="Generate HTML meta tags for SEO, social sharing, and search engine optimisation. Preview how your page will appear in search results and on social media."
        url="https://toolcase.cc/meta-tag-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Meta Tag Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Meta Tag Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Generate SEO-friendly HTML meta tags for your web pages in seconds.
      </p>

      <MetaTagGenerator />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Fill in the form fields with your page title, description, keywords, and other details. The tool will
          generate the corresponding HTML meta tags in real time as you type. Use the preview section to see how your
          page will look in Google search results and on social media. When you are satisfied, click &quot;Copy
          Code&quot; to copy the HTML to your clipboard and paste it into your website&apos;s &lt;head&gt; section.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="meta-tag-generator" locale="en" />
    </div>
    </>
  )
}
