'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Maximize, Minimize, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ScreenDeadPixelTestProps {
  labels?: {
    startTest: string
    exitTest: string
    instructions: string
    previousColor: string
    nextColor: string
    colorName: string
    tipTitle: string
    tip1: string
    tip2: string
    tip3: string
    tip4: string
  }
}

export default function ScreenDeadPixelTest({ labels }: ScreenDeadPixelTestProps) {
  const l = {
    startTest: labels?.startTest ?? 'Start Test',
    exitTest: labels?.exitTest ?? 'Exit Test',
    instructions: labels?.instructions ?? 'Press Space or click to change colors, Esc to exit',
    previousColor: labels?.previousColor ?? 'Previous',
    nextColor: labels?.nextColor ?? 'Next',
    colorName: labels?.colorName ?? 'Current Color',
    tipTitle: labels?.tipTitle ?? '💡 How to Test',
    tip1: labels?.tip1 ?? 'Click "Start Test" to enter fullscreen mode',
    tip2: labels?.tip2 ?? 'Use arrow keys or buttons to cycle through colors',
    tip3: labels?.tip3 ?? 'Look for stuck pixels or abnormal spots on the screen',
    tip4: labels?.tip4 ?? 'Press Esc or click Exit to return',
  }

  const testColors = [
    { name: 'Black', nameZh: '黑色', color: '#000000' },
    { name: 'White', nameZh: '白色', color: '#FFFFFF' },
    { name: 'Red', nameZh: '紅色', color: '#FF0000' },
    { name: 'Green', nameZh: '綠色', color: '#00FF00' },
    { name: 'Blue', nameZh: '藍色', color: '#0000FF' },
    { name: 'Yellow', nameZh: '黃色', color: '#FFFF00' },
    { name: 'Cyan', nameZh: '青色', color: '#00FFFF' },
    { name: 'Magenta', nameZh: '洋紅', color: '#FF00FF' },
  ]

  const [isTestMode, setIsTestMode] = useState(false)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  const startTest = async () => {
    setIsTestMode(true)
    try {
      await document.documentElement.requestFullscreen()
    } catch (err) {
      console.log('Fullscreen not supported or denied')
    }
  }

  const exitTest = async () => {
    setIsTestMode(false)
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }
  }

  const nextColor = () => {
    setCurrentColorIndex(prev => (prev + 1) % testColors.length)
  }

  const previousColor = () => {
    setCurrentColorIndex(prev => (prev - 1 + testColors.length) % testColors.length)
  }

  // 鍵盤事件處理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isTestMode) return

    switch (e.key) {
      case 'Escape':
        exitTest()
        break
      case ' ':
      case 'ArrowRight':
        e.preventDefault()
        nextColor()
        break
      case 'ArrowLeft':
        e.preventDefault()
        previousColor()
        break
    }
  }

  if (isTestMode) {
    const currentColor = testColors[currentColorIndex]
    const isDark = ['#000000', '#FF0000', '#0000FF'].includes(currentColor.color)
    const textColor = isDark ? 'white' : 'black'

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: currentColor.color }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onClick={nextColor}
      >
        {/* 控制面板 */}
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-lg bg-black/50 px-6 py-4 backdrop-blur-sm"
          onClick={e => e.stopPropagation()}
        >
          <Button
            onClick={previousColor}
            variant="outline"
            size="sm"
            className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
            {l.previousColor}
          </Button>

          <div className="px-4 text-center">
            <div className="text-xs text-white/70">{l.colorName}</div>
            <div className="mt-1 font-semibold text-white">
              {currentColor.name} / {currentColor.nameZh}
            </div>
            <div className="mt-1 text-xs font-mono text-white/70">{currentColor.color}</div>
          </div>

          <Button
            onClick={nextColor}
            variant="outline"
            size="sm"
            className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            {l.nextColor}
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="mx-2 h-8 w-px bg-white/20" />

          <Button
            onClick={exitTest}
            variant="outline"
            size="sm"
            className="gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
            {l.exitTest}
          </Button>
        </div>

        {/* 提示文字 */}
        <div
          className="absolute top-8 text-center text-sm opacity-50"
          style={{ color: textColor }}
        >
          {l.instructions}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 預覽卡片 */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-4 md:grid-cols-8">
          {testColors.map((color, index) => (
            <div
              key={index}
              className="aspect-square"
              style={{ backgroundColor: color.color }}
              title={`${color.name} / ${color.nameZh}`}
            />
          ))}
        </div>
        <div className="p-6">
          <Button onClick={startTest} className="w-full gap-2" size="lg">
            <Maximize className="h-5 w-5" />
            {l.startTest}
          </Button>
        </div>
      </Card>

      {/* 說明 */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">{l.tipTitle}</h4>
        <ol className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li>1. {l.tip1}</li>
          <li>2. {l.tip2}</li>
          <li>3. {l.tip3}</li>
          <li>4. {l.tip4}</li>
        </ol>
      </Card>

      {/* 說明卡片 */}
      <Card className="p-6">
        <h3 className="mb-3 font-semibold">什麼是壞點?</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>亮點:</strong> 在黑色畫面下顯示為白色或彩色的點,表示該像素持續發光。
          </p>
          <p>
            <strong>暗點:</strong> 在白色或彩色畫面下顯示為黑色的點,表示該像素無法發光。
          </p>
          <p>
            <strong>色點:</strong> 在純色畫面下顯示為其他顏色的點,表示該像素的某個子像素故障。
          </p>
        </div>
      </Card>
    </div>
  )
}
