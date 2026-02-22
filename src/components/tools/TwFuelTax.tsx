'use client'
import { useState } from 'react'

const CAR_FUEL_TAX = [
  { cc: '500cc 以下', annual: 2160, quarterly: 540 },
  { cc: '501 ~ 600', annual: 2160, quarterly: 540 },
  { cc: '601 ~ 1200', annual: 4320, quarterly: 1080 },
  { cc: '1201 ~ 1800', annual: 4800, quarterly: 1200 },
  { cc: '1801 ~ 2400', annual: 6180, quarterly: 1545 },
  { cc: '2401 ~ 3000', annual: 7200, quarterly: 1800 },
  { cc: '3001 ~ 3600', annual: 8640, quarterly: 2160 },
  { cc: '3601 ~ 4200', annual: 9810, quarterly: 2453 },
  { cc: '4201 ~ 4800', annual: 11220, quarterly: 2805 },
  { cc: '4801 ~ 5400', annual: 12180, quarterly: 3045 },
  { cc: '5401 ~ 6000', annual: 13080, quarterly: 3270 },
  { cc: '6001 ~ 6600', annual: 13950, quarterly: 3488 },
  { cc: '6601 ~ 7200', annual: 14910, quarterly: 3728 },
  { cc: '7201 ~ 7800', annual: 15720, quarterly: 3930 },
  { cc: '7801cc 以上', annual: 15720, quarterly: 3930 },
]

const MOTORCYCLE_FUEL_TAX = [
  { cc: '50cc 以下（含電動）', annual: 0 },
  { cc: '51 ~ 125', annual: 450 },
  { cc: '126 ~ 250', annual: 600 },
  { cc: '251 ~ 500', annual: 2160 },
  { cc: '501 ~ 600', annual: 2160 },
  { cc: '601 ~ 1200', annual: 4320 },
  { cc: '1201 ~ 1800', annual: 4800 },
  { cc: '1801cc 以上', annual: 6180 },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    carTab?: string; motorcycleTab?: string
    displacement?: string; annualFee?: string; quarterlyFee?: string
  }
}

export default function TwFuelTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '汽車燃料使用費',
    desc: labels?.desc ?? '113年度（2024）適用',
    carTab: labels?.carTab ?? '汽車',
    motorcycleTab: labels?.motorcycleTab ?? '機車',
    displacement: labels?.displacement ?? '汽缸排氣量',
    annualFee: labels?.annualFee ?? '全年徵收（元）',
    quarterlyFee: labels?.quarterlyFee ?? '每季徵收（元）',
  }

  const [tab, setTab] = useState<'car' | 'motorcycle'>('car')

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const tabBase: React.CSSProperties = { flex: 1, padding: '0.625rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s' }
  const tabActive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
  const tabInactive: React.CSSProperties = { ...tabBase, backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={tab === 'car' ? tabActive : tabInactive} onClick={() => setTab('car')}>{l.carTab}</button>
        <button style={tab === 'motorcycle' ? tabActive : tabInactive} onClick={() => setTab('motorcycle')}>{l.motorcycleTab}</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {tab === 'car' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.displacement}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.annualFee}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.quarterlyFee}</th>
              </tr>
            </thead>
            <tbody>
              {CAR_FUEL_TAX.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.cc}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.annual)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(r.quarterly)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.displacement}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.annualFee}</th>
              </tr>
            </thead>
            <tbody>
              {MOTORCYCLE_FUEL_TAX.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.cc}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: r.annual === 0 ? '#10b981' : 'var(--color-primary)' }}>
                    {r.annual === 0 ? '免徵' : `NT$${fmt(r.annual)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
        ※ 自用汽車燃料費每年 7 月開徵（7/1 ~ 7/31 繳納）。營業汽車每季開徵。機車燃料費隨同牌照稅一併徵收。完全以電能為動力之電動車免徵燃料費。
      </div>
    </div>
  )
}
