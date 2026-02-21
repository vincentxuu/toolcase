'use client'
import { useState, useCallback, useEffect } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface TimestampConverterProps {
  labels?: {
    copy: string
    copied: string
    currentTime: string
    unixToDate: string
    dateToUnix: string
    timestamp: string
    date: string
    seconds: string
    milliseconds: string
    localTime: string
    utcTime: string
    iso8601: string
    relative: string
  }
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const absDiff = Math.abs(diff)
  const future = diff < 0

  const seconds = Math.floor(absDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  let text: string
  if (years > 0) text = `${years} year${years > 1 ? 's' : ''}`
  else if (days > 0) text = `${days} day${days > 1 ? 's' : ''}`
  else if (hours > 0) text = `${hours} hour${hours > 1 ? 's' : ''}`
  else if (minutes > 0) text = `${minutes} minute${minutes > 1 ? 's' : ''}`
  else text = `${seconds} second${seconds > 1 ? 's' : ''}`

  return future ? `in ${text}` : `${text} ago`
}

export default function TimestampConverter({ labels }: TimestampConverterProps) {
  const l = {
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    currentTime: labels?.currentTime ?? 'Current Time',
    unixToDate: labels?.unixToDate ?? 'Unix Timestamp → Date',
    dateToUnix: labels?.dateToUnix ?? 'Date → Unix Timestamp',
    timestamp: labels?.timestamp ?? 'Timestamp',
    date: labels?.date ?? 'Date',
    seconds: labels?.seconds ?? 'Seconds',
    milliseconds: labels?.milliseconds ?? 'Milliseconds',
    localTime: labels?.localTime ?? 'Local Time',
    utcTime: labels?.utcTime ?? 'UTC Time',
    iso8601: labels?.iso8601 ?? 'ISO 8601',
    relative: labels?.relative ?? 'Relative',
  }

  const [now, setNow] = useState(new Date())
  const [tsInput, setTsInput] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [tsResult, setTsResult] = useState<{ local: string; utc: string; iso: string; relative: string } | null>(null)
  const [dateResult, setDateResult] = useState<{ seconds: string; milliseconds: string } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const convertTimestamp = useCallback(() => {
    if (!tsInput.trim()) return
    const num = parseInt(tsInput.trim())
    if (isNaN(num)) return
    // Detect seconds vs milliseconds
    const ms = num > 1e12 ? num : num * 1000
    const date = new Date(ms)
    if (isNaN(date.getTime())) return
    setTsResult({
      local: date.toLocaleString(),
      utc: date.toUTCString(),
      iso: date.toISOString(),
      relative: getRelativeTime(date),
    })
  }, [tsInput])

  const convertDate = useCallback(() => {
    if (!dateInput.trim()) return
    const date = new Date(dateInput.trim())
    if (isNaN(date.getTime())) return
    setDateResult({
      seconds: Math.floor(date.getTime() / 1000).toString(),
      milliseconds: date.getTime().toString(),
    })
  }, [dateInput])

  useEffect(() => {
    if (tsInput.trim()) {
      const timer = setTimeout(convertTimestamp, 300)
      return () => clearTimeout(timer)
    }
  }, [tsInput, convertTimestamp])

  useEffect(() => {
    if (dateInput.trim()) {
      const timer = setTimeout(convertDate, 300)
      return () => clearTimeout(timer)
    }
  }, [dateInput, convertDate])

  const nowTs = Math.floor(now.getTime() / 1000)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Current time display */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '0.75rem',
        border: '1px solid var(--color-border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.currentTime}</div>
        <div style={{ fontSize: '2rem', fontFamily: 'monospace', fontWeight: 700 }}>{nowTs}</div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{now.toLocaleString()}</div>
        <div style={{ marginTop: '0.75rem' }}>
          <CopyButton text={nowTs.toString()} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>

      {/* Timestamp → Date */}
      <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{l.unixToDate}</h3>
        <input
          type="text"
          placeholder="e.g. 1700000000"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.375rem',
            fontFamily: 'monospace',
            fontSize: '1rem',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        />
        {tsResult && (
          <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.375rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.localTime}:</span>
            <span style={{ fontFamily: 'monospace' }}>{tsResult.local}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.utcTime}:</span>
            <span style={{ fontFamily: 'monospace' }}>{tsResult.utc}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.iso8601}:</span>
            <span style={{ fontFamily: 'monospace' }}>{tsResult.iso}</span>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.relative}:</span>
            <span>{tsResult.relative}</span>
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '0.75rem' }}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{l.dateToUnix}</h3>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          style={{
            width: '100%',
            padding: '0.625rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        />
        {dateResult && (
          <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.375rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.seconds}:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'monospace' }}>{dateResult.seconds}</span>
              <CopyButton text={dateResult.seconds} label={l.copy} copiedLabel={l.copied} />
            </div>
            <span style={{ color: 'var(--color-text-secondary)' }}>{l.milliseconds}:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'monospace' }}>{dateResult.milliseconds}</span>
              <CopyButton text={dateResult.milliseconds} label={l.copy} copiedLabel={l.copied} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
