'use client'
import { useState, useMemo, useEffect } from 'react'

interface DueDateCalculatorProps {
  labels?: {
    lastPeriod: string
    cycleLength: string
    days: string
    dueDate: string
    currentWeek: string
    trimester: string
    first: string
    second: string
    third: string
    weeksPregnant: string
    daysUntilDue: string
    conception: string
    disclaimer: string
  }
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function DueDateCalculator({ labels }: DueDateCalculatorProps) {
  const l = {
    lastPeriod: labels?.lastPeriod ?? 'First Day of Last Period',
    cycleLength: labels?.cycleLength ?? 'Cycle Length',
    days: labels?.days ?? 'days',
    dueDate: labels?.dueDate ?? 'Estimated Due Date',
    currentWeek: labels?.currentWeek ?? 'Current Week',
    trimester: labels?.trimester ?? 'Trimester',
    first: labels?.first ?? '1st Trimester',
    second: labels?.second ?? '2nd Trimester',
    third: labels?.third ?? '3rd Trimester',
    weeksPregnant: labels?.weeksPregnant ?? 'Weeks Pregnant',
    daysUntilDue: labels?.daysUntilDue ?? 'Days Until Due',
    conception: labels?.conception ?? 'Est. Conception Date',
    disclaimer: labels?.disclaimer ?? 'This tool is for informational purposes only. Please consult your healthcare provider for accurate medical advice.',
  }

  const [today, setToday] = useState(() => new Date(2026, 0, 1))
  const [lmpStr, setLmpStr] = useState('2025-11-06')
  const [cycleLength, setCycleLength] = useState(28)

  useEffect(() => {
    const now = new Date()
    setToday(now)
    const defaultLmp = new Date(now)
    defaultLmp.setDate(defaultLmp.getDate() - 56)
    setLmpStr(defaultLmp.toISOString().split('T')[0])
  }, [])

  const result = useMemo(() => {
    const lmp = new Date(lmpStr)
    const adjustment = cycleLength - 28
    const dueDate = addDays(lmp, 280 + adjustment)
    const conceptionDate = addDays(lmp, 14 + adjustment)
    const daysSinceLmp = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24))
    const weeksPregnant = Math.floor(daysSinceLmp / 7)
    const daysExtra = daysSinceLmp % 7
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    const trimester = weeksPregnant < 13 ? 1 : weeksPregnant < 27 ? 2 : 3
    const progress = Math.min(100, Math.max(0, (daysSinceLmp / 280) * 100))
    return { dueDate, conceptionDate, weeksPregnant, daysExtra, daysUntilDue, trimester, progress }
  }, [lmpStr, cycleLength, today])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }
  const trimesterLabels = [l.first, l.second, l.third]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.lastPeriod}</label>
          <input type="date" style={inputStyle} value={lmpStr} onChange={(e) => setLmpStr(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{l.cycleLength} ({l.days})</label>
          <input type="number" style={inputStyle} value={cycleLength} onChange={(e) => setCycleLength(Number(e.target.value))} min={20} max={45} />
        </div>
      </div>

      <div style={{ ...cardStyle, padding: '2rem' }}>
        <div className="text-sm text-[var(--color-text-secondary)] mb-2">{l.dueDate}</div>
        <div className="text-4xl font-bold text-[var(--color-primary)]">{formatDate(result.dueDate)}</div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
          <span>{l.weeksPregnant}: {result.weeksPregnant}w {result.daysExtra}d</span>
          <span>{trimesterLabels[result.trimester - 1]}</span>
        </div>
        <div style={{ height: '0.75rem', borderRadius: '0.375rem', overflow: 'hidden', display: 'flex' }}>
          <div style={{ flex: 13, backgroundColor: result.trimester >= 1 ? '#3b82f6' : 'var(--color-border)' }} />
          <div style={{ flex: 14, backgroundColor: result.trimester >= 2 ? '#10b981' : 'var(--color-border)' }} />
          <div style={{ flex: 13, backgroundColor: result.trimester >= 3 ? '#f59e0b' : 'var(--color-border)' }} />
        </div>
        <div style={{ position: 'relative', height: '1rem' }}>
          <div style={{ position: 'absolute', left: `${result.progress}%`, transform: 'translateX(-50%)', fontSize: '0.875rem' }}>▲</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.weeksPregnant}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{result.weeksPregnant}w {result.daysExtra}d</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.daysUntilDue}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: result.daysUntilDue > 0 ? 'var(--color-primary)' : 'var(--color-error)' }}>
            {result.daysUntilDue > 0 ? result.daysUntilDue : 'Due!'}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.conception}</div>
          <div style={{ fontSize: '1rem', fontWeight: 600 }}>{formatDate(result.conceptionDate)}</div>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        ℹ️ {l.disclaimer}
      </div>
    </div>
  )
}
