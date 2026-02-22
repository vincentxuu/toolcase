'use client'
import { useState, useMemo } from 'react'

interface EnergyConverterProps {
  labels?: {
    value: string
    from: string
    result: string
    enterValue: string
  }
}

const UNITS = [
  { id: 'j', name: 'Joule (J)', toJoules: 1 },
  { id: 'kj', name: 'Kilojoule (kJ)', toJoules: 1000 },
  { id: 'cal', name: 'Calorie (cal)', toJoules: 4.184 },
  { id: 'kcal', name: 'Kilocalorie (kcal)', toJoules: 4184 },
  { id: 'wh', name: 'Watt-hour (Wh)', toJoules: 3600 },
  { id: 'kwh', name: 'Kilowatt-hour (kWh)', toJoules: 3600000 },
  { id: 'btu', name: 'BTU', toJoules: 1055.06 },
  { id: 'ftlbf', name: 'Foot-pound (ft\u22C5lbf)', toJoules: 1.35582 },
  { id: 'ev', name: 'Electron-volt (eV)', toJoules: 1.60218e-19 },
]

export default function EnergyConverter({ labels }: EnergyConverterProps) {
  const l = {
    value: labels?.value ?? 'Value',
    from: labels?.from ?? 'From',
    result: labels?.result ?? 'Conversions',
    enterValue: labels?.enterValue ?? 'Enter a value',
  }

  const [input, setInput] = useState('1')
  const [fromUnit, setFromUnit] = useState('kwh')

  const results = useMemo(() => {
    const val = parseFloat(input)
    if (isNaN(val)) return null
    const fromDef = UNITS.find((u) => u.id === fromUnit)!
    const inJoules = val * fromDef.toJoules
    return UNITS.filter((u) => u.id !== fromUnit).map((u) => ({
      ...u,
      value: inJoules / u.toJoules,
    }))
  }, [input, fromUnit])

  const formatResult = (n: number) => {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4)
    return n.toLocaleString(undefined, { maximumFractionDigits: 6 })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 150px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.value}</label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={l.enterValue}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.from}</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
          >
            {UNITS.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      {results && (
        <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div style={{ padding: '0.5rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', fontWeight: 600, borderBottom: '1px solid var(--color-border)' }}>{l.result}</div>
          {results.map((r) => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <span>{r.name}</span>
              <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{formatResult(r.value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
