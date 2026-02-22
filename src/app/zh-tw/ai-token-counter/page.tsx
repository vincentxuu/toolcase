import { Metadata } from 'next'
import AiTokenCounter from '@/components/tools/AiTokenCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

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
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'AI Token 計算器與成本估算', url: 'https://toolcase.cc/zh-tw/ai-token-counter' },
        ]}
      />
      <ToolSchema
        name="AI Token 計算器與成本估算"
        description="計算 Token 數量並估算 GPT-4o、Claude、Gemini 等 AI 模型的 API 費用。免費線上 AI Token 計算器。"
        url="https://toolcase.cc/zh-tw/ai-token-counter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'AI Token 計算器與成本估算' },
          ]}
        />
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
        inputRate: '輸入費率 (每百萬)',
        outputRate: '輸出費率 (每百萬)',
        inputCost: '輸入費用',
        outputCost: '輸出費用',
        estimatedTokens: '估算 Token',
        costEstimate: '費用估算',
        disclaimer: 'Token 數量為估算值，實際數量取決於各模型的分詞器。',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          在輸入框中貼上或輸入文字，工具會即時計算字元數、字數、行數及估算的 Token 數量，並顯示 16 個熱門 AI 模型的 API 費用估算，包括：
        </p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li><strong>OpenAI</strong>：GPT-5.2、GPT-5、GPT-5 Nano、GPT-4o、GPT-4o-mini、o1、o1-mini</li>
          <li><strong>Anthropic</strong>：Claude Opus 4.6、Claude Sonnet 4.6/4.5/3.5、Claude Haiku 4.5</li>
          <li><strong>Google</strong>：Gemini 3.1 Pro、Gemini 3 Flash、Gemini 2.5 Pro</li>
          <li><strong>其他</strong>：DeepSeek V3</li>
        </ul>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          表格顯示每個模型的標準費率（每百萬 tokens）以及根據您輸入的文字計算出的實際費用。在呼叫 API 前使用此工具預估費用，選擇最適合您需求的模型。
        </p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>定價資料來源</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
          所有模型定價均來自官方 API 文檔（更新於 2026 年 2 月）：
        </p>
        <ul style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, paddingLeft: '1.5rem' }}>
          <li><a href="https://platform.openai.com/docs/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>OpenAI API 定價</a></li>
          <li><a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Claude API 定價</a></li>
          <li><a href="https://ai.google.dev/gemini-api/docs/pricing" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Gemini API 定價</a></li>
          <li><a href="https://api-docs.deepseek.com/quick_start/pricing-details-usd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>DeepSeek API 定價</a></li>
        </ul>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="ai-token-counter" locale="zh-tw" />
    </div>
    </>
  )
}
