'use client'
import { useState } from 'react'

interface PercentageCalculatorProps {
  labels?: {
    whatIsXPercentOfY: string
    xIsWhatPercentOfY: string
    percentChange: string
    value: string
    percent: string
    of: string
    is: string
    result: string
    from: string
    to: string
    change: string
    increase: string
    decrease: string
  }
}

export default function PercentageCalculator({ labels }: PercentageCalculatorProps) {
  const l = {
    whatIsXPercentOfY: labels?.whatIsXPercentOfY ?? 'What is X% of Y?',
    xIsWhatPercentOfY: labels?.xIsWhatPercentOfY ?? 'X is what % of Y?',
    percentChange: labels?.percentChange ?? 'Percentage Change',
    value: labels?.value ?? 'Value',
    percent: labels?.percent ?? '%',
    of: labels?.of ?? 'of',
    is: labels?.is ?? 'is',
    result: labels?.result ?? 'Result',
    from: labels?.from ?? 'From',
    to: labels?.to ?? 'To',
    change: labels?.change ?? 'Change',
    increase: labels?.increase ?? 'Increase',
    decrease: labels?.decrease ?? 'Decrease',
  }

  const [pct1, setPct1] = useState(25)
  const [val1, setVal1] = useState(200)
  const [val2a, setVal2a] = useState(50)
  const [val2b, setVal2b] = useState(200)
  const [from, setFrom] = useState(80)
  const [to, setTo] = useState(100)

  const result1 = (pct1 / 100) * val1
  const result2 = val2b !== 0 ? (val2a / val2b) * 100 : 0
  const result3 = from !== 0 ? ((to - from) / from) * 100 : 0

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const cardStyle: React.CSSProperties = {
    padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
  }
  const resultStyle: React.CSSProperties = {
    fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', textAlign: 'center', marginTop: '0.75rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* What is X% of Y */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.whatIsXPercentOfY}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={pct1} onChange={(e) => setPct1(Number(e.target.value))} />
          <span style={{ fontWeight: 500 }}>{l.percent} {l.of}</span>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={val1} onChange={(e) => setVal1(Number(e.target.value))} />
          <span style={{ fontWeight: 500 }}>=</span>
        </div>
        <div style={resultStyle}>{result1.toLocaleString('en-US', { maximumFractionDigits: 4 })}</div>
      </div>

      {/* X is what % of Y */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.xIsWhatPercentOfY}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={val2a} onChange={(e) => setVal2a(Number(e.target.value))} />
          <span style={{ fontWeight: 500 }}>{l.is} __% {l.of}</span>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={val2b} onChange={(e) => setVal2b(Number(e.target.value))} />
        </div>
        <div style={resultStyle}>{result2.toFixed(2)}%</div>
      </div>

      {/* Percentage change */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.percentChange}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{l.from}</span>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={from} onChange={(e) => setFrom(Number(e.target.value))} />
          <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>{l.to}</span>
          <input type="number" style={{ ...inputStyle, width: '120px' }} value={to} onChange={(e) => setTo(Number(e.target.value))} />
        </div>
        <div style={{ ...resultStyle, color: result3 >= 0 ? 'var(--color-success)' : 'var(--color-error)' }}>
          {result3 >= 0 ? '+' : ''}{result3.toFixed(2)}%
          <span style={{ fontSize: '1rem', fontWeight: 500, marginLeft: '0.5rem' }}>
            ({result3 >= 0 ? l.increase : l.decrease})
          </span>
        </div>
      </div>
    </div>
  )
}
