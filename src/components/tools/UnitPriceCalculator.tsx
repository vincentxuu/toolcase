'use client'
import { useState, useMemo } from 'react'

interface UnitPriceCalculatorProps {
  labels?: {
    itemName: string
    price: string
    quantity: string
    unit: string
    unitPrice: string
    bestDeal: string
    addItem: string
    remove: string
    item: string
    compareItems: string
  }
}

const UNITS = ['g', 'kg', 'mL', 'L', 'oz', 'lb', 'pcs']

interface Item {
  id: number
  name: string
  price: number
  quantity: number
  unit: string
}

let nextId = 3

export default function UnitPriceCalculator({ labels }: UnitPriceCalculatorProps) {
  const l = {
    itemName: labels?.itemName ?? 'Item Name',
    price: labels?.price ?? 'Price',
    quantity: labels?.quantity ?? 'Quantity',
    unit: labels?.unit ?? 'Unit',
    unitPrice: labels?.unitPrice ?? 'Unit Price',
    bestDeal: labels?.bestDeal ?? 'Best Deal',
    addItem: labels?.addItem ?? 'Add Item',
    remove: labels?.remove ?? 'Remove',
    item: labels?.item ?? 'Item',
    compareItems: labels?.compareItems ?? 'Compare Items',
  }

  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item A', price: 5.99, quantity: 500, unit: 'g' },
    { id: 2, name: 'Item B', price: 9.49, quantity: 1, unit: 'kg' },
  ])

  const results = useMemo(() => {
    const normalized = items.map((item) => {
      let baseQuantity = item.quantity
      let baseUnit = item.unit

      if (item.unit === 'kg') { baseQuantity = item.quantity * 1000; baseUnit = 'g' }
      else if (item.unit === 'L') { baseQuantity = item.quantity * 1000; baseUnit = 'mL' }
      else if (item.unit === 'lb') { baseQuantity = item.quantity * 16; baseUnit = 'oz' }

      const unitPrice = baseQuantity > 0 ? item.price / baseQuantity : 0
      return { id: item.id, unitPrice, baseUnit }
    })

    const validPrices = normalized.filter((r) => r.unitPrice > 0)
    const canCompare = validPrices.length >= 2 && new Set(normalized.map((r) => r.baseUnit)).size === 1
    let bestId = -1
    if (canCompare) {
      bestId = validPrices.reduce((best, r) => (r.unitPrice < best.unitPrice ? r : best)).id
    }

    return { normalized, bestId, canCompare }
  }, [items])

  const addItem = () => {
    if (items.length >= 4) return
    setItems([...items, { id: nextId++, name: `${l.item} ${String.fromCharCode(65 + items.length)}`, price: 0, quantity: 1, unit: 'g' }])
  }

  const removeItem = (id: number) => {
    if (items.length > 2) setItems(items.filter((i) => i.id !== id))
  }

  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '1rem' }}>
        {items.map((item) => {
          const r = results.normalized.find((n) => n.id === item.id)
          const isBest = results.canCompare && results.bestId === item.id
          return (
            <div
              key={item.id}
              style={{
                padding: '1rem', borderRadius: '0.75rem',
                border: isBest ? '2px solid var(--color-success)' : '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                position: 'relative',
              }}
            >
              {isBest && (
                <div style={{
                  position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-success)', color: '#fff', padding: '0.125rem 0.75rem',
                  borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 700,
                }}>
                  {l.bestDeal}
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  style={{ ...inputStyle, fontWeight: 600, border: 'none', backgroundColor: 'transparent', padding: '0', fontSize: '1rem' }}
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                />
                {items.length > 2 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: '0.25rem 0.5rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
                      backgroundColor: 'transparent', color: 'var(--color-error)', cursor: 'pointer', fontSize: '0.75rem',
                    }}
                  >
                    {l.remove}
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>
                  <label style={labelStyle}>{l.price}</label>
                  <input type="number" style={inputStyle} value={item.price} onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))} min={0} step={0.01} />
                </div>
                <div>
                  <label style={labelStyle}>{l.quantity}</label>
                  <input type="number" style={inputStyle} value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))} min={0} step={0.01} />
                </div>
                <div>
                  <label style={labelStyle}>{l.unit}</label>
                  <select style={inputStyle} value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)}>
                    {UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: isBest ? 'rgba(16,185,129,0.1)' : 'transparent', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.unitPrice}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: isBest ? 'var(--color-success)' : 'var(--color-primary)' }}>
                  ${r ? r.unitPrice.toFixed(4) : '0.0000'}/{r?.baseUnit ?? item.unit}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {items.length < 4 && (
        <button
          onClick={addItem}
          style={{
            padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '2px dashed var(--color-border)',
            backgroundColor: 'transparent', color: 'var(--color-primary)', cursor: 'pointer',
            fontSize: '0.875rem', fontWeight: 600,
          }}
        >
          + {l.addItem}
        </button>
      )}
    </div>
  )
}
