'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CssGridGeneratorProps {
  labels?: {
    columns: string
    rows: string
    columnGap: string
    rowGap: string
    columnWidths: string
    preview: string
    cssCode: string
    copy: string
    copied: string
    fr: string
    px: string
    auto: string
    unitLabel: string
  }
}

type UnitType = 'fr' | 'px' | 'auto'

interface ColDef {
  value: number
  unit: UnitType
}

export default function CssGridGenerator({ labels }: CssGridGeneratorProps) {
  const l = {
    columns: labels?.columns ?? 'Columns',
    rows: labels?.rows ?? 'Rows',
    columnGap: labels?.columnGap ?? 'Column Gap',
    rowGap: labels?.rowGap ?? 'Row Gap',
    columnWidths: labels?.columnWidths ?? 'Column Widths',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    fr: labels?.fr ?? 'fr',
    px: labels?.px ?? 'px',
    auto: labels?.auto ?? 'auto',
    unitLabel: labels?.unitLabel ?? 'Unit',
  }

  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(3)
  const [colGap, setColGap] = useState(8)
  const [rowGap, setRowGap] = useState(8)
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { value: 1, unit: 'fr' },
    { value: 1, unit: 'fr' },
    { value: 1, unit: 'fr' },
  ])

  const updateCols = useCallback((newCols: number) => {
    setCols(newCols)
    setColDefs(prev => {
      if (newCols > prev.length) {
        return [...prev, ...Array.from({ length: newCols - prev.length }, () => ({ value: 1, unit: 'fr' as UnitType }))]
      }
      return prev.slice(0, newCols)
    })
  }, [])

  const updateColDef = useCallback((index: number, field: 'value' | 'unit', val: number | string) => {
    setColDefs(prev => prev.map((d, i) => i === index ? { ...d, [field]: val } : d))
  }, [])

  const colTemplate = colDefs.map(d => d.unit === 'auto' ? 'auto' : `${d.value}${d.unit}`).join(' ')
  const rowTemplate = `repeat(${rows}, 1fr)`
  const totalCells = cols * rows

  const cssCode = `display: grid;
grid-template-columns: ${colTemplate};
grid-template-rows: ${rowTemplate};
column-gap: ${colGap}px;
row-gap: ${rowGap}px;`

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.8125rem',
    width: '60px',
    textAlign: 'center',
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.375rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.8125rem',
    fontFamily: 'monospace',
  }

  const CELL_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#84cc16', '#6366f1', '#14b8a6', '#e11d48']

  return (
    <div className="flex flex-col gap-6">
      {/* Grid config */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={labelStyle}>{l.columns}</span>
            <span style={labelStyle}>{cols}</span>
          </div>
          <input type="range" min={1} max={12} value={cols} onChange={(e) => updateCols(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={labelStyle}>{l.rows}</span>
            <span style={labelStyle}>{rows}</span>
          </div>
          <input type="range" min={1} max={12} value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={labelStyle}>{l.columnGap}</span>
            <span style={labelStyle}>{colGap}px</span>
          </div>
          <input type="range" min={0} max={40} value={colGap} onChange={(e) => setColGap(Number(e.target.value))} className="w-full" />
        </div>
        <div className="flex flex-col gap-1">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={labelStyle}>{l.rowGap}</span>
            <span style={labelStyle}>{rowGap}px</span>
          </div>
          <input type="range" min={0} max={40} value={rowGap} onChange={(e) => setRowGap(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      {/* Column widths */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.columnWidths}</span>
        <div className="flex flex-wrap gap-2">
          {colDefs.map((def, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.375rem', border: '1px solid var(--color-border)', borderRadius: '0.375rem', backgroundColor: 'var(--color-bg-secondary)' }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>C{i + 1}</span>
              {def.unit !== 'auto' && (
                <input
                  type="number"
                  min={1}
                  max={def.unit === 'px' ? 500 : 12}
                  value={def.value}
                  onChange={(e) => updateColDef(i, 'value', Math.max(1, Number(e.target.value)))}
                  style={{ ...inputStyle, width: '50px' }}
                />
              )}
              <select
                value={def.unit}
                onChange={(e) => updateColDef(i, 'unit', e.target.value)}
                style={selectStyle}
              >
                <option value="fr">{l.fr}</option>
                <option value="px">{l.px}</option>
                <option value="auto">{l.auto}</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col gap-2">
        <span style={labelStyle}>{l.preview}</span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: colTemplate,
            gridTemplateRows: rowTemplate,
            columnGap: `${colGap}px`,
            rowGap: `${rowGap}px`,
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '2px dashed var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            minHeight: '200px',
          }}
        >
          {Array.from({ length: totalCells }, (_, i) => (
            <div
              key={i}
              style={{
                minHeight: '50px',
                borderRadius: '0.375rem',
                backgroundColor: CELL_COLORS[i % CELL_COLORS.length],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Code */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.cssCode}</span>
        <div className="flex gap-2 items-start">
          <pre
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8125rem',
              fontFamily: 'monospace',
              color: 'var(--color-text)',
              overflow: 'auto',
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}
          >
            {cssCode}
          </pre>
          <CopyButton text={cssCode} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>
    </div>
  )
}
