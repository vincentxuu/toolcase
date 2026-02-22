'use client'
import { useState, useMemo } from 'react'

// 全民健康保險投保金額分級表 (2024)
const NHI_GRADES = [
  { grade: 1, salary: 27470, premium: 457 },
  { grade: 2, salary: 28800, premium: 479 },
  { grade: 3, salary: 30300, premium: 504 },
  { grade: 4, salary: 31800, premium: 529 },
  { grade: 5, salary: 33300, premium: 554 },
  { grade: 6, salary: 34800, premium: 579 },
  { grade: 7, salary: 36300, premium: 604 },
  { grade: 8, salary: 38200, premium: 635 },
  { grade: 9, salary: 40100, premium: 667 },
  { grade: 10, salary: 42000, premium: 699 },
  { grade: 11, salary: 43900, premium: 730 },
  { grade: 12, salary: 45800, premium: 762 },
  { grade: 13, salary: 48200, premium: 802 },
  { grade: 14, salary: 50600, premium: 842 },
  { grade: 15, salary: 53000, premium: 882 },
  { grade: 16, salary: 55400, premium: 922 },
  { grade: 17, salary: 57800, premium: 962 },
  { grade: 18, salary: 60800, premium: 1012 },
  { grade: 19, salary: 63800, premium: 1061 },
  { grade: 20, salary: 66800, premium: 1111 },
  { grade: 21, salary: 69800, premium: 1161 },
  { grade: 22, salary: 72800, premium: 1211 },
  { grade: 23, salary: 76500, premium: 1273 },
  { grade: 24, salary: 80200, premium: 1334 },
  { grade: 25, salary: 83900, premium: 1396 },
  { grade: 26, salary: 87600, premium: 1457 },
  { grade: 27, salary: 92100, premium: 1532 },
  { grade: 28, salary: 96600, premium: 1607 },
  { grade: 29, salary: 101100, premium: 1682 },
  { grade: 30, salary: 105600, premium: 1757 },
  { grade: 31, salary: 110100, premium: 1832 },
  { grade: 32, salary: 115500, premium: 1921 },
  { grade: 33, salary: 120900, premium: 2011 },
  { grade: 34, salary: 126300, premium: 2101 },
  { grade: 35, salary: 131700, premium: 2191 },
  { grade: 36, salary: 137100, premium: 2281 },
  { grade: 37, salary: 142500, premium: 2371 },
  { grade: 38, salary: 147900, premium: 2461 },
  { grade: 39, salary: 150000, premium: 2496 },
  { grade: 40, salary: 156400, premium: 2602 },
  { grade: 41, salary: 162800, premium: 2709 },
  { grade: 42, salary: 169200, premium: 2815 },
  { grade: 43, salary: 175600, premium: 2921 },
  { grade: 44, salary: 182000, premium: 3028 },
  { grade: 45, salary: 189500, premium: 3153 },
  { grade: 46, salary: 197000, premium: 3278 },
  { grade: 47, salary: 204500, premium: 3402 },
  { grade: 48, salary: 212000, premium: 3527 },
  { grade: 49, salary: 219500, premium: 3652 },
]

const NHI_RATE = 0.0517 // 5.17%
const EMPLOYEE_SHARE = 0.30 // 被保險人 30%
const EMPLOYER_SHARE = 0.60 // 雇主 60%
const GOV_SHARE = 0.10 // 政府 10%

interface Props {
  labels?: {
    title?: string; desc?: string
    grade?: string; insuredSalary?: string; employeePremium?: string
    employerPremium?: string; quickLookup?: string; monthlySalary?: string
    yourGrade?: string; monthlyPremium?: string; annualPremium?: string
    rateInfo?: string
  }
}

export default function TwNhiPremium({ labels }: Props) {
  const l = {
    title: labels?.title ?? '健保投保級距表',
    desc: labels?.desc ?? '113年度（2024）適用',
    grade: labels?.grade ?? '級距',
    insuredSalary: labels?.insuredSalary ?? '投保金額',
    employeePremium: labels?.employeePremium ?? '被保險人自付',
    employerPremium: labels?.employerPremium ?? '雇主負擔',
    quickLookup: labels?.quickLookup ?? '快速查詢',
    monthlySalary: labels?.monthlySalary ?? '月薪',
    yourGrade: labels?.yourGrade ?? '適用級距',
    monthlyPremium: labels?.monthlyPremium ?? '每月自付保費',
    annualPremium: labels?.annualPremium ?? '全年自付保費',
    rateInfo: labels?.rateInfo ?? '費率說明',
  }

  const [salary, setSalary] = useState(50000)

  const matched = useMemo(() => {
    for (let i = 0; i < NHI_GRADES.length; i++) {
      if (salary <= NHI_GRADES[i].salary) return NHI_GRADES[i]
    }
    return NHI_GRADES[NHI_GRADES.length - 1]
  }, [salary])

  const employerPremium = useMemo(() => {
    return Math.round(matched.salary * NHI_RATE * EMPLOYER_SHARE * (1 + 0.7))
  }, [matched])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.8125rem' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Rate info */}
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div style={{ fontSize: '0.875rem' }}>
          <strong>{l.rateInfo}：</strong>健保費率 {(NHI_RATE * 100).toFixed(2)}%，被保險人自付 30%、雇主負擔 60%、政府補助 10%
        </div>
      </div>

      {/* Quick Lookup */}
      <div style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>{l.quickLookup}</div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.monthlySalary}</label>
          <input type="number" style={inputStyle} value={salary} onChange={e => setSalary(Number(e.target.value))} min={0} step={1000} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.yourGrade}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>NT${fmt(matched.salary)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.monthlyPremium}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>NT${fmt(matched.premium)}</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.annualPremium}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>NT${fmt(matched.premium * 12)}</div>
          </div>
        </div>
      </div>

      {/* Full table */}
      <div style={{ overflowX: 'auto', maxHeight: '500px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'var(--color-bg)' }}>
            <tr>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.grade}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.insuredSalary}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.employeePremium}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.employerPremium}</th>
            </tr>
          </thead>
          <tbody>
            {NHI_GRADES.map((g) => {
              const empShare = Math.round(g.salary * NHI_RATE * EMPLOYER_SHARE * (1 + 0.7))
              const isActive = g.grade === matched.grade
              return (
                <tr key={g.grade} style={isActive ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>{g.grade}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(g.salary)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: isActive ? 700 : 400, color: isActive ? '#ef4444' : 'inherit' }}>NT${fmt(g.premium)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(empShare)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
