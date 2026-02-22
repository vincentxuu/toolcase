import { Metadata } from 'next'
import HashGenerator from '@/components/tools/HashGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '雜湊產生器 - 免費線上工具 | toolcase',
  description: '產生 MD5、SHA-1、SHA-256、SHA-512 等雜湊值。免費線上雜湊產生器，支援文字和檔案。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/hash-generator', languages: { en: 'https://toolcase.cc/hash-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/hash-generator' } },
}

const faqs = [
  { question: '什麼是雜湊（Hash）？', answer: '雜湊是一種將任意長度的資料轉換為固定長度字串的演算法。相同的輸入一定會產生相同的雜湊值，但無法從雜湊值反推出原始資料。常用於密碼儲存、資料完整性驗證和數位簽章。' },
  { question: 'MD5 和 SHA-256 有什麼不同？', answer: 'MD5 產生 128 位元（32 個十六進位字元）的雜湊值，運算速度快但已被發現有碰撞漏洞，不再適合安全用途。SHA-256 產生 256 位元（64 個十六進位字元）的雜湊值，安全性更高，是目前推薦使用的雜湊演算法。' },
  { question: '雜湊可以被「解密」嗎？', answer: '雜湊是單向函數，理論上無法被反向「解密」。但攻擊者可以使用彩虹表（預先計算的雜湊對照表）或暴力破解來嘗試找到原始資料。因此密碼儲存時通常會加上鹽值（salt）來增加安全性。' },
]

export default function HashGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '雜湊產生器', url: 'https://toolcase.cc/zh-tw/hash-generator' },
        ]}
      />
      <ToolSchema
        name="雜湊產生器"
        description="產生 MD5、SHA-1、SHA-256、SHA-512 等雜湊值。免費線上雜湊產生器，支援文字和檔案。"
        url="https://toolcase.cc/zh-tw/hash-generator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '雜湊產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>雜湊產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生 MD5、SHA-1、SHA-256、SHA-512 雜湊值。</p>
      <HashGenerator labels={{ input: '輸入', uploadFile: '上傳檔案', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入或貼上文字，工具會即時產生多種雜湊演算法的結果。您也可以上傳檔案來計算檔案的雜湊值。點擊複製按鈕可快速複製任一雜湊值。所有計算都在瀏覽器中完成，您的資料不會被傳送至伺服器。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="hash-generator" locale="zh-tw" />
    </div>
    </>
  )
}
