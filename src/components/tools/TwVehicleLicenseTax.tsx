'use client'
import { useState } from 'react'

const CAR_TAX = [
  { cc: '500cc 以下', private: 1620, business: 900 },
  { cc: '501 ~ 600', private: 2160, business: 1260 },
  { cc: '601 ~ 1200', private: 4320, business: 2160 },
  { cc: '1201 ~ 1800', private: 7120, business: 3060 },
  { cc: '1801 ~ 2400', private: 11230, business: 6480 },
  { cc: '2401 ~ 3000', private: 15210, business: 9900 },
  { cc: '3001 ~ 4200', private: 28220, business: 16380 },
  { cc: '4201 ~ 5400', private: 46170, business: 24300 },
  { cc: '5401 ~ 6600', private: 69690, business: 33000 },
  { cc: '6601 ~ 7800', private: 117000, business: 44400 },
  { cc: '7801cc 以上', private: 151200, business: 52800 },
]

const MOTORCYCLE_TAX = [
  { cc: '150cc 以下', tax: 0 },
  { cc: '151 ~ 250', tax: 800 },
  { cc: '251 ~ 500', tax: 1620 },
  { cc: '501 ~ 600', tax: 2160 },
  { cc: '601 ~ 1200', tax: 4320 },
  { cc: '1201 ~ 1800', tax: 7120 },
  { cc: '1801cc 以上', tax: 11230 },
]

const EV_TAX = [
  { kw: '馬達最大馬力 ≤ 65.8kW', private: 1620, business: 900 },
  { kw: '65.9 ~ 98.8kW', private: 4320, business: 2160 },
  { kw: '98.9 ~ 131.7kW', private: 7120, business: 3060 },
  { kw: '131.8 ~ 164.7kW', private: 11230, business: 6480 },
  { kw: '164.8 ~ 197.6kW', private: 15210, business: 9900 },
  { kw: '197.7 ~ 263.5kW', private: 28220, business: 16380 },
  { kw: '263.6 ~ 329.3kW', private: 46170, business: 24300 },
  { kw: '329.4kW 以上', private: 69690, business: 33000 },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    carTab?: string; motorcycleTab?: string; evTab?: string
    displacement?: string; privateTax?: string; businessTax?: string
    annualTax?: string; power?: string
  }
}

export default function TwVehicleLicenseTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '使用牌照稅',
    desc: labels?.desc ?? '113年度（2024）適用',
    carTab: labels?.carTab ?? '汽車',
    motorcycleTab: labels?.motorcycleTab ?? '機車',
    evTab: labels?.evTab ?? '電動車',
    displacement: labels?.displacement ?? '汽缸排氣量',
    privateTax: labels?.privateTax ?? '自用（年稅額）',
    businessTax: labels?.businessTax ?? '營業用（年稅額）',
    annualTax: labels?.annualTax ?? '年稅額',
    power: labels?.power ?? '馬達馬力',
  }

  const [tab, setTab] = useState<'car' | 'motorcycle' | 'ev'>('car')

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
        <button style={tab === 'ev' ? tabActive : tabInactive} onClick={() => setTab('ev')}>{l.evTab}</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {tab === 'car' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.displacement}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.privateTax}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.businessTax}</th>
              </tr>
            </thead>
            <tbody>
              {CAR_TAX.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.cc}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.private)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(r.business)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'motorcycle' && (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.displacement}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.annualTax}</th>
              </tr>
            </thead>
            <tbody>
              {MOTORCYCLE_TAX.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.cc}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: r.tax === 0 ? '#10b981' : 'var(--color-primary)' }}>
                    {r.tax === 0 ? '免徵' : `NT$${fmt(r.tax)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === 'ev' && (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr>
                  <th style={{ ...headerCell, textAlign: 'left' }}>{l.power}</th>
                  <th style={{ ...headerCell, textAlign: 'right' }}>{l.privateTax}</th>
                  <th style={{ ...headerCell, textAlign: 'right' }}>{l.businessTax}</th>
                </tr>
              </thead>
              <tbody>
                {EV_TAX.map((r, i) => (
                  <tr key={i}>
                    <td style={cellStyle}>{r.kw}</td>
                    <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.private)}</td>
                    <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(r.business)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
              ※ 電動車完全以電能為動力，免徵使用牌照稅優惠至 2025 年 12 月 31 日止。優惠期滿後依馬達馬力課徵。
            </div>
          </>
        )}
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
        ※ 使用牌照稅每年 4 月 1 日開徵，繳納期限為 4 月 30 日。營業用車輛分上、下半年各開徵一次。
      </div>
    </div>
  )
}
