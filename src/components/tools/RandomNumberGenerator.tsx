'use client'
import { useState, useEffect, useRef } from 'react'

interface RandomNumberGeneratorProps {
  labels?: {
    min: string
    max: string
    quantity: string
    allowDuplicates: string
    sortResults: string
    generate: string
    result: string
    results: string
  }
}

export default function RandomNumberGenerator({ labels }: RandomNumberGeneratorProps) {
  const l = {
    min: labels?.min ?? 'Minimum',
    max: labels?.max ?? 'Maximum',
    quantity: labels?.quantity ?? 'Quantity',
    allowDuplicates: labels?.allowDuplicates ?? 'Allow Duplicates',
    sortResults: labels?.sortResults ?? 'Sort Results',
    generate: labels?.generate ?? 'Generate',
    result: labels?.result ?? 'Result',
    results: labels?.results ?? 'Results',
  }

  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [quantity, setQuantity] = useState(1)
  const [allowDuplicates, setAllowDuplicates] = useState(true)
  const [sortResults, setSortResults] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [animating, setAnimating] = useState(false)
  const [displayNum, setDisplayNum] = useState<number | null>(null)
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [])

  const handleGenerate = () => {
    if (min > max) return
    if (!allowDuplicates && quantity > max - min + 1) return

    setAnimating(true)
    let count = 0
    animRef.current = setInterval(() => {
      setDisplayNum(Math.floor(Math.random() * (max - min + 1)) + min)
      count++
      if (count >= 15) {
        if (animRef.current) clearInterval(animRef.current)
        animRef.current = null
        setAnimating(false)

        let nums: number[] = []
        if (allowDuplicates) {
          for (let i = 0; i < quantity; i++) {
            nums.push(Math.floor(Math.random() * (max - min + 1)) + min)
          }
        } else {
          const pool: number[] = []
          for (let i = min; i <= max; i++) pool.push(i)
          for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]]
          }
          nums = pool.slice(0, quantity)
        }
        if (sortResults) nums.sort((a, b) => a - b)
        setResults(nums)
        setDisplayNum(nums[0])
      }
    }, 50)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }
  const toggleStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', userSelect: 'none',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
    border: active ? 'none' : '1px solid var(--color-border)',
    fontWeight: 500, fontSize: '0.875rem', textAlign: 'center',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.min}</label>
          <input type="number" style={inputStyle} value={min} onChange={(e) => setMin(Number(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>{l.max}</label>
          <input type="number" style={inputStyle} value={max} onChange={(e) => setMax(Number(e.target.value))} />
        </div>
        <div>
          <label style={labelStyle}>{l.quantity}</label>
          <input type="number" style={inputStyle} value={quantity} min={1} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} />
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div style={toggleStyle(allowDuplicates)} onClick={() => setAllowDuplicates(!allowDuplicates)}>
          {l.allowDuplicates}
        </div>
        <div style={toggleStyle(sortResults)} onClick={() => setSortResults(!sortResults)}>
          {l.sortResults}
        </div>
      </div>

      {/* Big number display */}
      <div style={{
        padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem', fontWeight: 700, fontFamily: "'Fira Code', monospace",
          color: animating ? 'var(--color-text-secondary)' : 'var(--color-primary)',
          lineHeight: 1, transition: 'color 0.2s',
        }}>
          {displayNum !== null ? displayNum : '?'}
        </div>
        {results.length > 0 && !animating && (
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
            {quantity === 1 ? l.result : l.results}
          </div>
        )}
      </div>

      {/* Generate button */}
      <button
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
        onClick={handleGenerate}
        disabled={animating}
        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}
      >
        {l.generate}
      </button>

      {/* Results list (when quantity > 1) */}
      {results.length > 1 && !animating && (
        <div style={{
          padding: '1rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {l.results} ({results.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((num, i) => (
              <span key={i} style={{
                padding: '0.5rem 0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--color-primary)',
                color: 'white', fontWeight: 600, fontSize: '0.875rem', fontFamily: "'Fira Code', monospace",
              }}>
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
