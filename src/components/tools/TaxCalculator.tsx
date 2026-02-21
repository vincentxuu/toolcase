'use client'
import { useState, useMemo } from 'react'

// 2024 US Federal Tax Brackets (Single & Married Filing Jointly)
const BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
]

const BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
]

const STANDARD_DEDUCTION = { single: 14600, married: 29200 }

interface Props {
  labels?: {
    grossIncome: string; filingStatus: string; single: string; married: string
    deductions: string; standardDeduction: string; itemized: string
    deductionAmount: string; calculate: string
    taxableIncome: string; totalTax: string; effectiveRate: string; afterTax: string
    bracketBreakdown: string; bracket: string; taxableAt: string; taxAmount: string
  }
}

export default function TaxCalculator({ labels }: Props) {
  const l = {
    grossIncome: labels?.grossIncome ?? 'Gross Annual Income',
    filingStatus: labels?.filingStatus ?? 'Filing Status',
    single: labels?.single ?? 'Single',
    married: labels?.married ?? 'Married Filing Jointly',
    deductions: labels?.deductions ?? 'Deductions',
    standardDeduction: labels?.standardDeduction ?? 'Standard Deduction',
    itemized: labels?.itemized ?? 'Itemized',
    deductionAmount: labels?.deductionAmount ?? 'Deduction Amount',
    calculate: labels?.calculate ?? 'Calculate',
    taxableIncome: labels?.taxableIncome ?? 'Taxable Income',
    totalTax: labels?.totalTax ?? 'Total Federal Tax',
    effectiveRate: labels?.effectiveRate ?? 'Effective Tax Rate',
    afterTax: labels?.afterTax ?? 'After-Tax Income',
    bracketBreakdown: labels?.bracketBreakdown ?? 'Tax Bracket Breakdown',
    bracket: labels?.bracket ?? 'Bracket',
    taxableAt: labels?.taxableAt ?? 'Taxable Amount',
    taxAmount: labels?.taxAmount ?? 'Tax',
  }

  const [income, setIncome] = useState(75000)
  const [filing, setFiling] = useState<'single' | 'married'>('single')
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard')
  const [itemizedAmount, setItemizedAmount] = useState(0)

  const result = useMemo(() => {
    const deduction = deductionType === 'standard' ? STANDARD_DEDUCTION[filing] : itemizedAmount
    const taxableIncome = Math.max(0, income - deduction)
    const brackets = filing === 'single' ? BRACKETS_SINGLE : BRACKETS_MARRIED

    let totalTax = 0
    const breakdown: { rate: number; taxable: number; tax: number }[] = []

    for (const b of brackets) {
      if (taxableIncome <= b.min) break
      const taxable = Math.min(taxableIncome, b.max) - b.min
      const tax = taxable * b.rate
      totalTax += tax
      breakdown.push({ rate: b.rate, taxable, tax })
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
    const afterTax = income - totalTax

    return { taxableIncome, totalTax, effectiveRate, afterTax, breakdown, deduction }
  }, [income, filing, deductionType, itemizedAmount])

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.grossIncome}</label>
          <input type="number" style={inputStyle} value={income} onChange={(e) => setIncome(Number(e.target.value))} min={0} step={1000} />
        </div>
        <div>
          <label style={labelStyle}>{l.filingStatus}</label>
          <select style={inputStyle} value={filing} onChange={(e) => setFiling(e.target.value as 'single' | 'married')}>
            <option value="single">{l.single}</option>
            <option value="married">{l.married}</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.deductions}</label>
          <select style={inputStyle} value={deductionType} onChange={(e) => setDeductionType(e.target.value as 'standard' | 'itemized')}>
            <option value="standard">{l.standardDeduction} (${fmt(STANDARD_DEDUCTION[filing])})</option>
            <option value="itemized">{l.itemized}</option>
          </select>
        </div>
        {deductionType === 'itemized' && (
          <div>
            <label style={labelStyle}>{l.deductionAmount}</label>
            <input type="number" style={inputStyle} value={itemizedAmount} onChange={(e) => setItemizedAmount(Number(e.target.value))} min={0} step={100} />
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.taxableIncome}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>${fmt(result.taxableIncome)}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.totalTax}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>${fmt(result.totalTax)}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.effectiveRate}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{result.effectiveRate.toFixed(1)}%</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.afterTax}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>${fmt(result.afterTax)}</div>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.bracketBreakdown}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{l.bracket}</th>
              <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{l.taxableAt}</th>
              <th style={{ textAlign: 'right', padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{l.taxAmount}</th>
            </tr>
          </thead>
          <tbody>
            {result.breakdown.map((b, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.5rem' }}>{(b.rate * 100).toFixed(0)}%</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>${fmt(b.taxable)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', color: '#ef4444' }}>${fmt(b.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
