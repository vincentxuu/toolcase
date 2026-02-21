import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'toolcase — 免費線上工具',
  description:
    '免費線上工具：JSON 格式化、QR Code 產生器、計算機、圖片處理、單位換算等。快速、乾淨、不需註冊。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw',
    languages: {
      en: 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

export default function ZhTwLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="zh-Hant-TW">
      <Navbar locale="zh-tw" />
      {children}
      <Footer locale="zh-tw" />
    </div>
  )
}
