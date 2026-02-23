'use client'
import { useState, useMemo } from 'react'

interface RoiCalculatorProps {
  labels?: {
    investmentCost: string
    returnAmount: string
    investmentPeriod: string
    years: string
    roi: string
    annualizedRoi: string
    netProfit: string
    profitOrLoss: string
    profit: string
    loss: string
    currency: string
  }
}

function formatNumber(n: number, currency = '$') {
  return currency + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function RoiCalculator({ labels }: RoiCalculatorProps) {
  const l = {
    investmentCost: labels?.investmentCost ?? 'Investment Cost',
    returnAmount: labels?.returnAmount ?? 'Final Value (Return)',
    investmentPeriod: labels?.investmentPeriod ?? 'Investment Period',
    years: labels?.years ?? 'years',
    roi: labels?.roi ?? 'Total ROI',
    annualizedRoi: labels?.annualizedRoi ?? 'Annualized ROI',
    netProfit: labels?.netProfit ?? 'Net Profit',
    profitOrLoss: labels?.profitOrLoss ?? 'Result',
    profit: labels?.profit ?? 'Profit',
    loss: labels?.loss ?? 'Loss',
    currency: labels?.currency ?? '$',
  }

  const [cost, setCost] = useState(10000)
  const [returnAmt, setReturnAmt] = useState(15000)
  const [period, setPeriod] = useState(3)

  const result = useMemo(() => {
    const netProfit = returnAmt - cost
    const roi = cost > 0 ? (netProfit / cost) * 100 : 0
    const annualized = cost > 0 && period > 0
      ? (Math.pow(returnAmt / cost, 1 / period) - 1) * 100
      : 0
    return { netProfit, roi, annualized, isProfit: netProfit >= 0 }
  }, [cost, returnAmt, period])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label style={labelStyle}>{l.investmentCost}</label>
          <input type="number" style={inputStyle} value={cost} onChange={(e) => setCost(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.returnAmount}</label>
          <input type="number" style={inputStyle} value={returnAmt} onChange={(e) => setReturnAmt(Number(e.target.value))} min={0} />
        </div>
        <div>
          <label style={labelStyle}>{l.investmentPeriod} ({l.years})</label>
          <input type="number" style={inputStyle} value={period} onChange={(e) => setPeriod(Number(e.target.value))} min={0.1} step={0.5} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.roi}</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: result.isProfit ? 'var(--color-success)' : 'var(--color-error)' }}>
            {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(1)}%
          </div>
        </div>
        <div style={cardStyle}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.annualizedRoi}</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: result.isProfit ? 'var(--color-success)' : 'var(--color-error)' }}>
            {result.annualized >= 0 ? '+' : ''}{result.annualized.toFixed(1)}%
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.netProfit}</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: result.isProfit ? 'var(--color-success)' : 'var(--color-error)' }}>
          {result.netProfit >= 0 ? '+' : ''}{formatNumber(result.netProfit, l.currency)}
        </div>
        <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: result.isProfit ? 'var(--color-success)' : 'var(--color-error)' }}>
          {result.isProfit ? l.profit : l.loss}
        </div>
      </div>
    </div>
  )
}
