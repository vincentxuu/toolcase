import { Metadata } from 'next'
import EmojiSearch from '@/components/tools/EmojiSearch'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '表情符號搜尋 - 免費線上工具 | toolcase',
  description: '快速搜尋並複製表情符號。輸入關鍵字即可找到想要的 Emoji，一鍵複製到剪貼簿。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/emoji-search', languages: { en: 'https://toolcase.cc/emoji-search', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/emoji-search' } },
}

const faqs = [
  { question: '如何搜尋表情符號？', answer: '在搜尋框中輸入中文或英文關鍵字，例如「笑」、「heart」或「太陽」，工具會即時篩選出相關的表情符號供您選擇。' },
  { question: '怎麼複製表情符號？', answer: '直接點擊想要的表情符號，它就會自動複製到剪貼簿。您可以在任何應用程式中貼上使用，包括 Line、Facebook、Instagram 等。' },
  { question: '表情符號在不同裝置上會顯示不同嗎？', answer: '是的，表情符號的外觀會因作業系統和裝置而有所不同。例如 Apple、Google、Microsoft 各自有不同的設計風格，但表達的意思是相同的。' },
]

export default function EmojiSearchPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>表情符號搜尋</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速搜尋並一鍵複製表情符號。</p>
      <EmojiSearch labels={{ search: '搜尋', searchPlaceholder: '搜尋表情符號...', recentlyUsed: '最近使用', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在搜尋框中輸入關鍵字來尋找表情符號，點擊即可複製到剪貼簿。最近使用過的表情符號會顯示在上方，方便您快速存取常用的 Emoji。適合在社群媒體貼文、訊息或任何需要表情符號的地方使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="emoji-search" locale="zh-tw" />
    </div>
  )
}
