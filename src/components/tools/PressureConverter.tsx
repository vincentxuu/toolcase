'use client'
import { useState, useMemo } from 'react'

interface PressureConverterProps {
  labels?: {
    value: string
    from: string
    result: string
    enterValue: string
  }
}

const UNITS = [
  { id: 'pa', name: 'Pascal (Pa)', toPa: 1 },
  { id: 'hpa', name: 'Hectopascal (hPa)', toPa: 100 },
  { id: 'kpa', name: 'Kilopascal (kPa)', toPa: 1000 },
  { id: 'mpa', name: 'Megapascal (MPa)', toPa: 1e6 },
  { id: 'bar', name: 'Bar', toPa: 1e5 },
  { id: 'mbar', name: 'Millibar (mbar)', toPa: 100 },
  { id: 'psi', name: 'PSI', toPa: 6894.757293168 },
  { id: 'atm', name: 'Atmosphere (atm)', toPa: 101325 },
  { id: 'torr', name: 'Torr', toPa: 133.3223684211 },
  { id: 'mmhg', name: 'mmHg', toPa: 133.3223684211 },
  { id: 'inhg', name: 'inHg', toPa: 3386.389 },
]

export default function PressureConverter({ labels }: PressureConverterProps) {
  const l = {
    value: labels?.value ?? 'Value',
    from: labels?.from ?? 'From',
    result: labels?.result ?? 'Conversions',
    enterValue: labels?.enterValue ?? 'Enter a value',
  }

  const [input, setInput] = useState('1')
  const [fromUnit, setFromUnit] = useState('atm')

  const results = useMemo(() => {
    const val = parseFloat(input)
    if (isNaN(val)) return null
    const fromDef = UNITS.find((u) => u.id === fromUnit)!
    const inPa = val * fromDef.toPa
    return UNITS.filter((u) => u.id !== fromUnit).map((u) => ({
      ...u,
      value: inPa / u.toPa,
    }))
  }, [input, fromUnit])

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
              <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{r.value < 0.001 ? r.value.toExponential(4) : r.value.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
