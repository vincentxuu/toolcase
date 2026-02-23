'use client'
import { useState, useMemo } from 'react'

interface CalorieCalculatorProps {
  labels?: {
    gender: string
    male: string
    female: string
    age: string
    height: string
    weight: string
    activity: string
    sedentary: string
    light: string
    moderate: string
    active: string
    veryActive: string
    goal: string
    lose: string
    maintain: string
    gain: string
    maintenanceCalories: string
    targetCalories: string
    protein: string
    carbs: string
    fat: string
    disclaimer: string
  }
}

const activityMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9]
const goalAdjustments = { lose: -500, maintain: 0, gain: 500 }

export default function CalorieCalculator({ labels }: CalorieCalculatorProps) {
  const l = {
    gender: labels?.gender ?? 'Gender',
    male: labels?.male ?? 'Male',
    female: labels?.female ?? 'Female',
    age: labels?.age ?? 'Age',
    height: labels?.height ?? 'Height (cm)',
    weight: labels?.weight ?? 'Weight (kg)',
    activity: labels?.activity ?? 'Activity Level',
    sedentary: labels?.sedentary ?? 'Sedentary (office job)',
    light: labels?.light ?? 'Light (1-3 days/week)',
    moderate: labels?.moderate ?? 'Moderate (3-5 days/week)',
    active: labels?.active ?? 'Active (6-7 days/week)',
    veryActive: labels?.veryActive ?? 'Very Active (athlete)',
    goal: labels?.goal ?? 'Goal',
    lose: labels?.lose ?? 'Lose Weight',
    maintain: labels?.maintain ?? 'Maintain Weight',
    gain: labels?.gain ?? 'Gain Weight',
    maintenanceCalories: labels?.maintenanceCalories ?? 'Maintenance Calories',
    targetCalories: labels?.targetCalories ?? 'Target Calories',
    protein: labels?.protein ?? 'Protein',
    carbs: labels?.carbs ?? 'Carbs',
    fat: labels?.fat ?? 'Fat',
    disclaimer: labels?.disclaimer ?? 'This calculator provides estimates based on the Mifflin-St Jeor equation. Consult a healthcare professional or registered dietitian for personalized nutrition advice.',
  }

  const activityLabels = [l.sedentary, l.light, l.moderate, l.active, l.veryActive]
  const goalLabels = { lose: l.lose, maintain: l.maintain, gain: l.gain }

  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(30)
  const [height, setHeight] = useState(175)
  const [weight, setWeight] = useState(75)
  const [activity, setActivity] = useState(2)
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain')

  const result = useMemo(() => {
    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161
    const maintenance = Math.round(bmr * activityMultipliers[activity])
    const target = Math.max(0, maintenance + goalAdjustments[goal])

    // Macros: ~30% protein, ~40% carbs, ~30% fat
    const proteinCals = target * 0.30
    const carbsCals = target * 0.40
    const fatCals = target * 0.30
    const proteinGrams = Math.round(proteinCals / 4)
    const carbsGrams = Math.round(carbsCals / 4)
    const fatGrams = Math.round(fatCals / 9)

    return { maintenance, target, proteinGrams, carbsGrams, fatGrams }
  }, [gender, age, height, weight, activity, goal])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  const goalBtnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '0.5rem 1rem', borderRadius: '0.5rem',
    border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'var(--color-text)',
    cursor: 'pointer', fontWeight: active ? 700 : 500, fontSize: '0.875rem',
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.age}</label>
          <input type="number" style={inputStyle} value={age} onChange={(e) => setAge(Number(e.target.value))} min={10} max={120} />
        </div>
        <div>
          <label style={labelStyle}>{l.gender}</label>
          <div className="flex gap-2">
            <button className={gender === 'male' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0 flex-1' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] flex-1'} onClick={() => setGender('male')}>{l.male}</button>
            <button className={gender === 'female' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0 flex-1' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] flex-1'} onClick={() => setGender('female')}>{l.female}</button>
          </div>
        </div>
        <div>
          <label style={labelStyle}>{l.height}</label>
          <input type="number" style={inputStyle} value={height} onChange={(e) => setHeight(Number(e.target.value))} min={50} max={300} />
        </div>
        <div>
          <label style={labelStyle}>{l.weight}</label>
          <input type="number" style={inputStyle} value={weight} onChange={(e) => setWeight(Number(e.target.value))} min={10} max={500} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>{l.activity}</label>
        <select style={inputStyle} value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
          {activityLabels.map((label, i) => (
            <option key={i} value={i}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>{l.goal}</label>
        <div className="flex gap-2">
          {(['lose', 'maintain', 'gain'] as const).map((g) => (
            <button key={g} style={goalBtnStyle(goal === g)} onClick={() => setGoal(g)}>
              {goalLabels[g]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.maintenanceCalories}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700 }}>{result.maintenance.toLocaleString()}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">cal/day</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.targetCalories}</div>
          <div className="text-3xl font-bold text-[var(--color-primary)]">{result.target.toLocaleString()}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">cal/day</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.protein}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ef4444' }}>{result.proteinGrams}g</div>
          <div className="text-[0.7rem] text-[var(--color-text-secondary)]">30%</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.carbs}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#3b82f6' }}>{result.carbsGrams}g</div>
          <div className="text-[0.7rem] text-[var(--color-text-secondary)]">40%</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.fat}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f59e0b' }}>{result.fatGrams}g</div>
          <div className="text-[0.7rem] text-[var(--color-text-secondary)]">30%</div>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
        {l.disclaimer}
      </div>
    </div>
  )
}
