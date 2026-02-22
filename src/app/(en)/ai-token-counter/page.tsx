import { Metadata } from 'next'
import AiTokenCounter from '@/components/tools/AiTokenCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'AI Token Counter & Cost Calculator - Free Online Tool | toolcase',
  description: 'Count tokens and estimate API costs for GPT-4o, Claude, Gemini and more. Free online AI token counter with cost calculator for all major LLM models.',
  alternates: { canonical: 'https://toolcase.cc/ai-token-counter', languages: { en: 'https://toolcase.cc/ai-token-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ai-token-counter' } },
}

const faqs = [
  { question: 'How are tokens estimated?', answer: 'Tokens are estimated by analyzing the text content. For ASCII (English) text, roughly 4 characters equal 1 token. For CJK (Chinese, Japanese, Korean) characters, roughly 1.5 characters equal 1 token. Actual token counts may vary depending on the specific tokenizer used by each model.' },
  { question: 'How accurate are the cost estimates?', answer: 'The cost estimates are based on the official published pricing for each model. The token count is an approximation since each model uses a different tokenizer. Use this tool for quick estimates — for exact costs, use the official tokenizer provided by each API provider.' },
  { question: 'What is the difference between input and output cost?', answer: 'Input cost is what you pay for the text you send to the model (your prompt). Output cost is what you pay for the text the model generates in response. Output tokens are typically more expensive than input tokens.' },
]

export default function AiTokenCounterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'AI Token Counter & Cost Calculator', url: 'https://toolcase.cc/ai-token-counter' },
        ]}
      />
      <ToolSchema
        name="AI Token Counter & Cost Calculator"
        description="Count tokens and estimate API costs for GPT-4o, Claude, Gemini and more. Free online AI token counter with cost calculator for all major LLM models."
        url="https://toolcase.cc/ai-token-counter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'AI Token Counter & Cost Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Token Counter & Cost Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Estimate token counts and API costs for popular AI models.</p>
      <AiTokenCounter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Paste or type your text into the input area. The tool instantly counts characters, words, lines, and estimated tokens, then displays API cost estimates for 16 popular AI models including:
        </p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li><strong>OpenAI</strong>: GPT-5.2, GPT-5, GPT-5 Nano, GPT-4o, GPT-4o-mini, o1, o1-mini</li>
          <li><strong>Anthropic</strong>: Claude Opus 4.6, Claude Sonnet 4.6/4.5/3.5, Claude Haiku 4.5</li>
          <li><strong>Google</strong>: Gemini 3.1 Pro, Gemini 3 Flash, Gemini 2.5 Pro</li>
          <li><strong>Others</strong>: DeepSeek V3</li>
        </ul>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          The table shows each model's standard rate (per 1M tokens) alongside the actual cost calculated from your input text. Use this tool to estimate costs before making API calls and choose the best model for your needs.
        </p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Pricing Data Sources</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          All model pricing is sourced from official API documentation (updated February 2026):
        </p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
          <li><a href="https://platform.openai.com/docs/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>OpenAI API Pricing</a></li>
          <li><a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Claude API Pricing</a></li>
          <li><a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Gemini API Pricing</a></li>
          <li><a href="https://api-docs.deepseek.com/quick_start/pricing-details-usd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>DeepSeek API Pricing</a></li>
        </ul>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="ai-token-counter" locale="en" />
    </div>
    </>
  )
}
