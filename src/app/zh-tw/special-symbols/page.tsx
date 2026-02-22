import { Metadata } from 'next'
import SpecialSymbols from '@/components/tools/SpecialSymbols'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '特殊符號表 - 一鍵複製各種符號 | toolcase',
  description: '箭頭、勾叉、愛心、星星、數學符號、貨幣符號等，點擊即可複製貼上。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/special-symbols', languages: { en: 'https://toolcase.cc/special-symbols', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/special-symbols' } },
}

const faqs = [
  { question: '如何使用特殊符號？', answer: '只要點擊任何符號即可自動複製到剪貼簿，然後在需要的地方按 Ctrl+V (或 Cmd+V) 貼上即可。' },
  { question: '這些符號可以在哪裡使用？', answer: '這些 Unicode 符號可以在大多數平台使用，包括社群媒體、Email、Word 文件、LINE、Facebook 等。' },
  { question: '手機也可以使用嗎？', answer: '可以！點擊符號後會自動複製，在任何 App 中長按貼上即可。' },
]

export default function SpecialSymbolsPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>特殊符號表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>各種常用特殊符號，點擊即可複製。箭頭、勾叉、愛心、星星、數學符號等一應俱全。</p>
      <SpecialSymbols />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="special-symbols" locale="zh-tw" />
    </div>
  )
}
