'use client'
import { useState, useMemo, useEffect } from 'react'

interface TimezoneConverterProps {
  labels?: {
    sourceTimezone: string
    targetTimezone: string
    date: string
    time: string
    convertedTime: string
    currentTime: string
    timeDifference: string
    swap: string
    hours: string
  }
}

const TIMEZONES = [
  { id: 'UTC', label: 'UTC' },
  { id: 'America/New_York', label: 'New York (EST/EDT)' },
  { id: 'America/Chicago', label: 'Chicago (CST/CDT)' },
  { id: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT)' },
  { id: 'Europe/London', label: 'London (GMT/BST)' },
  { id: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { id: 'Asia/Dubai', label: 'Dubai (GST)' },
  { id: 'Asia/Kolkata', label: 'Kolkata (IST)' },
  { id: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { id: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)' },
  { id: 'Asia/Taipei', label: 'Taipei (CST)' },
  { id: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { id: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { id: 'Asia/Seoul', label: 'Seoul (KST)' },
  { id: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
  { id: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT)' },
]

function formatInTimezone(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function getTimezoneOffsetMinutes(date: Date, tz: string): number {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
  const tzStr = date.toLocaleString('en-US', { timeZone: tz })
  const utcDate = new Date(utcStr)
  const tzDate = new Date(tzStr)
  return (tzDate.getTime() - utcDate.getTime()) / 60000
}

export default function TimezoneConverter({ labels }: TimezoneConverterProps) {
  const l = {
    sourceTimezone: labels?.sourceTimezone ?? 'Source Timezone',
    targetTimezone: labels?.targetTimezone ?? 'Target Timezone',
    date: labels?.date ?? 'Date',
    time: labels?.time ?? 'Time',
    convertedTime: labels?.convertedTime ?? 'Converted Time',
    currentTime: labels?.currentTime ?? 'Current Time',
    timeDifference: labels?.timeDifference ?? 'Time Difference',
    swap: labels?.swap ?? 'Swap',
    hours: labels?.hours ?? 'hours',
  }

  const [sourceTz, setSourceTz] = useState('UTC')
  const [targetTz, setTargetTz] = useState('Asia/Taipei')
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    setDateStr(`${yyyy}-${mm}-${dd}`)
    const hh = String(today.getHours()).padStart(2, '0')
    const min = String(today.getMinutes()).padStart(2, '0')
    setTimeStr(`${hh}:${min}`)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const convertedResult = useMemo(() => {
    if (!dateStr || !timeStr) return null
    try {
      const sourceOffset = getTimezoneOffsetMinutes(new Date(), sourceTz)
      const [year, month, day] = dateStr.split('-').map(Number)
      const [hour, minute] = timeStr.split(':').map(Number)
      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute))
      const adjustedUtc = new Date(utcDate.getTime() - sourceOffset * 60000)
      const targetFormatted = formatInTimezone(adjustedUtc, targetTz)
      return targetFormatted
    } catch {
      return null
    }
  }, [dateStr, timeStr, sourceTz, targetTz])

  const timeDiff = useMemo(() => {
    const ref = new Date()
    const srcOffset = getTimezoneOffsetMinutes(ref, sourceTz)
    const tgtOffset = getTimezoneOffsetMinutes(ref, targetTz)
    const diffMinutes = tgtOffset - srcOffset
    const diffHours = diffMinutes / 60
    const sign = diffHours >= 0 ? '+' : ''
    return `${sign}${diffHours % 1 === 0 ? diffHours : diffHours.toFixed(1)} ${l.hours}`
  }, [sourceTz, targetTz, l.hours])

  const handleSwap = () => {
    setSourceTz(targetTz)
    setTargetTz(sourceTz)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '1rem',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.375rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Current time in both zones */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '0.75rem',
          border: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            {l.currentTime} - {TIMEZONES.find(t => t.id === sourceTz)?.label ?? sourceTz}
          </div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
            {formatInTimezone(now, sourceTz)}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '0.75rem',
          border: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
            {l.currentTime} - {TIMEZONES.find(t => t.id === targetTz)?.label ?? targetTz}
          </div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
            {formatInTimezone(now, targetTz)}
          </div>
        </div>
      </div>

      {/* Timezone selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'end' }}>
        <div>
          <label style={labelStyle}>{l.sourceTimezone}</label>
          <select style={inputStyle} value={sourceTz} onChange={(e) => setSourceTz(e.target.value)}>
            {TIMEZONES.map(tz => <option key={tz.id} value={tz.id}>{tz.label}</option>)}
          </select>
        </div>
        <button className="btn-secondary" onClick={handleSwap} style={{ marginBottom: '0.125rem' }}>⇄</button>
        <div>
          <label style={labelStyle}>{l.targetTimezone}</label>
          <select style={inputStyle} value={targetTz} onChange={(e) => setTargetTz(e.target.value)}>
            {TIMEZONES.map(tz => <option key={tz.id} value={tz.id}>{tz.label}</option>)}
          </select>
        </div>
      </div>

      {/* Date and time inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.date}</label>
          <input
            type="date"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{l.time}</label>
          <input
            type="time"
            value={timeStr}
            onChange={(e) => setTimeStr(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Result */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '0.75rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.convertedTime}</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
          {convertedResult ?? '--'}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.75rem' }}>
          {l.timeDifference}: {timeDiff}
        </div>
      </div>
    </div>
  )
}
