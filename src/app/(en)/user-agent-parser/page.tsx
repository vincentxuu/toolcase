import { Metadata } from 'next'
import UserAgentParser from '@/components/tools/UserAgentParser'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'User-Agent Parser - Free Online Tool | toolcase',
  description:
    'Parse and analyze user-agent strings instantly. Detect browser, operating system, device type, and rendering engine from any user-agent.',
  alternates: {
    canonical: 'https://toolcase.cc/user-agent-parser',
    languages: {
      en: 'https://toolcase.cc/user-agent-parser',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/user-agent-parser',
    },
  },
}

const faqs = [
  {
    question: 'What is a user-agent string?',
    answer:
      'A user-agent string is a text identifier that your browser sends with every web request. It contains information about your browser, operating system, device, and rendering engine. Web servers use it to serve appropriate content for different devices and browsers.',
  },
  {
    question: 'How accurate is the parsing?',
    answer:
      'The parser uses regex patterns to identify the most common browsers, operating systems, and devices. It accurately detects major browsers (Chrome, Firefox, Safari, Edge), operating systems (Windows, macOS, iOS, Android, Linux), and distinguishes between desktop, mobile, and tablet devices.',
  },
  {
    question: 'Is my data safe?',
    answer:
      'All parsing happens directly in your browser. Your user-agent string never leaves your device — nothing is sent to any server.',
  },
]

export default function UserAgentParserPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'User', url: 'https://toolcase.cc/user-agent-parser' },
        ]}
      />
      <ToolSchema
        name="User"
        description="Parse and analyze user-agent strings instantly. Detect browser, operating system, device type, and rendering engine from any user-agent."
        url="https://toolcase.cc/user-agent-parser"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'User' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>User-Agent Parser</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Analyze user-agent strings to identify browser, OS, device type, and rendering engine. Your current browser is auto-detected.
      </p>

      <UserAgentParser />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Your current browser&apos;s user-agent is automatically detected and parsed when you open the page. To analyze
          a different user-agent string, paste it into the text field and click &quot;Parse&quot;. The tool will display
          the detected browser name and version, operating system, device type, and rendering engine.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="user-agent-parser" locale="en" />
    </div>
    </>
  )
}
