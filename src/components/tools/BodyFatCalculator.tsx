'use client'
import { useState, useMemo } from 'react'

interface BodyFatCalculatorProps {
  labels?: {
    gender: string
    male: string
    female: string
    height: string
    neck: string
    waist: string
    hip: string
    bodyFat: string
    category: string
    essential: string
    athletes: string
    fitness: string
    average: string
    obese: string
    disclaimer: string
  }
}

const maleCategories = [
  { max: 6, key: 'essential' as const, color: '#ef4444' },
  { max: 14, key: 'athletes' as const, color: '#3b82f6' },
  { max: 18, key: 'fitness' as const, color: '#10b981' },
  { max: 25, key: 'average' as const, color: '#f59e0b' },
  { max: Infinity, key: 'obese' as const, color: '#ef4444' },
]

const femaleCategories = [
  { max: 14, key: 'essential' as const, color: '#ef4444' },
  { max: 21, key: 'athletes' as const, color: '#3b82f6' },
  { max: 25, key: 'fitness' as const, color: '#10b981' },
  { max: 32, key: 'average' as const, color: '#f59e0b' },
  { max: Infinity, key: 'obese' as const, color: '#ef4444' },
]

export default function BodyFatCalculator({ labels }: BodyFatCalculatorProps) {
  const l = {
    gender: labels?.gender ?? 'Gender',
    male: labels?.male ?? 'Male',
    female: labels?.female ?? 'Female',
    height: labels?.height ?? 'Height (cm)',
    neck: labels?.neck ?? 'Neck (cm)',
    waist: labels?.waist ?? 'Waist (cm)',
    hip: labels?.hip ?? 'Hip (cm)',
    bodyFat: labels?.bodyFat ?? 'Body Fat',
    category: labels?.category ?? 'Category',
    essential: labels?.essential ?? 'Essential Fat',
    athletes: labels?.athletes ?? 'Athletes',
    fitness: labels?.fitness ?? 'Fitness',
    average: labels?.average ?? 'Average',
    obese: labels?.obese ?? 'Obese',
    disclaimer: labels?.disclaimer ?? 'This calculator uses the US Navy method and provides an estimate only. Consult a healthcare professional for accurate body composition analysis.',
  }

  const catLabels = { essential: l.essential, athletes: l.athletes, fitness: l.fitness, average: l.average, obese: l.obese }

  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState(175)
  const [neck, setNeck] = useState(38)
  const [waist, setWaist] = useState(85)
  const [hip, setHip] = useState(95)

  const result = useMemo(() => {
    if (height <= 0) return { bodyFat: 0, category: maleCategories[2] }

    let bodyFat: number
    if (gender === 'male') {
      const diff = waist - neck
      if (diff <= 0) return { bodyFat: 0, category: maleCategories[0] }
      bodyFat = 86.010 * Math.log10(diff) - 70.041 * Math.log10(height) + 36.76
    } else {
      const diff = waist + hip - neck
      if (diff <= 0) return { bodyFat: 0, category: femaleCategories[0] }
      bodyFat = 163.205 * Math.log10(diff) - 97.684 * Math.log10(height) - 78.387
    }

    bodyFat = Math.max(0, bodyFat)
    const categories = gender === 'male' ? maleCategories : femaleCategories
    const category = categories.find((c) => bodyFat < c.max) ?? categories[categories.length - 1]
    return { bodyFat, category }
  }, [gender, height, neck, waist, hip])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  const categories = gender === 'male' ? maleCategories : femaleCategories

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label style={labelStyle}>{l.gender}</label>
        <div className="flex gap-2">
          <button className={gender === 'male' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0 flex-1' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] flex-1'} onClick={() => setGender('male')}>{l.male}</button>
          <button className={gender === 'female' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0 flex-1' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] flex-1'} onClick={() => setGender('female')}>{l.female}</button>
        </div>
      </div>

      <div className={`grid gap-4 ${gender === 'female' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        <div>
          <label style={labelStyle}>{l.height}</label>
          <input type="number" style={inputStyle} value={height} onChange={(e) => setHeight(Number(e.target.value))} min={50} max={300} />
        </div>
        <div>
          <label style={labelStyle}>{l.neck}</label>
          <input type="number" style={inputStyle} value={neck} onChange={(e) => setNeck(Number(e.target.value))} min={10} max={100} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.waist}</label>
          <input type="number" style={inputStyle} value={waist} onChange={(e) => setWaist(Number(e.target.value))} min={30} max={200} step={0.1} />
        </div>
        {gender === 'female' && (
          <div>
            <label style={labelStyle}>{l.hip}</label>
            <input type="number" style={inputStyle} value={hip} onChange={(e) => setHip(Number(e.target.value))} min={30} max={200} step={0.1} />
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <div className="text-sm text-[var(--color-text-secondary)] mb-2">{l.bodyFat}</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, color: result.category.color }}>{result.bodyFat.toFixed(1)}%</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 600, color: result.category.color, marginTop: '0.25rem' }}>
          {catLabels[result.category.key]}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {categories.map((cat) => (
          <div key={cat.key} style={{
            padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', fontSize: '0.8rem',
            backgroundColor: result.category.key === cat.key ? cat.color + '20' : 'var(--color-bg-secondary)',
            border: result.category.key === cat.key ? `2px solid ${cat.color}` : '1px solid var(--color-border)',
            fontWeight: result.category.key === cat.key ? 700 : 400,
          }}>
            <div style={{ color: cat.color, fontWeight: 600 }}>{catLabels[cat.key]}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {cat.max === Infinity ? `> ${categories[categories.indexOf(cat) - 1]?.max ?? 0}%` :
               categories.indexOf(cat) === 0 ? `< ${cat.max}%` :
               `${categories[categories.indexOf(cat) - 1]?.max ?? 0} - ${cat.max}%`}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        {l.disclaimer}
      </div>
    </div>
  )
}
