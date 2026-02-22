import { Metadata } from 'next'
import RandomPicker from '@/components/tools/RandomPicker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '隨機抽選器 - 免費線上工具 | toolcase',
  description: '從自訂項目清單中隨機抽選。免費線上隨機抽選器，適合抽獎、決策和隨機分組。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/random-picker', languages: { en: 'https://toolcase.cc/random-picker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/random-picker' } },
}

const faqs = [
  { question: '隨機抽選器可以用在什麼場合？', answer: '隨機抽選器適用於各種需要隨機選擇的場合，例如：團隊分組、決定午餐吃什麼、抽獎活動、隨機點名、遊戲隊伍分配等。只要輸入選項清單即可使用。' },
  { question: '抽選結果是公平的嗎？', answer: '是的，本工具使用瀏覽器的加密安全隨機數字產生器，每個項目被選中的機率是相同的。所有抽選過程都在您的瀏覽器中執行，結果不會被傳送到任何伺服器。' },
  { question: '可以抽選多個項目嗎？', answer: '可以。您可以設定抽選數量來一次抽出多個項目。抽出的項目不會重複，適合需要從清單中選出多個結果的場合，如抽獎活動的多個獎項。' },
]

export default function RandomPickerPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '隨機抽選器', url: 'https://toolcase.cc/zh-tw/random-picker' },
        ]}
      />
      <ToolSchema
        name="隨機抽選器"
        description="從自訂項目清單中隨機抽選。免費線上隨機抽選器，適合抽獎、決策和隨機分組。"
        url="https://toolcase.cc/zh-tw/random-picker"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '隨機抽選器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>隨機抽選器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>從自訂清單中隨機抽選項目，快速做出決定。</p>
      <RandomPicker labels={{ items: '項目', itemsPlaceholder: '輸入項目，每行一個...', numberOfPicks: '抽選數量', pick: '抽選', result: '結果', history: '歷史紀錄', clearHistory: '清除紀錄' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入項目，每行一個。設定要抽選的數量，然後按下「抽選」按鈕。結果會即時顯示，歷史紀錄會保留之前的抽選結果供參考。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="random-picker" locale="zh-tw" />
    </div>
    </>
  )
}
