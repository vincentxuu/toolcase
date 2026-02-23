'use client'
import { useState, useCallback, useEffect } from 'react'

interface DaysCounterProps {
  labels?: {
    title: string
    eventName: string
    eventNamePlaceholder: string
    targetDate: string
    today: string
    calculate: string
    clear: string
    result: string
    daysRemaining: string
    daysPassed: string
    days: string
    hours: string
    minutes: string
    seconds: string
    isToday: string
  }
}

interface CountdownResult {
  eventName: string
  targetDate: Date
  isPast: boolean
  isToday: boolean
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function DaysCounter({ labels }: DaysCounterProps) {
  const l = {
    title: labels?.title ?? 'Days Counter',
    eventName: labels?.eventName ?? 'Event Name',
    eventNamePlaceholder: labels?.eventNamePlaceholder ?? 'e.g., My Birthday, Wedding Anniversary...',
    targetDate: labels?.targetDate ?? 'Target Date',
    today: labels?.today ?? 'Today',
    calculate: labels?.calculate ?? 'Calculate',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    daysRemaining: labels?.daysRemaining ?? 'Days Remaining',
    daysPassed: labels?.daysPassed ?? 'Days Passed',
    days: labels?.days ?? 'days',
    hours: labels?.hours ?? 'hours',
    minutes: labels?.minutes ?? 'minutes',
    seconds: labels?.seconds ?? 'seconds',
    isToday: labels?.isToday ?? 'The event is today!',
  }

  const [eventName, setEventName] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [result, setResult] = useState<CountdownResult | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update every second for live countdown
  useEffect(() => {
    if (!result) return

    const timer = setInterval(() => {
      setCurrentTime(new Date())

      const target = new Date(result.targetDate)
      const now = new Date()
      const diff = target.getTime() - now.getTime()

      if (diff <= 0 && !result.isPast) {
        // Event has passed
        const absDiff = Math.abs(diff)
        setResult({
          ...result,
          isPast: true,
          days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
        })
      } else if (diff > 0) {
        // Event is in future
        setResult({
          ...result,
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [result])

  const handleCalculate = useCallback(() => {
    if (!targetDate) return

    const target = new Date(targetDate)
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    const isToday = target.toDateString() === now.toDateString()
    const isPast = diff < 0
    const absDiff = Math.abs(diff)

    setResult({
      eventName: eventName || 'Event',
      targetDate: target,
      isPast,
      isToday,
      days: Math.floor(absDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((absDiff % (1000 * 60)) / 1000),
    })
  }, [eventName, targetDate])

  const handleClear = useCallback(() => {
    setEventName('')
    setTargetDate('')
    setResult(null)
  }, [])

  const handleToday = useCallback(() => {
    const today = new Date()
    const formatted = today.toISOString().split('T')[0]
    setTargetDate(formatted)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Event name */}
      <div>
        <label className="block font-medium mb-2 text-sm">
          {l.eventName}
        </label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder={l.eventNamePlaceholder}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Target date */}
      <div>
        <label className="block font-medium mb-2 text-sm">
          {l.targetDate}
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
            onClick={handleToday}
            style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}
          >
            {l.today}
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleCalculate}
          disabled={!targetDate}
        >
          {l.calculate}
        </button>
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={handleClear}
          disabled={!eventName && !targetDate && !result}
        >
          {l.clear}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          style={{
            padding: '2rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            {result.eventName}
          </h3>

          {result.isToday ? (
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>
              🎉 {l.isToday}
            </div>
          ) : (
            <>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                {result.isPast ? l.daysPassed : l.daysRemaining}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div className="text-4xl font-bold text-[var(--color-primary)]">
                    {result.days}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {l.days}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--color-primary)]">
                    {result.hours}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {l.hours}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--color-primary)]">
                    {result.minutes}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {l.minutes}
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[var(--color-primary)]">
                    {result.seconds}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">
                    {l.seconds}
                  </div>
                </div>
              </div>

              <div className="text-sm text-[var(--color-text-secondary)]">
                {result.targetDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
