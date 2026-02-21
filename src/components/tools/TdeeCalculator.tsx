'use client'
import { useState, useMemo } from 'react'

interface TdeeCalculatorProps {
  labels?: {
    age: string
    gender: string
    male: string
    female: string
    height: string
    weight: string
    cm: string
    kg: string
    activityLevel: string
    sedentary: string
    light: string
    moderate: string
    active: string
    veryActive: string
    bmr: string
    tdee: string
    toMaintain: string
    toLose: string
    toGain: string
    calories: string
    disclaimer: string
  }
}

const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9]

export default function TdeeCalculator({ labels }: TdeeCalculatorProps) {
  const l = {
    age: labels?.age ?? 'Age',
    gender: labels?.gender ?? 'Gender',
    male: labels?.male ?? 'Male',
    female: labels?.female ?? 'Female',
    height: labels?.height ?? 'Height',
    weight: labels?.weight ?? 'Weight',
    cm: labels?.cm ?? 'cm',
    kg: labels?.kg ?? 'kg',
    activityLevel: labels?.activityLevel ?? 'Activity Level',
    sedentary: labels?.sedentary ?? 'Sedentary (office job)',
    light: labels?.light ?? 'Light (1-3 days/week)',
    moderate: labels?.moderate ?? 'Moderate (3-5 days/week)',
    active: labels?.active ?? 'Active (6-7 days/week)',
    veryActive: labels?.veryActive ?? 'Very Active (athlete)',
    bmr: labels?.bmr ?? 'BMR',
    tdee: labels?.tdee ?? 'TDEE',
    toMaintain: labels?.toMaintain ?? 'Maintain Weight',
    toLose: labels?.toLose ?? 'Lose Weight (-500 cal)',
    toGain: labels?.toGain ?? 'Gain Weight (+500 cal)',
    calories: labels?.calories ?? 'cal/day',
    disclaimer: labels?.disclaimer ?? 'This tool is for informational purposes only and is not a substitute for professional medical advice.',
  }

  const [age, setAge] = useState(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState(175)
  const [weight, setWeight] = useState(75)
  const [activity, setActivity] = useState(2)

  const activityLabels = [l.sedentary, l.light, l.moderate, l.active, l.veryActive]

  const result = useMemo(() => {
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
    const tdee = bmr * activityMultipliers[activity]
    return { bmr: Math.round(bmr), tdee: Math.round(tdee) }
  }, [age, gender, height, weight, activity])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.age}</label>
          <input type="number" style={inputStyle} value={age} onChange={(e) => setAge(Number(e.target.value))} min={10} max={120} />
        </div>
        <div>
          <label style={labelStyle}>{l.gender}</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className={gender === 'male' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGender('male')} style={{ flex: 1 }}>{l.male}</button>
            <button className={gender === 'female' ? 'btn-primary' : 'btn-secondary'} onClick={() => setGender('female')} style={{ flex: 1 }}>{l.female}</button>
          </div>
        </div>
        <div>
          <label style={labelStyle}>{l.height} ({l.cm})</label>
          <input type="number" style={inputStyle} value={height} onChange={(e) => setHeight(Number(e.target.value))} min={50} max={300} />
        </div>
        <div>
          <label style={labelStyle}>{l.weight} ({l.kg})</label>
          <input type="number" style={inputStyle} value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={10} max={500} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>{l.activityLevel}</label>
        <select style={inputStyle} value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
          {activityLabels.map((label, i) => (
            <option key={i} value={i}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.bmr}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{result.bmr.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.calories}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.tdee}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>{result.tdee.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.calories}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.toLose}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>{(result.tdee - 500).toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.calories}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.toMaintain}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{result.tdee.toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.calories}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.toGain}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-error)' }}>{(result.tdee + 500).toLocaleString()}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.calories}</div>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        ℹ️ {l.disclaimer}
      </div>
    </div>
  )
}
