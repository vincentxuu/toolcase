import { Metadata } from 'next'
import SlugGenerator from '@/components/tools/SlugGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Slug Generator - Free Online Tool | toolcase',
  description: 'Convert text to URL-friendly slugs. Free online slug generator with customizable separator, case, and length options.',
  alternates: { canonical: 'https://toolcase.cc/slug-generator', languages: { en: 'https://toolcase.cc/slug-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/slug-generator' } },
}

const faqs = [
  { question: 'What is a URL slug?', answer: 'A URL slug is the part of a web address that identifies a specific page in a human-readable form. For example, in "example.com/my-blog-post", the slug is "my-blog-post". Good slugs are lowercase, use hyphens to separate words, and contain only letters, numbers, and separators. They improve SEO and make URLs more readable.' },
  { question: 'Why are slugs important for SEO?', answer: 'Search engines use URL slugs as one of many signals to understand page content. A descriptive slug like "/best-running-shoes" tells both users and search engines what the page is about, improving click-through rates from search results. Short, keyword-rich slugs tend to perform better than long, generic ones.' },
  { question: 'Should I use hyphens or underscores in slugs?', answer: 'Hyphens (-) are the recommended separator for URL slugs. Google treats hyphens as word separators, meaning "my-page" is read as "my page". Underscores (_) are treated as word joiners, so "my_page" is read as "mypage". For best SEO results, always use hyphens to separate words in your URLs.' },
]

export default function SlugGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Slug Generator', url: 'https://toolcase.cc/slug-generator' },
        ]}
      />
      <ToolSchema
        name="Slug Generator"
        description="Convert text to URL-friendly slugs. Free online slug generator with customizable separator, case, and length options."
        url="https://toolcase.cc/slug-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Slug Generator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Slug Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert any text into a clean, URL-friendly slug.</p>
      <SlugGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Type or paste your text into the input field and the slug is generated instantly as you type. Choose your preferred separator (hyphen or underscore), toggle lowercase conversion, and set an optional maximum length. The generated slug strips accents, removes special characters, and collapses multiple separators. Click the copy button to copy the result.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="slug-generator" locale="en" />
    </div>
    </>
  )
}
