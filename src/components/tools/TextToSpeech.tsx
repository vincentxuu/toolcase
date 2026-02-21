'use client'
import { useState, useEffect, useRef } from 'react'

interface Props {
  labels?: {
    text: string; voice: string; rate: string; pitch: string
    play: string; pause: string; stop: string
    speaking: string; paused: string; ready: string
  }
}

export default function TextToSpeech({ labels }: Props) {
  const l = {
    text: labels?.text ?? 'Text',
    voice: labels?.voice ?? 'Voice',
    rate: labels?.rate ?? 'Rate',
    pitch: labels?.pitch ?? 'Pitch',
    play: labels?.play ?? 'Play',
    pause: labels?.pause ?? 'Pause',
    stop: labels?.stop ?? 'Stop',
    speaking: labels?.speaking ?? 'Speaking...',
    paused: labels?.paused ?? 'Paused',
    ready: labels?.ready ?? 'Ready',
  }

  const [text, setText] = useState('')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState(0)
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [status, setStatus] = useState<'ready' | 'speaking' | 'paused'>('ready')
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices()
      if (v.length > 0) setVoices(v)
    }
    loadVoices()
    speechSynthesis.addEventListener('voiceschanged', loadVoices)
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      speechSynthesis.cancel()
    }
  }, [])

  const handlePlay = () => {
    if (status === 'paused') {
      speechSynthesis.resume()
      setStatus('speaking')
      return
    }
    speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    if (voices[selectedVoice]) utter.voice = voices[selectedVoice]
    utter.rate = rate
    utter.pitch = pitch
    utter.onend = () => setStatus('ready')
    utter.onerror = () => setStatus('ready')
    utterRef.current = utter
    speechSynthesis.speak(utter)
    setStatus('speaking')
  }

  const handlePause = () => {
    speechSynthesis.pause()
    setStatus('paused')
  }

  const handleStop = () => {
    speechSynthesis.cancel()
    setStatus('ready')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }

  const statusLabel = status === 'speaking' ? l.speaking : status === 'paused' ? l.paused : l.ready
  const statusColor = status === 'speaking' ? '#22c55e' : status === 'paused' ? '#f59e0b' : 'var(--color-text-secondary)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label style={labelStyle}>{l.text}</label>
        <textarea style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to read aloud..." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.voice}</label>
          <select style={inputStyle} value={selectedVoice} onChange={(e) => setSelectedVoice(Number(e.target.value))}>
            {voices.map((v, i) => <option key={i} value={i}>{v.name} ({v.lang})</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>{l.rate}: {rate.toFixed(1)}</label>
          <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={labelStyle}>{l.pitch}: {pitch.toFixed(1)}</label>
          <input type="range" min={0.5} max={2} step={0.1} value={pitch} onChange={(e) => setPitch(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button className="btn-primary" onClick={handlePlay} disabled={!text.trim()}>{status === 'paused' ? '▶ Resume' : `▶ ${l.play}`}</button>
        {status === 'speaking' && <button className="btn-secondary" onClick={handlePause}>⏸ {l.pause}</button>}
        {status !== 'ready' && <button className="btn-secondary" onClick={handleStop}>⏹ {l.stop}</button>}
        <span style={{ fontSize: '0.875rem', color: statusColor, fontWeight: 500 }}>{statusLabel}</span>
      </div>
    </div>
  )
}
