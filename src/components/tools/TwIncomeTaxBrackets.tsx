'use client'
import { useState, useMemo } from 'react'

const BRACKETS_2024 = [
  { min: 0, max: 590000, rate: 0.05, cumDeduction: 0 },
  { min: 590000, max: 1330000, rate: 0.12, cumDeduction: 41300 },
  { min: 1330000, max: 2660000, rate: 0.20, cumDeduction: 147700 },
  { min: 2660000, max: 4980000, rate: 0.30, cumDeduction: 413700 },
  { min: 4980000, max: Infinity, rate: 0.40, cumDeduction: 911700 },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    bracket?: string; rate?: string; cumDeduction?: string
    quickCalc?: string; netIncome?: string; taxDue?: string; effectiveRate?: string
    year?: string
  }
}

export default function TwIncomeTaxBrackets({ labels }: Props) {
  const l = {
    title: labels?.title ?? '綜合所得稅級距表',
    desc: labels?.desc ?? '民國113年度（2024）適用',
    bracket: labels?.bracket ?? '所得淨額級距',
    rate: labels?.rate ?? '稅率',
    cumDeduction: labels?.cumDeduction ?? '累進差額',
    quickCalc: labels?.quickCalc ?? '快速試算',
    netIncome: labels?.netIncome ?? '綜合所得淨額',
    taxDue: labels?.taxDue ?? '應納稅額',
    effectiveRate: labels?.effectiveRate ?? '有效稅率',
    year: labels?.year ?? '年度',
  }

  const [income, setIncome] = useState(1000000)

  const result = useMemo(() => {
    let tax = 0
    let appliedRate = 0
    let cumDed = 0
    for (const b of BRACKETS_2024) {
      if (income <= b.max) {
        appliedRate = b.rate
        cumDed = b.cumDeduction
        tax = income * b.rate - b.cumDeduction
        break
      }
    }
    tax = Math.max(0, tax)
    const effective = income > 0 ? (tax / income) * 100 : 0
    return { tax, effective, appliedRate, cumDed }
  }, [income])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.bracket}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.cumDeduction}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>速算公式</th>
            </tr>
          </thead>
          <tbody>
            {BRACKETS_2024.map((b, i) => {
              const isActive = income > b.min && (i === BRACKETS_2024.length - 1 || income <= b.max)
              return (
                <tr key={i} style={isActive ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                  <td style={cellStyle}>
                    NT${fmt(b.min)} ~ {b.max === Infinity ? '以上' : `NT$${fmt(b.max)}`}
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {(b.rate * 100).toFixed(0)}%
                  </td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>
                    NT${fmt(b.cumDeduction)}
                  </td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    所得淨額 × {(b.rate * 100).toFixed(0)}% − {fmt(b.cumDeduction)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Quick Calculator */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickCalc}</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {l.netIncome}
          </label>
          <input type="number" style={inputStyle} value={income} onChange={e => setIncome(Number(e.target.value))} min={0} step={10000} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.taxDue}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(result.tax)}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {fmt(income)} × {(result.appliedRate * 100).toFixed(0)}% − {fmt(result.cumDed)}
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.effectiveRate}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{result.effective.toFixed(1)}%</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>稅後所得</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>NT${fmt(income - result.tax)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
