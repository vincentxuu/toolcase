'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface BrailleConverterProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    toBraille: string
    toText: string
    clear: string
    result: string
    copy: string
    copied: string
  }
}

// English Braille mapping (Grade 1)
const brailleMap: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵',
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓',
  '9': '⠊', '0': '⠚',
  ' ': ' ', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ':': '⠒', ';': '⠆',
  '-': '⠤', '(': '⠐⠣', ')': '⠐⠜', '/': '⠸⠌', '*': '⠐⠔'
}

// Reverse mapping
const reverseBrailleMap = Object.fromEntries(
  Object.entries(brailleMap).map(([key, value]) => [value, key])
)

function textToBraille(text: string): string {
  return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('')
}

function brailleToText(braille: string): string {
  return braille.split('').map(char => reverseBrailleMap[char] || char).join('')
}

export default function BrailleConverter({ labels }: BrailleConverterProps) {
  const l = {
    title: labels?.title ?? 'Braille Converter',
    input: labels?.input ?? 'Input',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter text or braille...',
    toBraille: labels?.toBraille ?? 'To Braille',
    toText: labels?.toText ?? 'To Text',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleToBraille = useCallback(() => {
    if (!input.trim()) return
    setOutput(textToBraille(input))
  }, [input])

  const handleToText = useCallback(() => {
    if (!input.trim()) return
    setOutput(brailleToText(input))
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Input */}
      <div>
        <label className="block font-medium mb-2 text-sm">
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

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleToBraille}
          disabled={!input.trim()}
        >
          {l.toBraille}
        </button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleToText}
          disabled={!input.trim()}
        >
          {l.toText}
        </button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={handleClear}
          disabled={!input && !output}
        >
          {l.clear}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex justify-between items-center mb-2">
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
            fontSize: '1.5rem',
            lineHeight: 2,
            wordBreak: 'break-all',
          }}>
            {output}
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.813rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong className="text-[var(--color-text)]">Note:</strong> This converter uses English Braille (Grade 1).
        It supports basic letters, numbers, and common punctuation. Braille is a tactile writing system used by people who are blind or visually impaired.
      </div>
    </div>
  )
}
