'use client'
import { useState, useCallback } from 'react'

interface FancyTextGeneratorProps {
  labels?: {
    inputText: string
    placeholder: string
    copied: string
    clickToCopy: string
  }
}

const STYLES: Record<string, { name: string; map: Record<string, string> | ((ch: string) => string) }> = {}

function buildOffsetMap(upperStart: number, lowerStart: number, digitStart?: number): (ch: string) => string {
  return (ch: string) => {
    const code = ch.charCodeAt(0)
    if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + (code - 65))
    if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + (code - 97))
    if (digitStart !== undefined && code >= 48 && code <= 57) return String.fromCodePoint(digitStart + (code - 48))
    return ch
  }
}

const boldSerif = buildOffsetMap(0x1D400, 0x1D41A, 0x1D7CE)
const italicSerif = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code === 104) return String.fromCodePoint(0x210E) // h
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + (code - 65))
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + (code - 97))
  return ch
}
const boldItalic = buildOffsetMap(0x1D468, 0x1D482)
const script = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code === 66) return String.fromCodePoint(0x212C) // B
  if (code === 69) return String.fromCodePoint(0x2130) // E
  if (code === 70) return String.fromCodePoint(0x2131) // F
  if (code === 72) return String.fromCodePoint(0x210B) // H
  if (code === 73) return String.fromCodePoint(0x2110) // I
  if (code === 76) return String.fromCodePoint(0x2112) // L
  if (code === 77) return String.fromCodePoint(0x2133) // M
  if (code === 82) return String.fromCodePoint(0x211B) // R
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + (code - 65))
  if (code === 101) return String.fromCodePoint(0x212F) // e
  if (code === 103) return String.fromCodePoint(0x210A) // g
  if (code === 111) return String.fromCodePoint(0x2134) // o
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + (code - 97))
  return ch
}
const fraktur = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code === 67) return String.fromCodePoint(0x212D)
  if (code === 72) return String.fromCodePoint(0x210C)
  if (code === 73) return String.fromCodePoint(0x2111)
  if (code === 82) return String.fromCodePoint(0x211C)
  if (code === 90) return String.fromCodePoint(0x2128)
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D504 + (code - 65))
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D51E + (code - 97))
  return ch
}
const doubleStruck = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code === 67) return String.fromCodePoint(0x2102)
  if (code === 72) return String.fromCodePoint(0x210D)
  if (code === 78) return String.fromCodePoint(0x2115)
  if (code === 80) return String.fromCodePoint(0x2119)
  if (code === 81) return String.fromCodePoint(0x211A)
  if (code === 82) return String.fromCodePoint(0x211D)
  if (code === 90) return String.fromCodePoint(0x2124)
  if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D538 + (code - 65))
  if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + (code - 97))
  if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7D8 + (code - 48))
  return ch
}
const monospace = buildOffsetMap(0x1D670, 0x1D68A, 0x1D7F6)

const circledUpper: Record<string, string> = {}
const circledLower: Record<string, string> = {}
for (let i = 0; i < 26; i++) {
  circledUpper[String.fromCharCode(65 + i)] = String.fromCodePoint(0x24B6 + i)
  circledLower[String.fromCharCode(97 + i)] = String.fromCodePoint(0x24D0 + i)
}
const circledDigits = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨']
const circled = (ch: string) => {
  if (circledUpper[ch]) return circledUpper[ch]
  if (circledLower[ch]) return circledLower[ch]
  const code = ch.charCodeAt(0)
  if (code >= 48 && code <= 57) return circledDigits[code - 48]
  return ch
}

const fullwidth = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code >= 33 && code <= 126) return String.fromCodePoint(0xFF01 + (code - 33))
  if (code === 32) return '\u3000'
  return ch
}

const upsideDownMap: Record<string, string> = {
  a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01DD', f: '\u025F',
  g: '\u0253', h: '\u0265', i: '\u0131', j: '\u027E', k: '\u029E', l: 'l',
  m: '\u026F', n: 'u', o: 'o', p: 'd', q: 'b', r: '\u0279',
  s: 's', t: '\u0287', u: 'n', v: '\u028C', w: '\u028D', x: 'x',
  y: '\u028E', z: 'z',
  A: '\u2200', B: '\u1012', C: '\u0186', D: '\u15E1', E: '\u018E', F: '\u2132',
  G: '\u2141', H: 'H', I: 'I', J: '\u017F', K: '\u22CA', L: '\u2142',
  M: 'W', N: 'N', O: 'O', P: '\u0500', Q: '\u038C', R: '\u1D1A',
  S: 'S', T: '\u22A5', U: '\u2229', V: '\u039B', W: 'M', X: 'X',
  Y: '\u2144', Z: 'Z',
  '1': '\u0196', '2': '\u1105', '3': '\u0190', '4': '\u3123', '5': '\u03DB',
  '6': '9', '7': '\u3125', '8': '8', '9': '6', '0': '0',
  '.': '\u02D9', ',': '\'', '\'': ',', '"': '\u201E', '`': ',',
  '!': '\u00A1', '?': '\u00BF', '(': ')', ')': '(', '[': ']', ']': '[',
  '{': '}', '}': '{', '<': '>', '>': '<', '&': '\u214B', '_': '\u203E',
  ';': '\u061B',
}
const upsideDown = (text: string) => {
  return text.split('').map(ch => upsideDownMap[ch] ?? ch).reverse().join('')
}

const smallCapsMap: Record<string, string> = {
  a: '\u1D00', b: '\u0299', c: '\u1D04', d: '\u1D05', e: '\u1D07',
  f: '\uA730', g: '\u0262', h: '\u029C', i: '\u026A', j: '\u1D0A',
  k: '\u1D0B', l: '\u029F', m: '\u1D0D', n: '\u0274', o: '\u1D0F',
  p: '\u1D18', q: '\u01EB', r: '\u0280', s: '\u0455', t: '\u1D1B',
  u: '\u1D1C', v: '\u1D20', w: '\u1D21', x: 'x', y: '\u028F', z: '\u1D22',
}
const smallCaps = (ch: string) => {
  const code = ch.charCodeAt(0)
  if (code >= 97 && code <= 122) return smallCapsMap[ch] ?? ch
  return ch
}

function applyStyle(text: string, fn: ((ch: string) => string) | 'upsideDown'): string {
  if (fn === 'upsideDown') return upsideDown(text)
  return text.split('').map(fn).join('')
}

const styleList: { name: string; fn: ((ch: string) => string) | 'upsideDown' }[] = [
  { name: 'Bold Serif', fn: boldSerif },
  { name: 'Italic Serif', fn: italicSerif },
  { name: 'Bold Italic', fn: boldItalic },
  { name: 'Script', fn: script },
  { name: 'Fraktur', fn: fraktur },
  { name: 'Double-struck', fn: doubleStruck },
  { name: 'Monospace', fn: monospace },
  { name: 'Circled', fn: circled },
  { name: 'Fullwidth', fn: fullwidth },
  { name: 'Upside Down', fn: 'upsideDown' },
  { name: 'Small Caps', fn: smallCaps },
]

export default function FancyTextGenerator({ labels }: FancyTextGeneratorProps) {
  const l = {
    inputText: labels?.inputText ?? 'Input Text',
    placeholder: labels?.placeholder ?? 'Type your text here...',
    copied: labels?.copied ?? 'Copied!',
    clickToCopy: labels?.clickToCopy ?? 'Click to copy',
  }

  const [input, setInput] = useState('')
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const handleCopy = useCallback(async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }, [])

  const results = input.trim()
    ? styleList.map(s => ({ name: s.name, text: applyStyle(input, s.fn) }))
    : []

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    cursor: 'pointer',
    gap: '1rem',
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="font-semibold">{l.inputText}</label>
      <textarea
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ height: '100px' }}
        placeholder={l.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {results.length > 0 && (
        <div className="flex flex-col gap-2">
          {results.map((r, idx) => (
            <div
              key={idx}
              style={rowStyle}
              title={l.clickToCopy}
              onClick={() => handleCopy(r.text, idx)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{r.name}</span>
                <span style={{ fontSize: '1rem', wordBreak: 'break-all' }}>{r.text}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', whiteSpace: 'nowrap', fontWeight: 500 }}>
                {copiedIdx === idx ? l.copied : l.clickToCopy}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
