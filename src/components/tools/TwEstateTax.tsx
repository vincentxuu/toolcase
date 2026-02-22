'use client'
import { useState, useMemo } from 'react'

const ESTATE_TAX_BRACKETS = [
  { min: 0, max: 50000000, rate: 0.10, cumDeduction: 0 },
  { min: 50000000, max: 100000000, rate: 0.15, cumDeduction: 2500000 },
  { min: 100000000, max: Infinity, rate: 0.20, cumDeduction: 7500000 },
]

const ESTATE_DEDUCTIONS = {
  exemption: 13330000,         // 免稅額
  funeralExpense: 1380000,     // 喪葬費扣除額
  spouseDeduction: 5530000,    // 配偶扣除額
  adultChildDeduction: 560000, // 直系血親卑親屬扣除額（每人）
  parentDeduction: 1380000,    // 父母扣除額（每人）
  disabledDeduction: 6930000,  // 重度以上身心障礙扣除額（每人）
}

interface Props {
  labels?: {
    title?: string; desc?: string
    bracket?: string; rate?: string; cumDeduction?: string; formula?: string
    quickCalc?: string; estateValue?: string; taxDue?: string; effectiveRate?: string
    deductionsTitle?: string; item?: string; amount?: string
  }
}

export default function TwEstateTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '遺產稅級距表',
    desc: labels?.desc ?? '113年度（2024）適用',
    bracket: labels?.bracket ?? '遺產淨額級距',
    rate: labels?.rate ?? '稅率',
    cumDeduction: labels?.cumDeduction ?? '累進差額',
    formula: labels?.formula ?? '速算公式',
    quickCalc: labels?.quickCalc ?? '快速試算',
    estateValue: labels?.estateValue ?? '遺產淨額',
    taxDue: labels?.taxDue ?? '應納稅額',
    effectiveRate: labels?.effectiveRate ?? '有效稅率',
    deductionsTitle: labels?.deductionsTitle ?? '免稅額與扣除額',
    item: labels?.item ?? '項目',
    amount: labels?.amount ?? '金額',
  }

  const [estate, setEstate] = useState(30000000)

  const result = useMemo(() => {
    const taxable = Math.max(0, estate)
    let tax = 0
    for (const b of ESTATE_TAX_BRACKETS) {
      if (taxable <= b.max) {
        tax = taxable * b.rate - b.cumDeduction
        break
      }
    }
    tax = Math.max(0, tax)
    const effective = taxable > 0 ? (tax / taxable) * 100 : 0
    return { tax, effective }
  }, [estate])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.bracket}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.cumDeduction}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.formula}</th>
            </tr>
          </thead>
          <tbody>
            {ESTATE_TAX_BRACKETS.map((b, i) => (
              <tr key={i}>
                <td style={cellStyle}>NT${fmt(b.min)} ~ {b.max === Infinity ? '以上' : `NT$${fmt(b.max)}`}</td>
                <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{(b.rate * 100).toFixed(0)}%</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(b.cumDeduction)}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>遺產淨額 × {(b.rate * 100).toFixed(0)}% − {fmt(b.cumDeduction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deductions reference */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.deductionsTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.amount}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={cellStyle}>免稅額</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.exemption)}</td></tr>
            <tr><td style={cellStyle}>配偶扣除額</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.spouseDeduction)}</td></tr>
            <tr><td style={cellStyle}>直系血親卑親屬扣除額（每人）</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.adultChildDeduction)}</td></tr>
            <tr><td style={cellStyle}>父母扣除額（每人）</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.parentDeduction)}</td></tr>
            <tr><td style={cellStyle}>重度以上身心障礙扣除額（每人）</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.disabledDeduction)}</td></tr>
            <tr><td style={cellStyle}>喪葬費扣除額</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(ESTATE_DEDUCTIONS.funeralExpense)}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Quick Calculator */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickCalc}</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.estateValue}（扣除免稅額及扣除額後）</label>
          <input type="number" style={inputStyle} value={estate} onChange={e => setEstate(Number(e.target.value))} min={0} step={1000000} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.taxDue}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(result.tax)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.effectiveRate}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{result.effective.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
