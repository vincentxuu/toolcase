import { Metadata } from 'next'
import OnlineNotepad from '@/components/tools/OnlineNotepad'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '線上記事本 - 免費文字編輯器，自動儲存 | toolcase',
  description: '使用免費線上記事本即時撰寫和儲存筆記。具備自動儲存至本地端、字元與字數統計，以及下載為 .txt 檔案等功能。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/online-notepad', languages: { en: 'https://toolcase.cc/online-notepad', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/online-notepad' } },
}

const faqs = [
  { question: '關閉瀏覽器後筆記還會保存嗎？', answer: '會的！每次輸入時，筆記都會自動儲存到瀏覽器的本機儲存空間。重新開啟頁面時，筆記會完整保留。' },
  { question: '我的資料是否安全？', answer: '完全安全。所有筆記都儲存在您的瀏覽器本地端，不會傳送至任何伺服器，資料完全保留在您的裝置上。' },
  { question: '可以下載筆記嗎？', answer: '可以，點擊「下載 .txt」按鈕，即可隨時將筆記儲存為純文字檔案到電腦中。' },
]

export default function OnlineNotepadPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '線上記事本', url: 'https://toolcase.cc/zh-tw/online-notepad' },
        ]}
      />
      <ToolSchema
        name="線上記事本"
        description="使用免費線上記事本即時撰寫和儲存筆記。具備自動儲存至本地端、字元與字數統計，以及下載為 .txt 檔案等功能。"
        url="https://toolcase.cc/zh-tw/online-notepad"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '線上記事本' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>線上記事本</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>簡單、無干擾的記事本，具備自動儲存功能。筆記儲存在本地端，不會離開您的瀏覽器。</p>
      <OnlineNotepad labels={{ placeholder: '在此開始輸入筆記...', characters: '字元', words: '字數', clear: '清除', download: '下載 .txt', autoSaved: '已自動儲存' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在上方文字區域開始輸入即可。每次修改時，筆記都會自動儲存到瀏覽器中。使用字元和字數計數器來追蹤進度。完成後，可將筆記下載為 .txt 檔案，或清除記事本重新開始。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="online-notepad" locale="zh-tw" />
    </div>
    </>
  )
}
