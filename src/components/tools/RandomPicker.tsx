'use client'
import { useState, useEffect, useRef } from 'react'

interface RandomPickerProps {
  labels?: {
    items: string
    itemsPlaceholder: string
    numberOfPicks: string
    pick: string
    result: string
    history: string
    clearHistory: string
  }
}

export default function RandomPicker({ labels }: RandomPickerProps) {
  const l = {
    items: labels?.items ?? 'Items',
    itemsPlaceholder: labels?.itemsPlaceholder ?? 'Enter items, one per line...',
    numberOfPicks: labels?.numberOfPicks ?? 'Number of Picks',
    pick: labels?.pick ?? 'Pick',
    result: labels?.result ?? 'Result',
    history: labels?.history ?? 'History',
    clearHistory: labels?.clearHistory ?? 'Clear History',
  }

  const [text, setText] = useState('')
  const [numPicks, setNumPicks] = useState(1)
  const [picked, setPicked] = useState<string[]>([])
  const [historyList, setHistoryList] = useState<{ picks: string[]; time: string }[]>([])
  const [animating, setAnimating] = useState(false)
  const [animDisplay, setAnimDisplay] = useState('')
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [])

  const getItems = () => text.split('\n').map((s) => s.trim()).filter(Boolean)

  const handlePick = () => {
    const items = getItems()
    if (items.length === 0) return
    const picks = Math.min(numPicks, items.length)

    setAnimating(true)
    setPicked([])
    let count = 0
    animRef.current = setInterval(() => {
      setAnimDisplay(items[Math.floor(Math.random() * items.length)])
      count++
      if (count >= 20) {
        if (animRef.current) clearInterval(animRef.current)
        animRef.current = null
        setAnimating(false)

        // Fisher-Yates to pick without replacement
        const pool = [...items]
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]]
        }
        const result = pool.slice(0, picks)
        setPicked(result)
        setAnimDisplay(result[0])
        setHistoryList((prev) => [
          { picks: result, time: new Date().toLocaleTimeString() },
          ...prev,
        ])
      }
    }, 60)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Items input */}
      <div>
        <label style={labelStyle}>{l.items}</label>
        <textarea
          style={{ ...inputStyle, minHeight: '8rem', resize: 'vertical', fontFamily: 'inherit' }}
          placeholder={l.itemsPlaceholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {text && (
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            {getItems().length} item{getItems().length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Number of picks */}
      <div>
        <label style={labelStyle}>{l.numberOfPicks}</label>
        <input
          type="number"
          style={inputStyle}
          value={numPicks}
          min={1}
          onChange={(e) => setNumPicks(Math.max(1, Number(e.target.value)))}
        />
      </div>

      {/* Big animated display */}
      <div style={{
        padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)', textAlign: 'center', minHeight: '5rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        {(animating || picked.length > 0) ? (
          <>
            <div style={{
              fontSize: '2.5rem', fontWeight: 700,
              color: animating ? 'var(--color-text-secondary)' : 'var(--color-primary)',
              lineHeight: 1.2, transition: 'color 0.2s', wordBreak: 'break-word',
            }}>
              {animating ? animDisplay : picked[0]}
            </div>
            {!animating && picked.length > 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                {picked.map((item, i) => (
                  <span key={i} style={{
                    padding: '0.5rem 0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--color-primary)',
                    color: 'white', fontWeight: 600, fontSize: '0.875rem',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>?</div>
        )}
      </div>

      {/* Pick button */}
      <button
        className="btn-primary"
        onClick={handlePick}
        disabled={animating || getItems().length === 0}
        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}
      >
        {l.pick}
      </button>

      {/* History */}
      {historyList.length > 0 && (
        <div style={{
          borderRadius: '0.75rem', border: '1px solid var(--color-border)', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1rem', backgroundColor: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{
              fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              {l.history}
            </span>
            <button
              onClick={() => setHistoryList([])}
              style={{
                background: 'none', border: 'none', color: 'var(--color-text-secondary)',
                cursor: 'pointer', fontSize: '0.75rem', padding: '0.25rem 0.5rem',
              }}
            >
              {l.clearHistory}
            </button>
          </div>
          <div style={{ maxHeight: '12rem', overflowY: 'auto' }}>
            {historyList.map((entry, i) => (
              <div key={i} style={{
                padding: '0.625rem 1rem', borderBottom: i < historyList.length - 1 ? '1px solid var(--color-border)' : 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem',
              }}>
                <span style={{ fontWeight: 500 }}>{entry.picks.join(', ')}</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
