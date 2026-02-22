import { Metadata } from 'next'
import ChmodCalculator from '@/components/tools/ChmodCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Chmod 計算器 - Unix 檔案權限 | toolcase',
  description: '使用互動式 chmod 計算器計算 Unix 檔案權限。切換擁有者、群組和其他人的讀取、寫入和執行權限，即時取得數字和符號表示法。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/chmod-calculator', languages: { en: 'https://toolcase.cc/chmod-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/chmod-calculator' } },
}

const faqs = [
  { question: 'chmod 755 是什麼意思？', answer: 'chmod 755 給予擁有者完整權限（讀取、寫入、執行 = 7），群組和其他人則獲得讀取和執行權限（5）。這是網頁目錄和腳本的典型權限設定。' },
  { question: '數字和符號表示法有什麼區別？', answer: '數字表示法使用三個數字（如 644），每個數字分別代表擁有者、群組和其他人的權限。符號表示法使用字母如 rwxr--r-- 來表示相同的資訊。' },
]

export default function ChmodCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'Chmod 計算器', url: 'https://toolcase.cc/zh-tw/chmod-calculator' },
        ]}
      />
      <ToolSchema
        name="Chmod 計算器"
        description="使用互動式 chmod 計算器計算 Unix 檔案權限。切換擁有者、群組和其他人的讀取、寫入和執行權限，即時取得數字和符號表示法。"
        url="https://toolcase.cc/zh-tw/chmod-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Chmod 計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Chmod 計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>互動式計算 Unix 檔案權限。即時取得數字和符號式 chmod 表示法。</p>
      <ChmodCalculator labels={{ owner: '擁有者', group: '群組', others: '其他人', read: '讀取', write: '寫入', execute: '執行', numeric: '數字', symbolic: '符號', command: '指令', copy: '複製', copied: '已複製！' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="chmod-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
