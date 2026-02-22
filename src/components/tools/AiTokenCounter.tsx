'use client'
import { useState, useMemo } from 'react'

interface AiTokenCounterProps {
  labels?: {
    title: string
    pasteText: string
    characters: string
    words: string
    tokens: string
    lines: string
    model: string
    inputRate: string
    outputRate: string
    inputCost: string
    outputCost: string
    estimatedTokens: string
    costEstimate: string
    disclaimer: string
  }
}

const models = [
  { name: 'GPT-5.2', inputPer1M: 1.75, outputPer1M: 14 },
  { name: 'GPT-5', inputPer1M: 1.25, outputPer1M: 10 },
  { name: 'GPT-5 Nano', inputPer1M: 0.05, outputPer1M: 0.4 },
  { name: 'GPT-4o', inputPer1M: 2.5, outputPer1M: 10 },
  { name: 'GPT-4o-mini', inputPer1M: 0.15, outputPer1M: 0.6 },
  { name: 'o1', inputPer1M: 15, outputPer1M: 60 },
  { name: 'o1-mini', inputPer1M: 3, outputPer1M: 12 },
  { name: 'Claude Opus 4.6', inputPer1M: 5, outputPer1M: 25 },
  { name: 'Claude Sonnet 4.6', inputPer1M: 3, outputPer1M: 15 },
  { name: 'Claude Sonnet 4.5', inputPer1M: 3, outputPer1M: 15 },
  { name: 'Claude Sonnet 3.5', inputPer1M: 3, outputPer1M: 15 },
  { name: 'Claude Haiku 4.5', inputPer1M: 1, outputPer1M: 5 },
  { name: 'Gemini 3.1 Pro', inputPer1M: 2.0, outputPer1M: 12 },
  { name: 'Gemini 3 Flash', inputPer1M: 0.5, outputPer1M: 3 },
  { name: 'Gemini 2.5 Pro', inputPer1M: 1.25, outputPer1M: 10 },
  { name: 'DeepSeek V3', inputPer1M: 0.14, outputPer1M: 0.28 },
]

function estimateTokens(text: string): number {
  if (!text) return 0
  let asciiChars = 0
  let cjkChars = 0
  for (const ch of text) {
    const code = ch.codePointAt(0) || 0
    if (code <= 127) {
      asciiChars++
    } else {
      cjkChars++
    }
  }
  const asciiTokens = asciiChars / 4
  const cjkTokens = cjkChars / 1.5
  return Math.max(1, Math.round(asciiTokens + cjkTokens))
}

function formatCost(tokens: number, ratePer1M: number): string {
  const cost = (tokens / 1_000_000) * ratePer1M
  if (cost < 0.000001) return '$0.000000'
  if (cost < 0.01) return `$${cost.toFixed(6)}`
  if (cost < 1) return `$${cost.toFixed(4)}`
  return `$${cost.toFixed(2)}`
}

export default function AiTokenCounter({ labels }: AiTokenCounterProps) {
  const l = {
    title: labels?.title ?? 'AI Token Counter & Cost Calculator',
    pasteText: labels?.pasteText ?? 'Paste or type your text here...',
    characters: labels?.characters ?? 'Characters',
    words: labels?.words ?? 'Words',
    tokens: labels?.tokens ?? 'Tokens',
    lines: labels?.lines ?? 'Lines',
    model: labels?.model ?? 'Model',
    inputRate: labels?.inputRate ?? 'Input Rate (per 1M)',
    outputRate: labels?.outputRate ?? 'Output Rate (per 1M)',
    inputCost: labels?.inputCost ?? 'Input Cost',
    outputCost: labels?.outputCost ?? 'Output Cost',
    estimatedTokens: labels?.estimatedTokens ?? 'Estimated Tokens',
    costEstimate: labels?.costEstimate ?? 'Cost Estimate',
    disclaimer: labels?.disclaimer ?? 'Token counts are estimates. Actual token counts depend on the model\'s tokenizer.',
  }

  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const characters = text.length
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const lines = text ? text.split('\n').length : 0
    const tokens = estimateTokens(text)
    return { characters, words, lines, tokens }
  }, [text])

  const statCardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
  }

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
    lineHeight: 1.2,
  }

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    marginTop: '0.25rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <textarea
        className="tool-textarea"
        style={{ height: '200px' }}
        placeholder={l.pasteText}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.characters.toLocaleString()}</div>
          <div style={statLabelStyle}>{l.characters}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.words.toLocaleString()}</div>
          <div style={statLabelStyle}>{l.words}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.tokens.toLocaleString()}</div>
          <div style={statLabelStyle}>{l.tokens}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.lines.toLocaleString()}</div>
          <div style={statLabelStyle}>{l.lines}</div>
        </div>
      </div>

      {/* Cost estimate table */}
      <div style={{
        border: '1px solid var(--color-border)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          fontWeight: 600,
        }}>
          {l.costEstimate} ({l.estimatedTokens}: {stats.tokens.toLocaleString()})
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                <th style={{ padding: '0.625rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.model}</th>
                <th style={{ padding: '0.625rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.inputRate}</th>
                <th style={{ padding: '0.625rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.outputRate}</th>
                <th style={{ padding: '0.625rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.inputCost}</th>
                <th style={{ padding: '0.625rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.outputCost}</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.625rem 1rem', fontWeight: 500 }}>{m.name}</td>
                  <td style={{ padding: '0.625rem 1rem', textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
                    ${m.inputPer1M.toFixed(2)}
                  </td>
                  <td style={{ padding: '0.625rem 1rem', textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text-secondary)', fontSize: '0.8125rem' }}>
                    ${m.outputPer1M.toFixed(2)}
                  </td>
                  <td style={{ padding: '0.625rem 1rem', textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text)' }}>
                    {formatCost(stats.tokens, m.inputPer1M)}
                  </td>
                  <td style={{ padding: '0.625rem 1rem', textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-text)' }}>
                    {formatCost(stats.tokens, m.outputPer1M)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <p style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
        margin: 0,
      }}>
        {l.disclaimer}
      </p>
    </div>
  )
}
