'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'

interface RetirementCalculatorProps {
  labels?: {
    currentAge: string
    retirementAge: string
    currentSavings: string
    monthlyContribution: string
    annualReturn: string
    inflationRate: string
    monthlyRetirementSpending: string
    projectedSavings: string
    totalContributions: string
    retirementIncome: string
    yearsOfRetirement: string
    savingsLastUntilAge: string
    projectionChart: string
    age: string
    savings: string
    retirementPhase: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function RetirementCalculator({ labels }: RetirementCalculatorProps) {
  const l = {
    currentAge: labels?.currentAge ?? 'Current Age',
    retirementAge: labels?.retirementAge ?? 'Retirement Age',
    currentSavings: labels?.currentSavings ?? 'Current Savings',
    monthlyContribution: labels?.monthlyContribution ?? 'Monthly Contribution',
    annualReturn: labels?.annualReturn ?? 'Annual Return (%)',
    inflationRate: labels?.inflationRate ?? 'Inflation Rate (%)',
    monthlyRetirementSpending: labels?.monthlyRetirementSpending ?? 'Monthly Retirement Spending',
    projectedSavings: labels?.projectedSavings ?? 'Savings at Retirement',
    totalContributions: labels?.totalContributions ?? 'Total Contributions',
    retirementIncome: labels?.retirementIncome ?? 'Monthly Income (4% rule)',
    yearsOfRetirement: labels?.yearsOfRetirement ?? 'Retirement Funded',
    savingsLastUntilAge: labels?.savingsLastUntilAge ?? 'Savings Last Until Age',
    projectionChart: labels?.projectionChart ?? 'Retirement Projection',
    age: labels?.age ?? 'Age',
    savings: labels?.savings ?? 'Savings',
    retirementPhase: labels?.retirementPhase ?? 'Retirement',
    currency: labels?.currency ?? '$',
  }

  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyAdd, setMonthlyAdd] = useState(1000)
  const [returnRate, setReturnRate] = useState(7)
  const [inflation, setInflation] = useState(2.5)
  const [monthlySpending, setMonthlySpending] = useState(4000)

  const result = useMemo(() => {
    const realReturn = (1 + returnRate / 100) / (1 + inflation / 100) - 1
    const monthlyReal = realReturn / 12
    let balance = currentSavings
    let totalContributed = currentSavings
    const chartData: { age: number; savings: number }[] = [{ age: currentAge, savings: Math.round(balance) }]

    // Accumulation phase
    for (let age = currentAge + 1; age <= retireAge; age++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyReal) + monthlyAdd
        totalContributed += monthlyAdd
      }
      chartData.push({ age, savings: Math.round(balance) })
    }

    const savingsAtRetirement = balance
    const monthlyIncome4Pct = (savingsAtRetirement * 0.04) / 12

    // Withdrawal phase
    let lastAge = retireAge
    const maxAge = 100
    for (let age = retireAge + 1; age <= maxAge; age++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyReal) - monthlySpending
        if (balance <= 0) { balance = 0; break }
      }
      chartData.push({ age, savings: Math.round(balance) })
      if (balance <= 0) { lastAge = age; break }
      lastAge = age
    }
    if (balance > 0) lastAge = maxAge

    return {
      savingsAtRetirement,
      totalContributed,
      monthlyIncome4Pct,
      lastAge,
      retirementYears: lastAge - retireAge,
      chartData,
    }
  }, [currentAge, retireAge, currentSavings, monthlyAdd, returnRate, inflation, monthlySpending])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.currentAge}</label>
          <input type="number" style={inputStyle} value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} min={18} max={80} />
        </div>
        <div>
          <label style={labelStyle}>{l.retirementAge}</label>
          <input type="number" style={inputStyle} value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} min={currentAge + 1} max={85} />
        </div>
        <div>
          <label style={labelStyle}>{l.currentSavings}</label>
          <input type="number" style={inputStyle} value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.monthlyContribution}</label>
          <input type="number" style={inputStyle} value={monthlyAdd} onChange={(e) => setMonthlyAdd(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.annualReturn}</label>
          <input type="number" style={inputStyle} value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} min={0} max={30} step={0.1} />
        </div>
        <div>
          <label style={labelStyle}>{l.inflationRate}</label>
          <input type="number" style={inputStyle} value={inflation} onChange={(e) => setInflation(Number(e.target.value))} min={0} max={20} step={0.1} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>{l.monthlyRetirementSpending}</label>
        <input type="number" style={inputStyle} value={monthlySpending} onChange={(e) => setMonthlySpending(Number(e.target.value))} min={0} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.projectedSavings}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{formatNumber(result.savingsAtRetirement, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.retirementIncome}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatNumber(result.monthlyIncome4Pct, l.currency)}</div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.savingsLastUntilAge}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: result.lastAge >= 90 ? 'var(--color-success)' : 'var(--color-error)' }}>
            {result.lastAge >= 100 ? '100+' : result.lastAge}
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.yearsOfRetirement}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{result.retirementYears >= 35 ? '35+' : result.retirementYears} {l.age === 'Age' ? 'yrs' : '年'}</div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.projectionChart}</h3>
        <div style={{ width: '100%', height: 350, backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem 0.5rem 0 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={result.chartData}>
              <XAxis dataKey="age" label={{ value: l.age, position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => l.currency + (v / 1000000 >= 1 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'k')} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatNumber(Number(value ?? 0), l.currency)} />
              <ReferenceLine x={retireAge} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: l.retirementPhase, position: 'top', fontSize: 12 }} />
              <Area type="monotone" dataKey="savings" name={l.savings} stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
