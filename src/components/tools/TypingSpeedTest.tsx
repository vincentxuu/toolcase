'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

interface TypingSpeedTestProps {
  labels?: {
    start: string
    restart: string
    wpm: string
    accuracy: string
    time: string
    seconds: string
    typingTest: string
    typeBelow: string
    results: string
    grossWpm: string
    netWpm: string
    correctChars: string
    totalChars: string
  }
}

const sampleTexts = [
  'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once, making it a popular typing test phrase.',
  'Programming is the art of telling a computer what to do. Every great developer was once a beginner who refused to give up and kept practicing day after day.',
  'The best way to predict the future is to create it. Innovation distinguishes between a leader and a follower, so keep pushing the boundaries of what is possible.',
  'In the middle of difficulty lies opportunity. Success is not final, failure is not fatal. It is the courage to continue that counts in the end.',
  'Technology is best when it brings people together. The web does not just connect machines, it connects people. Every click and every keystroke matters.',
  'A journey of a thousand miles begins with a single step. The only way to do great work is to love what you do and never settle for less than excellence.',
  'Knowledge is power, but enthusiasm pulls the switch. Stay curious, stay hungry, and never stop learning new things. The world rewards those who keep growing.',
]

export default function TypingSpeedTest({ labels }: TypingSpeedTestProps) {
  const l = {
    start: labels?.start ?? 'Start Test',
    restart: labels?.restart ?? 'Restart',
    wpm: labels?.wpm ?? 'WPM',
    accuracy: labels?.accuracy ?? 'Accuracy',
    time: labels?.time ?? 'Time',
    seconds: labels?.seconds ?? 'seconds',
    typingTest: labels?.typingTest ?? 'Typing Speed Test',
    typeBelow: labels?.typeBelow ?? 'Type the text below:',
    results: labels?.results ?? 'Results',
    grossWpm: labels?.grossWpm ?? 'Gross WPM',
    netWpm: labels?.netWpm ?? 'Net WPM',
    correctChars: labels?.correctChars ?? 'Correct Characters',
    totalChars: labels?.totalChars ?? 'Total Characters',
  }

  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle')
  const [sampleText, setSampleText] = useState('')
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const pickRandom = useCallback(() => {
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
  }, [])

  const startTest = useCallback(() => {
    const text = pickRandom()
    setSampleText(text)
    setTyped('')
    setElapsed(0)
    setStatus('running')
    setStartTime(Date.now())
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [pickRandom])

  const finishTest = useCallback(() => {
    setStatus('finished')
    if (timerRef.current) clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        const now = Date.now()
        const sec = Math.floor((now - startTime) / 1000)
        setElapsed(sec)
        if (sec >= 60) {
          finishTest()
        }
      }, 200)
      return () => { if (timerRef.current) clearInterval(timerRef.current) }
    }
  }, [status, startTime, finishTest])

  const handleType = (value: string) => {
    if (status !== 'running') return
    setTyped(value)
    if (value.length >= sampleText.length) {
      finishTest()
    }
  }

  const correctChars = (() => {
    let count = 0
    for (let i = 0; i < typed.length && i < sampleText.length; i++) {
      if (typed[i] === sampleText[i]) count++
    }
    return count
  })()

  const totalTyped = typed.length
  const accuracyPct = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0
  const timeMin = elapsed > 0 ? elapsed / 60 : 0
  const grossWpm = timeMin > 0 ? Math.round((totalTyped / 5) / timeMin) : 0
  const errorChars = totalTyped - correctChars
  const netWpm = timeMin > 0 ? Math.max(0, Math.round(((totalTyped / 5) - errorChars) / timeMin)) : 0

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const btnStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none',
    backgroundColor: 'var(--color-primary)', color: '#fff', cursor: 'pointer',
    fontSize: '1rem', fontWeight: 600,
  }
  const cardStyle: React.CSSProperties = {
    padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)', textAlign: 'center',
  }

  const renderHighlightedText = () => {
    return sampleText.split('').map((char, i) => {
      let color = 'var(--color-text-secondary)'
      if (i < typed.length) {
        color = typed[i] === char ? '#10b981' : '#ef4444'
      }
      const bg = i === typed.length ? 'rgba(59, 130, 246, 0.2)' : 'transparent'
      return (
        <span key={i} style={{ color, backgroundColor: bg, borderRadius: '2px' }}>
          {char}
        </span>
      )
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {status === 'idle' && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            {l.typingTest}
          </div>
          <button style={btnStyle} onClick={startTest}>{l.start}</button>
        </div>
      )}

      {status === 'running' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.wpm}</div>
              <div className="text-3xl font-bold text-[var(--color-primary)]">{grossWpm}</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.accuracy}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: accuracyPct >= 90 ? '#10b981' : accuracyPct >= 70 ? '#f59e0b' : '#ef4444' }}>{accuracyPct}%</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.time}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>{elapsed}<span className="text-sm text-[var(--color-text-secondary)]">s</span></div>
            </div>
          </div>

          <div style={{
            padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', fontSize: '1.125rem', lineHeight: 2,
            fontFamily: "'Fira Code', monospace", letterSpacing: '0.02em',
          }}>
            {renderHighlightedText()}
          </div>

          <div>
            <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">
              {l.typeBelow}
            </label>
            <textarea
              ref={inputRef}
              style={{ ...inputStyle, minHeight: '100px', fontFamily: "'Fira Code', monospace", lineHeight: 1.7 }}
              value={typed}
              onChange={(e) => handleType(e.target.value)}
              onPaste={(e) => e.preventDefault()}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </>
      )}

      {status === 'finished' && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{l.results}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.grossWpm}</div>
              <div className="text-4xl font-bold text-[var(--color-primary)]">{grossWpm}</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.netWpm}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981' }}>{netWpm}</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.accuracy}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: accuracyPct >= 90 ? '#10b981' : accuracyPct >= 70 ? '#f59e0b' : '#ef4444' }}>{accuracyPct}%</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.time}</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{elapsed}<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>s</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.correctChars}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{correctChars}</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalChars}</div>
              <div className="text-2xl font-bold">{totalTyped}</div>
            </div>
          </div>

          <div className="text-center">
            <button style={btnStyle} onClick={startTest}>{l.restart}</button>
          </div>
        </>
      )}
    </div>
  )
}
