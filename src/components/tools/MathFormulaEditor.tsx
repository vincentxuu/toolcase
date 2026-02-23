'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import 'katex/dist/katex.min.css'

interface MathFormulaEditorProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    mode: string
    inline: string
    display: string
    output: string
    examples: string
    exampleFraction: string
    exampleSqrt: string
    exampleSum: string
    exampleIntegral: string
    exampleMatrix: string
    exampleGreek: string
    copyLatex: string
    clear: string
    error: string
    note: string
    noteText: string
  }
}

export default function MathFormulaEditor({ labels }: MathFormulaEditorProps) {
  const l = {
    title: labels?.title ?? 'Math Formula Editor',
    input: labels?.input ?? 'LaTeX Input',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter LaTeX formula (e.g., x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a})',
    mode: labels?.mode ?? 'Display Mode',
    inline: labels?.inline ?? 'Inline',
    display: labels?.display ?? 'Display',
    output: labels?.output ?? 'Rendered Output',
    examples: labels?.examples ?? 'Examples',
    exampleFraction: labels?.exampleFraction ?? 'Fraction',
    exampleSqrt: labels?.exampleSqrt ?? 'Square Root',
    exampleSum: labels?.exampleSum ?? 'Summation',
    exampleIntegral: labels?.exampleIntegral ?? 'Integral',
    exampleMatrix: labels?.exampleMatrix ?? 'Matrix',
    exampleGreek: labels?.exampleGreek ?? 'Greek Letters',
    copyLatex: labels?.copyLatex ?? 'Copy LaTeX',
    clear: labels?.clear ?? 'Clear',
    error: labels?.error ?? 'Error',
    note: labels?.note ?? 'Note',
    noteText: labels?.noteText ?? 'This editor uses KaTeX to render mathematical formulas. Enter LaTeX syntax in the input field.',
  }

  const [latex, setLatex] = useState('x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}')
  const [displayMode, setDisplayMode] = useState(true)
  const [renderError, setRenderError] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)

  const examples = [
    { name: l.exampleFraction, latex: '\\frac{a}{b}' },
    { name: l.exampleSqrt, latex: '\\sqrt{x^2 + y^2}' },
    { name: l.exampleSum, latex: '\\sum_{i=1}^{n} x_i' },
    { name: l.exampleIntegral, latex: '\\int_{a}^{b} f(x) dx' },
    { name: l.exampleMatrix, latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
    { name: l.exampleGreek, latex: '\\alpha \\beta \\gamma \\delta \\epsilon' },
  ]

  const renderMath = useCallback(async () => {
    if (!outputRef.current || !latex.trim()) {
      setRenderError('')
      if (outputRef.current) outputRef.current.innerHTML = ''
      return
    }

    try {
      const katex = (await import('katex')).default
      katex.render(latex, outputRef.current, {
        displayMode,
        throwOnError: true,
        errorColor: '#cc0000',
      })
      setRenderError('')
    } catch (err) {
      setRenderError(err instanceof Error ? err.message : 'Rendering error')
    }
  }, [latex, displayMode])

  useEffect(() => {
    renderMath()
  }, [renderMath])

  const handleCopyLatex = useCallback(() => {
    navigator.clipboard.writeText(latex)
  }, [latex])

  const handleClear = useCallback(() => {
    setLatex('')
    setRenderError('')
  }, [])

  const handleExampleClick = useCallback((exampleLatex: string) => {
    setLatex(exampleLatex)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.input}
            </label>
            <textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              placeholder={l.inputPlaceholder}
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                resize: 'vertical',
              }}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.mode}
            </label>
            <div className="flex gap-4">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={!displayMode}
                  onChange={() => setDisplayMode(false)}
                  style={{ cursor: 'pointer' }}
                />
                <span className="text-sm">{l.inline}</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  checked={displayMode}
                  onChange={() => setDisplayMode(true)}
                  style={{ cursor: 'pointer' }}
                />
                <span className="text-sm">{l.display}</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleCopyLatex}>
              {l.copyLatex}
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>
              {l.clear}
            </button>
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.output}
        </h3>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '2rem',
            backgroundColor: 'var(--color-bg-secondary)',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderError ? (
            <div style={{ color: '#cc0000', fontSize: '0.875rem' }}>
              <strong>{l.error}:</strong> {renderError}
            </div>
          ) : (
            <div ref={outputRef} style={{ fontSize: displayMode ? '1.5rem' : '1rem' }} />
          )}
        </div>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.examples}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => handleExampleClick(example.latex)}
              style={{
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
              }}
            >
              <div className="text-xs text-[var(--color-text-secondary)] mb-1">
                {example.name}
              </div>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-text)' }}>
                {example.latex}
              </code>
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}
      >
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'rgb(59, 130, 246)' }}>
          {l.note}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {l.noteText}
        </p>
      </div>
    </div>
  )
}
