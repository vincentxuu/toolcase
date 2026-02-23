import { Metadata } from 'next'
import PomodoroTimer from '@/components/tools/PomodoroTimer'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '番茄鐘計時器 - 免費線上工具 | toolcase',
  description: '免費線上番茄鐘計時器，提升工作效率。可自訂工作與休息時長，環形進度指示，音效通知及工作階段追蹤。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/pomodoro-timer', languages: { en: 'https://toolcase.cc/everyday/pomodoro-timer', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/pomodoro-timer' } },
}

const faqs = [
  { question: '什麼是番茄工作法？', answer: '番茄工作法是由 Francesco Cirillo 開發的時間管理方法。以專注的工作區間（傳統上 25 分鐘）為一個「番茄鐘」，之後休息 5 分鐘。完成四個番茄鐘後進行較長的休息。這有助於維持專注力並防止倦怠。' },
  { question: '可以自訂工作和休息時長嗎？', answer: '可以。工作時長可設定 1 到 120 分鐘，休息時長可設定 1 到 60 分鐘。傳統設定是工作 25 分鐘、休息 5 分鐘，但您可以依照自己的工作方式自由調整。' },
  { question: '計時結束時會有通知嗎？', answer: '會。計時器在每個工作或休息時段結束時，會使用 Web Audio API 播放音效提示。請確保裝置音量未靜音。計時器也會自動在工作和休息時段之間切換。' },
]

export default function PomodoroTimerPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '番茄鐘計時器', url: 'https://toolcase.cc/zh-tw/everyday/pomodoro-timer' },
        ]}
      />
      <ToolSchema
        name="番茄鐘計時器"
        description="免費線上番茄鐘計時器，提升工作效率。可自訂工作與休息時長，環形進度指示，音效通知及工作階段追蹤。"
        url="https://toolcase.cc/zh-tw/everyday/pomodoro-timer"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '番茄鐘計時器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>番茄鐘計時器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用可自訂的工作與休息區間保持專注並提升效率。</p>
      <PomodoroTimer labels={{ workDuration: '工作時長', breakDuration: '休息時長', start: '開始', pause: '暫停', reset: '重設', work: '工作', breakLabel: '休息', sessionsCompleted: '已完成階段', minutes: '分鐘' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>使用輸入欄位設定工作和休息時長。點擊「開始」啟動工作計時器。環形進度指示器顯示已經過的時間。計時歸零時會聽到提示音，計時器自動切換至休息時段。使用「暫停」暫時停止，「重設」重新開始。工作階段計數器會追蹤您已完成的工作區間數。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="pomodoro-timer" locale="zh-tw" />
    </div>
    </>
  )
}
