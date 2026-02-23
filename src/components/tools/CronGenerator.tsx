'use client'
import { useState, useCallback, useMemo } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CronGeneratorProps {
  labels?: {
    copy: string
    copied: string
    minute: string
    hour: string
    dayOfMonth: string
    month: string
    dayOfWeek: string
    expression: string
    description: string
    presets: string
    custom: string
  }
}

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every 15 minutes', value: '*/15 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every day at noon', value: '0 12 * * *' },
  { label: 'Every Monday', value: '0 0 * * 1' },
  { label: 'Every weekday', value: '0 0 * * 1-5' },
  { label: '1st of every month', value: '0 0 1 * *' },
  { label: 'Every Sunday at 3am', value: '0 3 * * 0' },
]

const MONTHS = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function describeCron(parts: string[]): string {
  if (parts.length !== 5) return 'Invalid expression'
  const [min, hour, dom, mon, dow] = parts

  const segments: string[] = []

  if (min === '*' && hour === '*') {
    segments.push('Every minute')
  } else if (min.startsWith('*/')) {
    segments.push(`Every ${min.slice(2)} minutes`)
  } else if (hour === '*') {
    segments.push(`At minute ${min} of every hour`)
  } else if (hour.startsWith('*/')) {
    segments.push(`At minute ${min}, every ${hour.slice(2)} hours`)
  } else {
    segments.push(`At ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`)
  }

  if (dom !== '*') segments.push(`on day ${dom} of the month`)
  if (mon !== '*') {
    const monthNum = parseInt(mon)
    segments.push(`in ${MONTHS[monthNum] || mon}`)
  }
  if (dow !== '*') {
    if (dow === '1-5') {
      segments.push('on weekdays')
    } else if (dow === '0,6') {
      segments.push('on weekends')
    } else {
      const dayNum = parseInt(dow)
      segments.push(`on ${DAYS[dayNum] || dow}`)
    }
  }

  return segments.join(' ')
}

export default function CronGenerator({ labels }: CronGeneratorProps) {
  const l = {
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    minute: labels?.minute ?? 'Minute',
    hour: labels?.hour ?? 'Hour',
    dayOfMonth: labels?.dayOfMonth ?? 'Day (Month)',
    month: labels?.month ?? 'Month',
    dayOfWeek: labels?.dayOfWeek ?? 'Day (Week)',
    expression: labels?.expression ?? 'Expression',
    description: labels?.description ?? 'Description',
    presets: labels?.presets ?? 'Presets',
    custom: labels?.custom ?? 'Custom',
  }

  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('*')

  const expression = useMemo(() => `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`, [minute, hour, dayOfMonth, month, dayOfWeek])
  const description = useMemo(() => describeCron(expression.split(' ')), [expression])

  const applyPreset = useCallback((value: string) => {
    const parts = value.split(' ')
    setMinute(parts[0])
    setHour(parts[1])
    setDayOfMonth(parts[2])
    setMonth(parts[3])
    setDayOfWeek(parts[4])
  }, [])

  const fieldStyle = {
    padding: '0.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontFamily: 'monospace',
    fontSize: '1rem',
    width: '100%',
    textAlign: 'center' as const,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Result */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '0.75rem',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.expression}</div>
        <div style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{expression}</div>
        <div style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{description}</div>
        <CopyButton text={expression} label={l.copy} copiedLabel={l.copied} />
      </div>

      {/* Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', textAlign: 'center' }}>{l.minute}</label>
          <input style={fieldStyle} value={minute} onChange={(e) => setMinute(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', textAlign: 'center' }}>{l.hour}</label>
          <input style={fieldStyle} value={hour} onChange={(e) => setHour(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', textAlign: 'center' }}>{l.dayOfMonth}</label>
          <input style={fieldStyle} value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', textAlign: 'center' }}>{l.month}</label>
          <input style={fieldStyle} value={month} onChange={(e) => setMonth(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', textAlign: 'center' }}>{l.dayOfWeek}</label>
          <input style={fieldStyle} value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />
        </div>
      </div>

      {/* Presets */}
      <div>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{l.presets}</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
              style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}
              onClick={() => applyPreset(preset.value)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
