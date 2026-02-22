import { Metadata } from 'next'
import BloodTypePersonality from '@/components/tools/BloodTypePersonality'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '血型性格分析 - A/B/O/AB 型性格特質與配對 | toolcase',
  description: '選擇你的血型，查看性格特質、優缺點與配對分析。提供 A、B、O、AB 四大血型完整性格對照表。免費線上血型性格分析工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/blood-type-personality', languages: { en: 'https://toolcase.cc/blood-type-personality', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/blood-type-personality' } },
}

const faqs = [
  { question: '血型性格分析有科學根據嗎？', answer: '目前沒有充分的科學研究證實血型與性格之間有直接的因果關係。血型性格學說主要流行於日本、韓國和台灣等東亞國家，屬於流行文化的一部分，可作為趣味參考。' },
  { question: '四種血型的比例是多少？', answer: '在台灣，O 型約佔 44%、A 型約佔 26%、B 型約佔 23%、AB 型約佔 7%。不同國家和族群的血型分布比例各有差異。' },
  { question: '血型配對可靠嗎？', answer: '血型配對屬於民間說法，沒有科學證據支持。真正的感情和人際關係取決於個人的價值觀、溝通方式和相處模式，血型只是一個有趣的話題而已。' },
]

export default function BloodTypePersonalityPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>血型性格分析</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>選擇你的血型，查看性格特質、優缺點與配對分析。</p>
      <BloodTypePersonality />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="blood-type-personality" locale="zh-tw" />
    </div>
  )
}
