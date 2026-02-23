'use client'
import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  labels?: {
    targetDate: string
    days: string
    hours: string
    minutes: string
    seconds: string
    timesUp: string
    setTarget: string
  }
}

export default function CountdownTimer({ labels }: CountdownTimerProps) {
  const l = {
    targetDate: labels?.targetDate ?? 'Target Date & Time',
    days: labels?.days ?? 'Days',
    hours: labels?.hours ?? 'Hours',
    minutes: labels?.minutes ?? 'Minutes',
    seconds: labels?.seconds ?? 'Seconds',
    timesUp: labels?.timesUp ?? "Time's up!",
    setTarget: labels?.setTarget ?? 'Set Target',
  }

  const getDefaultTarget = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().slice(0, 16)
  }

  const [targetStr, setTargetStr] = useState(getDefaultTarget)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const targetMs = new Date(targetStr).getTime()
  const diff = Math.max(0, targetMs - now)
  const isUp = diff === 0

  const totalSec = Math.floor(diff / 1000)
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60

  const pad = (n: number) => String(n).padStart(2, '0')

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }
  const boxStyle: React.CSSProperties = {
    display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 1rem',
    borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)',
    minWidth: '5rem',
  }
  const numStyle: React.CSSProperties = {
    fontSize: '3rem', fontWeight: 700, fontFamily: "'Fira Code', monospace", lineHeight: 1,
    color: 'var(--color-primary)',
  }
  const unitStyle: React.CSSProperties = {
    fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', textTransform: 'uppercase',
    letterSpacing: '0.05em', fontWeight: 600,
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label style={labelStyle}>{l.targetDate}</label>
        <input
          type="datetime-local"
          style={inputStyle}
          value={targetStr}
          onChange={(e) => setTargetStr(e.target.value)}
        />
      </div>

      {isUp && targetStr ? (
        <div style={{
          padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)', textAlign: 'center',
        }}>
          <div className="text-3xl font-bold text-[var(--color-primary)]">
            {l.timesUp}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          <div style={boxStyle}>
            <div style={numStyle}>{d}</div>
            <div style={unitStyle}>{l.days}</div>
          </div>
          <div style={boxStyle}>
            <div style={numStyle}>{pad(h)}</div>
            <div style={unitStyle}>{l.hours}</div>
          </div>
          <div style={boxStyle}>
            <div style={numStyle}>{pad(m)}</div>
            <div style={unitStyle}>{l.minutes}</div>
          </div>
          <div style={boxStyle}>
            <div style={numStyle}>{pad(s)}</div>
            <div style={unitStyle}>{l.seconds}</div>
          </div>
        </div>
      )}

      {/* Separator between boxes */}
      <div style={{
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center',
        fontSize: '0.8rem', color: 'var(--color-text-secondary)',
      }}>
        {!isUp && targetStr && (
          <span>
            {d > 0 ? `${d}d ` : ''}{pad(h)}:{pad(m)}:{pad(s)} remaining
          </span>
        )}
      </div>
    </div>
  )
}
