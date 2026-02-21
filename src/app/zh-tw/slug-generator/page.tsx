import { Metadata } from 'next'
import SlugGenerator from '@/components/tools/SlugGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'Slug 產生器 - 免費線上工具 | toolcase',
  description: '將文字轉換為適合網址的 slug。可自訂分隔符號、大小寫及長度限制。免費線上 slug 產生器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/slug-generator', languages: { en: 'https://toolcase.cc/slug-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/slug-generator' } },
}

const faqs = [
  { question: '什麼是 URL slug？', answer: 'URL slug 是網址中用來識別特定頁面的部分，以人類可讀的形式呈現。例如在「example.com/my-blog-post」中，slug 就是「my-blog-post」。好的 slug 應使用小寫字母、以連字號分隔單詞，且僅包含字母、數字和分隔符號。它能改善 SEO 並讓網址更容易閱讀。' },
  { question: 'Slug 對 SEO 有什麼影響？', answer: '搜尋引擎會將 URL slug 作為理解頁面內容的信號之一。描述性的 slug 如「/best-running-shoes」能讓使用者和搜尋引擎都了解頁面主題，提升搜尋結果的點擊率。簡短且包含關鍵字的 slug 通常表現較好。' },
  { question: 'Slug 應該使用連字號還是底線？', answer: '建議使用連字號（-）作為 slug 的分隔符號。Google 將連字號視為單詞分隔符，因此「my-page」會被解讀為「my page」。底線（_）則被視為單詞連接符，「my_page」會被解讀為「mypage」。為了最佳 SEO 效果，請一律使用連字號來分隔單詞。' },
]

export default function SlugGeneratorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Slug 產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將任何文字轉換為乾淨、適合網址使用的 slug。</p>
      <SlugGenerator labels={{
        inputPlaceholder: '輸入文字以產生 slug...',
        separator: '分隔符號',
        lowercase: '小寫',
        trim: '去除首尾分隔符',
        maxLength: '最大長度',
        noLimit: '無限制',
        result: '結果',
        copy: '複製',
        copied: '已複製！',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入或貼上文字，slug 會即時產生。選擇你偏好的分隔符號（連字號或底線）、切換小寫轉換，並設定選用的最大長度。產生的 slug 會自動去除重音符號、移除特殊字元，並合併連續的分隔符號。點擊複製按鈕可複製結果。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="slug-generator" locale="zh-tw" />
    </div>
  )
}
