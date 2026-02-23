'use client'
import { useState, useRef, useCallback } from 'react'

interface ScreenRecorderProps {
  labels?: {
    startRecording: string
    stopRecording: string
    download: string
    reset: string
    recording: string
    preview: string
    selectScreen: string
    includeAudio: string
  }
}

export default function ScreenRecorder({ labels }: ScreenRecorderProps) {
  const l = {
    startRecording: labels?.startRecording ?? 'Start Recording',
    stopRecording: labels?.stopRecording ?? 'Stop Recording',
    download: labels?.download ?? 'Download',
    reset: labels?.reset ?? 'Reset',
    recording: labels?.recording ?? 'Recording…',
    preview: labels?.preview ?? 'Preview',
    selectScreen: labels?.selectScreen ?? 'Click to select screen, window, or tab to record.',
    includeAudio: labels?.includeAudio ?? 'Include system audio',
  }

  const [recording, setRecording] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [includeAudio, setIncludeAudio] = useState(false)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 30 },
        audio: includeAudio,
      })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm' })
      recorderRef.current = recorder

      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setResultUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((t) => t.stop())
        if (timerRef.current) clearInterval(timerRef.current)
        setRecording(false)
      }

      // Stop when user stops sharing
      stream.getVideoTracks()[0].onended = () => { if (recorder.state === 'recording') recorder.stop() }

      recorder.start(100)
      setRecording(true)
      setElapsed(0)
      setResultUrl(null)
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000)
    } catch {
      // User cancelled screen selection
    }
  }, [includeAudio, resultUrl])

  const stopRecording = useCallback(() => {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }, [])

  const handleDownload = useCallback(() => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = `recording_${new Date().toISOString().slice(0, 19).replace(/[T:]/g, '-')}.webm`
    a.click()
  }, [resultUrl])

  const handleReset = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setResultUrl(null)
    setElapsed(0)
  }, [resultUrl])

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const btnPrimary: React.CSSProperties = { padding: '0.7rem 1.5rem', border: 'none', borderRadius: '0.5rem', backgroundColor: 'var(--color-primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }
  const btnSecondary: React.CSSProperties = { padding: '0.6rem 1.25rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }

  return (
    <div className="flex flex-col gap-4">
      {!recording && !resultUrl && (
        <div style={{ textAlign: 'center', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎥</div>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{l.selectScreen}</p>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)} />
            {l.includeAudio}
          </label>
          <button onClick={startRecording} style={btnPrimary}>{l.startRecording}</button>
        </div>
      )}

      {recording && (
        <div style={{ textAlign: 'center', padding: '2rem', border: '2px solid #ef4444', borderRadius: '0.75rem', backgroundColor: 'rgba(239,68,68,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1s infinite' }} />
            <span style={{ fontWeight: 600, color: '#ef4444' }}>{l.recording}</span>
            <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: 700 }}>{formatTime(elapsed)}</span>
          </div>
          <button onClick={stopRecording} style={{ ...btnPrimary, backgroundColor: '#ef4444' }}>{l.stopRecording}</button>
        </div>
      )}

      {resultUrl && (
        <>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.75rem', overflow: 'hidden' }}>
            <video src={resultUrl} controls style={{ width: '100%', maxHeight: '400px', display: 'block', backgroundColor: '#000' }} />
          </div>
          <div className="flex gap-2">
            <button onClick={handleDownload} style={btnPrimary}>{l.download}</button>
            <button onClick={handleReset} style={btnSecondary}>{l.reset}</button>
          </div>
        </>
      )}
    </div>
  )
}
