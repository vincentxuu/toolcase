'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CaseConverterProps {
  labels?: {
    input: string
    output: string
    uppercase: string
    lowercase: string
    titleCase: string
    sentenceCase: string
    camelCase: string
    pascalCase: string
    snakeCase: string
    kebabCase: string
    copy: string
    copied: string
  }
}

function toTitleCase(text: string): string {
  return text.replace(/\b\w/g, (c) => c.toUpperCase())
}

function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)(\w)/g, (_, sep, c) => sep + c.toUpperCase())
}

function toCamelCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase())
}

function toPascalCase(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, (c) => c.toUpperCase())
}

function toSnakeCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase()
}

function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase()
}

export default function CaseConverter({ labels }: CaseConverterProps) {
  const l = {
    input: labels?.input ?? 'Type or paste your text here...',
    output: labels?.output ?? 'Converted text will appear here...',
    uppercase: labels?.uppercase ?? 'UPPERCASE',
    lowercase: labels?.lowercase ?? 'lowercase',
    titleCase: labels?.titleCase ?? 'Title Case',
    sentenceCase: labels?.sentenceCase ?? 'Sentence case',
    camelCase: labels?.camelCase ?? 'camelCase',
    pascalCase: labels?.pascalCase ?? 'PascalCase',
    snakeCase: labels?.snakeCase ?? 'snake_case',
    kebabCase: labels?.kebabCase ?? 'kebab-case',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convert = useCallback(
    (fn: (text: string) => string) => {
      if (!input.trim()) return
      setOutput(fn(input))
    },
    [input]
  )

  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 500,
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ height: '150px' }}
        placeholder={l.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">
        <button style={btnStyle} onClick={() => convert((t) => t.toUpperCase())}>{l.uppercase}</button>
        <button style={btnStyle} onClick={() => convert((t) => t.toLowerCase())}>{l.lowercase}</button>
        <button style={btnStyle} onClick={() => convert(toTitleCase)}>{l.titleCase}</button>
        <button style={btnStyle} onClick={() => convert(toSentenceCase)}>{l.sentenceCase}</button>
        <button style={btnStyle} onClick={() => convert(toCamelCase)}>{l.camelCase}</button>
        <button style={btnStyle} onClick={() => convert(toPascalCase)}>{l.pascalCase}</button>
        <button style={btnStyle} onClick={() => convert(toSnakeCase)}>{l.snakeCase}</button>
        <button style={btnStyle} onClick={() => convert(toKebabCase)}>{l.kebabCase}</button>
      </div>

      <div className="relative">
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
          style={{ height: '150px' }}
          placeholder={l.output}
          value={output}
          readOnly
        />
        {output && (
          <div className="absolute top-2 right-2">
            <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
          </div>
        )}
      </div>
    </div>
  )
}
