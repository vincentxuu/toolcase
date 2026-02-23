'use client'
import { useState, useRef, useEffect, useCallback } from 'react'

interface StopwatchProps {
  labels?: {
    start: string
    stop: string
    reset: string
    lap: string
    lapNumber: string
    lapTime: string
    totalTime: string
  }
}

interface Lap {
  lapTime: number
  totalTime: number
}

function formatTime(ms: number): string {
  const totalMs = Math.floor(ms)
  const h = Math.floor(totalMs / 3600000)
  const m = Math.floor((totalMs % 3600000) / 60000)
  const s = Math.floor((totalMs % 60000) / 1000)
  const cs = Math.floor((totalMs % 1000) / 10)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`
}

export default function Stopwatch({ labels }: StopwatchProps) {
  const l = {
    start: labels?.start ?? 'Start',
    stop: labels?.stop ?? 'Stop',
    reset: labels?.reset ?? 'Reset',
    lap: labels?.lap ?? 'Lap',
    lapNumber: labels?.lapNumber ?? '#',
    lapTime: labels?.lapTime ?? 'Lap Time',
    totalTime: labels?.totalTime ?? 'Total Time',
  }

  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<Lap[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const accumulatedRef = useRef(0)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleStart = useCallback(() => {
    startTimeRef.current = Date.now()
    accumulatedRef.current = elapsed
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setElapsed(accumulatedRef.current + (Date.now() - startTimeRef.current))
    }, 10)
  }, [elapsed])

  const handleStop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    accumulatedRef.current = elapsed
    setRunning(false)
  }, [elapsed])

  const handleReset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setRunning(false)
    setElapsed(0)
    setLaps([])
    accumulatedRef.current = 0
    startTimeRef.current = 0
  }, [])

  const handleLap = useCallback(() => {
    const lastLapTotal = laps.length > 0 ? laps[0].totalTime : 0
    setLaps((prev) => [{ lapTime: elapsed - lastLapTotal, totalTime: elapsed }, ...prev])
  }, [elapsed, laps])

  const btnBase: React.CSSProperties = {
    padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '0.875rem',
    cursor: 'pointer', border: 'none', flex: 1, textAlign: 'center',
  }
  const btnPrimary: React.CSSProperties = {
    ...btnBase, backgroundColor: 'var(--color-primary)', color: 'white',
  }
  const btnSecondary: React.CSSProperties = {
    ...btnBase, backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  }
  const btnDanger: React.CSSProperties = {
    ...btnBase, backgroundColor: '#ef4444', color: 'white',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Time display */}
      <div style={{
        padding: '2rem 1rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '3.5rem', fontWeight: 700, fontFamily: "'Fira Code', monospace",
          color: 'var(--color-text)', letterSpacing: '0.05em', lineHeight: 1,
        }}>
          {formatTime(elapsed)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!running ? (
          <button style={btnPrimary} onClick={handleStart}>{l.start}</button>
        ) : (
          <button style={{ ...btnBase, backgroundColor: '#f59e0b', color: 'white' }} onClick={handleStop}>{l.stop}</button>
        )}
        <button
          style={btnSecondary}
          onClick={handleLap}
          disabled={!running}
        >
          {l.lap}
        </button>
        <button style={btnDanger} onClick={handleReset}>{l.reset}</button>
      </div>

      {/* Lap list */}
      {laps.length > 0 && (
        <div style={{
          borderRadius: '0.75rem', border: '1px solid var(--color-border)', overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '3rem 1fr 1fr', gap: '0.5rem', padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={labelStyle}>{l.lapNumber}</span>
            <span style={{ ...labelStyle, textAlign: 'right' }}>{l.lapTime}</span>
            <span style={{ ...labelStyle, textAlign: 'right' }}>{l.totalTime}</span>
          </div>
          <div style={{ maxHeight: '15rem', overflowY: 'auto' }}>
            {laps.map((lap, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '3rem 1fr 1fr', gap: '0.5rem', padding: '0.625rem 1rem',
                borderBottom: i < laps.length - 1 ? '1px solid var(--color-border)' : 'none',
                fontSize: '0.875rem',
              }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>{laps.length - i}</span>
                <span style={{ textAlign: 'right', fontFamily: "'Fira Code', monospace" }}>{formatTime(lap.lapTime)}</span>
                <span style={{ textAlign: 'right', fontFamily: "'Fira Code', monospace", color: 'var(--color-text-secondary)' }}>{formatTime(lap.totalTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
