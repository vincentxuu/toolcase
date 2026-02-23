import { Metadata } from 'next'
import CodeMinifier from '@/components/tools/CodeMinifier'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'HTML/CSS/JS 壓縮工具 - 免費線上工具 | toolcase',
  description: '即時壓縮 HTML、CSS 和 JavaScript 程式碼。移除註解、空白和多餘字元以減少檔案大小。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/dev/code-minifier',
    languages: {
      en: 'https://toolcase.cc/dev/code-minifier',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/code-minifier',
    },
  },
}

const faqs = [
  {
    question: '壓縮程式碼有什麼作用？',
    answer: '壓縮會移除程式碼中不必要的字元，例如空白、換行和註解，但不會改變其功能。這能減少檔案大小，加快下載速度並提升網站效能。',
  },
  {
    question: '壓縮會導致程式碼失效嗎？',
    answer: '基本的壓縮（移除空白和註解）通常是安全的。此工具專注於安全的空白和註解移除，不會進行變數重新命名等進階 JavaScript 壓縮。',
  },
  {
    question: '我的程式碼安全嗎？',
    answer: '所有處理都在你的瀏覽器中完成。你的程式碼不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function CodeMinifierPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'HTML/CSS/JS 壓縮工具', url: 'https://toolcase.cc/zh-tw/dev/code-minifier' },
        ]}
      />
      <ToolSchema
        name="HTML/CSS/JS 壓縮工具"
        description="即時壓縮 HTML、CSS 和 JavaScript 程式碼。移除註解、空白和多餘字元以減少檔案大小。"
        url="https://toolcase.cc/zh-tw/dev/code-minifier"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'HTML/CSS/JS 壓縮工具' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTML / CSS / JS 壓縮工具</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        在下方貼上你的 HTML、CSS 或 JavaScript 程式碼，即時壓縮以減少檔案大小。
      </p>

      <CodeMinifier
        labels={{
          minify: '壓縮',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          input: '在此貼上你的程式碼...',
          output: '壓縮後的結果會顯示在這裡...',
          html: 'HTML',
          css: 'CSS',
          javascript: 'JavaScript',
          originalSize: '原始大小',
          minifiedSize: '壓縮後大小',
          saved: '節省',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇語言分頁（HTML、CSS 或 JavaScript），將程式碼貼到左側面板，然後點擊「壓縮」。
          工具會移除註解、多餘空白和不必要的字元。壓縮後的結果會顯示在右側面板，並附上大小比較，顯示節省了多少空間。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="code-minifier" locale="zh-tw" />
    </div>
    </>
  )
}
