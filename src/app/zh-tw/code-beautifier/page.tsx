import { Metadata } from 'next'
import CodeBeautifier from '@/components/tools/CodeBeautifier'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS 美化工具 - 免費線上工具 | toolcase',
  description: '即時美化和格式化 HTML、CSS 和 JavaScript 程式碼。為壓縮或雜亂的程式碼加上適當的縮排和格式。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/code-beautifier',
    languages: {
      en: 'https://toolcase.cc/code-beautifier',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/code-beautifier',
    },
  },
}

const faqs = [
  {
    question: '程式碼美化工具有什麼作用？',
    answer: '程式碼美化工具會將壓縮或格式不佳的程式碼重新排版，加上適當的縮排、換行和空格。這讓程式碼更容易閱讀、理解和除錯。',
  },
  {
    question: '美化會改變程式碼的功能嗎？',
    answer: '不會。美化只改變格式（空白和縮排），程式碼的實際功能完全不變。',
  },
  {
    question: '我的程式碼安全嗎？',
    answer: '所有處理都在你的瀏覽器中完成。你的程式碼不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function CodeBeautifierPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML / CSS / JS 美化工具</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在下方貼上你的壓縮或雜亂程式碼，即時美化並加上適當的縮排和格式。
      </p>

      <CodeBeautifier
        labels={{
          beautify: '美化',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          input: '在此貼上你的程式碼...',
          output: '美化後的結果會顯示在這裡...',
          html: 'HTML',
          css: 'CSS',
          javascript: 'JavaScript',
          indentSize: '縮排大小',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇語言分頁（HTML、CSS 或 JavaScript），將壓縮或雜亂的程式碼貼到左側面板，然後點擊「美化」。
          工具會用適當的縮排和換行重新格式化你的程式碼。你可以使用下拉選單選擇 2 或 4 個空格的縮排。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="code-beautifier" locale="zh-tw" />
    </div>
  )
}
