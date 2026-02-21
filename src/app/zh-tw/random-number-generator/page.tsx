import { Metadata } from 'next'
import RandomNumberGenerator from '@/components/tools/RandomNumberGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '隨機數字產生器 - 免費線上工具 | toolcase',
  description: '在指定範圍內產生隨機數字。支援多個數字、不重複和排序選項。免費線上隨機數字產生器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/random-number-generator', languages: { en: 'https://toolcase.cc/random-number-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/random-number-generator' } },
}

const faqs = [
  { question: '這個隨機數字是真正隨機的嗎？', answer: '本工具使用瀏覽器的加密安全偽隨機數字產生器（CSPRNG），產生的數字具有高度的隨機性和不可預測性。對於一般用途（如抽獎、遊戲、隨機選擇）完全足夠，但不建議用於加密金鑰等高安全需求。' },
  { question: '「不允許重複」選項有什麼用途？', answer: '當您關閉「允許重複」選項時，產生的數字不會重複。這適用於抽獎號碼、隨機排列等場合。注意：不允許重複時，產生的數量不能超過指定範圍內的整數個數。' },
  { question: '可以用來抽獎或抽籤嗎？', answer: '可以。設定適當的最小值和最大值範圍，關閉允許重複，即可產生不重複的隨機號碼。例如從 1-100 中抽出 5 個不重複號碼，非常適合作為簡單的抽獎工具。' },
]

export default function RandomNumberGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>隨機數字產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在指定範圍內產生隨機數字，支援多種選項。</p>
      <RandomNumberGenerator labels={{ min: '最小值', max: '最大值', quantity: '數量', allowDuplicates: '允許重複', sortResults: '排序結果', generate: '產生', result: '結果', results: '結果列表' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>設定最小值和最大值來定義範圍，輸入要產生的數量。可以選擇是否允許重複和是否排序結果，然後按下「產生」按鈕即可獲得隨機數字。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="random-number-generator" locale="zh-tw" />
    </div>
  )
}
