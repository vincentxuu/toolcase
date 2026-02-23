'use client'
import { useState, useMemo } from 'react'

const GIFT_TAX_BRACKETS = [
  { min: 0, max: 25000000, rate: 0.10, cumDeduction: 0 },
  { min: 25000000, max: 50000000, rate: 0.15, cumDeduction: 1250000 },
  { min: 50000000, max: Infinity, rate: 0.20, cumDeduction: 3750000 },
]

const GIFT_EXEMPTION = 2440000 // 每年免稅額

interface Props {
  labels?: {
    title?: string; desc?: string
    bracket?: string; rate?: string; cumDeduction?: string; formula?: string
    quickCalc?: string; giftAmount?: string; taxDue?: string; effectiveRate?: string
    annualExemption?: string; taxableAmount?: string
  }
}

export default function TwGiftTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '贈與稅級距表',
    desc: labels?.desc ?? '113年度（2024）適用',
    bracket: labels?.bracket ?? '贈與淨額級距',
    rate: labels?.rate ?? '稅率',
    cumDeduction: labels?.cumDeduction ?? '累進差額',
    formula: labels?.formula ?? '速算公式',
    quickCalc: labels?.quickCalc ?? '快速試算',
    giftAmount: labels?.giftAmount ?? '贈與總額',
    taxDue: labels?.taxDue ?? '應納稅額',
    effectiveRate: labels?.effectiveRate ?? '有效稅率',
    annualExemption: labels?.annualExemption ?? '年度免稅額',
    taxableAmount: labels?.taxableAmount ?? '贈與淨額',
  }

  const [gift, setGift] = useState(5000000)

  const result = useMemo(() => {
    const taxable = Math.max(0, gift - GIFT_EXEMPTION)
    let tax = 0
    for (const b of GIFT_TAX_BRACKETS) {
      if (taxable <= b.max) {
        tax = taxable * b.rate - b.cumDeduction
        break
      }
    }
    tax = Math.max(0, tax)
    const effective = gift > 0 ? (tax / gift) * 100 : 0
    return { tax, effective, taxable }
  }, [gift])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      {/* Key info */}
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div className="text-sm">
          <strong>{l.annualExemption}：</strong>每人每年 NT${fmt(GIFT_EXEMPTION)}（贈與人計算，非受贈人）
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.bracket}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.cumDeduction}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.formula}</th>
            </tr>
          </thead>
          <tbody>
            {GIFT_TAX_BRACKETS.map((b, i) => (
              <tr key={i}>
                <td style={cellStyle}>NT${fmt(b.min)} ~ {b.max === Infinity ? '以上' : `NT$${fmt(b.max)}`}</td>
                <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{(b.rate * 100).toFixed(0)}%</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(b.cumDeduction)}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>贈與淨額 × {(b.rate * 100).toFixed(0)}% − {fmt(b.cumDeduction)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Calculator */}
      <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="text-base font-semibold mb-4">{l.quickCalc}</div>
        <div className="mb-4">
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.giftAmount}（年度累計）</label>
          <input type="number" style={inputStyle} value={gift} onChange={e => setGift(Number(e.target.value))} min={0} step={100000} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.taxableAmount}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>NT${fmt(result.taxable)}</div>
          </div>
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.taxDue}</div>
            <div className="text-2xl font-bold text-red-500">NT${fmt(result.tax)}</div>
          </div>
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.effectiveRate}</div>
            <div className="text-2xl font-bold text-amber-500">{result.effective.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
