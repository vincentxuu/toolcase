'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface CreditCardCalculatorProps {
  labels?: {
    balance: string
    interestRate: string
    minimumPayment: string
    fixedPayment: string
    monthsToPayoff: string
    totalInterest: string
    totalPayment: string
    payoffChart: string
    month: string
    remainingBalance: string
    minPaymentWarning: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function CreditCardCalculator({ labels }: CreditCardCalculatorProps) {
  const l = {
    balance: labels?.balance ?? 'Credit Card Balance',
    interestRate: labels?.interestRate ?? 'Annual Interest Rate (%)',
    minimumPayment: labels?.minimumPayment ?? 'Minimum Payment (%)',
    fixedPayment: labels?.fixedPayment ?? 'Fixed Monthly Payment',
    monthsToPayoff: labels?.monthsToPayoff ?? 'Months to Pay Off',
    totalInterest: labels?.totalInterest ?? 'Total Interest',
    totalPayment: labels?.totalPayment ?? 'Total Payment',
    payoffChart: labels?.payoffChart ?? 'Payoff Timeline',
    month: labels?.month ?? 'Month',
    remainingBalance: labels?.remainingBalance ?? 'Remaining Balance',
    minPaymentWarning: labels?.minPaymentWarning ?? 'Paying only the minimum will take much longer and cost significantly more in interest!',
    currency: labels?.currency ?? '$',
  }

  const [balance, setBalance] = useState(5000)
  const [rate, setRate] = useState(19.99)
  const [minPercent, setMinPercent] = useState(2)
  const [fixedPayment, setFixedPayment] = useState(200)

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12

    function simulate(getPayment: (bal: number) => number) {
      let bal = balance
      let totalInterest = 0
      let totalPaid = 0
      const data: { month: number; balance: number }[] = [{ month: 0, balance: Math.round(bal) }]
      let month = 0
      while (bal > 0.01 && month < 600) {
        month++
        const interest = bal * monthlyRate
        totalInterest += interest
        bal += interest
        const payment = Math.min(Math.max(getPayment(bal), 25), bal)
        bal -= payment
        totalPaid += payment
        if (month % (month <= 60 ? 1 : 3) === 0 || bal <= 0.01) {
          data.push({ month, balance: Math.max(0, Math.round(bal)) })
        }
      }
      return { months: month, totalInterest, totalPaid, data }
    }

    const minResult = simulate((bal) => bal * (minPercent / 100))
    const fixedResult = simulate(() => fixedPayment)

    return { minResult, fixedResult }
  }, [balance, rate, minPercent, fixedPayment])

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
          <label style={labelStyle}>{l.balance}</label>
          <input type="number" style={inputStyle} value={balance} onChange={(e) => setBalance(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.interestRate}</label>
          <input type="number" style={inputStyle} value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} max={100} step={0.01} />
        </div>
        <div>
          <label style={labelStyle}>{l.minimumPayment}</label>
          <input type="number" style={inputStyle} value={minPercent} onChange={(e) => setMinPercent(Number(e.target.value))} min={1} max={100} step={0.5} />
        </div>
        <div>
          <label style={labelStyle}>{l.fixedPayment}</label>
          <input type="number" style={inputStyle} value={fixedPayment} onChange={(e) => setFixedPayment(Number(e.target.value))} min={25} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-error)' }}>Minimum Payment Only</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.monthsToPayoff}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{result.minResult.months}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.totalInterest}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-error)' }}>{formatNumber(result.minResult.totalInterest, l.currency)}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.totalPayment}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{formatNumber(result.minResult.totalPaid, l.currency)}</div>
            </div>
          </div>
        </div>
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-success)' }}>Fixed Payment ({formatNumber(fixedPayment, l.currency)}/mo)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.monthsToPayoff}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{result.fixedResult.months}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.totalInterest}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)' }}>{formatNumber(result.fixedResult.totalInterest, l.currency)}</div>
            </div>
            <div style={cardStyle}>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{l.totalPayment}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{formatNumber(result.fixedResult.totalPaid, l.currency)}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', fontSize: '0.875rem', color: 'var(--color-text)' }}>
        ⚠️ {l.minPaymentWarning}
      </div>

      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.payoffChart}</h3>
        <div style={{ width: '100%', height: 350, backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.75rem', border: '1px solid var(--color-border)', padding: '1rem 0.5rem 0 0' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
              <XAxis dataKey="month" type="number" label={{ value: l.month, position: 'insideBottom', offset: -5 }} tick={{ fontSize: 12 }} allowDuplicatedCategory={false} />
              <YAxis tickFormatter={(v) => l.currency + (v / 1000).toFixed(0) + 'k'} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatNumber(Number(value ?? 0), l.currency)} />
              <Line data={result.minResult.data} dataKey="balance" name="Minimum" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line data={result.fixedResult.data} dataKey="balance" name="Fixed" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
