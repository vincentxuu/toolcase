import { Metadata } from 'next'
import TaiwanIdValidator from '@/components/tools/TaiwanIdValidator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '統一編號 / 身分證字號驗證器 - 免費線上工具 | toolcase',
  description: '線上驗證統一編號及身分證字號格式是否正確。免費工具，支援隨機產生有效號碼供測試使用。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/taiwan-id-validator', languages: { en: 'https://toolcase.cc/everyday/taiwan-id-validator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/taiwan-id-validator' } },
}

const faqs = [
  { question: '統一編號的驗證方式是什麼？', answer: '統一編號為 8 位數字，使用加權總和演算法驗證。每位數字分別乘以權重 [1,2,1,2,1,2,4,1]，乘積超過 9 的取各位數之和，最後總和必須能被 5 整除。' },
  { question: '身分證字號的驗證方式是什麼？', answer: '身分證字號由 1 個英文字母加 9 個數字組成。字母對應一個 2 位數代碼，再與後續數字進行加權總和運算。第二位數字代表性別：1 為男性，2 為女性，8 或 9 為新式格式。' },
  { question: '產生的號碼是真實的嗎？', answer: '不是。產生的號碼僅為通過格式驗證演算法的隨機數字，僅供測試及開發使用，不對應任何真實的個人或企業。' },
]

export default function TaiwanIdValidatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '統一編號 / 身分證字號驗證器', url: 'https://toolcase.cc/zh-tw/everyday/taiwan-id-validator' },
        ]}
      />
      <ToolSchema
        name="統一編號 / 身分證字號驗證器"
        description="線上驗證統一編號及身分證字號格式是否正確。免費工具，支援隨機產生有效號碼供測試使用。"
        url="https://toolcase.cc/zh-tw/everyday/taiwan-id-validator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '統一編號 / 身分證字號驗證器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>統一編號 / 身分證字號驗證器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>驗證統一編號及身分證字號的格式是否正確。</p>
      <TaiwanIdValidator labels={{
        businessId: '統一編號',
        nationalId: '身分證字號',
        validate: '驗證',
        valid: '格式正確',
        invalid: '格式錯誤',
        generate: '隨機產生',
        male: '男性',
        female: '女性',
        enterBusinessId: '輸入 8 位統一編號',
        enterNationalId: '輸入身分證字號（如 A123456789）',
        businessIdDesc: '驗證台灣統一編號（8 位數字）。',
        nationalIdDesc: '驗證台灣身分證字號（1 個英文字母 + 9 個數字）。',
        generator: '隨機產生器',
        disclaimer: '此工具僅供驗證格式正確性，不代表該號碼實際存在或已被使用。',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入統一編號（8 位數字）或身分證字號（1 個英文字母 + 9 個數字），點擊「驗證」按鈕即可檢查號碼格式是否正確。您也可以使用「隨機產生器」產生有效的測試號碼，方便開發測試使用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="taiwan-id-validator" locale="zh-tw" />
    </div>
    </>
  )
}
