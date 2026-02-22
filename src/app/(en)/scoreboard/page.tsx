import { Metadata } from 'next'
import Scoreboard from '@/components/tools/Scoreboard'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Scoreboard | Online Tool',
  description: 'Free online scoreboard tool. Support multiple players, auto ranking, real-time updates. Perfect for board games, sports, classroom competitions. Auto-save scores.',
  keywords: ['scoreboard', 'score tracker', 'game score', 'online scoreboard', 'competition tracker'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Online Scoreboard</h1>
        <p className="mb-8 text-muted-foreground">
          Simple and easy-to-use online scoreboard! Support multiple players, automatic ranking, and real-time updates. Scores are automatically saved to your browser. Perfect for board games, sports competitions, classroom activities and more.
        </p>
        <Scoreboard
          labels={{
            addPlayer: 'Add Player',
            playerName: 'Player Name',
            reset: 'Reset All',
            confirmReset: 'Are you sure you want to reset all scores?',
            edit: 'Edit',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            player: 'Player',
            score: 'Score',
            placeholder: 'Enter player name...',
          }}
        />
      </div>
    </main>
  )
}
