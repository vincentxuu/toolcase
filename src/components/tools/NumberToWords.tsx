'use client'
import { useState, useCallback } from 'react'

interface NumberToWordsProps {
  labels?: {
    number: string
    words: string
    enterNumber: string
    result: string
    copy: string
    copied: string
  }
}

const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const scales = ['', 'thousand', 'million', 'billion', 'trillion']

function convertHundreds(n: number): string {
  if (n === 0) return ''
  if (n < 20) return ones[n]
  if (n < 100) {
    const t = tens[Math.floor(n / 10)]
    const o = ones[n % 10]
    return o ? `${t}-${o}` : t
  }
  const h = `${ones[Math.floor(n / 100)]} hundred`
  const remainder = n % 100
  if (remainder === 0) return h
  return `${h} ${convertHundreds(remainder)}`
}

function numberToWords(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) return ''

  const isNegative = trimmed.startsWith('-')
  const absStr = isNegative ? trimmed.slice(1) : trimmed

  const parts = absStr.split('.')
  const intPart = parts[0].replace(/^0+/, '') || '0'
  const decPart = parts[1] || ''

  if (intPart === '0' && !decPart) return 'zero'

  let intWords = ''
  if (intPart === '0') {
    intWords = 'zero'
  } else {
    const digits = intPart.split('').map(Number)
    const groups: number[] = []
    let i = digits.length
    while (i > 0) {
      const start = Math.max(0, i - 3)
      const group = digits.slice(start, i)
      groups.unshift(group.reduce((acc, d) => acc * 10 + d, 0))
      i = start
    }

    if (groups.length > scales.length) return 'Number too large'

    const wordParts: string[] = []
    for (let g = 0; g < groups.length; g++) {
      const val = groups[g]
      if (val === 0) continue
      const scaleIdx = groups.length - 1 - g
      const w = convertHundreds(val)
      wordParts.push(scales[scaleIdx] ? `${w} ${scales[scaleIdx]}` : w)
    }
    intWords = wordParts.join(' ')
  }

  let decWords = ''
  if (decPart) {
    const digitWords = decPart.split('').map((d) => {
      const n = parseInt(d)
      return ones[n] || 'zero'
    })
    decWords = ' point ' + digitWords.join(' ')
  }

  const result = intWords + decWords
  return isNegative ? `negative ${result}` : result
}

export default function NumberToWords({ labels }: NumberToWordsProps) {
  const l = {
    number: labels?.number ?? 'Number',
    words: labels?.words ?? 'Words',
    enterNumber: labels?.enterNumber ?? 'Enter a number...',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const output = numberToWords(input)

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

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="font-semibold block mb-1">{l.number}</label>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            const v = e.target.value
            if (/^-?\d*\.?\d*$/.test(v)) setInput(v)
          }}
          placeholder={l.enterNumber}
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            fontSize: '1.1rem',
          }}
        />
      </div>

      <div>
        <label className="font-semibold block mb-1">{l.result}</label>
        <div style={{
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
          minHeight: '60px',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: output ? 'inherit' : 'var(--color-text-secondary)',
        }}>
          {output || l.enterNumber}
        </div>
      </div>

      <button
        onClick={handleCopy}
        disabled={!output}
        style={{
          padding: '0.6rem 1.5rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: output ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
          color: output ? '#fff' : 'var(--color-text-secondary)',
          cursor: output ? 'pointer' : 'default',
          fontWeight: 600,
          alignSelf: 'flex-start',
        }}
      >
        {copied ? l.copied : l.copy}
      </button>
    </div>
  )
}
