'use client'
import { useState, useMemo } from 'react'

interface HeartRateZoneCalculatorProps {
  labels?: {
    age: string
    restingHeartRate: string
    maxHeartRate: string
    zone: string
    recovery: string
    fatBurn: string
    aerobic: string
    anaerobic: string
    max: string
    bpm: string
    disclaimer: string
  }
}

const zones = [
  { key: 'recovery' as const, name: 'Zone 1', low: 0.50, high: 0.60, color: '#6b7280' },
  { key: 'fatBurn' as const, name: 'Zone 2', low: 0.60, high: 0.70, color: '#3b82f6' },
  { key: 'aerobic' as const, name: 'Zone 3', low: 0.70, high: 0.80, color: '#10b981' },
  { key: 'anaerobic' as const, name: 'Zone 4', low: 0.80, high: 0.90, color: '#f59e0b' },
  { key: 'max' as const, name: 'Zone 5', low: 0.90, high: 1.00, color: '#ef4444' },
]

export default function HeartRateZoneCalculator({ labels }: HeartRateZoneCalculatorProps) {
  const l = {
    age: labels?.age ?? 'Age',
    restingHeartRate: labels?.restingHeartRate ?? 'Resting Heart Rate',
    maxHeartRate: labels?.maxHeartRate ?? 'Max Heart Rate',
    zone: labels?.zone ?? 'Zone',
    recovery: labels?.recovery ?? 'Recovery',
    fatBurn: labels?.fatBurn ?? 'Fat Burn',
    aerobic: labels?.aerobic ?? 'Aerobic',
    anaerobic: labels?.anaerobic ?? 'Anaerobic',
    max: labels?.max ?? 'Max Effort',
    bpm: labels?.bpm ?? 'bpm',
    disclaimer: labels?.disclaimer ?? 'Heart rate zones are estimates. Consult a healthcare professional before starting any exercise program.',
  }

  const zoneLabels = { recovery: l.recovery, fatBurn: l.fatBurn, aerobic: l.aerobic, anaerobic: l.anaerobic, max: l.max }

  const [age, setAge] = useState(30)
  const [restingHR, setRestingHR] = useState(70)

  const result = useMemo(() => {
    const maxHR = 220 - age
    const hrReserve = maxHR - restingHR

    const zoneData = zones.map((z) => ({
      ...z,
      lowBPM: Math.round(hrReserve * z.low + restingHR),
      highBPM: Math.round(hrReserve * z.high + restingHR),
    }))

    return { maxHR, zoneData }
  }, [age, restingHR])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.age}</label>
          <input type="number" style={inputStyle} value={age} onChange={(e) => setAge(Number(e.target.value))} min={10} max={120} />
        </div>
        <div>
          <label style={labelStyle}>{l.restingHeartRate} ({l.bpm})</label>
          <input type="number" style={inputStyle} value={restingHR} onChange={(e) => setRestingHR(Number(e.target.value))} min={30} max={120} />
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.maxHeartRate}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{result.maxHR}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.bpm}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {result.zoneData.map((z) => (
          <div key={z.key} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '120px', flexShrink: 0 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: z.color }}>{z.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{zoneLabels[z.key]}</div>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <div style={{
                height: '2.5rem', borderRadius: '0.5rem', backgroundColor: z.color + '30',
                border: `1px solid ${z.color}50`, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${((z.highBPM - z.lowBPM) / (result.maxHR - restingHR)) * 100}%`,
                  marginLeft: `${((z.lowBPM - restingHR) / (result.maxHR - restingHR)) * 100}%`,
                  backgroundColor: z.color, borderRadius: '0.5rem', opacity: 0.7,
                }} />
                <div style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text)', whiteSpace: 'nowrap',
                }}>
                  {z.lowBPM} - {z.highBPM} {l.bpm}
                </div>
              </div>
            </div>
            <div style={{ width: '60px', flexShrink: 0, textAlign: 'right', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {Math.round(z.low * 100)}-{Math.round(z.high * 100)}%
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        ℹ️ {l.disclaimer}
      </div>
    </div>
  )
}
