'use client'
import { useState, useMemo } from 'react'

interface DateCalculatorProps {
  labels?: {
    difference: string
    addSubtract: string
    startDate: string
    endDate: string
    resultDate: string
    daysToAdd: string
    add: string
    subtract: string
    years: string
    months: string
    days: string
    totalDays: string
    totalWeeks: string
  }
}

export default function DateCalculator({ labels }: DateCalculatorProps) {
  const l = {
    difference: labels?.difference ?? 'Difference',
    addSubtract: labels?.addSubtract ?? 'Add / Subtract',
    startDate: labels?.startDate ?? 'Start Date',
    endDate: labels?.endDate ?? 'End Date',
    resultDate: labels?.resultDate ?? 'Result Date',
    daysToAdd: labels?.daysToAdd ?? 'Number of Days',
    add: labels?.add ?? 'Add',
    subtract: labels?.subtract ?? 'Subtract',
    years: labels?.years ?? 'Years',
    months: labels?.months ?? 'Months',
    days: labels?.days ?? 'Days',
    totalDays: labels?.totalDays ?? 'Total Days',
    totalWeeks: labels?.totalWeeks ?? 'Total Weeks',
  }

  const today = new Date().toISOString().split('T')[0]
  const [mode, setMode] = useState<'diff' | 'add'>('diff')
  const [startStr, setStartStr] = useState(today)
  const [endStr, setEndStr] = useState(today)
  const [daysToAdd, setDaysToAdd] = useState(30)
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')

  const diffResult = useMemo(() => {
    const start = new Date(startStr)
    const end = new Date(endStr)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const later = end >= start ? end : start
    const earlier = end >= start ? start : end
    const sign = end >= start ? 1 : -1

    let years = later.getFullYear() - earlier.getFullYear()
    let months = later.getMonth() - earlier.getMonth()
    let days = later.getDate() - earlier.getDate()

    if (days < 0) {
      months--
      const prev = new Date(later.getFullYear(), later.getMonth(), 0)
      days += prev.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const diffMs = Math.abs(end.getTime() - start.getTime())
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)

    return { years: years * sign, months: months * sign, days: days * sign, totalDays: totalDays * sign, totalWeeks: totalWeeks * sign }
  }, [startStr, endStr])

  const addResult = useMemo(() => {
    const start = new Date(startStr)
    if (isNaN(start.getTime())) return null
    const offset = operation === 'add' ? daysToAdd : -daysToAdd
    const result = new Date(start)
    result.setDate(result.getDate() + offset)
    return result
  }, [startStr, daysToAdd, operation])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }
  const cardStyle: React.CSSProperties = {
    padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)', textAlign: 'center',
  }
  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '0.75rem', textAlign: 'center', cursor: 'pointer', fontWeight: 600,
    fontSize: '0.875rem', borderRadius: '0.5rem', border: 'none', transition: 'all 0.15s',
    backgroundColor: active ? 'var(--color-primary)' : 'transparent',
    color: active ? 'white' : 'var(--color-text-secondary)',
  })
  const opBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '0.625rem', textAlign: 'center', cursor: 'pointer', fontWeight: 600,
    fontSize: '0.875rem', borderRadius: '0.5rem',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
    border: active ? 'none' : '1px solid var(--color-border)',
  })

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Mode tabs */}
      <div style={{
        display: 'flex', gap: '0.25rem', padding: '0.25rem', borderRadius: '0.625rem',
        backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
      }}>
        <button style={tabStyle(mode === 'diff')} onClick={() => setMode('diff')}>{l.difference}</button>
        <button style={tabStyle(mode === 'add')} onClick={() => setMode('add')}>{l.addSubtract}</button>
      </div>

      {mode === 'diff' ? (
        <>
          {/* Difference mode */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>{l.startDate}</label>
              <input type="date" style={inputStyle} value={startStr} onChange={(e) => setStartStr(e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{l.endDate}</label>
              <input type="date" style={inputStyle} value={endStr} onChange={(e) => setEndStr(e.target.value)} />
            </div>
          </div>

          {diffResult && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                <div style={cardStyle}>
                  <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {Math.abs(diffResult.years)}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{l.years}</div>
                </div>
                <div style={cardStyle}>
                  <div style={{ fontSize: '3rem', fontWeight: 700 }}>
                    {Math.abs(diffResult.months)}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{l.months}</div>
                </div>
                <div style={cardStyle}>
                  <div style={{ fontSize: '3rem', fontWeight: 700 }}>
                    {Math.abs(diffResult.days)}
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{l.days}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                <div style={cardStyle}>
                  <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalDays}</div>
                  <div className="text-2xl font-bold">{Math.abs(diffResult.totalDays).toLocaleString()}</div>
                </div>
                <div style={cardStyle}>
                  <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalWeeks}</div>
                  <div className="text-2xl font-bold">{Math.abs(diffResult.totalWeeks).toLocaleString()}</div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Add/Subtract mode */}
          <div>
            <label style={labelStyle}>{l.startDate}</label>
            <input type="date" style={inputStyle} value={startStr} onChange={(e) => setStartStr(e.target.value)} />
          </div>

          <div>
            <label style={labelStyle}>{l.daysToAdd}</label>
            <input type="number" style={inputStyle} value={daysToAdd} min={0} onChange={(e) => setDaysToAdd(Math.max(0, Number(e.target.value)))} />
          </div>

          <div className="flex gap-2">
            <button style={opBtnStyle(operation === 'add')} onClick={() => setOperation('add')}>{l.add}</button>
            <button style={opBtnStyle(operation === 'subtract')} onClick={() => setOperation('subtract')}>{l.subtract}</button>
          </div>

          {addResult && (
            <div style={cardStyle}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {l.resultDate}
              </div>
              <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">
                {formatDate(addResult)}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                {addResult.toISOString().split('T')[0]}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
