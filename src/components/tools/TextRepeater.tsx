'use client'
import { useState, useCallback } from 'react'

interface TextRepeaterProps {
  labels?: {
    inputText: string
    times: string
    separator: string
    newline: string
    space: string
    comma: string
    custom: string
    output: string
    copy: string
    copied: string
    characters: string
  }
}

export default function TextRepeater({ labels }: TextRepeaterProps) {
  const l = {
    inputText: labels?.inputText ?? 'Input Text',
    times: labels?.times ?? 'Times',
    separator: labels?.separator ?? 'Separator',
    newline: labels?.newline ?? 'Newline',
    space: labels?.space ?? 'Space',
    comma: labels?.comma ?? 'Comma',
    custom: labels?.custom ?? 'Custom',
    output: labels?.output ?? 'Output',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    characters: labels?.characters ?? 'characters',
  }

  const [input, setInput] = useState('')
  const [times, setTimes] = useState(5)
  const [sepType, setSepType] = useState<'newline' | 'space' | 'comma' | 'custom'>('newline')
  const [customSep, setCustomSep] = useState('-')
  const [copied, setCopied] = useState(false)

  const separatorMap: Record<string, string> = {
    newline: '\n',
    space: ' ',
    comma: ', ',
    custom: customSep,
  }

  const output = input ? Array(Math.max(1, Math.min(times, 10000))).fill(input).join(separatorMap[sepType]) : ''

  const handleCopy = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = output
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const labelStyle: React.CSSProperties = { fontWeight: 600, marginBottom: '0.25rem', display: 'block' }
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    fontSize: '0.95rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={labelStyle}>{l.inputText}</label>
        <textarea
          className="tool-textarea"
          style={{ height: '80px' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 120px' }}>
          <label style={labelStyle}>{l.times}</label>
          <input
            type="number"
            min={1}
            max={10000}
            value={times}
            onChange={(e) => setTimes(parseInt(e.target.value) || 1)}
            style={inputStyle}
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <label style={labelStyle}>{l.separator}</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['newline', 'space', 'comma', 'custom'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSepType(s)}
                style={{
                  padding: '0.4rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.375rem',
                  backgroundColor: sepType === s ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                  color: sepType === s ? '#fff' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                {l[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {sepType === 'custom' && (
        <div>
          <label style={labelStyle}>{l.custom}</label>
          <input
            type="text"
            value={customSep}
            onChange={(e) => setCustomSep(e.target.value)}
            style={inputStyle}
          />
        </div>
      )}

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <label style={labelStyle}>{l.output}</label>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{output.length} {l.characters}</span>
        </div>
        <textarea
          className="tool-textarea"
          style={{ height: '150px' }}
          value={output}
          readOnly
        />
      </div>

      <button
        onClick={handleCopy}
        style={{
          padding: '0.6rem 1.5rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 600,
          alignSelf: 'flex-start',
        }}
      >
        {copied ? l.copied : l.copy}
      </button>
    </div>
  )
}
