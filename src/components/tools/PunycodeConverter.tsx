'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface PunycodeConverterProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    encode: string
    decode: string
    clear: string
    result: string
    copy: string
    copied: string
  }
}

// Simple Punycode implementation
function punycodeDecode(input: string): string {
  try {
    const parts = input.split('-')
    if (parts.length < 2) return input

    const ascii = parts.slice(0, -1).join('-')
    const encoded = parts[parts.length - 1]

    if (!encoded) return ascii

    let output = ascii.split('')
    let n = 128
    let i = 0
    let bias = 72

    for (let j = 0; j < encoded.length;) {
      const oldi = i
      let w = 1
      for (let k = 36; ; k += 36) {
        if (j >= encoded.length) break
        const c = encoded.charCodeAt(j++)
        const digit = c - 48 < 10 ? c - 22 : c - 65 < 26 ? c - 65 : c - 97 < 26 ? c - 97 : 36
        if (digit >= 36) break
        i += digit * w
        const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias
        if (digit < t) break
        w *= 36 - t
      }

      bias = Math.floor((i - oldi) / (oldi === 0 ? 700 : 2 * (output.length + 1)))
      n += Math.floor(i / (output.length + 1))
      i %= output.length + 1
      output.splice(i, 0, String.fromCodePoint(n))
      i++
    }

    return output.join('')
  } catch {
    return input
  }
}

function punycodeEncode(input: string): string {
  try {
    const output: string[] = []
    const basic: string[] = []

    for (const char of input) {
      if (char.charCodeAt(0) < 128) {
        basic.push(char)
        output.push(char)
      }
    }

    const b = basic.length
    let h = b

    if (b > 0) output.push('-')

    let n = 128
    let delta = 0
    let bias = 72

    while (h < input.length) {
      let m = Infinity
      for (const char of input) {
        const c = char.codePointAt(0)!
        if (c >= n && c < m) m = c
      }

      delta += (m - n) * (h + 1)
      n = m

      for (const char of input) {
        const c = char.codePointAt(0)!
        if (c < n) delta++

        if (c === n) {
          let q = delta
          for (let k = 36; ; k += 36) {
            const t = k <= bias ? 1 : k >= bias + 26 ? 26 : k - bias
            if (q < t) break
            output.push(String.fromCharCode(t + ((q - t) % (36 - t)) + 22 + 75 * (t + ((q - t) % (36 - t)) < 26 ? 1 : 0)))
            q = Math.floor((q - t) / (36 - t))
          }

          output.push(String.fromCharCode(q + 22 + 75 * (q < 26 ? 1 : 0)))
          bias = Math.floor(delta / (h === b ? 700 : 2))
          delta = 0
          h++
        }
      }

      delta++
      n++
    }

    return output.join('')
  } catch {
    return input
  }
}

export default function PunycodeConverter({ labels }: PunycodeConverterProps) {
  const l = {
    title: labels?.title ?? 'Punycode Converter',
    input: labels?.input ?? 'Input',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter domain or punycode...',
    encode: labels?.encode ?? 'Encode',
    decode: labels?.decode ?? 'Decode',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleEncode = useCallback(() => {
    if (!input.trim()) return

    // Process each part of domain
    const parts = input.split('.')
    const encoded = parts.map(part => {
      // Check if contains non-ASCII
      if (/[^\x00-\x7F]/.test(part)) {
        return 'xn--' + punycodeEncode(part)
      }
      return part
    })

    setOutput(encoded.join('.'))
  }, [input])

  const handleDecode = useCallback(() => {
    if (!input.trim()) return

    const parts = input.split('.')
    const decoded = parts.map(part => {
      if (part.startsWith('xn--')) {
        return punycodeDecode(part.slice(4))
      }
      return part
    })

    setOutput(decoded.join('.'))
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

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
            minHeight: '100px',
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
          className="btn-primary"
          onClick={handleEncode}
          disabled={!input.trim()}
        >
          {l.encode}
        </button>
        <button
          className="btn-primary"
          onClick={handleDecode}
          disabled={!input.trim()}
        >
          {l.decode}
        </button>
        <button
          className="btn-secondary"
          onClick={handleClear}
          disabled={!input && !output}
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
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontFamily: "'Fira Code', monospace",
            fontSize: '1rem',
            wordBreak: 'break-all',
            lineHeight: 1.6,
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
        <strong style={{ color: 'var(--color-text)' }}>What is Punycode?</strong> Punycode is used to encode internationalized domain names (IDN) with non-ASCII characters.
        For example: "中文.com" becomes "xn--fiq228c.com"
      </div>
    </div>
  )
}
