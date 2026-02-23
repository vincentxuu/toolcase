'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import 'katex/dist/katex.min.css'

interface LatexEditorProps {
  labels?: {
    title: string
    editor: string
    editorPlaceholder: string
    preview: string
    mode: string
    inline: string
    display: string
    copyLatex: string
    clear: string
    insertSymbol: string
    symbols: string
    templates: string
    templateQuadratic: string
    templatePythagorean: string
    templateEuler: string
    templateLimit: string
    templateDerivative: string
    templateSeries: string
    error: string
    note: string
    noteText: string
  }
}

export default function LatexEditor({ labels }: LatexEditorProps) {
  const l = {
    title: labels?.title ?? 'LaTeX Editor',
    editor: labels?.editor ?? 'LaTeX Editor',
    editorPlaceholder: labels?.editorPlaceholder ?? 'Enter your LaTeX code here...',
    preview: labels?.preview ?? 'Live Preview',
    mode: labels?.mode ?? 'Display Mode',
    inline: labels?.inline ?? 'Inline',
    display: labels?.display ?? 'Display',
    copyLatex: labels?.copyLatex ?? 'Copy LaTeX',
    clear: labels?.clear ?? 'Clear',
    insertSymbol: labels?.insertSymbol ?? 'Insert Symbol',
    symbols: labels?.symbols ?? 'Quick Symbols',
    templates: labels?.templates ?? 'Formula Templates',
    templateQuadratic: labels?.templateQuadratic ?? 'Quadratic Formula',
    templatePythagorean: labels?.templatePythagorean ?? 'Pythagorean Theorem',
    templateEuler: labels?.templateEuler ?? "Euler's Identity",
    templateLimit: labels?.templateLimit ?? 'Limit',
    templateDerivative: labels?.templateDerivative ?? 'Derivative',
    templateSeries: labels?.templateSeries ?? 'Taylor Series',
    error: labels?.error ?? 'Error',
    note: labels?.note ?? 'Note',
    noteText: labels?.noteText ?? 'Write LaTeX code in the editor and see the rendered mathematical formulas in real-time. Use templates and symbols for quick insertion.',
  }

  const [latex, setLatex] = useState('\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}')
  const [displayMode, setDisplayMode] = useState(true)
  const [renderError, setRenderError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const templates = [
    { name: l.templateQuadratic, latex: 'x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}' },
    { name: l.templatePythagorean, latex: 'a^2 + b^2 = c^2' },
    { name: l.templateEuler, latex: 'e^{i\\pi} + 1 = 0' },
    { name: l.templateLimit, latex: '\\lim_{x \\to \\infty} \\frac{1}{x} = 0' },
    { name: l.templateDerivative, latex: '\\frac{d}{dx}(x^n) = nx^{n-1}' },
    { name: l.templateSeries, latex: 'f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n' },
  ]

  const symbols = [
    { display: '±', latex: '\\pm' },
    { display: '×', latex: '\\times' },
    { display: '÷', latex: '\\div' },
    { display: '≠', latex: '\\neq' },
    { display: '≤', latex: '\\leq' },
    { display: '≥', latex: '\\geq' },
    { display: '∞', latex: '\\infty' },
    { display: '∑', latex: '\\sum' },
    { display: '∫', latex: '\\int' },
    { display: '√', latex: '\\sqrt{}' },
    { display: 'α', latex: '\\alpha' },
    { display: 'β', latex: '\\beta' },
    { display: 'γ', latex: '\\gamma' },
    { display: 'δ', latex: '\\delta' },
    { display: 'π', latex: '\\pi' },
    { display: 'θ', latex: '\\theta' },
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

  const insertAtCursor = useCallback((text: string) => {
    if (!textareaRef.current) return

    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    const newLatex = latex.substring(0, start) + text + latex.substring(end)

    setLatex(newLatex)

    // Set cursor position after inserted text
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = start + text.length
        textareaRef.current.setSelectionRange(newPos, newPos)
        textareaRef.current.focus()
      }
    }, 0)
  }, [latex])

  const handleTemplateClick = useCallback((templateLatex: string) => {
    setLatex(templateLatex)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Editor Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Editor */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <h3 className="text-base font-semibold mb-3">
            {l.editor}
          </h3>
          <textarea
            ref={textareaRef}
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder={l.editorPlaceholder}
            style={{
              width: '100%',
              minHeight: '300px',
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

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
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

        {/* Right: Preview */}
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          <h3 className="text-base font-semibold mb-3">
            {l.preview}
          </h3>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              padding: '2rem',
              backgroundColor: 'var(--color-bg)',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderError ? (
              <div style={{ color: '#cc0000', fontSize: '0.875rem', wordBreak: 'break-word' }}>
                <strong>{l.error}:</strong> {renderError}
              </div>
            ) : (
              <div ref={outputRef} style={{ fontSize: displayMode ? '1.5rem' : '1rem' }} />
            )}
          </div>
        </div>
      </div>

      {/* Quick Symbols */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.symbols}
        </h3>
        <div className="flex flex-wrap gap-2">
          {symbols.map((symbol, idx) => (
            <button
              key={idx}
              onClick={() => insertAtCursor(symbol.latex)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                cursor: 'pointer',
                fontSize: '1.25rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
              }}
              title={symbol.latex}
            >
              {symbol.display}
            </button>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.templates}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
          {templates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => handleTemplateClick(template.latex)}
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
                {template.name}
              </div>
              <code style={{ fontSize: '0.75rem', color: 'var(--color-text)', wordBreak: 'break-all' }}>
                {template.latex}
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
