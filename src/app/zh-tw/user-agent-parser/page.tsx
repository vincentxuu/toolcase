import { Metadata } from 'next'
import UserAgentParser from '@/components/tools/UserAgentParser'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'User-Agent 解析器 - 免費線上工具 | toolcase',
  description: '即時解析和分析 User-Agent 字串。從任何 User-Agent 中偵測瀏覽器、作業系統、裝置類型和渲染引擎。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/user-agent-parser',
    languages: {
      en: 'https://toolcase.cc/user-agent-parser',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/user-agent-parser',
    },
  },
}

const faqs = [
  {
    question: '什麼是 User-Agent 字串？',
    answer: 'User-Agent 字串是你的瀏覽器在每次網頁請求時傳送的文字識別碼。它包含瀏覽器、作業系統、裝置和渲染引擎的資訊。網頁伺服器用它來為不同裝置和瀏覽器提供適當的內容。',
  },
  {
    question: '解析的準確度如何？',
    answer: '此解析器使用正規表達式來識別最常見的瀏覽器、作業系統和裝置。它能準確偵測主要瀏覽器（Chrome、Firefox、Safari、Edge）、作業系統（Windows、macOS、iOS、Android、Linux），並區分桌面、手機和平板裝置。',
  },
  {
    question: '我的資料安全嗎？',
    answer: '所有解析都在你的瀏覽器中完成。你的 User-Agent 字串不會離開你的裝置——沒有任何資料會被傳送到伺服器。',
  },
]

export default function UserAgentParserPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>User-Agent 解析器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        分析 User-Agent 字串，識別瀏覽器、作業系統、裝置類型和渲染引擎。已自動偵測你目前的瀏覽器。
      </p>

      <UserAgentParser
        labels={{
          parse: '解析',
          clear: '清除',
          copy: '複製',
          copied: '已複製！',
          placeholder: '在此貼上 User-Agent 字串...',
          useCurrentBrowser: '使用目前瀏覽器',
          browser: '瀏覽器',
          os: '作業系統',
          device: '裝置類型',
          engine: '渲染引擎',
          name: '名稱',
          version: '版本',
          type: '類型',
          unknown: '未知',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          打開頁面時，你目前瀏覽器的 User-Agent 會自動被偵測和解析。若要分析其他 User-Agent 字串，
          將它貼到文字欄位並點擊「解析」。工具會顯示偵測到的瀏覽器名稱和版本、作業系統、裝置類型和渲染引擎。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="user-agent-parser" locale="zh-tw" />
    </div>
  )
}
