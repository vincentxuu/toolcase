'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

interface PomodoroTimerProps {
  labels?: {
    workDuration: string
    breakDuration: string
    start: string
    pause: string
    reset: string
    work: string
    breakLabel: string
    sessionsCompleted: string
    minutes: string
  }
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    gain.gain.value = 0.3
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.3)
    setTimeout(() => {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.frequency.value = 1000
      osc2.type = 'sine'
      gain2.gain.value = 0.3
      osc2.start()
      osc2.stop(ctx.currentTime + 0.3)
    }, 350)
  } catch {
    // Web Audio API not supported
  }
}

export default function PomodoroTimer({ labels }: PomodoroTimerProps) {
  const l = {
    workDuration: labels?.workDuration ?? 'Work Duration',
    breakDuration: labels?.breakDuration ?? 'Break Duration',
    start: labels?.start ?? 'Start',
    pause: labels?.pause ?? 'Pause',
    reset: labels?.reset ?? 'Reset',
    work: labels?.work ?? 'Work',
    breakLabel: labels?.breakLabel ?? 'Break',
    sessionsCompleted: labels?.sessionsCompleted ?? 'Sessions Completed',
    minutes: labels?.minutes ?? 'min',
  }

  const [workMins, setWorkMins] = useState(25)
  const [breakMins, setBreakMins] = useState(5)
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isWork, setIsWork] = useState(true)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalSeconds = isWork ? workMins * 60 : breakMins * 60
  const progress = totalSeconds > 0 ? (totalSeconds - timeLeft) / totalSeconds : 0

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playBeep()
            if (isWork) {
              setSessions((s) => s + 1)
              setIsWork(false)
              return breakMins * 60
            } else {
              setIsWork(true)
              return workMins * 60
            }
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, isWork, workMins, breakMins])

  const handleStart = useCallback(() => setIsRunning(true), [])
  const handlePause = useCallback(() => setIsRunning(false), [])
  const handleReset = useCallback(() => {
    setIsRunning(false)
    setIsWork(true)
    setTimeLeft(workMins * 60)
    setSessions(0)
  }, [workMins])

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '70px',
  }

  // SVG circle dimensions
  const size = 220
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  const activeColor = isWork ? 'var(--color-primary, #3b82f6)' : '#22c55e'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="flex items-center gap-2">
          <label style={labelStyle}>{l.workDuration}:</label>
          <input
            type="number"
            value={workMins}
            onChange={(e) => {
              const v = Math.max(1, Number(e.target.value))
              setWorkMins(v)
              if (isWork && !isRunning) setTimeLeft(v * 60)
            }}
            min={1}
            max={120}
            style={inputStyle}
            disabled={isRunning}
          />
          <span className="text-xs text-[var(--color-text-secondary)]">{l.minutes}</span>
        </div>
        <div className="flex items-center gap-2">
          <label style={labelStyle}>{l.breakDuration}:</label>
          <input
            type="number"
            value={breakMins}
            onChange={(e) => {
              const v = Math.max(1, Number(e.target.value))
              setBreakMins(v)
              if (!isWork && !isRunning) setTimeLeft(v * 60)
            }}
            min={1}
            max={60}
            style={inputStyle}
            disabled={isRunning}
          />
          <span className="text-xs text-[var(--color-text-secondary)]">{l.minutes}</span>
        </div>
      </div>

      {/* Circular progress */}
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: activeColor,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            {isWork ? l.work : l.breakLabel}
          </span>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            fontFamily: 'monospace',
            color: 'var(--color-text)',
          }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!isRunning ? (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleStart}>{l.start}</button>
        ) : (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handlePause}>{l.pause}</button>
        )}
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleReset}>{l.reset}</button>
      </div>

      {/* Sessions counter */}
      <div style={{
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}>
        <span style={labelStyle}>{l.sessionsCompleted}: </span>
        <span style={{ color: 'var(--color-text)', fontWeight: 700, fontSize: '1.25rem' }}>{sessions}</span>
      </div>
    </div>
  )
}
