import { Metadata } from 'next'
import DigitalClock from '@/components/tools/DigitalClock'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Digital Clock | Online Tool',
  description: 'Free online digital clock with 12/24 hour format switching and fullscreen display. Clean and beautiful time display tool.',
  keywords: ['digital clock', 'clock', 'time', 'fullscreen clock'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Digital Clock</h1>
        <p className="mb-8 text-muted-foreground">
          Clean and beautiful digital clock tool with 12/24 hour format switching, seconds display, and fullscreen mode. Perfect for desktop use.
        </p>
        <DigitalClock
          labels={{
            hour12: '12-hour',
            hour24: '24-hour',
            showSeconds: 'Show Seconds',
            showDate: 'Show Date',
            fullscreen: 'Fullscreen',
            exitFullscreen: 'Exit Fullscreen',
          }}
        />
      </div>
    </main>
  )
}
