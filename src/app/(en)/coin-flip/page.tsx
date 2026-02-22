import { Metadata } from 'next'
import CoinFlip from '@/components/tools/CoinFlip'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Coin Flip | Random Online Tool',
  description: 'Free online coin flip tool. Randomly display heads or tails for decision making, lottery or games. Real-time statistics.',
  keywords: ['coin flip', 'random', 'heads or tails', 'decision tool', 'coin toss'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Coin Flip</h1>
        <p className="mb-8 text-muted-foreground">
          Random coin flip tool to help you make quick decisions. Click the button to randomly display heads or tails.
        </p>
        <CoinFlip
          labels={{
            flip: 'Flip Coin',
            reset: 'Reset',
            heads: 'Heads',
            tails: 'Tails',
            stats: 'Statistics',
            result: 'Result',
          }}
        />
      </div>
    </main>
  )
}
