'use client'
import { useState, useMemo } from 'react'

// 勞工退休金月提繳分級表 (2024)
const LP_GRADES = [
  { grade: 1, salary: 1500 },
  { grade: 2, salary: 3000 },
  { grade: 3, salary: 4500 },
  { grade: 4, salary: 6000 },
  { grade: 5, salary: 7500 },
  { grade: 6, salary: 8700 },
  { grade: 7, salary: 9900 },
  { grade: 8, salary: 11100 },
  { grade: 9, salary: 12540 },
  { grade: 10, salary: 13500 },
  { grade: 11, salary: 15840 },
  { grade: 12, salary: 16500 },
  { grade: 13, salary: 17280 },
  { grade: 14, salary: 17880 },
  { grade: 15, salary: 19047 },
  { grade: 16, salary: 20008 },
  { grade: 17, salary: 21009 },
  { grade: 18, salary: 22000 },
  { grade: 19, salary: 23100 },
  { grade: 20, salary: 24000 },
  { grade: 21, salary: 25250 },
  { grade: 22, salary: 26400 },
  { grade: 23, salary: 27470 },
  { grade: 24, salary: 28800 },
  { grade: 25, salary: 30300 },
  { grade: 26, salary: 31800 },
  { grade: 27, salary: 33300 },
  { grade: 28, salary: 34800 },
  { grade: 29, salary: 36300 },
  { grade: 30, salary: 38200 },
  { grade: 31, salary: 40100 },
  { grade: 32, salary: 42000 },
  { grade: 33, salary: 43900 },
  { grade: 34, salary: 45800 },
  { grade: 35, salary: 48200 },
  { grade: 36, salary: 50600 },
  { grade: 37, salary: 53000 },
  { grade: 38, salary: 55400 },
  { grade: 39, salary: 57800 },
  { grade: 40, salary: 60800 },
  { grade: 41, salary: 63800 },
  { grade: 42, salary: 66800 },
  { grade: 43, salary: 69800 },
  { grade: 44, salary: 72800 },
  { grade: 45, salary: 76500 },
  { grade: 46, salary: 80200 },
  { grade: 47, salary: 83900 },
  { grade: 48, salary: 87600 },
  { grade: 49, salary: 92100 },
  { grade: 50, salary: 96600 },
  { grade: 51, salary: 101100 },
  { grade: 52, salary: 105600 },
  { grade: 53, salary: 110100 },
  { grade: 54, salary: 115500 },
  { grade: 55, salary: 120900 },
  { grade: 56, salary: 126300 },
  { grade: 57, salary: 131700 },
  { grade: 58, salary: 137100 },
  { grade: 59, salary: 142500 },
  { grade: 60, salary: 147900 },
  { grade: 61, salary: 150000 },
]

const EMPLOYER_RATE = 0.06 // 雇主提繳不低於 6%

interface Props {
  labels?: {
    title?: string; desc?: string
    grade?: string; wageGrade?: string; employerContrib?: string; voluntaryContrib?: string
    quickLookup?: string; monthlySalary?: string; yourGrade?: string
    monthlyEmployer?: string; annualEmployer?: string; voluntaryNote?: string
  }
}

export default function TwLaborPension({ labels }: Props) {
  const l = {
    title: labels?.title ?? '勞退提繳級距表',
    desc: labels?.desc ?? '113年度（2024）適用',
    grade: labels?.grade ?? '級距',
    wageGrade: labels?.wageGrade ?? '月提繳工資',
    employerContrib: labels?.employerContrib ?? '雇主提繳（6%）',
    voluntaryContrib: labels?.voluntaryContrib ?? '自願提繳（0~6%）',
    quickLookup: labels?.quickLookup ?? '快速查詢',
    monthlySalary: labels?.monthlySalary ?? '月薪',
    yourGrade: labels?.yourGrade ?? '適用級距',
    monthlyEmployer: labels?.monthlyEmployer ?? '雇主每月提繳',
    annualEmployer: labels?.annualEmployer ?? '雇主全年提繳',
    voluntaryNote: labels?.voluntaryNote ?? '自願提繳說明',
  }

  const [salary, setSalary] = useState(50000)
  const [voluntaryRate, setVoluntaryRate] = useState(6)

  const matched = useMemo(() => {
    for (let i = 0; i < LP_GRADES.length; i++) {
      if (salary <= LP_GRADES[i].salary) return LP_GRADES[i]
    }
    return LP_GRADES[LP_GRADES.length - 1]
  }, [salary])

  const employerContrib = Math.round(matched.salary * EMPLOYER_RATE)
  const voluntaryContrib = Math.round(matched.salary * (voluntaryRate / 100))

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.8125rem' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div style={{ fontSize: '0.875rem' }}>
          <strong>勞退新制：</strong>雇主每月至少提繳工資的 6% 到勞工個人退休金專戶。勞工可自願提繳 1~6%（享有當年度個人綜合所得稅遞延優惠）。
        </div>
      </div>

      {/* Quick Lookup */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickLookup}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.monthlySalary}</label>
            <input type="number" style={inputStyle} value={salary} onChange={e => setSalary(Number(e.target.value))} min={0} step={1000} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>自願提繳比例</label>
            <select style={inputStyle} value={voluntaryRate} onChange={e => setVoluntaryRate(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5, 6].map(r => <option key={r} value={r}>{r}%</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.yourGrade}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>NT${fmt(matched.salary)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.monthlyEmployer}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(employerContrib)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>自願提繳</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#3b82f6' }}>NT${fmt(voluntaryContrib)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.annualEmployer}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f59e0b' }}>NT${fmt(employerContrib * 12)}</div>
          </div>
        </div>
      </div>

      {/* Full table */}
      <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg)' }}>
            <tr>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.grade}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.wageGrade}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.employerContrib}</th>
            </tr>
          </thead>
          <tbody>
            {LP_GRADES.map((g) => {
              const contrib = Math.round(g.salary * EMPLOYER_RATE)
              const isActive = g.grade === matched.grade
              return (
                <tr key={g.grade} style={isActive ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>{g.grade}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(g.salary)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: isActive ? 700 : 400, color: isActive ? '#ef4444' : 'inherit' }}>NT${fmt(contrib)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
