'use client'
import { useState, useMemo } from 'react'
import { Table, TableHeader, TableCell } from '@/components/ui/table'

const BRACKETS_2024 = [
  { min: 0, max: 590000, rate: 0.05, cumDeduction: 0 },
  { min: 590000, max: 1330000, rate: 0.12, cumDeduction: 41300 },
  { min: 1330000, max: 2660000, rate: 0.20, cumDeduction: 147700 },
  { min: 2660000, max: 4980000, rate: 0.30, cumDeduction: 413700 },
  { min: 4980000, max: Infinity, rate: 0.40, cumDeduction: 911700 },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    bracket?: string; rate?: string; cumDeduction?: string
    quickCalc?: string; netIncome?: string; taxDue?: string; effectiveRate?: string
    year?: string
  }
}

export default function TwIncomeTaxBrackets({ labels }: Props) {
  const l = {
    title: labels?.title ?? '綜合所得稅級距表',
    desc: labels?.desc ?? '民國113年度（2024）適用',
    bracket: labels?.bracket ?? '所得淨額級距',
    rate: labels?.rate ?? '稅率',
    cumDeduction: labels?.cumDeduction ?? '累進差額',
    quickCalc: labels?.quickCalc ?? '快速試算',
    netIncome: labels?.netIncome ?? '綜合所得淨額',
    taxDue: labels?.taxDue ?? '應納稅額',
    effectiveRate: labels?.effectiveRate ?? '有效稅率',
    year: labels?.year ?? '年度',
  }

  const [income, setIncome] = useState(1000000)

  const result = useMemo(() => {
    let tax = 0
    let appliedRate = 0
    let cumDed = 0
    for (const b of BRACKETS_2024) {
      if (income <= b.max) {
        appliedRate = b.rate
        cumDed = b.cumDeduction
        tax = income * b.rate - b.cumDeduction
        break
      }
    }
    tax = Math.max(0, tax)
    const effective = income > 0 ? (tax / income) * 100 : 0
    return { tax, effective, appliedRate, cumDed }
  }, [income])

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  return (
    <div className="flex flex-col gap-6">
      {/* Table */}
      <Table>
        <thead>
          <tr>
            <TableHeader align="left">{l.bracket}</TableHeader>
            <TableHeader align="center">{l.rate}</TableHeader>
            <TableHeader align="right">{l.cumDeduction}</TableHeader>
            <TableHeader align="left">速算公式</TableHeader>
          </tr>
        </thead>
        <tbody>
          {BRACKETS_2024.map((b, i) => {
            const isActive = income > b.min && (i === BRACKETS_2024.length - 1 || income <= b.max)
            return (
              <tr key={i} className={isActive ? 'bg-blue-500/[0.08]' : ''}>
                <TableCell>
                  NT${fmt(b.min)} ~ {b.max === Infinity ? '以上' : `NT$${fmt(b.max)}`}
                </TableCell>
                <TableCell align="center" className="font-bold text-[var(--color-primary)]">
                  {(b.rate * 100).toFixed(0)}%
                </TableCell>
                <TableCell align="right">
                  NT${fmt(b.cumDeduction)}
                </TableCell>
                <TableCell className="text-[0.8125rem] text-[var(--color-text-secondary)]">
                  所得淨額 × {(b.rate * 100).toFixed(0)}% − {fmt(b.cumDeduction)}
                </TableCell>
              </tr>
            )
          })}
        </tbody>
      </Table>

      {/* Quick Calculator */}
      <div className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="text-base font-semibold mb-4">{l.quickCalc}</div>
        <div className="mb-4">
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">
            {l.netIncome}
          </label>
          <input type="number" className="w-full p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" value={income} onChange={e => setIncome(Number(e.target.value))} min={0} step={10000} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.taxDue}</div>
            <div className="text-2xl font-bold text-red-500">NT${fmt(result.tax)}</div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">
              {fmt(income)} × {(result.appliedRate * 100).toFixed(0)}% − {fmt(result.cumDed)}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.effectiveRate}</div>
            <div className="text-2xl font-bold text-amber-500">{result.effective.toFixed(1)}%</div>
          </div>
          <div className="p-5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center">
            <div className="text-xs text-[var(--color-text-secondary)] mb-1">稅後所得</div>
            <div className="text-2xl font-bold text-green-500">NT${fmt(income - result.tax)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
