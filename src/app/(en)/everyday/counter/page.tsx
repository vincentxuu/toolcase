import { Metadata } from 'next'
import Counter from '@/components/tools/Counter'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Counter | Online Utility Tool',
  description: 'Free online counter tool. Support multiple counters, custom step values, and target settings. Auto-save counts for events and statistics.',
  keywords: ['counter', 'counting tool', 'tally', 'statistics'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Counter</h1>
        <p className="mb-8 text-muted-foreground">
          Online counter tool supporting multiple counters simultaneously. Customize step values and set targets with auto-save. Perfect for event counting and statistics.
        </p>
        <Counter
          labels={{
            addCounter: 'Add Counter',
            reset: 'Reset',
            step: 'Step',
            target: 'Target',
            optional: 'optional',
            counterName: 'Counter Name',
            delete: 'Delete',
          }}
        />
      </div>
    </main>
  )
}
