import { Metadata } from 'next'
import HtmlEntityEncoder from '@/components/tools/HtmlEntityEncoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'HTML 實體編碼/解碼器 - 免費線上工具 | toolcase',
  description: '線上編碼與解碼 HTML 實體。將特殊字元轉換為 HTML 實體，或將 HTML 實體還原為字元。支援具名與數值實體。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/html-entity-encoder', languages: { en: 'https://toolcase.cc/html-entity-encoder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/html-entity-encoder' } },
}

const faqs = [
  { question: '什麼是 HTML 實體？', answer: 'HTML 實體是用來表示在 HTML 中有特殊意義或不易輸入的字元的代碼。例如 < 用 &lt; 表示，& 用 &amp; 表示。實體分為具名實體（如 &amp;）和數值實體（如 &#38; 或 &#x26;）。使用實體可確保 HTML 正確顯示，並防止 XSS 攻擊。' },
  { question: '什麼時候需要編碼 HTML 實體？', answer: '當你在 HTML 中顯示使用者輸入的內容時，必須編碼 HTML 實體以防止 XSS（跨站指令碼）攻擊。當你需要將 HTML 程式碼以純文字形式顯示（如程式碼範例），或使用可能與 HTML 語法衝突的特殊字元如 <、>、& 和引號時，也需要進行編碼。' },
  { question: '具名實體和數值實體有什麼不同？', answer: '具名實體使用人類可讀的名稱（如 &amp; 代表 &，&lt; 代表 <），而數值實體使用 Unicode 碼位的十進位（&#38;）或十六進位（&#x26;）表示。具名實體較容易閱讀，但只有部分字元有具名版本；數值實體則可以表示任何 Unicode 字元。' },
]

export default function HtmlEntityEncoderPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML 實體編碼/解碼器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將特殊字元編碼為 HTML 實體，或將 HTML 實體解碼還原為字元。</p>
      <HtmlEntityEncoder labels={{
        input: '輸入文字或 HTML 實體...',
        output: '結果將顯示在此...',
        encode: '編碼',
        decode: '解碼',
        clear: '清除',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在左側文字框中輸入內容。點擊「編碼」將特殊字元轉換為 HTML 實體，或輸入 HTML 實體後點擊「解碼」將其還原為可讀字元。工具支援具名實體（如 &amp;amp;）和數值實體（如 &amp;#38;）。點擊複製按鈕可將結果複製到剪貼簿。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="html-entity-encoder" locale="zh-tw" />
    </div>
  )
}
