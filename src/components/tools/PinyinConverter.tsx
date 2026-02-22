'use client'
import { useState, useCallback } from 'react'
import { pinyin } from 'pinyin-pro'
import CopyButton from '@/components/shared/CopyButton'

interface PinyinConverterProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    mode: string
    withTone: string
    withoutTone: string
    toneNumber: string
    firstLetter: string
    convert: string
    clear: string
    result: string
    copy: string
    copied: string
  }
}

type PinyinMode = 'tone' | 'normal' | 'num' | 'first'

export default function PinyinConverter({ labels }: PinyinConverterProps) {
  const l = {
    title: labels?.title ?? 'Pinyin Converter',
    input: labels?.input ?? 'Chinese Text',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter Chinese characters...',
    mode: labels?.mode ?? 'Output Mode',
    withTone: labels?.withTone ?? 'With Tone Marks (āáǎà)',
    withoutTone: labels?.withoutTone ?? 'Without Tone',
    toneNumber: labels?.toneNumber ?? 'Tone Numbers (a1 a2 a3 a4)',
    firstLetter: labels?.firstLetter ?? 'First Letters Only',
    convert: labels?.convert ?? 'Convert',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [mode, setMode] = useState<PinyinMode>('tone')
  const [output, setOutput] = useState('')

  const handleConvert = useCallback(() => {
    if (!input.trim()) return

    let result = ''
    switch (mode) {
      case 'tone':
        result = pinyin(input, { toneType: 'symbol' })
        break
      case 'normal':
        result = pinyin(input, { toneType: 'none' })
        break
      case 'num':
        result = pinyin(input, { toneType: 'num' })
        break
      case 'first':
        result = pinyin(input, { pattern: 'first', toneType: 'none' })
        break
    }
    setOutput(result)
  }, [input, mode])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  const modes: { value: PinyinMode; label: string }[] = [
    { value: 'tone', label: l.withTone },
    { value: 'normal', label: l.withoutTone },
    { value: 'num', label: l.toneNumber },
    { value: 'first', label: l.firstLetter },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          {l.input}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={l.inputPlaceholder}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Mode selection */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          {l.mode}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: mode === m.value ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: mode === m.value ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className="btn-primary"
          onClick={handleConvert}
          disabled={!input.trim()}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {l.convert}
        </button>
        <button
          className="btn-secondary"
          onClick={handleClear}
          disabled={!input && !output}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {l.clear}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>
              {l.result}
            </label>
            <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontSize: '1.25rem',
            lineHeight: 1.8,
            wordBreak: 'break-all',
          }}>
            {output}
          </div>
        </div>
      )}

      {/* Examples */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.813rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--color-text)' }}>Examples:</strong>
        <div style={{ marginTop: '0.5rem' }}>
          <div>你好 → nǐ hǎo (with tone)</div>
          <div>你好 → ni hao (without tone)</div>
          <div>你好 → ni3 hao3 (tone numbers)</div>
          <div>你好 → n h (first letters)</div>
        </div>
      </div>
    </div>
  )
}
