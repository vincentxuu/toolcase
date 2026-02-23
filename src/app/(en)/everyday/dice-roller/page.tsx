import { Metadata } from 'next'
import DiceRoller from '@/components/tools/DiceRoller'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Dice Roller | Random Online Tool',
  description: 'Free online dice roller tool. Roll 1-6 dice simultaneously. Real-time display of numbers and totals with history tracking. Perfect for board games and decision making.',
  keywords: ['dice roller', 'dice', 'random', 'board games', 'game tool'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Dice Roller</h1>
        <p className="mb-8 text-muted-foreground">
          Online dice roller tool. Choose 1-6 dice to roll simultaneously. Automatically calculates totals and records history. Perfect for board games, decision making, or gaming.
        </p>
        <DiceRoller
          labels={{
            roll: 'Roll Dice',
            reset: 'Reset',
            diceCount: 'Number of Dice',
            result: 'Result',
            total: 'Total',
            history: 'History',
          }}
        />
      </div>
    </main>
  )
}
