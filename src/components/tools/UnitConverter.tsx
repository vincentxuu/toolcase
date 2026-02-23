'use client'
import { useState, useMemo } from 'react'
import {
  lengthUnits, weightUnits, temperatureUnits, areaUnits,
  volumeUnits, speedUnits, dataSizeUnits, timeUnits,
} from '@/lib/unit-definitions'

export interface UnitDef {
  key: string
  label: string
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

export type UnitType = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'dataSize' | 'time'

const unitMap: Record<UnitType, UnitDef[]> = {
  length: lengthUnits,
  weight: weightUnits,
  temperature: temperatureUnits,
  area: areaUnits,
  volume: volumeUnits,
  speed: speedUnits,
  dataSize: dataSizeUnits,
  time: timeUnits,
}

interface UnitConverterProps {
  unitType: UnitType
  defaultFrom?: number
  defaultTo?: number
  defaultValue?: number
  labels?: {
    from: string
    to: string
    swap: string
    result: string
  }
}

export default function UnitConverter({ unitType, defaultFrom = 0, defaultTo = 1, defaultValue = 1, labels }: UnitConverterProps) {
  const units = unitMap[unitType]
  const l = {
    from: labels?.from ?? 'From',
    to: labels?.to ?? 'To',
    swap: labels?.swap ?? 'Swap',
    result: labels?.result ?? 'Result',
  }

  const [fromIdx, setFromIdx] = useState(defaultFrom)
  const [toIdx, setToIdx] = useState(defaultTo)
  const [value, setValue] = useState(defaultValue)

  const result = useMemo(() => {
    const base = units[fromIdx].toBase(value)
    return units[toIdx].fromBase(base)
  }, [value, fromIdx, toIdx, units])

  const allResults = useMemo(() => {
    const base = units[fromIdx].toBase(value)
    return units.map((u) => ({ label: u.label, value: u.fromBase(base) }))
  }, [value, fromIdx, units])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }

  const handleSwap = () => {
    setFromIdx(toIdx)
    setToIdx(fromIdx)
  }

  const formatResult = (n: number) => {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(6)
    return n.toLocaleString('en-US', { maximumFractionDigits: 8 })
  }

  return (
    <div className="flex flex-col gap-6">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'end' }}>
        <div>
          <label style={labelStyle}>{l.from}</label>
          <select style={inputStyle} value={fromIdx} onChange={(e) => setFromIdx(Number(e.target.value))}>
            {units.map((u, i) => <option key={u.key} value={i}>{u.label}</option>)}
          </select>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleSwap} style={{ marginBottom: '0.125rem' }}>⇄</button>
        <div>
          <label style={labelStyle}>{l.to}</label>
          <select style={inputStyle} value={toIdx} onChange={(e) => setToIdx(Number(e.target.value))}>
            {units.map((u, i) => <option key={u.key} value={i}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <input type="number" style={{ ...inputStyle, fontSize: '1.5rem', textAlign: 'center', padding: '1rem' }}
          value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </div>

      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="text-sm text-[var(--color-text-secondary)] mb-2">{l.result}</div>
        <div className="text-4xl font-bold text-[var(--color-primary)]">
          {formatResult(result)}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
          {units[toIdx].label}
        </div>
      </div>

      {/* All conversions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
        {allResults.map((r) => (
          <div key={r.label} style={{
            padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{r.label}</span>
            <span style={{ fontWeight: 600, fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>{formatResult(r.value)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
