import { Metadata } from 'next'
import LatexEditor from '@/components/tools/LatexEditor'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'LaTeX 編輯器 - 撰寫和預覽數學表達式 | toolcase',
  description: '具有即時預覽的線上 LaTeX 編輯器。撰寫 LaTeX 程式碼並即時查看渲染的數學公式。內建快速符號和公式模板。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/latex-editor', languages: { en: 'https://toolcase.cc/latex-editor', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/latex-editor' } },
}

const faqs = [
  { question: '什麼是 LaTeX？', answer: 'LaTeX 是一種文件準備系統和標記語言，廣泛用於技術和科學文件。它在專業品質的數學公式和方程式排版方面表現出色。' },
  { question: '如何快速插入符號？', answer: '使用編輯器下方的「快速符號」區域。點擊任何符號按鈕即可將其插入編輯器中的游標位置。常用符號包括希臘字母（α、β、γ）、運算子（±、×、÷）和數學符號（∑、∫、√）。' },
  { question: '我可以使用公式模板嗎？', answer: '可以！編輯器提供常用的公式模板，如二次公式、畢氏定理、歐拉恆等式、極限、導數和泰勒級數。點擊任何模板即可將編輯器內容替換為該公式。' },
  { question: '行內模式和顯示模式有什麼區別？', answer: '行內模式以緊湊方式渲染公式，適合嵌入文字行中。顯示模式將公式置中並放大渲染，適合獨立的方程式。選擇適合您使用情況的模式。' },
]

export default function LatexEditorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'LaTeX 編輯器', url: 'https://toolcase.cc/zh-tw/latex-editor' },
        ]}
      />
      <ToolSchema
        name="LaTeX 編輯器"
        description="具有即時預覽的線上 LaTeX 編輯器。撰寫 LaTeX 程式碼並即時查看渲染的數學公式。內建快速符號和公式模板。"
        url="https://toolcase.cc/zh-tw/latex-editor"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'LaTeX 編輯器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>LaTeX 編輯器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>撰寫 LaTeX 程式碼並即時預覽渲染的數學公式。</p>
      <LatexEditor
        labels={{
          title: 'LaTeX 編輯器',
          editor: 'LaTeX 編輯器',
          editorPlaceholder: '在此輸入您的 LaTeX 程式碼...',
          preview: '即時預覽',
          mode: '顯示模式',
          inline: '行內',
          display: '顯示',
          copyLatex: '複製 LaTeX',
          clear: '清除',
          insertSymbol: '插入符號',
          symbols: '快速符號',
          templates: '公式模板',
          templateQuadratic: '二次公式',
          templatePythagorean: '畢氏定理',
          templateEuler: '歐拉恆等式',
          templateLimit: '極限',
          templateDerivative: '導數',
          templateSeries: '泰勒級數',
          error: '錯誤',
          note: '注意',
          noteText: '在編輯器中撰寫 LaTeX 程式碼，並即時查看渲染的數學公式。使用模板和符號進行快速插入。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          在左側編輯器面板中輸入 LaTeX 程式碼，即可在右側預覽面板中即時查看渲染輸出。點擊快速符號按鈕可在游標位置插入數學符號。使用公式模板可快速插入常用方程式，如二次公式或畢氏定理。選擇行內或顯示模式以獲得不同的渲染樣式。點擊「複製 LaTeX」可複製程式碼以在其他應用程式中使用。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="latex-editor" locale="zh-tw" />
    </div>
    </>
  )
}
