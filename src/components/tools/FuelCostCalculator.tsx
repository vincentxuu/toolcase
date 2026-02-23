'use client'
import { useState, useMemo } from 'react'

interface FuelCostCalculatorProps {
  labels?: {
    unitSystem: string
    metric: string
    imperial: string
    tripDistance: string
    fuelEfficiency: string
    fuelPrice: string
    roundTrip: string
    fuelNeeded: string
    totalCost: string
    oneWay: string
    roundTripLabel: string
    km: string
    miles: string
    kmPerL: string
    mpg: string
    perLiter: string
    perGallon: string
  }
}

export default function FuelCostCalculator({ labels }: FuelCostCalculatorProps) {
  const l = {
    unitSystem: labels?.unitSystem ?? 'Unit System',
    metric: labels?.metric ?? 'Metric',
    imperial: labels?.imperial ?? 'Imperial',
    tripDistance: labels?.tripDistance ?? 'Trip Distance',
    fuelEfficiency: labels?.fuelEfficiency ?? 'Fuel Efficiency',
    fuelPrice: labels?.fuelPrice ?? 'Fuel Price',
    roundTrip: labels?.roundTrip ?? 'Round Trip',
    fuelNeeded: labels?.fuelNeeded ?? 'Fuel Needed',
    totalCost: labels?.totalCost ?? 'Total Cost',
    oneWay: labels?.oneWay ?? 'One Way',
    roundTripLabel: labels?.roundTripLabel ?? 'Round Trip',
    km: labels?.km ?? 'km',
    miles: labels?.miles ?? 'miles',
    kmPerL: labels?.kmPerL ?? 'km/L',
    mpg: labels?.mpg ?? 'mpg',
    perLiter: labels?.perLiter ?? '$/L',
    perGallon: labels?.perGallon ?? '$/gal',
  }

  const [isMetric, setIsMetric] = useState(true)
  const [distance, setDistance] = useState(100)
  const [efficiency, setEfficiency] = useState(12)
  const [fuelPrice, setFuelPrice] = useState(1.5)
  const [isRoundTrip, setIsRoundTrip] = useState(false)

  const result = useMemo(() => {
    const actualDistance = isRoundTrip ? distance * 2 : distance
    let fuelNeeded: number
    if (isMetric) {
      fuelNeeded = efficiency > 0 ? actualDistance / efficiency : 0
    } else {
      fuelNeeded = efficiency > 0 ? actualDistance / efficiency : 0
    }
    const totalCost = fuelNeeded * fuelPrice
    return { fuelNeeded, totalCost, actualDistance }
  }, [distance, efficiency, fuelPrice, isRoundTrip, isMetric])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }
  const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)', color: active ? '#fff' : 'var(--color-text)',
    cursor: 'pointer', fontWeight: active ? 700 : 500, fontSize: '0.875rem',
  })

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label style={labelStyle}>{l.unitSystem}</label>
        <div className="flex gap-2">
          <button style={toggleBtnStyle(isMetric)} onClick={() => { setIsMetric(true); setEfficiency(12); setFuelPrice(1.5) }}>
            {l.metric}
          </button>
          <button style={toggleBtnStyle(!isMetric)} onClick={() => { setIsMetric(false); setEfficiency(25); setFuelPrice(3.5) }}>
            {l.imperial}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>{l.tripDistance} ({isMetric ? l.km : l.miles})</label>
          <input type="number" style={inputStyle} value={distance} onChange={(e) => setDistance(Number(e.target.value))} min={0} step={1} />
        </div>
        <div>
          <label style={labelStyle}>{l.fuelEfficiency} ({isMetric ? l.kmPerL : l.mpg})</label>
          <input type="number" style={inputStyle} value={efficiency} onChange={(e) => setEfficiency(Number(e.target.value))} min={0.1} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.fuelPrice} ({isMetric ? l.perLiter : l.perGallon})</label>
          <input type="number" style={inputStyle} value={fuelPrice} onChange={(e) => setFuelPrice(Number(e.target.value))} min={0} step={0.01} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>{l.roundTrip}</label>
        <div className="flex gap-2">
          <button style={toggleBtnStyle(!isRoundTrip)} onClick={() => setIsRoundTrip(false)}>
            {l.oneWay}
          </button>
          <button style={toggleBtnStyle(isRoundTrip)} onClick={() => setIsRoundTrip(true)}>
            {l.roundTripLabel}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.fuelNeeded}</div>
          <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">
            {result.fuelNeeded.toFixed(2)} {isMetric ? 'L' : 'gal'}
          </div>
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            {result.actualDistance} {isMetric ? l.km : l.miles}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalCost}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>
            ${result.totalCost.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
