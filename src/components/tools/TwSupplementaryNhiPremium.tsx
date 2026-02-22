'use client'
import { useState, useMemo } from 'react'

const SUPP_RATE = 0.0211 // 2.11%

const INCOME_TYPES = [
  { type: '獎金', threshold: '當月超過投保金額 4 倍部分', thresholdNote: '全年累計超過投保金額 4 倍' },
  { type: '兼職所得', threshold: '單次給付 ≥ NT$20,000', thresholdNote: '' },
  { type: '執行業務收入', threshold: '單次給付 ≥ NT$20,000', thresholdNote: '' },
  { type: '股利所得', threshold: '單次給付 ≥ NT$20,000', thresholdNote: '含現金股利與股票股利' },
  { type: '利息所得', threshold: '單次給付 ≥ NT$20,000', thresholdNote: '存款利息、債券利息等' },
  { type: '租金收入', threshold: '單次給付 ≥ NT$20,000', thresholdNote: '' },
]

const KEY_THRESHOLDS = [
  { item: '補充保費費率', value: '2.11%' },
  { item: '單次扣費門檻', value: 'NT$20,000' },
  { item: '單次扣費上限', value: 'NT$10,000,000' },
  { item: '獎金扣費門檻', value: '當月超過投保金額 4 倍部分' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    thresholdTitle?: string; item?: string; value?: string
    incomeTitle?: string; type?: string; threshold?: string; note?: string
    quickCalc?: string; incomeType?: string; amount?: string; premiumDue?: string
    netAmount?: string
  }
}

export default function TwSupplementaryNhiPremium({ labels }: Props) {
  const l = {
    title: labels?.title ?? '二代健保補充保費',
    desc: labels?.desc ?? '113年度（2024）適用',
    thresholdTitle: labels?.thresholdTitle ?? '重要門檻',
    item: labels?.item ?? '項目',
    value: labels?.value ?? '金額/費率',
    incomeTitle: labels?.incomeTitle ?? '應扣費收入類別',
    type: labels?.type ?? '所得類別',
    threshold: labels?.threshold ?? '扣費門檻',
    note: labels?.note ?? '備註',
    quickCalc: labels?.quickCalc ?? '快速試算',
    incomeType: labels?.incomeType ?? '所得類型',
    amount: labels?.amount ?? '給付金額',
    premiumDue: labels?.premiumDue ?? '補充保費',
    netAmount: labels?.netAmount ?? '實收金額',
  }

  const [amount, setAmount] = useState(100000)

  const result = useMemo(() => {
    if (amount < 20000) return { premium: 0, net: amount }
    const capped = Math.min(amount, 10000000)
    const premium = Math.round(capped * SUPP_RATE)
    return { premium, net: amount - premium }
  }, [amount])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Key thresholds */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.thresholdTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <tbody>
            {KEY_THRESHOLDS.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600, width: '40%' }}>{r.item}</td>
                <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--color-primary)' }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Income types */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.incomeTitle}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.threshold}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
              </tr>
            </thead>
            <tbody>
              {INCOME_TYPES.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                  <td style={cellStyle}>{r.threshold}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.thresholdNote || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Calculator */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickCalc}</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.amount}（股利/兼職/租金等）</label>
          <input type="number" style={inputStyle} value={amount} onChange={e => setAmount(Number(e.target.value))} min={0} step={10000} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.premiumDue}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>
              NT${fmt(result.premium)}
              {amount < 20000 && <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'block' }}>未達門檻，免扣</span>}
            </div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.netAmount}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>NT${fmt(result.net)}</div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
        ※ 二代健保補充保費由給付單位（如公司、銀行、券商）於給付時直接源扣繳，被保險人無須另外申報。
      </div>
    </div>
  )
}
