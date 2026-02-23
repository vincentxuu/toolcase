'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface SavingsCalculatorProps {
  labels?: {
    initialDeposit: string
    monthlyDeposit: string
    annualRate: string
    savingsPeriod: string
    years: string
    finalBalance: string
    totalDeposits: string
    totalInterest: string
    growthChart: string
    year: string
    deposits: string
    interest: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function SavingsCalculator({ labels }: SavingsCalculatorProps) {
  const l = {
    initialDeposit: labels?.initialDeposit ?? 'Initial Deposit',
    monthlyDeposit: labels?.monthlyDeposit ?? 'Monthly Deposit',
    annualRate: labels?.annualRate ?? 'Annual Interest Rate (%)',
    savingsPeriod: labels?.savingsPeriod ?? 'Savings Period',
    years: labels?.years ?? 'years',
    finalBalance: labels?.finalBalance ?? 'Final Balance',
    totalDeposits: labels?.totalDeposits ?? 'Total Deposits',
    totalInterest: labels?.totalInterest ?? 'Interest Earned',
    growthChart: labels?.growthChart ?? 'Savings Growth',
    year: labels?.year ?? 'Year',
    deposits: labels?.deposits ?? 'Deposits',
    interest: labels?.interest ?? 'Interest',
    currency: labels?.currency ?? '$',
  }

  const [initial, setInitial] = useState(5000)
  const [monthly, setMonthly] = useState(300)
  const [rate, setRate] = useState(4.5)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const chartData: { year: number; deposits: number; interest: number }[] = []
    let balance = initial
    let totalDeposited = initial

    for (let yr = 1; yr <= years; yr++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthly
        totalDeposited += monthly
      }
      chartData.push({
        year: yr,
        deposits: Math.round(totalDeposited),
        interest: Math.round(balance - totalDeposited),
      })
    }

    return {
      finalBalance: balance,
      totalDeposits: totalDeposited,
      totalInterest: balance - totalDeposited,
      chartData,
    }
  }, [initial, monthly, rate, years])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.initialDeposit}</label>
          <input type="number" style={inputStyle} value={initial} onChange={(e) => setInitial(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.monthlyDeposit}</label>
          <input type="number" style={inputStyle} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.annualRate}</label>
          <input type="number" style={inputStyle} value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} max={100} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.savingsPeriod} ({l.years})</label>
          <input type="number" style={inputStyle} value={years} onChange={(e) => setYears(Number(e.target.value))} min={1} max={100} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.finalBalance}</div>
          <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">{formatNumber(result.finalBalance, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalDeposits}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{formatNumber(result.totalDeposits, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalInterest}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>{formatNumber(result.totalInterest, l.currency)}</div>
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
              <Area type="monotone" dataKey="deposits" name={l.deposits} stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="interest" name={l.interest} stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
