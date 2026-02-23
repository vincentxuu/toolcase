'use client'
import { useState, useMemo } from 'react'

interface DiscountCalculatorProps {
  labels?: {
    originalPrice: string
    discountPercent: string
    discountAmount: string
    finalPrice: string
    youSave: string
    result: string
  }
}

export default function DiscountCalculator({ labels }: DiscountCalculatorProps) {
  const l = {
    originalPrice: labels?.originalPrice ?? 'Original Price',
    discountPercent: labels?.discountPercent ?? 'Discount (%)',
    discountAmount: labels?.discountAmount ?? 'Discount Amount',
    finalPrice: labels?.finalPrice ?? 'Final Price',
    youSave: labels?.youSave ?? 'You Save',
    result: labels?.result ?? 'Result',
  }

  const [price, setPrice] = useState(100)
  const [discount, setDiscount] = useState(20)

  const result = useMemo(() => {
    const discountAmount = price * (discount / 100)
    const finalPrice = price - discountAmount
    return { discountAmount, finalPrice }
  }, [price, discount])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.originalPrice}</label>
          <input type="number" style={inputStyle} value={price} onChange={(e) => setPrice(Number(e.target.value))} min={0} step={0.01} />
        </div>
        <div>
          <label style={labelStyle}>{l.discountPercent}</label>
          <input type="number" style={inputStyle} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} min={0} max={100} step={0.1} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.discountAmount}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ef4444' }}>
            -{result.discountAmount.toFixed(2)}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.finalPrice}</div>
          <div className="text-[1.75rem] font-bold text-[var(--color-primary)]">
            {result.finalPrice.toFixed(2)}
          </div>
        </div>
        <div style={cardStyle}>
          <div className="text-xs text-[var(--color-text-secondary)] mb-1">{l.youSave}</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#10b981' }}>
            {discount.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  )
}
