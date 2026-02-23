import { Metadata } from 'next'
import AlarmClock from '@/components/tools/AlarmClock'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Alarm Clock | Online Tool',
  description: 'Free online alarm clock tool. Support multiple alarms, repeat reminders, snooze function. Set weekdays, weekends or custom dates. Auto-save alarm data.',
  keywords: ['online alarm', 'web alarm', 'alarm clock', 'snooze alarm', 'repeat alarm', 'multiple alarms'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Online Alarm Clock</h1>
        <p className="mb-8 text-muted-foreground">
          Simple and practical online alarm clock! Support multiple alarm settings and repeat reminders. Set once, daily, weekdays, weekends or custom dates. Snooze function available, alarm data automatically saved to browser.
        </p>
        <AlarmClock
          labels={{
            addAlarm: 'Add Alarm',
            time: 'Time',
            label: 'Label',
            labelPlaceholder: 'Alarm label...',
            enabled: 'Enabled',
            delete: 'Delete',
            noAlarms: 'No alarms set',
            createFirst: 'Create your first alarm',
            currentTime: 'Current Time',
            alarmRinging: 'Alarm Ringing!',
            stop: 'Stop',
            snooze: 'Snooze (5 min)',
            repeat: 'Repeat',
            once: 'Once',
            everyday: 'Everyday',
            weekdays: 'Weekdays',
            weekends: 'Weekends',
            custom: 'Custom',
            sun: 'S',
            mon: 'M',
            tue: 'T',
            wed: 'W',
            thu: 'T',
            fri: 'F',
            sat: 'S',
          }}
        />
      </div>
    </main>
  )
}
