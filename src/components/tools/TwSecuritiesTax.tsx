'use client'
import { useState, useMemo } from 'react'

const SECURITIES_TAX_RATES = [
  { type: '上市/上櫃股票', rate: 0.003, note: '賣出時課徵' },
  { type: 'ETF（股票型）', rate: 0.001, note: '賣出時課徵' },
  { type: 'ETF（債券型）', rate: 0.0001, note: '賣出時課徵（至2026/12/31止暫停課徵）' },
  { type: '期貨交易稅', rate: 0.00002, note: '股價指數期貨：十萬分之二' },
  { type: '期貨選擇權', rate: 0.001, note: '權利金 × 千分之一' },
  { type: '公司債、金融債券', rate: 0.001, note: '賣出時課徵' },
  { type: '興櫃股票', rate: 0.003, note: '賣出時課徵' },
]

const RELATED_TAXES = [
  { type: '股利所得稅', desc: '合併計稅（8.5%可抵減稅額，上限8萬）或分開計稅（28%分離課稅）', note: '二擇一申報' },
  { type: '二代健保補充保費', desc: '單次股利超過 NT$20,000 時，加收 2.11%', note: '源扣繳' },
  { type: '證券交易所得稅', desc: '目前停徵（自2016年起）', note: '免稅' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    securityType?: string; rate?: string; note?: string
    quickCalc?: string; tradeAmount?: string; secType?: string; taxDue?: string; netProceeds?: string
    relatedTitle?: string; type?: string; description?: string
  }
}

export default function TwSecuritiesTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '證券交易稅率表',
    desc: labels?.desc ?? '113年度（2024）適用',
    securityType: labels?.securityType ?? '證券類別',
    rate: labels?.rate ?? '稅率',
    note: labels?.note ?? '備註',
    quickCalc: labels?.quickCalc ?? '快速試算',
    tradeAmount: labels?.tradeAmount ?? '賣出金額',
    secType: labels?.secType ?? '證券類型',
    taxDue: labels?.taxDue ?? '交易稅',
    netProceeds: labels?.netProceeds ?? '稅後實收',
    relatedTitle: labels?.relatedTitle ?? '股票投資相關稅費',
    type: labels?.type ?? '稅費',
    description: labels?.description ?? '說明',
  }

  const [amount, setAmount] = useState(1000000)
  const [selectedType, setSelectedType] = useState(0)

  const result = useMemo(() => {
    const rate = SECURITIES_TAX_RATES[selectedType].rate
    const tax = Math.round(amount * rate)
    return { tax, net: amount - tax }
  }, [amount, selectedType])

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
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.securityType}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {SECURITIES_TAX_RATES.map((r, i) => (
              <tr key={i} style={selectedType === i ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                <td style={cellStyle}>{r.type}</td>
                <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {r.rate >= 0.001 ? `${(r.rate * 1000).toFixed(1)}‰` : `${(r.rate * 100000).toFixed(0)}/100000`}
                </td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Calculator */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickCalc}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.secType}</label>
            <select style={inputStyle} value={selectedType} onChange={e => setSelectedType(Number(e.target.value))}>
              {SECURITIES_TAX_RATES.map((r, i) => (
                <option key={i} value={i}>{r.type}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.tradeAmount}</label>
            <input type="number" style={inputStyle} value={amount} onChange={e => setAmount(Number(e.target.value))} min={0} step={10000} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.taxDue}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(result.tax)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.netProceeds}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>NT${fmt(result.net)}</div>
          </div>
        </div>
      </div>

      {/* Related taxes */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.relatedTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.description}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {RELATED_TAXES.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                <td style={cellStyle}>{r.desc}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
