import { Metadata } from 'next'
import ScreenDeadPixelTest from '@/components/tools/ScreenDeadPixelTest'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Screen Dead Pixel Test | Online Tool',
  description: 'Free online screen dead pixel test tool. Fullscreen solid color test to quickly detect bright pixels, dark pixels, and color defects. Support multiple test colors.',
  keywords: ['dead pixel test', 'screen test', 'pixel test', 'monitor test', 'display test', 'stuck pixel'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Screen Dead Pixel Test</h1>
        <p className="mb-8 text-muted-foreground">
          Quickly test for dead pixels on your screen! Provides fullscreen solid color tests in black, white, red, green, blue and more to help you find stuck pixels, dead pixels or color defects. Perfect for testing new monitors or pre-repair checks.
        </p>
        <ScreenDeadPixelTest
          labels={{
            startTest: 'Start Test',
            exitTest: 'Exit Test',
            instructions: 'Press Space or click to change colors, Esc to exit',
            previousColor: 'Previous',
            nextColor: 'Next',
            colorName: 'Current Color',
            tipTitle: '💡 How to Test',
            tip1: 'Click "Start Test" to enter fullscreen mode',
            tip2: 'Use arrow keys or buttons to cycle through colors',
            tip3: 'Look for stuck pixels or abnormal spots on the screen',
            tip4: 'Press Esc or click Exit to return',
          }}
        />
      </div>
    </main>
  )
}
