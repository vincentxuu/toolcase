'use client'
import { useState, useMemo } from 'react'

interface BmiCalculatorProps {
  labels?: {
    height: string
    weight: string
    cm: string
    kg: string
    yourBmi: string
    category: string
    underweight: string
    normal: string
    overweight: string
    obese: string
    disclaimer: string
  }
}

const categories = [
  { max: 18.5, key: 'underweight' as const, color: '#3b82f6' },
  { max: 25, key: 'normal' as const, color: '#10b981' },
  { max: 30, key: 'overweight' as const, color: '#f59e0b' },
  { max: Infinity, key: 'obese' as const, color: '#ef4444' },
]

export default function BmiCalculator({ labels }: BmiCalculatorProps) {
  const l = {
    height: labels?.height ?? 'Height',
    weight: labels?.weight ?? 'Weight',
    cm: labels?.cm ?? 'cm',
    kg: labels?.kg ?? 'kg',
    yourBmi: labels?.yourBmi ?? 'Your BMI',
    category: labels?.category ?? 'Category',
    underweight: labels?.underweight ?? 'Underweight',
    normal: labels?.normal ?? 'Normal',
    overweight: labels?.overweight ?? 'Overweight',
    obese: labels?.obese ?? 'Obese',
    disclaimer: labels?.disclaimer ?? 'This tool is for informational purposes only and is not a substitute for professional medical advice.',
  }

  const catLabels = { underweight: l.underweight, normal: l.normal, overweight: l.overweight, obese: l.obese }

  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)

  const result = useMemo(() => {
    const h = height / 100
    const bmi = h > 0 ? weight / (h * h) : 0
    const cat = categories.find((c) => bmi < c.max) ?? categories[3]
    return { bmi, cat }
  }, [height, weight])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }

  const pct = Math.min(100, Math.max(0, ((result.bmi - 10) / 35) * 100))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.height} ({l.cm})</label>
          <input type="number" style={inputStyle} value={height} onChange={(e) => setHeight(Number(e.target.value))} min={50} max={300} />
        </div>
        <div>
          <label style={labelStyle}>{l.weight} ({l.kg})</label>
          <input type="number" style={inputStyle} value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={10} max={500} />
        </div>
      </div>

      <div style={{ padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="text-sm text-[var(--color-text-secondary)] mb-2">{l.yourBmi}</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: result.cat.color }}>{result.bmi.toFixed(1)}</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: result.cat.color, marginTop: '0.25rem' }}>
          {catLabels[result.cat.key]}
        </div>
      </div>

      {/* Visual scale */}
      <div style={{ position: 'relative', height: '2.5rem' }}>
        <div style={{ display: 'flex', height: '0.75rem', borderRadius: '0.375rem', overflow: 'hidden' }}>
          <div style={{ flex: '18.5', backgroundColor: '#3b82f6' }} />
          <div style={{ flex: '6.5', backgroundColor: '#10b981' }} />
          <div style={{ flex: '5', backgroundColor: '#f59e0b' }} />
          <div style={{ flex: '15', backgroundColor: '#ef4444' }} />
        </div>
        <div style={{ position: 'absolute', top: '1rem', left: `${pct}%`, transform: 'translateX(-50%)', fontSize: '1.25rem' }}>▲</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
          <span>10</span><span>18.5</span><span>25</span><span>30</span><span>45</span>
        </div>
      </div>

      {/* Category table */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {categories.map((cat) => (
          <div key={cat.key} style={{
            padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.8rem',
            backgroundColor: result.cat.key === cat.key ? cat.color + '20' : 'var(--color-bg-secondary)',
            border: result.cat.key === cat.key ? `2px solid ${cat.color}` : '1px solid var(--color-border)',
            fontWeight: result.cat.key === cat.key ? 700 : 400,
          }}>
            <div style={{ color: cat.color, fontWeight: 600 }}>{catLabels[cat.key]}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {cat.max === 18.5 ? '< 18.5' : cat.max === 25 ? '18.5 - 24.9' : cat.max === 30 ? '25 - 29.9' : '≥ 30'}
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
