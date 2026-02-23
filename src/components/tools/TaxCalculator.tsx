'use client'
import { useState, useMemo } from 'react'

// ─── US Tax Data (2024) ───
const US_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
]

const US_BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
]

const US_STANDARD_DEDUCTION = { single: 14600, married: 29200 }

// ─── Taiwan Tax Data (113年度 / 2024) ───
const TW_BRACKETS = [
  { min: 0, max: 590000, rate: 0.05 },
  { min: 590000, max: 1330000, rate: 0.12 },
  { min: 1330000, max: 2660000, rate: 0.20 },
  { min: 2660000, max: 4980000, rate: 0.30 },
  { min: 4980000, max: Infinity, rate: 0.40 },
]

const TW_EXEMPTION = 97000
const TW_EXEMPTION_SENIOR = 145500
const TW_STANDARD_DEDUCTION = { single: 131000, married: 262000 }
const TW_SALARY_DEDUCTION = 218000

type TaxSystem = 'us' | 'tw'
type FilingStatus = 'single' | 'married'

const DEFAULT_INCOME: Record<TaxSystem, number> = { us: 75000, tw: 1000000 }

interface Props {
  defaultTaxSystem?: TaxSystem
  labels?: {
    taxSystem?: string; us?: string; taiwan?: string
    grossIncome?: string; filingStatus?: string; single?: string; married?: string
    deductions?: string; standardDeduction?: string; itemized?: string
    deductionAmount?: string; calculate?: string
    taxableIncome?: string; totalTax?: string; effectiveRate?: string; afterTax?: string
    bracketBreakdown?: string; bracket?: string; taxableAt?: string; taxAmount?: string
    // Taiwan specific
    exemptions?: string; generalExemptions?: string; seniorExemptions?: string
    salaryDeduction?: string; salaryEarners?: string
    deductionSummary?: string; exemptionSubtotal?: string; deductionSubtotal?: string
    specialDeductionSubtotal?: string; netTaxableIncome?: string; person?: string
  }
}

export default function TaxCalculator({ defaultTaxSystem = 'us', labels }: Props) {
  const l = {
    taxSystem: labels?.taxSystem ?? 'Tax System',
    us: labels?.us ?? 'US Federal',
    taiwan: labels?.taiwan ?? 'Taiwan',
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
    totalTax: labels?.totalTax ?? 'Total Tax',
    effectiveRate: labels?.effectiveRate ?? 'Effective Tax Rate',
    afterTax: labels?.afterTax ?? 'After-Tax Income',
    bracketBreakdown: labels?.bracketBreakdown ?? 'Tax Bracket Breakdown',
    bracket: labels?.bracket ?? 'Bracket',
    taxableAt: labels?.taxableAt ?? 'Taxable Amount',
    taxAmount: labels?.taxAmount ?? 'Tax',
    exemptions: labels?.exemptions ?? 'Exemptions',
    generalExemptions: labels?.generalExemptions ?? 'General Exemptions',
    seniorExemptions: labels?.seniorExemptions ?? 'Senior (70+) Exemptions',
    salaryDeduction: labels?.salaryDeduction ?? 'Salary Income Deduction',
    salaryEarners: labels?.salaryEarners ?? 'Salary Earners',
    deductionSummary: labels?.deductionSummary ?? 'Deduction Summary',
    exemptionSubtotal: labels?.exemptionSubtotal ?? 'Exemption Subtotal',
    deductionSubtotal: labels?.deductionSubtotal ?? 'Deduction Subtotal',
    specialDeductionSubtotal: labels?.specialDeductionSubtotal ?? 'Special Deduction Subtotal',
    netTaxableIncome: labels?.netTaxableIncome ?? 'Net Taxable Income',
    person: labels?.person ?? 'persons',
  }

  const [system, setSystem] = useState<TaxSystem>(defaultTaxSystem)
  const [income, setIncome] = useState(DEFAULT_INCOME[defaultTaxSystem])
  const [filing, setFiling] = useState<FilingStatus>('single')
  const [deductionType, setDeductionType] = useState<'standard' | 'itemized'>('standard')
  const [itemizedAmount, setItemizedAmount] = useState(0)

  // Taiwan specific
  const [twExemptions, setTwExemptions] = useState(1)
  const [twSeniorExemptions, setTwSeniorExemptions] = useState(0)
  const [twSalaryEarners, setTwSalaryEarners] = useState(1)

  const handleSystemChange = (newSystem: TaxSystem) => {
    if (newSystem === system) return
    setSystem(newSystem)
    setIncome(DEFAULT_INCOME[newSystem])
    setFiling('single')
    setDeductionType('standard')
    setItemizedAmount(0)
    setTwExemptions(1)
    setTwSeniorExemptions(0)
    setTwSalaryEarners(1)
  }

  const handleFilingChange = (newFiling: FilingStatus) => {
    setFiling(newFiling)
    if (system === 'tw') {
      if (newFiling === 'married') {
        setTwExemptions(2)
        setTwSalaryEarners(2)
      } else {
        setTwExemptions(1)
        setTwSalaryEarners(1)
      }
      setTwSeniorExemptions(0)
    }
  }

  const result = useMemo(() => {
    if (system === 'us') {
      const deduction = deductionType === 'standard' ? US_STANDARD_DEDUCTION[filing] : itemizedAmount
      const taxableIncome = Math.max(0, income - deduction)
      const brackets = filing === 'single' ? US_BRACKETS_SINGLE : US_BRACKETS_MARRIED

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
    }

    // Taiwan calculation
    const generalCount = Math.max(0, twExemptions - twSeniorExemptions)
    const exemptionTotal = generalCount * TW_EXEMPTION + twSeniorExemptions * TW_EXEMPTION_SENIOR
    const deduction = deductionType === 'standard' ? TW_STANDARD_DEDUCTION[filing] : itemizedAmount
    const salaryTotal = twSalaryEarners * TW_SALARY_DEDUCTION
    const taxableIncome = Math.max(0, income - exemptionTotal - deduction - salaryTotal)

    let totalTax = 0
    const breakdown: { rate: number; taxable: number; tax: number }[] = []

    for (const b of TW_BRACKETS) {
      if (taxableIncome <= b.min) break
      const taxable = Math.min(taxableIncome, b.max) - b.min
      const tax = taxable * b.rate
      totalTax += tax
      breakdown.push({ rate: b.rate, taxable, tax })
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0
    const afterTax = income - totalTax

    return {
      taxableIncome, totalTax, effectiveRate, afterTax, breakdown,
      deduction, exemptionTotal, salaryTotal,
    }
  }, [income, filing, deductionType, itemizedAmount, system, twExemptions, twSeniorExemptions, twSalaryEarners])

  const currencySymbol = system === 'us' ? '$' : 'NT$'
  const fmt = (n: number) => {
    if (system === 'tw') return n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }
  const tabBase: React.CSSProperties = { flex: 1, padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s' }
  const tabActive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
  const tabInactive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }

  const standardDeductionAmount = system === 'us' ? US_STANDARD_DEDUCTION[filing] : TW_STANDARD_DEDUCTION[filing]

  return (
    <div className="flex flex-col gap-6">
      {/* Tax System Toggle */}
      <div>
        <label style={labelStyle}>{l.taxSystem}</label>
        <div className="flex gap-2">
          <button style={system === 'us' ? tabActive : tabInactive} onClick={() => handleSystemChange('us')}>
            {l.us}
          </button>
          <button style={system === 'tw' ? tabActive : tabInactive} onClick={() => handleSystemChange('tw')}>
            {l.taiwan}
          </button>
        </div>
      </div>

      {/* Income & Filing Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.grossIncome}</label>
          <input type="number" style={inputStyle} value={income} onChange={(e) => setIncome(Number(e.target.value))} min={0} step={system === 'tw' ? 10000 : 1000} />
        </div>
        <div>
          <label style={labelStyle}>{l.filingStatus}</label>
          <select style={inputStyle} value={filing} onChange={(e) => handleFilingChange(e.target.value as FilingStatus)}>
            <option value="single">{l.single}</option>
            <option value="married">{l.married}</option>
          </select>
        </div>
      </div>

      {/* Taiwan: Exemptions */}
      {system === 'tw' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>{l.generalExemptions}</label>
            <input type="number" style={inputStyle} value={twExemptions} onChange={(e) => {
              const v = Math.max(1, Number(e.target.value))
              setTwExemptions(v)
              if (twSeniorExemptions > v) setTwSeniorExemptions(v)
            }} min={1} max={20} />
          </div>
          <div>
            <label style={labelStyle}>{l.seniorExemptions}</label>
            <input type="number" style={inputStyle} value={twSeniorExemptions} onChange={(e) => setTwSeniorExemptions(Math.min(twExemptions, Math.max(0, Number(e.target.value))))} min={0} max={twExemptions} />
          </div>
        </div>
      )}

      {/* Deductions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.deductions}</label>
          <select style={inputStyle} value={deductionType} onChange={(e) => setDeductionType(e.target.value as 'standard' | 'itemized')}>
            <option value="standard">{l.standardDeduction} ({currencySymbol}{fmt(standardDeductionAmount)})</option>
            <option value="itemized">{l.itemized}</option>
          </select>
        </div>
        {deductionType === 'itemized' && (
          <div>
            <label style={labelStyle}>{l.deductionAmount}</label>
            <input type="number" style={inputStyle} value={itemizedAmount} onChange={(e) => setItemizedAmount(Number(e.target.value))} min={0} step={system === 'tw' ? 1000 : 100} />
          </div>
        )}
      </div>

      {/* Taiwan: Salary Earners */}
      {system === 'tw' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>{l.salaryEarners}</label>
            <select style={inputStyle} value={twSalaryEarners} onChange={(e) => setTwSalaryEarners(Number(e.target.value))}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              {filing === 'married' && <option value={2}>2</option>}
            </select>
          </div>
        </div>
      )}

      {/* Taiwan: Deduction Summary */}
      {system === 'tw' && 'exemptionTotal' in result && (
        <div style={{ padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{l.deductionSummary}</div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span>{l.grossIncome}</span>
              <span className="font-semibold">{currencySymbol}{fmt(income)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>- {l.exemptionSubtotal} ({twExemptions}{l.person})</span>
              <span>{currencySymbol}{fmt(result.exemptionTotal as number)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>- {l.deductionSubtotal}</span>
              <span>{currencySymbol}{fmt(result.deduction as number)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-secondary)]">
              <span>- {l.specialDeductionSubtotal} ({twSalaryEarners}{l.person})</span>
              <span>{currencySymbol}{fmt(result.salaryTotal as number)}</span>
            </div>
            <div className="flex justify-between border-t-2 border-[var(--color-border)] pt-2 font-bold">
              <span>{l.netTaxableIncome}</span>
              <span>{currencySymbol}{fmt(result.taxableIncome)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Result Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">
            {system === 'tw' ? l.netTaxableIncome : l.taxableIncome}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>{currencySymbol}{fmt(result.taxableIncome)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalTax}</div>
          <div className="text-2xl font-bold text-red-500">{currencySymbol}{fmt(result.totalTax)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.effectiveRate}</div>
          <div className="text-2xl font-bold text-amber-500">{result.effectiveRate.toFixed(1)}%</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.afterTax}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{currencySymbol}{fmt(result.afterTax)}</div>
        </div>
      </div>

      {/* Bracket Breakdown */}
      <div>
        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.bracketBreakdown}</div>
        <table className="w-full border-collapse text-sm">
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
                <td className="p-2">{(b.rate * 100).toFixed(0)}%</td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>{currencySymbol}{fmt(b.taxable)}</td>
                <td style={{ padding: '0.5rem', textAlign: 'right', color: '#ef4444' }}>{currencySymbol}{fmt(b.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
