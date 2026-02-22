import { Metadata } from 'next'
import OnlineRuler from '@/components/tools/OnlineRuler'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Online Ruler | Online Tool',
  description: 'Free online ruler tool. Support centimeter and inch measurements. Calibrate DPI, rotate direction, fullscreen mode. Measure objects directly on your screen.',
  keywords: ['online ruler', 'screen ruler', 'measurement tool', 'centimeter ruler', 'inch ruler', 'DPI calibration'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Online Ruler</h1>
        <p className="mb-8 text-muted-foreground">
          Measure objects directly on your screen! Support both centimeter and inch units. Calibrate DPI for accurate measurements. Horizontal/vertical rotation and fullscreen mode available. Recommend calibrating with a real ruler or credit card (standard size 8.56cm) before use.
        </p>
        <OnlineRuler
          labels={{
            unit: 'Unit',
            cm: 'Centimeter',
            inch: 'Inch',
            fullscreen: 'Fullscreen',
            rotate: 'Rotate',
            calibrate: 'Calibrate',
            calibrateDesc: 'Adjust DPI to match your screen',
            measureTip: 'Usage Tips',
            actualSize: 'Actual Size',
            dpi: 'DPI',
          }}
        />
      </div>
    </main>
  )
}
