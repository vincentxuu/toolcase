'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface CompoundInterestCalculatorProps {
  labels?: {
    initialInvestment: string
    monthlyContribution: string
    annualRate: string
    investmentPeriod: string
    years: string
    compoundFrequency: string
    monthly: string
    quarterly: string
    annually: string
    finalBalance: string
    totalContributions: string
    totalInterest: string
    growthChart: string
    year: string
    contributions: string
    interest: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function CompoundInterestCalculator({ labels }: CompoundInterestCalculatorProps) {
  const l = {
    initialInvestment: labels?.initialInvestment ?? 'Initial Investment',
    monthlyContribution: labels?.monthlyContribution ?? 'Monthly Contribution',
    annualRate: labels?.annualRate ?? 'Annual Interest Rate (%)',
    investmentPeriod: labels?.investmentPeriod ?? 'Investment Period',
    years: labels?.years ?? 'years',
    compoundFrequency: labels?.compoundFrequency ?? 'Compound Frequency',
    monthly: labels?.monthly ?? 'Monthly',
    quarterly: labels?.quarterly ?? 'Quarterly',
    annually: labels?.annually ?? 'Annually',
    finalBalance: labels?.finalBalance ?? 'Final Balance',
    totalContributions: labels?.totalContributions ?? 'Total Contributions',
    totalInterest: labels?.totalInterest ?? 'Total Interest Earned',
    growthChart: labels?.growthChart ?? 'Growth Over Time',
    year: labels?.year ?? 'Year',
    contributions: labels?.contributions ?? 'Contributions',
    interest: labels?.interest ?? 'Interest',
    currency: labels?.currency ?? '$',
  }

  const [principal, setPrincipal] = useState(10000)
  const [monthlyAdd, setMonthlyAdd] = useState(500)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(20)
  const [frequency, setFrequency] = useState<12 | 4 | 1>(12)

  const result = useMemo(() => {
    const r = rate / 100
    const n = frequency
    const ratePerPeriod = r / n
    const chartData: { year: number; contributions: number; interest: number }[] = []

    let balance = principal
    let totalContributed = principal
    const monthlyPerPeriod = monthlyAdd * (12 / n)

    for (let yr = 1; yr <= years; yr++) {
      for (let p = 0; p < n; p++) {
        balance = balance * (1 + ratePerPeriod) + monthlyPerPeriod
        totalContributed += monthlyPerPeriod
      }
      const interestEarned = balance - totalContributed
      chartData.push({
        year: yr,
        contributions: Math.round(totalContributed),
        interest: Math.round(interestEarned),
      })
    }

    return {
      finalBalance: balance,
      totalContributions: totalContributed,
      totalInterest: balance - totalContributed,
      chartData,
    }
  }, [principal, monthlyAdd, rate, years, frequency])

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '1rem',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.375rem',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  }

  const cardStyle: React.CSSProperties = {
    padding: '1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.initialInvestment}</label>
          <input type="number" style={inputStyle} value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.monthlyContribution}</label>
          <input type="number" style={inputStyle} value={monthlyAdd} onChange={(e) => setMonthlyAdd(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.annualRate}</label>
          <input type="number" style={inputStyle} value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} max={100} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.investmentPeriod} ({l.years})</label>
          <input type="number" style={inputStyle} value={years} onChange={(e) => setYears(Number(e.target.value))} min={1} max={100} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>{l.compoundFrequency}</label>
        <div className="flex gap-2">
          {([
            [12, l.monthly],
            [4, l.quarterly],
            [1, l.annually],
          ] as const).map(([val, label]) => (
            <button
              key={val}
              className={frequency === val ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
              onClick={() => setFrequency(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.finalBalance}</div>
          <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">
            {formatNumber(result.finalBalance, l.currency)}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalContributions}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {formatNumber(result.totalContributions, l.currency)}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalInterest}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>
            {formatNumber(result.totalInterest, l.currency)}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{l.growthChart}</h3>
        <div style={{ width: '100%', height: 350, backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem 0.5rem 0 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.chartData}>
              <XAxis dataKey="year" label={{ value: l.year, position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => l.currency + (v / 1000).toFixed(0) + 'k'} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatNumber(Number(value ?? 0), l.currency)} />
              <Legend />
              <Area type="monotone" dataKey="contributions" name={l.contributions} stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="interest" name={l.interest} stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
