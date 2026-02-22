import { Metadata } from 'next'
import ScreenDeadPixelTest from '@/components/tools/ScreenDeadPixelTest'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '螢幕壞點測試 | 線上工具',
  description: '免費線上螢幕壞點檢測工具,全螢幕純色測試,快速檢測螢幕亮點、暗點、色點等問題。支援黑、白、紅、綠、藍等多種測試顏色。',
  keywords: ['螢幕壞點測試', '亮點檢測', '暗點檢測', '螢幕測試', '顯示器檢測', '像素測試'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">螢幕壞點測試</h1>
        <p className="mb-8 text-muted-foreground">
          快速檢測螢幕壞點!提供黑、白、紅、綠、藍等多種純色全螢幕測試,幫助您發現螢幕上的亮點、暗點或色點問題。適合新購螢幕檢測、維修前檢查等使用。
        </p>
        <ScreenDeadPixelTest
          labels={{
            startTest: '開始測試',
            exitTest: '結束測試',
            instructions: '按空白鍵或點擊切換顏色,按 Esc 離開',
            previousColor: '上一個',
            nextColor: '下一個',
            colorName: '目前顏色',
            tipTitle: '💡 使用說明',
            tip1: '點擊「開始測試」進入全螢幕模式',
            tip2: '使用方向鍵或按鈕切換測試顏色',
            tip3: '仔細觀察螢幕是否有卡住的像素或異常斑點',
            tip4: '按 Esc 或點擊「結束測試」返回',
          }}
        />
      </div>
    </main>
  )
}
