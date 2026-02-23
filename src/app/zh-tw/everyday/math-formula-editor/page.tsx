import { Metadata } from 'next'
import MathFormulaEditor from '@/components/tools/MathFormulaEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '數學公式編輯器 - 創建和渲染數學公式 | toolcase',
  description: '使用 KaTeX 創建和渲染精美的數學公式。支援 LaTeX 語法、分數、積分、矩陣、希臘字母等。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/math-formula-editor', languages: { en: 'https://toolcase.cc/math-formula-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/math-formula-editor' } },
}

const faqs = [
  { question: '什麼是 KaTeX？', answer: 'KaTeX 是一個快速、易用的 JavaScript 函式庫，用於在網頁上渲染 TeX 數學公式。它支援廣泛的 LaTeX 數學符號，並能在瀏覽器中快速且美觀地渲染公式。' },
  { question: '支援哪些 LaTeX 語法？', answer: '編輯器支援大多數常用的 LaTeX 數學指令，包括分數（\\frac）、平方根（\\sqrt）、積分（\\int）、求和（\\sum）、矩陣（\\begin{matrix}）、希臘字母（\\alpha、\\beta）、上下標以及許多數學符號和運算子。' },
  { question: '行內模式和顯示模式有什麼區別？', answer: '行內模式以緊湊的樣式渲染公式，適合嵌入文字中；顯示模式則將公式置中並以較大、更顯著的樣式渲染，適合獨立的方程式。' },
  { question: '我可以複製 LaTeX 程式碼嗎？', answer: '可以！點擊「複製 LaTeX」按鈕即可將 LaTeX 原始碼複製到剪貼簿。然後您可以將其貼到其他支援 LaTeX 數學符號的應用程式中。' },
]

export default function MathFormulaEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '數學公式編輯器', url: 'https://toolcase.cc/zh-tw/math-formula-editor' },
        ]}
      />
      <ToolSchema
        name="數學公式編輯器"
        description="使用 KaTeX 創建和渲染精美的數學公式。支援 LaTeX 語法、分數、積分、矩陣、希臘字母等。"
        url="https://toolcase.cc/zh-tw/math-formula-editor"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '數學公式編輯器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>數學公式編輯器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用 LaTeX 語法與 KaTeX 創建和渲染數學公式。</p>
      <MathFormulaEditor
        labels={{
          title: '數學公式編輯器',
          input: 'LaTeX 輸入',
          inputPlaceholder: '輸入 LaTeX 公式（例如：x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}）',
          mode: '顯示模式',
          inline: '行內',
          display: '顯示',
          output: '渲染輸出',
          examples: '範例',
          exampleFraction: '分數',
          exampleSqrt: '平方根',
          exampleSum: '求和',
          exampleIntegral: '積分',
          exampleMatrix: '矩陣',
          exampleGreek: '希臘字母',
          copyLatex: '複製 LaTeX',
          clear: '清除',
          error: '錯誤',
          note: '注意',
          noteText: '此編輯器使用 KaTeX 渲染數學公式。在輸入欄位中輸入 LaTeX 語法。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在輸入欄位中輸入 LaTeX 數學符號，即可即時看到渲染的公式。可選擇行內模式（緊湊，適合嵌入文字）或顯示模式（置中，較大）。點擊範例公式可快速插入。使用標準 LaTeX 指令，如 \frac 表示分數、\sqrt 表示平方根、\int 表示積分，以及希臘字母指令如 \alpha、\beta、\gamma。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="math-formula-editor" locale="zh-tw" />
    </div>
    </>
  )
}
