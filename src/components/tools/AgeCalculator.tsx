'use client'
import { useState, useMemo } from 'react'

interface AgeCalculatorProps {
  labels?: {
    birthDate: string
    targetDate: string
    age: string
    years: string
    months: string
    days: string
    totalDays: string
    totalWeeks: string
    totalMonths: string
    nextBirthday: string
    daysUntilBirthday: string
  }
}

export default function AgeCalculator({ labels }: AgeCalculatorProps) {
  const l = {
    birthDate: labels?.birthDate ?? 'Date of Birth',
    targetDate: labels?.targetDate ?? 'Calculate Age On',
    age: labels?.age ?? 'Age',
    years: labels?.years ?? 'Years',
    months: labels?.months ?? 'Months',
    days: labels?.days ?? 'Days',
    totalDays: labels?.totalDays ?? 'Total Days',
    totalWeeks: labels?.totalWeeks ?? 'Total Weeks',
    totalMonths: labels?.totalMonths ?? 'Total Months',
    nextBirthday: labels?.nextBirthday ?? 'Next Birthday',
    daysUntilBirthday: labels?.daysUntilBirthday ?? 'Days Until Birthday',
  }

  const today = new Date()
  const [birthStr, setBirthStr] = useState('1995-06-15')
  const [targetStr, setTargetStr] = useState(today.toISOString().split('T')[0])

  const result = useMemo(() => {
    const birth = new Date(birthStr)
    const target = new Date(targetStr)

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prev = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prev.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const diffMs = target.getTime() - birth.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = years * 12 + months

    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate())
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))

    return { years, months, days, totalDays, totalWeeks, totalMonths, nextBirthday, daysUntilBirthday }
  }, [birthStr, targetStr])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.birthDate}</label>
          <input type="date" style={inputStyle} value={birthStr} onChange={(e) => setBirthStr(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{l.targetDate}</label>
          <input type="date" style={inputStyle} value={targetStr} onChange={(e) => setTargetStr(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)' }}>{result.years}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">{l.years}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', fontWeight: 700 }}>{result.months}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">{l.months}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '3rem', fontWeight: 700 }}>{result.days}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">{l.days}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalDays}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{result.totalDays.toLocaleString()}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalWeeks}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{result.totalWeeks.toLocaleString()}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalMonths}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{result.totalMonths.toLocaleString()}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.daysUntilBirthday}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-accent)' }}>{result.daysUntilBirthday}</div>
        </div>
      </div>
    </div>
  )
}
