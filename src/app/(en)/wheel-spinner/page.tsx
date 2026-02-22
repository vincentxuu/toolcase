import { Metadata } from 'next'
import WheelSpinner from '@/components/tools/WheelSpinner'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Wheel Spinner | Online Tool',
  description: 'Free online wheel spinner tool. Customize options, random draw. Canvas animation effect, perfect for team activities, raffles, decision making. Fair and random.',
  keywords: ['wheel spinner', 'random picker', 'online raffle', 'lucky wheel', 'decision tool', 'random draw'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Wheel Spinner</h1>
        <p className="mb-8 text-muted-foreground">
          Fun online wheel spinner tool! Customize option content, click spin to start the draw. Beautiful Canvas animation effect, fair and random selection. Perfect for team activities, raffles, decision making and more.
        </p>
        <WheelSpinner
          labels={{
            addOption: 'Add Option',
            optionPlaceholder: 'Enter option...',
            spin: 'Spin!',
            reset: 'Reset',
            winner: 'Winner:',
            minOptions: 'Add at least 2 options to spin',
            delete: 'Delete',
          }}
        />
      </div>
    </main>
  )
}
