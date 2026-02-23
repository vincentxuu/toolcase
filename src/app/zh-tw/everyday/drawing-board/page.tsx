import { Metadata } from 'next'
import DrawingBoard from '@/components/tools/DrawingBoard'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '線上塗鴉板 | 線上工具',
  description: '免費線上塗鴉繪圖工具,支援畫筆、橡皮擦、顏色選擇、線條粗細調整。可撤銷重做、清除畫布、下載圖片。純前端 Canvas 繪圖,隱私安全。',
  keywords: ['線上塗鴉', '繪圖工具', 'Canvas 繪圖', '線上畫板', '塗鴉板', '繪畫工具'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-3xl font-bold">線上塗鴉板</h1>
        <p className="mb-8 text-muted-foreground">
          簡單好用的線上繪圖工具!使用 Canvas 技術實現流暢繪圖體驗。支援畫筆和橡皮擦工具、自訂顏色、調整線條粗細。提供撤銷/重做功能,完成後可下載為 PNG 圖片。所有處理都在瀏覽器中完成,保護您的隱私。
        </p>
        <DrawingBoard
          labels={{
            tool: '工具',
            pen: '畫筆',
            eraser: '橡皮擦',
            color: '顏色',
            size: '粗細',
            clear: '清除',
            download: '下載',
            undo: '撤銷',
            redo: '重做',
            confirmClear: '確定要清除畫布嗎?',
          }}
        />
      </div>
    </main>
  )
}
