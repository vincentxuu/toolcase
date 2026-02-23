import { Metadata } from 'next'
import ZodiacSignLookup from '@/components/tools/ZodiacSignLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '星座查詢 - 輸入生日查星座與性格特質 | toolcase',
  description: '輸入生日立即查詢你的星座！提供十二星座日期範圍、元素屬性、性格特質完整對照表。免費線上星座查詢工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/zodiac-sign-lookup', languages: { en: 'https://toolcase.cc/everyday/zodiac-sign-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/zodiac-sign-lookup' } },
}

const faqs = [
  { question: '星座是怎麼劃分的？', answer: '西洋占星學依照太陽在黃道十二宮的位置，將一年分為十二個星座。每個星座對應約一個月的日期範圍，從牡羊座（3/21）開始，到雙魚座（3/20）結束。' },
  { question: '星座的四大元素是什麼？', answer: '十二星座分為四大元素：火象（牡羊、獅子、射手）代表熱情行動；土象（金牛、處女、摩羯）代表務實穩重；風象（雙子、天秤、水瓶）代表思考溝通；水象（巨蟹、天蠍、雙魚）代表情感直覺。' },
  { question: '星座日期有交界的話怎麼算？', answer: '在兩個星座交界日出生的人稱為「邊界星座」。精確的星座需要根據出生年份和時間來判斷太陽確切位置，本工具以常用的日期範圍為準。' },
]

export default function ZodiacSignLookupPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '星座查詢', url: 'https://toolcase.cc/zh-tw/everyday/zodiac-sign-lookup' },
        ]}
      />
      <ToolSchema
        name="星座查詢"
        description="輸入生日立即查詢你的星座！提供十二星座日期範圍、元素屬性、性格特質完整對照表。免費線上星座查詢工具。"
        url="https://toolcase.cc/zh-tw/everyday/zodiac-sign-lookup"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '星座查詢' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>星座查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入你的生日，立即查詢星座、元素屬性與性格特質。</p>
      <ZodiacSignLookup />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="zodiac-sign-lookup" locale="zh-tw" />
    </div>
    </>
  )
}
