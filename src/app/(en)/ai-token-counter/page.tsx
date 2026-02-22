import { Metadata } from 'next'
import AiTokenCounter from '@/components/tools/AiTokenCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

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
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Token Counter & Cost Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Estimate token counts and API costs for popular AI models.</p>
      <AiTokenCounter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Paste or type your text into the input area. The tool instantly counts characters, words, lines, and estimated tokens. It also calculates the approximate API cost for popular AI models including GPT-4o, Claude Sonnet 4, Claude Opus 4, and Gemini 2.0 Flash. Use it to estimate costs before making API calls.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="ai-token-counter" locale="en" />
    </div>
  )
}
