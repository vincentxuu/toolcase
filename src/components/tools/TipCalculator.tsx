'use client'
import { useState, useMemo } from 'react'

interface TipCalculatorProps {
  labels?: {
    billAmount: string
    tipPercent: string
    numberOfPeople: string
    tipAmount: string
    totalWithTip: string
    perPerson: string
    result: string
  }
}

const presetTips = [10, 15, 18, 20, 25]

export default function TipCalculator({ labels }: TipCalculatorProps) {
  const l = {
    billAmount: labels?.billAmount ?? 'Bill Amount',
    tipPercent: labels?.tipPercent ?? 'Tip Percentage',
    numberOfPeople: labels?.numberOfPeople ?? 'Number of People',
    tipAmount: labels?.tipAmount ?? 'Tip Amount',
    totalWithTip: labels?.totalWithTip ?? 'Total with Tip',
    perPerson: labels?.perPerson ?? 'Per Person',
    result: labels?.result ?? 'Result',
  }

  const [bill, setBill] = useState(85)
  const [tipPercent, setTipPercent] = useState(18)
  const [customTip, setCustomTip] = useState(false)
  const [people, setPeople] = useState(2)

  const result = useMemo(() => {
    const tipAmount = bill * (tipPercent / 100)
    const totalWithTip = bill + tipAmount
    const perPerson = people > 0 ? totalWithTip / people : totalWithTip
    return { tipAmount, totalWithTip, perPerson }
  }, [bill, tipPercent, people])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }
  const tipBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)', color: active ? '#fff' : 'var(--color-text)',
    cursor: 'pointer', fontWeight: active ? 700 : 500, fontSize: '0.875rem',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.billAmount}</label>
          <input type="number" style={inputStyle} value={bill} onChange={(e) => setBill(Number(e.target.value))} min={0} step={0.01} />
        </div>
        <div>
          <label style={labelStyle}>{l.numberOfPeople}</label>
          <input type="number" style={inputStyle} value={people} onChange={(e) => setPeople(Number(e.target.value))} min={1} max={100} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>{l.tipPercent}</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {presetTips.map((pct) => (
            <button
              key={pct}
              style={tipBtnStyle(!customTip && tipPercent === pct)}
              onClick={() => { setTipPercent(pct); setCustomTip(false) }}
            >
              {pct}%
            </button>
          ))}
          <button
            style={tipBtnStyle(customTip)}
            onClick={() => setCustomTip(true)}
          >
            Custom
          </button>
        </div>
        {customTip && (
          <div style={{ marginTop: '0.75rem' }}>
            <input type="number" style={{ ...inputStyle, width: '150px' }} value={tipPercent} onChange={(e) => setTipPercent(Number(e.target.value))} min={0} max={100} step={0.5} />
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.tipAmount}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f59e0b' }}>
            {result.tipAmount.toFixed(2)}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.totalWithTip}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            {result.totalWithTip.toFixed(2)}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.perPerson}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10b981' }}>
            {result.perPerson.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
