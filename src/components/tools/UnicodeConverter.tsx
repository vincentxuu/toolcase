'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface UnicodeConverterProps {
  labels?: {
    textToUnicode: string
    unicodeToText: string
    copy: string
    copied: string
    clear: string
    inputPlaceholder: string
    outputPlaceholder: string
    encoding: string
    htmlEntities: string
    jsEscape: string
    cssEscape: string
    codePoints: string
  }
}

type EncodingMode = 'unicode' | 'html' | 'js' | 'css' | 'codepoints'

function textToEncoded(text: string, mode: EncodingMode): string {
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0)!
      switch (mode) {
        case 'unicode':
          return code > 0xffff
            ? `\\u{${code.toString(16).toUpperCase()}}`
            : `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`
        case 'html':
          return `&#${code};`
        case 'js':
          if (code > 0xffff) {
            const offset = code - 0x10000
            const high = 0xd800 + (offset >> 10)
            const low = 0xdc00 + (offset & 0x3ff)
            return `\\u${high.toString(16).toUpperCase()}\\u${low.toString(16).toUpperCase()}`
          }
          return `\\u${code.toString(16).toUpperCase().padStart(4, '0')}`
        case 'css':
          return `\\${code.toString(16).toUpperCase()} `
        case 'codepoints':
          return `U+${code.toString(16).toUpperCase().padStart(4, '0')}`
        default:
          return char
      }
    })
    .join(mode === 'codepoints' ? ' ' : '')
}

function encodedToText(encoded: string, mode: EncodingMode): string {
  try {
    switch (mode) {
      case 'unicode':
      case 'js': {
        return encoded.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})/g, (_, p1, p2) => {
          return String.fromCodePoint(parseInt(p1 || p2, 16))
        })
      }
      case 'html': {
        return encoded.replace(/&#(\d+);|&#x([0-9a-fA-F]+);/g, (_, dec, hex) => {
          return String.fromCodePoint(dec ? parseInt(dec, 10) : parseInt(hex, 16))
        })
      }
      case 'css': {
        return encoded.replace(/\\([0-9a-fA-F]+)\s?/g, (_, hex) => {
          return String.fromCodePoint(parseInt(hex, 16))
        })
      }
      case 'codepoints': {
        return encoded
          .split(/\s+/)
          .filter(Boolean)
          .map((cp) => {
            const hex = cp.replace(/^U\+/i, '')
            return String.fromCodePoint(parseInt(hex, 16))
          })
          .join('')
      }
      default:
        return encoded
    }
  } catch {
    return '(decode error)'
  }
}

export default function UnicodeConverter({ labels }: UnicodeConverterProps) {
  const l = {
    textToUnicode: labels?.textToUnicode ?? 'Text → Unicode',
    unicodeToText: labels?.unicodeToText ?? 'Unicode → Text',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    clear: labels?.clear ?? 'Clear',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter text or Unicode...',
    outputPlaceholder: labels?.outputPlaceholder ?? 'Result will appear here...',
    encoding: labels?.encoding ?? 'Encoding',
    htmlEntities: labels?.htmlEntities ?? 'HTML Entities',
    jsEscape: labels?.jsEscape ?? 'JS Escape',
    cssEscape: labels?.cssEscape ?? 'CSS Escape',
    codePoints: labels?.codePoints ?? 'Code Points',
  }

  const [direction, setDirection] = useState<'encode' | 'decode'>('encode')
  const [mode, setMode] = useState<EncodingMode>('unicode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleConvert = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setOutput('')
        return
      }
      const result = direction === 'encode' ? textToEncoded(text, mode) : encodedToText(text, mode)
      setOutput(result)
    },
    [direction, mode]
  )

  const modeOptions: { value: EncodingMode; label: string }[] = [
    { value: 'unicode', label: 'Unicode (\\u)' },
    { value: 'html', label: l.htmlEntities },
    { value: 'js', label: l.jsEscape },
    { value: 'css', label: l.cssEscape },
    { value: 'codepoints', label: l.codePoints },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className={direction === 'encode' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
          onClick={() => { setDirection('encode'); setOutput(input.trim() ? textToEncoded(input, mode) : '') }}
        >
          {l.textToUnicode}
        </button>
        <button
          className={direction === 'decode' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
          onClick={() => { setDirection('decode'); setOutput(input.trim() ? encodedToText(input, mode) : '') }}
        >
          {l.unicodeToText}
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={() => { setInput(''); setOutput('') }}>{l.clear}</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {modeOptions.map((opt) => (
          <button
            key={opt.value}
            className={mode === opt.value ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
            style={{ fontSize: '0.8125rem', padding: '0.375rem 0.75rem' }}
            onClick={() => {
              setMode(opt.value)
              if (input.trim()) {
                setOutput(direction === 'encode' ? textToEncoded(input, opt.value) : encodedToText(input, opt.value))
              }
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
          placeholder={l.inputPlaceholder}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            handleConvert(e.target.value)
          }}
        />
        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.outputPlaceholder}
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
    </div>
  )
}
