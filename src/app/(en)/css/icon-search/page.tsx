import { Metadata } from 'next'
import IconSearchClient from '@/components/tools/IconSearchClient'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Icon Search - Browse Lucide React Icons | toolcase',
  description: 'Search and copy Lucide React icons with live preview. Customize size, stroke width, and color. Copy icon name or JSX code. 1000+ icons available.',
  alternates: { canonical: 'https://toolcase.cc/css/icon-search', languages: { en: 'https://toolcase.cc/css/icon-search', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/icon-search' } },
}

const faqs = [
  { question: 'How do I use these icons in React?', answer: 'Install lucide-react with "npm install lucide-react", then import the icon by name. Click "Copy JSX" to get ready-to-use code with your custom size, stroke, and color settings.' },
  { question: 'Can I customize the icon appearance?', answer: 'Yes! Use the controls at the top to adjust size (12-96px), stroke width (1-4), and color. The preview updates in real-time, and the copied JSX includes your customizations.' },
  { question: 'How many icons are available?', answer: 'This tool provides access to the entire Lucide icon library, which includes over 1,000 high-quality, consistent icons. All icons are open-source and free to use.' },
  { question: 'What is the difference between copying name and JSX?', answer: 'Copying the name gives you just the icon component name (e.g., "Home") for manual import. Copying JSX gives you the full component tag with props already set based on your customizations.' },
]

export default function IconSearchPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Icon Search', url: 'https://toolcase.cc/css/icon-search' },
        ]}
      />
      <ToolSchema
        name="Icon Search"
        description="Search and copy Lucide React icons with live preview. Customize size, stroke width, and color. Copy icon name or JSX code. 1000+ icons available."
        url="https://toolcase.cc/css/icon-search"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Icon Search' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Icon Search</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Browse, customize, and copy Lucide React icons with live preview.</p>
      <IconSearchClient
        labels={{
          title: 'Icon Search',
          searchPlaceholder: 'Search icons...',
          iconName: 'Icon Name',
          copyName: 'Copy Name',
          copyJsx: 'Copy JSX',
          copySvg: 'Copy SVG',
          copied: 'Copied!',
          totalIcons: 'Total Icons',
          showingIcons: 'Showing',
          noResults: 'No icons found',
          size: 'Size',
          strokeWidth: 'Stroke Width',
          color: 'Color',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          Search for icons by name (e.g., &quot;home&quot;, &quot;user&quot;, &quot;settings&quot;). Adjust the size, stroke width, and color using the controls at the top. Click &quot;Copy Name&quot; to copy just the icon name, or &quot;Copy JSX&quot; to copy the full React component tag with your customizations.
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          To use in your React project, install lucide-react: <code style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>npm install lucide-react</code>. Then import and use the icon: <code style={{ backgroundColor: 'var(--color-bg-secondary)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>import {'{ Home }'} from &apos;lucide-react&apos;</code>
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="icon-search" locale="en" />
    </div>
    </>
  )
}
