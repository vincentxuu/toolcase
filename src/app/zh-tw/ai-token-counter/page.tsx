import { Metadata } from 'next'
import AiTokenCounter from '@/components/tools/AiTokenCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'AI Token 計算器與成本估算 - 免費線上工具 | toolcase',
  description: '計算 Token 數量並估算 GPT-4o、Claude、Gemini 等 AI 模型的 API 費用。免費線上 AI Token 計算器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/ai-token-counter', languages: { en: 'https://toolcase.cc/ai-token-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ai-token-counter' } },
}

const faqs = [
  { question: 'Token 是如何估算的？', answer: 'Token 的估算方式是根據文字內容進行分析。英文（ASCII）文字大約每 4 個字元等於 1 個 Token，中日韓（CJK）文字大約每 1.5 個字元等於 1 個 Token。實際的 Token 數量取決於各模型使用的分詞器。' },
  { question: '費用估算準確嗎？', answer: '費用估算是根據各模型的官方公開定價計算的。由於每個模型使用不同的分詞器，Token 數量僅為近似值。若需要精確的費用，請使用各 API 供應商提供的官方分詞器。' },
  { question: '輸入費用和輸出費用有什麼不同？', answer: '輸入費用是您傳送給模型的文字（提示詞）所需的費用。輸出費用是模型生成的回覆文字所需的費用。輸出 Token 的費用通常比輸入 Token 更高。' },
]

export default function AiTokenCounterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>AI Token 計算器與成本估算</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>估算熱門 AI 模型的 Token 數量及 API 費用。</p>
      <AiTokenCounter labels={{
        title: 'AI Token 計算器與成本估算',
        pasteText: '在此貼上或輸入文字...',
        characters: '字元數',
        words: '字數',
        tokens: 'Token 數',
        lines: '行數',
        model: '模型',
        inputCost: '輸入費用',
        outputCost: '輸出費用',
        estimatedTokens: '估算 Token',
        costEstimate: '費用估算',
        disclaimer: 'Token 數量為估算值，實際數量取決於各模型的分詞器。',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中貼上或輸入文字，工具會即時計算字元數、字數、行數及估算的 Token 數量，並顯示 GPT-4o、Claude Sonnet 4、Claude Opus 4、Gemini 2.0 Flash 等熱門 AI 模型的 API 費用估算。在呼叫 API 前使用此工具預估費用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="ai-token-counter" locale="zh-tw" />
    </div>
  )
}
