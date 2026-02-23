'use client'
import { useState, useCallback } from 'react'

interface InvoiceGeneratorProps {
  labels?: {
    companyName: string
    clientName: string
    invoiceNumber: string
    date: string
    dueDate: string
    description: string
    quantity: string
    unitPrice: string
    amount: string
    addItem: string
    removeItem: string
    subtotal: string
    taxRate: string
    tax: string
    total: string
    preview: string
    print: string
    invoice: string
    billTo: string
  }
}

interface LineItem {
  id: number
  description: string
  quantity: number
  unitPrice: number
}

let nextId = 1

export default function InvoiceGenerator({ labels }: InvoiceGeneratorProps) {
  const l = {
    companyName: labels?.companyName ?? 'Company Name',
    clientName: labels?.clientName ?? 'Client Name',
    invoiceNumber: labels?.invoiceNumber ?? 'Invoice #',
    date: labels?.date ?? 'Date',
    dueDate: labels?.dueDate ?? 'Due Date',
    description: labels?.description ?? 'Description',
    quantity: labels?.quantity ?? 'Qty',
    unitPrice: labels?.unitPrice ?? 'Unit Price',
    amount: labels?.amount ?? 'Amount',
    addItem: labels?.addItem ?? 'Add Item',
    removeItem: labels?.removeItem ?? 'Remove',
    subtotal: labels?.subtotal ?? 'Subtotal',
    taxRate: labels?.taxRate ?? 'Tax Rate',
    tax: labels?.tax ?? 'Tax',
    total: labels?.total ?? 'Total',
    preview: labels?.preview ?? 'Preview',
    print: labels?.print ?? 'Print Invoice',
    invoice: labels?.invoice ?? 'INVOICE',
    billTo: labels?.billTo ?? 'Bill To',
  }

  const [companyName, setCompanyName] = useState('')
  const [clientName, setClientName] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState<LineItem[]>([{ id: nextId++, description: '', quantity: 1, unitPrice: 0 }])
  const [taxRate, setTaxRate] = useState(0)

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, { id: nextId++, description: '', quantity: 1, unitPrice: 0 }])
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.length > 1 ? prev.filter((item) => item.id !== id) : prev)
  }, [])

  const updateItem = useCallback((id: number, field: keyof LineItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const fmt = (n: number) => n.toFixed(2)

  return (
    <div className="flex flex-col gap-6">
      {/* Print-specific styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #invoice-preview, #invoice-preview * { visibility: visible; }
          #invoice-preview { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Form inputs */}
      <div className="no-print grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.companyName}</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.clientName}</label>
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.invoiceNumber}</label>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.date}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.dueDate}</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[var(--color-text-secondary)]">{l.taxRate} (%)</label>
          <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} min={0} max={100} className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm" />
        </div>
      </div>

      {/* Line Items */}
      <div className="no-print">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-sm text-[var(--color-text)]">Line Items</span>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] text-xs px-2 py-1" onClick={addItem}>
            + {l.addItem}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                <th className="text-left p-2 text-[var(--color-text-secondary)] font-medium">{l.description}</th>
                <th className="text-right p-2 text-[var(--color-text-secondary)] font-medium w-20">{l.quantity}</th>
                <th className="text-right p-2 text-[var(--color-text-secondary)] font-medium w-[100px]">{l.unitPrice}</th>
                <th className="text-right p-2 text-[var(--color-text-secondary)] font-medium w-[100px]">{l.amount}</th>
                <th className="w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[var(--color-border)]">
                  <td className="p-1.5">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      min={1}
                      className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm text-right"
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                      min={0}
                      step={0.01}
                      className="w-full px-2 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm text-right"
                    />
                  </td>
                  <td className="p-1.5 text-right font-mono text-[var(--color-text)]">
                    ${fmt(item.quantity * item.unitPrice)}
                  </td>
                  <td className="p-1.5 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-transparent border-0 text-red-500 cursor-pointer text-xs"
                    >
                      {l.removeItem}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print button */}
      <div className="no-print">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handlePrint}>{l.print}</button>
      </div>

      {/* Invoice Preview */}
      <div
        id="invoice-preview"
        style={{
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--color-border)',
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#111' }}>
              {companyName || 'Your Company'}
            </h3>
          </div>
          <div className="text-right">
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333', marginBottom: '0.5rem' }}>{l.invoice}</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>{invoiceNumber}</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>{l.date}: {date}</div>
            {dueDate && <div style={{ fontSize: '0.875rem', color: '#666' }}>{l.dueDate}: {dueDate}</div>}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#999', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{l.billTo}</div>
          <div style={{ fontSize: '1rem', color: '#333' }}>{clientName || 'Client Name'}</div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999' }}>{l.description}</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999' }}>{l.quantity}</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999' }}>{l.unitPrice}</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', color: '#999' }}>{l.amount}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem 0.5rem', color: '#333' }}>{item.description || '-'}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#333' }}>{item.quantity}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: '#333' }}>${fmt(item.unitPrice)}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', fontWeight: 500, color: '#333' }}>${fmt(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '250px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ color: '#666' }}>{l.subtotal}</span>
              <span style={{ color: '#333', fontFamily: 'monospace' }}>${fmt(subtotal)}</span>
            </div>
            {taxRate > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ color: '#666' }}>{l.tax} ({taxRate}%)</span>
                <span style={{ color: '#333', fontFamily: 'monospace' }}>${fmt(taxAmount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderTop: '2px solid #333', marginTop: '0.25rem' }}>
              <span style={{ fontWeight: 700, color: '#111' }}>{l.total}</span>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#111', fontFamily: 'monospace' }}>${fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
