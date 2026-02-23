'use client'
import { useState, useMemo } from 'react'

// 勞工保險投保薪資分級表 (2024)
const LI_GRADES = [
  { grade: 1, salary: 27470 },
  { grade: 2, salary: 28800 },
  { grade: 3, salary: 30300 },
  { grade: 4, salary: 31800 },
  { grade: 5, salary: 33300 },
  { grade: 6, salary: 34800 },
  { grade: 7, salary: 36300 },
  { grade: 8, salary: 38200 },
  { grade: 9, salary: 40100 },
  { grade: 10, salary: 42000 },
  { grade: 11, salary: 43900 },
  { grade: 12, salary: 45800 },
  { grade: 13, salary: 48200 },
  { grade: 14, salary: 50600 },
  { grade: 15, salary: 53000 },
  { grade: 16, salary: 55400 },
  { grade: 17, salary: 57800 },
  { grade: 18, salary: 60800 },
]

const LI_RATE = 0.115 // 勞保普通事故費率 11.5% (含就保1%)
const EMPLOYEE_RATE = 0.20 // 勞工自付 20%
const EMPLOYER_RATE = 0.70 // 雇主負擔 70%
const GOV_RATE = 0.10 // 政府補助 10%

const EMPLOYMENT_INSURANCE_RATE = 0.01 // 就業保險費率 1%

interface Props {
  labels?: {
    title?: string; desc?: string
    grade?: string; insuredSalary?: string; employeePremium?: string
    employerPremium?: string; quickLookup?: string; monthlySalary?: string
    yourGrade?: string; monthlyPremium?: string; annualPremium?: string
    rateInfo?: string; rateBreakdown?: string; item?: string; rate?: string
  }
}

export default function TwLaborInsurance({ labels }: Props) {
  const l = {
    title: labels?.title ?? '勞保投保級距表',
    desc: labels?.desc ?? '113年度（2024）適用',
    grade: labels?.grade ?? '級距',
    insuredSalary: labels?.insuredSalary ?? '投保薪資',
    employeePremium: labels?.employeePremium ?? '勞工自付',
    employerPremium: labels?.employerPremium ?? '雇主負擔',
    quickLookup: labels?.quickLookup ?? '快速查詢',
    monthlySalary: labels?.monthlySalary ?? '月薪',
    yourGrade: labels?.yourGrade ?? '適用級距',
    monthlyPremium: labels?.monthlyPremium ?? '每月自付保費',
    annualPremium: labels?.annualPremium ?? '全年自付保費',
    rateInfo: labels?.rateInfo ?? '費率說明',
    rateBreakdown: labels?.rateBreakdown ?? '費率組成',
    item: labels?.item ?? '項目',
    rate: labels?.rate ?? '費率',
  }

  const [salary, setSalary] = useState(50000)

  const matched = useMemo(() => {
    for (let i = 0; i < LI_GRADES.length; i++) {
      if (salary <= LI_GRADES[i].salary) return LI_GRADES[i]
    }
    return LI_GRADES[LI_GRADES.length - 1]
  }, [salary])

  const employeePremium = Math.round(matched.salary * LI_RATE * EMPLOYEE_RATE)
  const employerPremium = Math.round(matched.salary * LI_RATE * EMPLOYER_RATE)

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.8125rem' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      {/* Rate breakdown */}
      <div className="overflow-x-auto">
        <div className="text-base font-semibold mb-3">{l.rateBreakdown}</div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr><td style={{ ...cellStyle, fontWeight: 600 }}>勞保普通事故保險費率</td><td style={{ ...cellStyle, textAlign: 'right' }}>10.5%</td></tr>
            <tr><td style={{ ...cellStyle, fontWeight: 600 }}>就業保險費率</td><td style={{ ...cellStyle, textAlign: 'right' }}>1.0%</td></tr>
            <tr style={{ backgroundColor: 'rgba(59,130,246,0.08)' }}><td style={{ ...cellStyle, fontWeight: 700 }}>合計</td><td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>11.5%</td></tr>
            <tr><td style={{ ...cellStyle, fontWeight: 600 }}>勞工自付比例</td><td style={{ ...cellStyle, textAlign: 'right' }}>20%（= 薪資 × 11.5% × 20%）</td></tr>
            <tr><td style={{ ...cellStyle, fontWeight: 600 }}>雇主負擔比例</td><td style={{ ...cellStyle, textAlign: 'right' }}>70%（= 薪資 × 11.5% × 70%）</td></tr>
            <tr><td style={{ ...cellStyle, fontWeight: 600 }}>政府補助比例</td><td style={{ ...cellStyle, textAlign: 'right' }}>10%</td></tr>
          </tbody>
        </table>
      </div>

      {/* Quick Lookup */}
      <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="text-base font-semibold mb-4">{l.quickLookup}</div>
        <div className="mb-4">
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.monthlySalary}</label>
          <input type="number" style={inputStyle} value={salary} onChange={e => setSalary(Number(e.target.value))} min={0} step={1000} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.yourGrade}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>NT${fmt(matched.salary)}</div>
          </div>
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.monthlyPremium}</div>
            <div className="text-2xl font-bold text-red-500">NT${fmt(employeePremium)}</div>
          </div>
          <div style={cardStyle}>
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.annualPremium}</div>
            <div className="text-2xl font-bold text-amber-500">NT${fmt(employeePremium * 12)}</div>
          </div>
        </div>
      </div>

      {/* Full table */}
      <div className="overflow-x-auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.grade}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.insuredSalary}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.employeePremium}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.employerPremium}</th>
            </tr>
          </thead>
          <tbody>
            {LI_GRADES.map((g) => {
              const emp = Math.round(g.salary * LI_RATE * EMPLOYEE_RATE)
              const empr = Math.round(g.salary * LI_RATE * EMPLOYER_RATE)
              const isActive = g.grade === matched.grade
              return (
                <tr key={g.grade} style={isActive ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>{g.grade}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(g.salary)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: isActive ? 700 : 400, color: isActive ? '#ef4444' : 'inherit' }}>NT${fmt(emp)}</td>
                  <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(empr)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
        ※ 勞保投保薪資上限為 NT$45,800（第1級至第13級適用一般勞工）。部分工時勞工投保薪資下限為基本工資（NT$27,470）。雇主另需負擔職災保險費（依行業別 0.04% ~ 0.92%）。
      </div>
    </div>
  )
}
