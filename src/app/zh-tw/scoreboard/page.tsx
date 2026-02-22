import { Metadata } from 'next'
import Scoreboard from '@/components/tools/Scoreboard'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '計分板 | 線上工具',
  description: '免費線上計分板工具,支援多人記分、自動排名、即時更新。適合桌遊、運動比賽、課堂競賽等場景。分數自動儲存,不怕重新整理。',
  keywords: ['計分板', '記分板', '分數記錄', '線上記分', '比賽計分', '桌遊計分'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">線上計分板</h1>
        <p className="mb-8 text-muted-foreground">
          簡單好用的線上計分工具!支援多人同時記分、自動排名、即時更新。分數自動儲存到瀏覽器,不怕重新整理。適合桌遊、運動比賽、課堂競賽等各種場景使用。
        </p>
        <Scoreboard
          labels={{
            addPlayer: '新增玩家',
            playerName: '玩家名稱',
            reset: '重設分數',
            confirmReset: '確定要重設所有分數嗎?',
            edit: '編輯',
            save: '儲存',
            cancel: '取消',
            delete: '刪除',
            player: '玩家',
            score: '分數',
            placeholder: '輸入玩家名稱...',
          }}
        />
      </div>
    </main>
  )
}
