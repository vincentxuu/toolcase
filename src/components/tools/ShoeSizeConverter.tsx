'use client'
import { useState, useMemo } from 'react'

interface ShoeSizeConverterProps {
  labels?: {
    size: string
    system: string
    gender: string
    men: string
    women: string
    result: string
  }
}

// Size tables: [US Men, US Women, EU, UK, JP(cm)]
const MEN_SIZES: [number, number, number, number, number][] = [
  [6, 7.5, 39, 5.5, 24],
  [6.5, 8, 39.5, 6, 24.5],
  [7, 8.5, 40, 6.5, 25],
  [7.5, 9, 40.5, 7, 25.5],
  [8, 9.5, 41, 7.5, 26],
  [8.5, 10, 42, 8, 26.5],
  [9, 10.5, 42.5, 8.5, 27],
  [9.5, 11, 43, 9, 27.5],
  [10, 11.5, 44, 9.5, 28],
  [10.5, 12, 44.5, 10, 28.5],
  [11, 12.5, 45, 10.5, 29],
  [11.5, 13, 45.5, 11, 29.5],
  [12, 13.5, 46, 11.5, 30],
  [13, 14.5, 47.5, 12.5, 31],
  [14, 15.5, 48.5, 13.5, 32],
]

const SYSTEMS = [
  { id: 'us-men', name: 'US (Men)', col: 0 },
  { id: 'us-women', name: 'US (Women)', col: 1 },
  { id: 'eu', name: 'EU', col: 2 },
  { id: 'uk', name: 'UK', col: 3 },
  { id: 'jp', name: 'JP (cm)', col: 4 },
]

export default function ShoeSizeConverter({ labels }: ShoeSizeConverterProps) {
  const l = {
    size: labels?.size ?? 'Size',
    system: labels?.system ?? 'System',
    gender: labels?.gender ?? 'Gender',
    men: labels?.men ?? 'Men',
    women: labels?.women ?? 'Women',
    result: labels?.result ?? 'Conversions',
  }

  const [fromSystem, setFromSystem] = useState('us-men')
  const [fromSize, setFromSize] = useState(9)

  const fromDef = SYSTEMS.find((s) => s.id === fromSystem)!
  const availableSizes = useMemo(() => MEN_SIZES.map((row) => row[fromDef.col]), [fromDef.col])

  const result = useMemo(() => {
    // Find closest match
    let bestIdx = 0
    let bestDiff = Infinity
    MEN_SIZES.forEach((row, i) => {
      const diff = Math.abs(row[fromDef.col] - fromSize)
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i }
    })
    const row = MEN_SIZES[bestIdx]
    return SYSTEMS.filter((s) => s.id !== fromSystem).map((s) => ({
      name: s.name,
      value: row[s.col],
    }))
  }, [fromSystem, fromSize, fromDef.col])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.system}</label>
          <select
            value={fromSystem}
            onChange={(e) => { setFromSystem(e.target.value); setFromSize(MEN_SIZES[4][SYSTEMS.find((s) => s.id === e.target.value)!.col]) }}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
          >
            {SYSTEMS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div style={{ flex: '1 1 120px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.size}</label>
          <select
            value={fromSize}
            onChange={(e) => setFromSize(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
          >
            {availableSizes.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
        <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-border)' }}>{l.result}</div>
        {result.map((r) => (
          <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
            <span>{r.name}</span>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* Size Chart */}
      <details style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
        <summary style={{ padding: '0.75rem', cursor: 'pointer', fontWeight: 600, backgroundColor: 'var(--color-bg-secondary)' }}>Size Chart</summary>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr>{SYSTEMS.map((s) => <th key={s.id} style={{ padding: '0.5rem', borderBottom: '2px solid var(--color-border)', textAlign: 'center', whiteSpace: 'nowrap' }}>{s.name}</th>)}</tr>
            </thead>
            <tbody>
              {MEN_SIZES.map((row, i) => (
                <tr key={i}>{row.map((val, j) => <td key={j} style={{ padding: '0.4rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>{val}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  )
}
