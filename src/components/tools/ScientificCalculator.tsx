'use client'
import { useState, useCallback } from 'react'

interface ScientificCalculatorProps {
  labels?: {
    result: string
    clear: string
    delete: string
    deg: string
    rad: string
  }
}

export default function ScientificCalculator({ labels }: ScientificCalculatorProps) {
  const l = {
    result: labels?.result ?? 'Result',
    clear: labels?.clear ?? 'AC',
    delete: labels?.delete ?? 'DEL',
    deg: labels?.deg ?? 'DEG',
    rad: labels?.rad ?? 'RAD',
  }

  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [isDeg, setIsDeg] = useState(true)
  const [lastResult, setLastResult] = useState<string | null>(null)

  const append = useCallback((val: string) => {
    if (lastResult !== null) {
      // If we just evaluated, start fresh unless operator
      if (['+', '-', '*', '/', '^'].includes(val)) {
        setExpression(lastResult + val)
        setDisplay(lastResult + val)
      } else {
        setExpression(val)
        setDisplay(val)
      }
      setLastResult(null)
    } else {
      const next = expression === '' && val !== '-' && val !== '(' ? val : expression + val
      setExpression(next)
      setDisplay(next)
    }
  }, [expression, lastResult])

  const clear = useCallback(() => {
    setDisplay('0')
    setExpression('')
    setLastResult(null)
  }, [])

  const deleteLast = useCallback(() => {
    if (lastResult !== null) { clear(); return }
    const next = expression.slice(0, -1)
    setExpression(next)
    setDisplay(next || '0')
  }, [expression, lastResult, clear])

  const evaluate = useCallback(() => {
    try {
      let expr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, `(${Math.PI})`)
        .replace(/e(?![xp])/g, `(${Math.E})`)

      const toRad = isDeg ? `(Math.PI/180)*` : ''

      expr = expr
        .replace(/sin\(/g, `Math.sin(${toRad}(`)
        .replace(/cos\(/g, `Math.cos(${toRad}(`)
        .replace(/tan\(/g, `Math.tan(${toRad}(`)

      // Close extra parens from trig
      const openCount = (expr.match(/\(/g) || []).length
      const closeCount = (expr.match(/\)/g) || []).length
      expr += ')'.repeat(Math.max(0, openCount - closeCount))

      expr = expr
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/\^/g, '**')

      // Safety check
      if (/[^0-9+\-*/().eE\s]/.test(expr.replace(/Math\.\w+/g, '').replace(/\*\*/g, ''))) {
        setDisplay('Error')
        return
      }

      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${expr})`)()
      const str = typeof result === 'number' && isFinite(result)
        ? (Number.isInteger(result) ? result.toString() : parseFloat(result.toPrecision(12)).toString())
        : 'Error'
      setDisplay(str)
      setLastResult(str)
      setExpression(str)
    } catch {
      setDisplay('Error')
    }
  }, [expression, isDeg])

  const btnStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    minHeight: '48px',
  }

  const opStyle: React.CSSProperties = { ...btnStyle, backgroundColor: 'var(--color-primary)', color: '#fff' }
  const funcStyle: React.CSSProperties = { ...btnStyle, fontSize: '0.85rem' }

  const buttons = [
    [{ label: l.clear, action: clear, style: funcStyle }, { label: '(', action: () => append('('), style: funcStyle }, { label: ')', action: () => append(')'), style: funcStyle }, { label: l.delete, action: deleteLast, style: funcStyle }, { label: '÷', action: () => append('/'), style: opStyle }],
    [{ label: 'sin', action: () => append('sin('), style: funcStyle }, { label: '7', action: () => append('7'), style: btnStyle }, { label: '8', action: () => append('8'), style: btnStyle }, { label: '9', action: () => append('9'), style: btnStyle }, { label: '×', action: () => append('*'), style: opStyle }],
    [{ label: 'cos', action: () => append('cos('), style: funcStyle }, { label: '4', action: () => append('4'), style: btnStyle }, { label: '5', action: () => append('5'), style: btnStyle }, { label: '6', action: () => append('6'), style: btnStyle }, { label: '-', action: () => append('-'), style: opStyle }],
    [{ label: 'tan', action: () => append('tan('), style: funcStyle }, { label: '1', action: () => append('1'), style: btnStyle }, { label: '2', action: () => append('2'), style: btnStyle }, { label: '3', action: () => append('3'), style: btnStyle }, { label: '+', action: () => append('+'), style: opStyle }],
    [{ label: '√', action: () => append('sqrt('), style: funcStyle }, { label: 'π', action: () => append('π'), style: funcStyle }, { label: '0', action: () => append('0'), style: btnStyle }, { label: '.', action: () => append('.'), style: btnStyle }, { label: '=', action: evaluate, style: opStyle }],
    [{ label: 'log', action: () => append('log('), style: funcStyle }, { label: 'ln', action: () => append('ln('), style: funcStyle }, { label: '^', action: () => append('^'), style: funcStyle }, { label: 'e', action: () => append('e'), style: funcStyle }, { label: isDeg ? l.deg : l.rad, action: () => setIsDeg(!isDeg), style: { ...funcStyle, backgroundColor: 'rgba(99,102,241,0.1)' } }],
  ]

  return (
    <div style={{ maxWidth: '400px' }}>
      <div style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', marginBottom: '0.75rem', textAlign: 'right' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', minHeight: '1.25rem', wordBreak: 'break-all' }}>{expression || ' '}</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace', wordBreak: 'break-all' }}>{display}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.4rem' }}>
        {buttons.flat().map((btn, i) => (
          <button key={i} onClick={btn.action} style={btn.style}>{btn.label}</button>
        ))}
      </div>
    </div>
  )
}
