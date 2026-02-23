'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface LoanCalculatorProps {
  labels?: {
    loanAmount: string
    interestRate: string
    loanTerm: string
    years: string
    months: string
    monthlyPayment: string
    totalPayment: string
    totalInterest: string
    principal: string
    interest: string
    balance: string
    year: string
    paymentBreakdown: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function LoanCalculator({ labels }: LoanCalculatorProps) {
  const l = {
    loanAmount: labels?.loanAmount ?? 'Loan Amount',
    interestRate: labels?.interestRate ?? 'Annual Interest Rate (%)',
    loanTerm: labels?.loanTerm ?? 'Loan Term',
    years: labels?.years ?? 'years',
    months: labels?.months ?? 'months',
    monthlyPayment: labels?.monthlyPayment ?? 'Monthly Payment',
    totalPayment: labels?.totalPayment ?? 'Total Payment',
    totalInterest: labels?.totalInterest ?? 'Total Interest',
    principal: labels?.principal ?? 'Principal',
    interest: labels?.interest ?? 'Interest',
    balance: labels?.balance ?? 'Remaining Balance',
    year: labels?.year ?? 'Year',
    paymentBreakdown: labels?.paymentBreakdown ?? 'Payment Breakdown',
    currency: labels?.currency ?? '$',
  }

  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(6.5)
  const [termYears, setTermYears] = useState(5)

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const n = termYears * 12
    if (monthlyRate === 0) {
      const monthly = amount / n
      return {
        monthly,
        totalPayment: amount,
        totalInterest: 0,
        chartData: Array.from({ length: termYears }, (_, i) => ({
          year: i + 1, principal: Math.round(amount / termYears), interest: 0, balance: Math.round(amount - (amount / termYears) * (i + 1)),
        })),
      }
    }
    const monthly = amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const totalPayment = monthly * n
    const totalInterest = totalPayment - amount

    const chartData: { year: number; principal: number; interest: number; balance: number }[] = []
    let balance = amount
    for (let yr = 1; yr <= termYears; yr++) {
      let yp = 0, yi = 0
      for (let m = 0; m < 12; m++) {
        const ip = balance * monthlyRate
        const pp = monthly - ip
        yi += ip
        yp += pp
        balance -= pp
      }
      chartData.push({ year: yr, principal: Math.round(yp), interest: Math.round(yi), balance: Math.max(0, Math.round(balance)) })
    }
    return { monthly, totalPayment, totalInterest, chartData }
  }, [amount, rate, termYears])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>{l.loanAmount}</label>
          <input type="number" style={inputStyle} value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.interestRate}</label>
          <input type="number" style={inputStyle} value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} max={100} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.loanTerm} ({l.years})</label>
          <input type="number" style={inputStyle} value={termYears} onChange={(e) => setTermYears(Number(e.target.value))} min={1} max={50} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.monthlyPayment}</div>
          <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">{formatNumber(result.monthly, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalPayment}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700 }}>{formatNumber(result.totalPayment, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.totalInterest}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-error)' }}>{formatNumber(result.totalInterest, l.currency)}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{l.paymentBreakdown}</h3>
        <div style={{ width: '100%', height: 350, backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem 0.5rem 0 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.chartData}>
              <XAxis dataKey="year" label={{ value: l.year, position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => l.currency + (v / 1000).toFixed(0) + 'k'} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatNumber(Number(value ?? 0), l.currency)} />
              <Legend />
              <Area type="monotone" dataKey="principal" name={l.principal} stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="interest" name={l.interest} stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
