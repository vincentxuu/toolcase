import { Metadata } from 'next'
import AlarmClock from '@/components/tools/AlarmClock'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '線上鬧鐘 | 線上工具',
  description: '免費線上鬧鐘工具,支援多個鬧鐘設定、重複提醒、貪睡功能。可設定工作日、週末或自訂日期。鬧鐘資料自動儲存,使用方便。',
  keywords: ['線上鬧鐘', '網頁鬧鐘', '提醒工具', '貪睡鬧鐘', '重複鬧鐘', '多鬧鐘'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">線上鬧鐘</h1>
        <p className="mb-8 text-muted-foreground">
          簡單實用的線上鬧鐘!支援多個鬧鐘設定、重複提醒功能。可設定一次性、每天、工作日、週末或自訂日期。提供貪睡功能,鬧鐘資料自動儲存到瀏覽器。
        </p>
        <AlarmClock
          labels={{
            addAlarm: '新增鬧鐘',
            time: '時間',
            label: '標籤',
            labelPlaceholder: '鬧鐘標籤...',
            enabled: '啟用',
            delete: '刪除',
            noAlarms: '尚未設定鬧鐘',
            createFirst: '建立您的第一個鬧鐘',
            currentTime: '目前時間',
            alarmRinging: '鬧鐘響了!',
            stop: '停止',
            snooze: '貪睡 (5 分鐘)',
            repeat: '重複',
            once: '一次',
            everyday: '每天',
            weekdays: '工作日',
            weekends: '週末',
            custom: '自訂',
            sun: '日',
            mon: '一',
            tue: '二',
            wed: '三',
            thu: '四',
            fri: '五',
            sat: '六',
          }}
        />
      </div>
    </main>
  )
}
