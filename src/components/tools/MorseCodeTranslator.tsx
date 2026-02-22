'use client'
import { useState, useCallback, useRef } from 'react'

interface MorseCodeTranslatorProps {
  labels?: {
    text: string
    morseCode: string
    textToMorse: string
    morseToText: string
    play: string
    stop: string
    referenceChart: string
    copy: string
    copied: string
  }
}

const CHAR_TO_MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
  K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/',
}

const MORSE_TO_CHAR: Record<string, string> = {}
for (const [ch, morse] of Object.entries(CHAR_TO_MORSE)) {
  if (ch !== ' ') MORSE_TO_CHAR[morse] = ch
}

function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((ch) => CHAR_TO_MORSE[ch] ?? '')
    .filter(Boolean)
    .join(' ')
}

function morseToText(morse: string): string {
  return morse
    .split(' / ')
    .map((word) =>
      word
        .split(' ')
        .map((code) => MORSE_TO_CHAR[code] ?? '')
        .join('')
    )
    .join(' ')
}

export default function MorseCodeTranslator({ labels }: MorseCodeTranslatorProps) {
  const l = {
    text: labels?.text ?? 'Text',
    morseCode: labels?.morseCode ?? 'Morse Code',
    textToMorse: labels?.textToMorse ?? 'Text to Morse',
    morseToText: labels?.morseToText ?? 'Morse to Text',
    play: labels?.play ?? 'Play',
    stop: labels?.stop ?? 'Stop',
    referenceChart: labels?.referenceChart ?? 'Reference Chart',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [mode, setMode] = useState<'textToMorse' | 'morseToText'>('textToMorse')
  const [textInput, setTextInput] = useState('')
  const [morseInput, setMorseInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const stopRef = useRef(false)

  const output = mode === 'textToMorse' ? textToMorse(textInput) : morseToText(morseInput)

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

  const playMorse = useCallback(async () => {
    const morseStr = mode === 'textToMorse' ? output : morseInput
    if (!morseStr) return
    stopRef.current = false
    setPlaying(true)

    const ctx = new AudioContext()
    audioCtxRef.current = ctx
    const dotDuration = 0.08
    const dashDuration = dotDuration * 3
    const gapDuration = dotDuration
    const letterGap = dotDuration * 3
    const wordGap = dotDuration * 7
    let time = ctx.currentTime + 0.05

    for (const ch of morseStr) {
      if (stopRef.current) break
      if (ch === '.') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 600
        gain.gain.value = 0.5
        osc.start(time)
        osc.stop(time + dotDuration)
        time += dotDuration + gapDuration
      } else if (ch === '-') {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.frequency.value = 600
        gain.gain.value = 0.5
        osc.start(time)
        osc.stop(time + dashDuration)
        time += dashDuration + gapDuration
      } else if (ch === ' ') {
        time += letterGap
      } else if (ch === '/') {
        time += wordGap
      }
    }

    const endTime = (time - ctx.currentTime) * 1000 + 100
    setTimeout(() => {
      setPlaying(false)
      ctx.close()
    }, endTime)
  }, [mode, output, morseInput])

  const stopMorse = useCallback(() => {
    stopRef.current = true
    setPlaying(false)
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
  }, [])

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'inherit',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
  })

  const labelStyle: React.CSSProperties = { fontWeight: 600, marginBottom: '0.25rem', display: 'block' }

  const chartEntries = Object.entries(CHAR_TO_MORSE).filter(([k]) => k !== ' ')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setMode('textToMorse')} style={btnStyle(mode === 'textToMorse')}>{l.textToMorse}</button>
        <button onClick={() => setMode('morseToText')} style={btnStyle(mode === 'morseToText')}>{l.morseToText}</button>
      </div>

      <div>
        <label style={labelStyle}>{mode === 'textToMorse' ? l.text : l.morseCode}</label>
        <textarea
          className="tool-textarea"
          style={{ height: '100px' }}
          value={mode === 'textToMorse' ? textInput : morseInput}
          onChange={(e) => mode === 'textToMorse' ? setTextInput(e.target.value) : setMorseInput(e.target.value)}
        />
      </div>

      <div>
        <label style={labelStyle}>{mode === 'textToMorse' ? l.morseCode : l.text}</label>
        <textarea
          className="tool-textarea"
          style={{ height: '100px' }}
          value={output}
          readOnly
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleCopy}
          style={{
            padding: '0.5rem 1.25rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {copied ? l.copied : l.copy}
        </button>
        {!playing ? (
          <button onClick={playMorse} style={btnStyle(false)}>{l.play}</button>
        ) : (
          <button onClick={stopMorse} style={btnStyle(false)}>{l.stop}</button>
        )}
        <button onClick={() => setShowChart(!showChart)} style={btnStyle(false)}>{l.referenceChart}</button>
      </div>

      {showChart && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '0.5rem',
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}>
          {chartEntries.map(([ch, morse]) => (
            <div key={ch} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600 }}>{ch}</span>
              <span style={{ color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>{morse}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
