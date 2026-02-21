'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface HtmlEntityEncoderProps {
  labels?: {
    input: string
    output: string
    encode: string
    decode: string
    clear: string
    copy: string
    copied: string
  }
}

const NAMED_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '\u00A0': '&nbsp;',
  '\u00A9': '&copy;',
  '\u00AE': '&reg;',
  '\u2122': '&trade;',
  '\u20AC': '&euro;',
  '\u00A3': '&pound;',
  '\u00A5': '&yen;',
  '\u00AB': '&laquo;',
  '\u00BB': '&raquo;',
  '\u2013': '&ndash;',
  '\u2014': '&mdash;',
  '\u2018': '&lsquo;',
  '\u2019': '&rsquo;',
  '\u201C': '&ldquo;',
  '\u201D': '&rdquo;',
  '\u2026': '&hellip;',
  '\u00B7': '&middot;',
  '\u00D7': '&times;',
  '\u00F7': '&divide;',
}

const REVERSE_NAMED: Record<string, string> = {}
for (const [char, entity] of Object.entries(NAMED_ENTITIES)) {
  REVERSE_NAMED[entity] = char
}

function encodeHtmlEntities(text: string): string {
  let result = ''
  for (const char of text) {
    if (NAMED_ENTITIES[char]) {
      result += NAMED_ENTITIES[char]
    } else {
      const code = char.codePointAt(0)!
      if (code > 127) {
        result += `&#${code};`
      } else {
        result += char
      }
    }
  }
  return result
}

function decodeHtmlEntities(text: string): string {
  // Decode named entities
  let result = text.replace(/&[a-zA-Z]+;/g, (match) => {
    return REVERSE_NAMED[match] ?? match
  })

  // Decode numeric entities (decimal)
  result = result.replace(/&#(\d+);/g, (_, num) => {
    return String.fromCodePoint(parseInt(num, 10))
  })

  // Decode numeric entities (hex)
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
    return String.fromCodePoint(parseInt(hex, 16))
  })

  return result
}

export default function HtmlEntityEncoder({ labels }: HtmlEntityEncoderProps) {
  const l = {
    input: labels?.input ?? 'Enter text to encode or HTML entities to decode...',
    output: labels?.output ?? 'Result will appear here...',
    encode: labels?.encode ?? 'Encode',
    decode: labels?.decode ?? 'Decode',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleEncode = useCallback(() => {
    if (!input) return
    setOutput(encodeHtmlEntities(input))
  }, [input])

  const handleDecode = useCallback(() => {
    if (!input) return
    setOutput(decodeHtmlEntities(input))
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleEncode}>{l.encode}</button>
        <button className="btn-secondary" onClick={handleDecode}>{l.decode}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.output}
            value={output}
            readOnly
          />
          {output && (
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
