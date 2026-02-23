import { Metadata } from 'next'
import DigitalClock from '@/components/tools/DigitalClock'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '數字時鐘 | 線上工具',
  description: '免費線上數字時鐘,支援 12/24 小時制切換、全螢幕顯示。簡潔美觀的時間顯示工具。',
  keywords: ['數字時鐘', 'digital clock', '時鐘', '時間', '全螢幕時鐘'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">數字時鐘</h1>
        <p className="mb-8 text-muted-foreground">
          簡潔美觀的數字時鐘工具,支援 12/24 小時制切換、秒數顯示、全螢幕模式。適合當作桌面時鐘使用。
        </p>
        <DigitalClock
          labels={{
            hour12: '12 小時制',
            hour24: '24 小時制',
            showSeconds: '顯示秒數',
            showDate: '顯示日期',
            fullscreen: '全螢幕',
            exitFullscreen: '退出全螢幕',
          }}
        />
      </div>
    </main>
  )
}
