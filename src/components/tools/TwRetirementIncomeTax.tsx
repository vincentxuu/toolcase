'use client'
import { useState, useMemo } from 'react'

// 退職所得免稅額（2024）
const EXEMPTION_PER_YEAR = 188000 // 每服務年資定額免稅

const CALCULATION_RULES = [
  { type: '一次領取', rule: '服務年資 × NT$188,000 以內：免稅', detail: '超過免稅額、未達 NT$188,000 × 年資 × 2 部分：半數課稅。超過部分：全數課稅。' },
  { type: '分期領取（年金）', rule: '全年領取金額 − NT$859,000 後的餘額課稅', detail: '即每年有 NT$859,000 免稅。' },
]

const EXEMPTION_HISTORY = [
  { year: '2024', perYear: 188000, annualExemption: 859000 },
  { year: '2023', perYear: 188000, annualExemption: 859000 },
  { year: '2022', perYear: 188000, annualExemption: 814000 },
  { year: '2021', perYear: 180000, annualExemption: 781000 },
  { year: '2020', perYear: 180000, annualExemption: 781000 },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    rulesTitle?: string; type?: string; rule?: string; detail?: string
    quickCalc?: string; serviceYears?: string; lumpSum?: string
    taxFree?: string; halfTaxable?: string; fullyTaxable?: string
    exemptionHistory?: string; year?: string; perYear?: string; annualExemption?: string
  }
}

export default function TwRetirementIncomeTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '退職所得免稅額',
    desc: labels?.desc ?? '113年度（2024）適用',
    rulesTitle: labels?.rulesTitle ?? '課稅規則',
    type: labels?.type ?? '領取方式',
    rule: labels?.rule ?? '計算方式',
    detail: labels?.detail ?? '說明',
    quickCalc: labels?.quickCalc ?? '一次領取試算',
    serviceYears: labels?.serviceYears ?? '服務年資',
    lumpSum: labels?.lumpSum ?? '一次領取金額',
    taxFree: labels?.taxFree ?? '免稅額度',
    halfTaxable: labels?.halfTaxable ?? '半數課稅',
    fullyTaxable: labels?.fullyTaxable ?? '全數課稅',
    exemptionHistory: labels?.exemptionHistory ?? '免稅額歷年一覽',
    year: labels?.year ?? '年度',
    perYear: labels?.perYear ?? '每年資定額免稅',
    annualExemption: labels?.annualExemption ?? '分期領取年免稅額',
  }

  const [years, setYears] = useState(25)
  const [lumpSum, setLumpSum] = useState(5000000)

  const result = useMemo(() => {
    const taxFreeLimit = EXEMPTION_PER_YEAR * years
    const halfTaxLimit = EXEMPTION_PER_YEAR * years * 2

    let taxFreeAmount = 0
    let halfTaxableAmount = 0
    let fullyTaxableAmount = 0

    if (lumpSum <= taxFreeLimit) {
      taxFreeAmount = lumpSum
    } else if (lumpSum <= halfTaxLimit) {
      taxFreeAmount = taxFreeLimit
      halfTaxableAmount = lumpSum - taxFreeLimit
    } else {
      taxFreeAmount = taxFreeLimit
      halfTaxableAmount = halfTaxLimit - taxFreeLimit
      fullyTaxableAmount = lumpSum - halfTaxLimit
    }

    const taxableIncome = Math.round(halfTaxableAmount * 0.5) + fullyTaxableAmount

    return { taxFreeLimit, halfTaxLimit, taxFreeAmount, halfTaxableAmount, fullyTaxableAmount, taxableIncome }
  }, [years, lumpSum])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Rules */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.rulesTitle}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.rule}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.detail}</th>
              </tr>
            </thead>
            <tbody>
              {CALCULATION_RULES.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                  <td style={cellStyle}>{r.rule}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Calculator */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickCalc}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.serviceYears}</label>
            <input type="number" style={inputStyle} value={years} onChange={e => setYears(Math.max(1, Number(e.target.value)))} min={1} max={50} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.lumpSum}</label>
            <input type="number" style={inputStyle} value={lumpSum} onChange={e => setLumpSum(Number(e.target.value))} min={0} step={100000} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.taxFree}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>NT${fmt(result.taxFreeAmount)}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              上限 {fmt(result.taxFreeLimit)}
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.halfTaxable}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>NT${fmt(result.halfTaxableAmount)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.fullyTaxable}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(result.fullyTaxableAmount)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>應課稅所得</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(result.taxableIncome)}</div>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.exemptionHistory}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.year}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.perYear}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.annualExemption}</th>
            </tr>
          </thead>
          <tbody>
            {EXEMPTION_HISTORY.map((r, i) => (
              <tr key={i} style={i === 0 ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                <td style={{ ...cellStyle, textAlign: 'center' }}>{r.year}</td>
                <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.perYear)}</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(r.annualExemption)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
