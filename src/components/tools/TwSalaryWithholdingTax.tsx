'use client'
import { useState, useMemo } from 'react'

// 薪資所得扣繳稅額表 - 114年度（2025）
// 簡化版：依月薪級距對應扣繳率
const WITHHOLDING_TABLE = [
  { min: 0, max: 40020, rate: 0, tax: 0 },
  { min: 40021, max: 60300, rate: 0.05, baseDesc: '薪資 × 5%' },
  { min: 60301, max: 63100, rate: 0, tax: 3020 },
  { min: 63101, max: 66700, rate: 0, tax: 3480 },
  { min: 66701, max: 69300, rate: 0, tax: 3960 },
  { min: 69301, max: 72400, rate: 0, tax: 4440 },
  { min: 72401, max: 76000, rate: 0, tax: 4920 },
  { min: 76001, max: 79500, rate: 0, tax: 5420 },
  { min: 79501, max: 83500, rate: 0, tax: 5920 },
  { min: 83501, max: 88500, rate: 0, tax: 6440 },
]

// 非居住者扣繳率
const NON_RESIDENT_RATES = [
  { type: '薪資所得', rate: 0.18, note: '全月薪資 ≤ 基本工資 1.5 倍：6%' },
  { type: '執行業務所得', rate: 0.20, note: '' },
  { type: '租金所得', rate: 0.20, note: '' },
  { type: '利息所得', rate: 0.20, note: '短期票券：15%' },
  { type: '股利所得', rate: 0.21, note: '' },
  { type: '權利金所得', rate: 0.20, note: '' },
  { type: '競技、機會中獎', rate: 0.20, note: '政府舉辦：扣繳率另計' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    residentTab?: string; nonResidentTab?: string
    monthlySalary?: string; monthlyWithholding?: string; annualEstimate?: string
    salaryRange?: string; withholdingAmount?: string; note?: string
    incomeType?: string; rate?: string
  }
}

export default function TwSalaryWithholdingTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '薪資扣繳稅額表',
    desc: labels?.desc ?? '114年度（2025）適用',
    residentTab: labels?.residentTab ?? '居住者',
    nonResidentTab: labels?.nonResidentTab ?? '非居住者',
    monthlySalary: labels?.monthlySalary ?? '每月薪資',
    monthlyWithholding: labels?.monthlyWithholding ?? '每月扣繳稅額',
    annualEstimate: labels?.annualEstimate ?? '全年估計扣繳',
    salaryRange: labels?.salaryRange ?? '薪資級距',
    withholdingAmount: labels?.withholdingAmount ?? '扣繳稅額',
    note: labels?.note ?? '備註',
    incomeType: labels?.incomeType ?? '所得類別',
    rate: labels?.rate ?? '扣繳率',
  }

  const [tab, setTab] = useState<'resident' | 'nonResident'>('resident')
  const [salary, setSalary] = useState(50000)

  const withholding = useMemo(() => {
    if (salary <= 40020) return 0
    if (salary <= 60300) return Math.round(salary * 0.05)
    for (const row of WITHHOLDING_TABLE) {
      if (salary >= row.min && salary <= row.max && row.tax) return row.tax
    }
    // 超過 88,500 的部分用 5% 概估
    return Math.round(salary * 0.05)
  }, [salary])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }
  const tabBase: React.CSSProperties = { flex: 1, padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s' }
  const tabActive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
  const tabInactive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <button style={tab === 'resident' ? tabActive : tabInactive} onClick={() => setTab('resident')}>{l.residentTab}</button>
        <button style={tab === 'nonResident' ? tabActive : tabInactive} onClick={() => setTab('nonResident')}>{l.nonResidentTab}</button>
      </div>

      {tab === 'resident' ? (
        <>
          {/* Quick calculator */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.monthlySalary}</label>
              <input type="number" style={inputStyle} value={salary} onChange={e => setSalary(Number(e.target.value))} min={0} step={1000} />
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.monthlyWithholding}</div>
              <div className="text-2xl font-bold text-red-500">NT${fmt(withholding)}</div>
            </div>
            <div style={cardStyle}>
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.annualEstimate}</div>
              <div className="text-2xl font-bold text-amber-500">NT${fmt(withholding * 12)}</div>
            </div>
          </div>

          {/* Reference table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th style={{ ...headerCell, textAlign: 'left' }}>{l.salaryRange}</th>
                  <th style={{ ...headerCell, textAlign: 'right' }}>{l.withholdingAmount}</th>
                  <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={cellStyle}>NT$0 ~ NT$40,020</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$0</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>免扣繳</td></tr>
                <tr><td style={cellStyle}>NT$40,021 ~ NT$60,300</td><td style={{ ...cellStyle, textAlign: 'right' }}>薪資 × 5%</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>按全月薪資 5% 扣繳</td></tr>
                <tr><td style={cellStyle}>NT$60,301 ~ NT$63,100</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$3,020</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$63,101 ~ NT$66,700</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$3,480</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$66,701 ~ NT$69,300</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$3,960</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$69,301 ~ NT$72,400</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$4,440</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$72,401 ~ NT$76,000</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$4,920</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$76,001 ~ NT$79,500</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$5,420</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$79,501 ~ NT$83,500</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$5,920</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$83,501 ~ NT$88,500</td><td style={{ ...cellStyle, textAlign: 'right' }}>NT$6,440</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>定額扣繳</td></tr>
                <tr><td style={cellStyle}>NT$88,501 以上</td><td style={{ ...cellStyle, textAlign: 'right' }}>薪資 × 5%</td><td style={{ ...cellStyle, color: 'var(--color-text-secondary)' }}>按全月薪資 5% 扣繳</td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
            ※ 上表為「全月給付薪資」按「薪資所得扣繳辦法」之扣繳稅額簡表。實際扣繳金額可能因個人申報狀況而異。可選擇按全月薪資 5% 扣繳或依扣繳稅額表扣繳。
          </div>
        </>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.incomeType}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
              </tr>
            </thead>
            <tbody>
              {NON_RESIDENT_RATES.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.type}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{(r.rate * 100).toFixed(0)}%</td>
                  <td style={{ ...cellStyle, color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>{r.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
