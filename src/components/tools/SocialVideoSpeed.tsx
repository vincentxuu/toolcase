'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

interface Platform {
  id: string
  name: string
  maxSeconds: number
  icon: string
}

interface SocialVideoSpeedProps {
  labels?: {
    upload: string
    dragDrop: string
    orClick: string
    originalDuration: string
    targetDuration: string
    platform: string
    custom: string
    speedMultiplier: string
    keepAudio: string
    removeAudio: string
    process: string
    processing: string
    download: string
    preview: string
    reset: string
    seconds: string
    noSpeedNeeded: string
    maxFileSize: string
    unsupportedFormat: string
    loadingFfmpeg: string
    errorProcessing: string
  }
}

const PLATFORMS: Platform[] = [
  { id: 'ig-reels', name: 'Instagram Reels', maxSeconds: 90, icon: '📱' },
  { id: 'ig-stories', name: 'Instagram Stories', maxSeconds: 60, icon: '📸' },
  { id: 'threads', name: 'Threads', maxSeconds: 300, icon: '🧵' },
  { id: 'fb-reels', name: 'Facebook Reels', maxSeconds: 90, icon: '📘' },
  { id: 'tiktok', name: 'TikTok', maxSeconds: 180, icon: '🎵' },
  { id: 'yt-shorts', name: 'YouTube Shorts', maxSeconds: 60, icon: '▶️' },
  { id: 'x-twitter', name: 'X (Twitter)', maxSeconds: 140, icon: '𝕏' },
]

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return m > 0 ? `${m}m ${s.toString().padStart(2, '0')}s` : `${s}s`
}

function buildAtempoFilter(speed: number): string {
  // atempo supports 0.5–100.0 per instance, for >2x we chain multiple
  const parts: string[] = []
  let remaining = speed
  while (remaining > 2.0) {
    parts.push('atempo=2.0')
    remaining /= 2.0
  }
  if (remaining > 1.0001) {
    parts.push(`atempo=${remaining.toFixed(4)}`)
  }
  return parts.length > 0 ? parts.join(',') : 'atempo=1.0'
}

export default function SocialVideoSpeed({ labels }: SocialVideoSpeedProps) {
  const l = {
    upload: labels?.upload ?? 'Upload Video',
    dragDrop: labels?.dragDrop ?? 'Drag & drop your video here',
    orClick: labels?.orClick ?? 'or click to browse',
    originalDuration: labels?.originalDuration ?? 'Original Duration',
    targetDuration: labels?.targetDuration ?? 'Target Duration',
    platform: labels?.platform ?? 'Platform',
    custom: labels?.custom ?? 'Custom',
    speedMultiplier: labels?.speedMultiplier ?? 'Speed',
    keepAudio: labels?.keepAudio ?? 'Keep audio (sped up)',
    removeAudio: labels?.removeAudio ?? 'Remove audio',
    process: labels?.process ?? 'Speed Up Video',
    processing: labels?.processing ?? 'Processing…',
    download: labels?.download ?? 'Download',
    preview: labels?.preview ?? 'Preview',
    reset: labels?.reset ?? 'Reset',
    seconds: labels?.seconds ?? 'seconds',
    noSpeedNeeded: labels?.noSpeedNeeded ?? 'Video already fits! No speed change needed.',
    maxFileSize: labels?.maxFileSize ?? 'Max file size: 500 MB',
    unsupportedFormat: labels?.unsupportedFormat ?? 'Unsupported format. Try MP4, WebM, or MOV.',
    loadingFfmpeg: labels?.loadingFfmpeg ?? 'Loading video engine…',
    errorProcessing: labels?.errorProcessing ?? 'Error processing video. Try a different file.',
  }

  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ig-reels')
  const [customTarget, setCustomTarget] = useState(60)
  const [keepAudio, setKeepAudio] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingFfmpeg, setLoadingFfmpeg] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultBlob, setResultBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ffmpegRef = useRef<any>(null)

  const targetSeconds = selectedPlatform === 'custom'
    ? customTarget
    : PLATFORMS.find((p) => p.id === selectedPlatform)?.maxSeconds ?? 90

  const speedMultiplier = duration > 0 && duration > targetSeconds
    ? duration / targetSeconds
    : 1

  const needsSpeedup = duration > targetSeconds
  const estimatedDuration = duration > 0 ? duration / speedMultiplier : 0

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
      if (resultUrl) URL.revokeObjectURL(resultUrl)
    }
  }, [videoUrl, resultUrl])

  const handleFile = useCallback((f: File) => {
    setError(null)
    setResultUrl(null)
    setResultBlob(null)
    setProgress(0)

    if (f.size > 500 * 1024 * 1024) {
      setError(l.maxFileSize)
      return
    }

    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska']
    if (!validTypes.includes(f.type) && !f.name.match(/\.(mp4|webm|mov|mkv)$/i)) {
      setError(l.unsupportedFormat)
      return
    }

    if (videoUrl) URL.revokeObjectURL(videoUrl)
    const url = URL.createObjectURL(f)
    setFile(f)
    setVideoUrl(url)

    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      setDuration(video.duration)
      URL.revokeObjectURL(video.src)
    }
    video.src = url
  }, [videoUrl, l.maxFileSize, l.unsupportedFormat])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const processVideo = useCallback(async () => {
    if (!file || !needsSpeedup) return

    setProcessing(true)
    setError(null)
    setProgress(0)

    try {
      setLoadingFfmpeg(true)
      const { FFmpeg } = await import('@ffmpeg/ffmpeg')
      const { fetchFile } = await import('@ffmpeg/util')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ffmpeg: any = ffmpegRef.current
      if (!ffmpeg) {
        ffmpeg = new FFmpeg()
        ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
          setProgress(Math.min(Math.round(p * 100), 100))
        })
        await ffmpeg.load({
          coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
          wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
        })
        ffmpegRef.current = ffmpeg
      }
      setLoadingFfmpeg(false)

      const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4'
      const inputName = `input.${ext}`
      const outputName = 'output.mp4'

      const data = await fetchFile(file)
      await ffmpeg.writeFile(inputName, data)

      const videoFilter = `setpts=PTS/${speedMultiplier.toFixed(4)}`
      const args = ['-i', inputName]

      if (keepAudio) {
        const audioFilter = buildAtempoFilter(speedMultiplier)
        args.push('-filter:v', videoFilter, '-filter:a', audioFilter)
      } else {
        args.push('-filter:v', videoFilter, '-an')
      }

      args.push('-preset', 'fast', '-crf', '23', outputName)

      await ffmpeg.exec(args)

      const result = await ffmpeg.readFile(outputName)
      const blob = new Blob([result], { type: 'video/mp4' })

      if (resultUrl) URL.revokeObjectURL(resultUrl)
      const url = URL.createObjectURL(blob)
      setResultBlob(blob)
      setResultUrl(url)

      // Cleanup FFmpeg files
      await ffmpeg.deleteFile(inputName)
      await ffmpeg.deleteFile(outputName)
    } catch (err) {
      console.error('FFmpeg error:', err)
      setError(l.errorProcessing)
    } finally {
      setProcessing(false)
      setLoadingFfmpeg(false)
    }
  }, [file, needsSpeedup, speedMultiplier, keepAudio, resultUrl, l.errorProcessing])

  const handleDownload = useCallback(() => {
    if (!resultBlob || !resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    const baseName = file?.name.replace(/\.[^.]+$/, '') ?? 'video'
    a.download = `${baseName}_${speedMultiplier.toFixed(1)}x.mp4`
    a.click()
  }, [resultBlob, resultUrl, file, speedMultiplier])

  const handleReset = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null)
    setVideoUrl(null)
    setDuration(0)
    setResultUrl(null)
    setResultBlob(null)
    setError(null)
    setProgress(0)
  }, [videoUrl, resultUrl])

  const cardStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    marginBottom: '0.5rem',
    display: 'block',
    fontSize: '0.9rem',
  }

  const btnPrimary: React.CSSProperties = {
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-primary)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
  }

  const btnSecondary: React.CSSProperties = {
    padding: '0.6rem 1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Upload Area */}
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...cardStyle,
            padding: '3rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            borderStyle: 'dashed',
            borderWidth: '2px',
            borderColor: dragging ? 'var(--color-primary)' : 'var(--color-border)',
            backgroundColor: dragging ? 'rgba(99,102,241,0.05)' : 'var(--color-bg-secondary)',
            transition: 'border-color 0.2s, background-color 0.2s',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{l.dragDrop}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{l.orClick}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>MP4, WebM, MOV — {l.maxFileSize}</div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov,.mkv"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {error && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 500 }}>
          {error}
        </div>
      )}

      {/* Video Preview & Settings */}
      {file && videoUrl && (
        <>
          {/* Original Video */}
          <div style={cardStyle}>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              style={{ width: '100%', maxHeight: '360px', borderRadius: '0.5rem', backgroundColor: '#000' }}
            />
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <span style={{ fontWeight: 600 }}>{file.name}</span>
                <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.75rem', fontSize: '0.9rem' }}>
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                {l.originalDuration}: {formatDuration(duration)}
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div style={cardStyle}>
            <label style={labelStyle}>{l.platform}</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid',
                    borderColor: selectedPlatform === p.id ? 'var(--color-primary)' : 'var(--color-border)',
                    borderRadius: '0.5rem',
                    backgroundColor: selectedPlatform === p.id ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                    color: selectedPlatform === p.id ? '#fff' : 'inherit',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>{p.icon}</span>
                  <span>{p.name}</span>
                  <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>({formatDuration(p.maxSeconds)})</span>
                </button>
              ))}
              <button
                onClick={() => setSelectedPlatform('custom')}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid',
                  borderColor: selectedPlatform === 'custom' ? 'var(--color-primary)' : 'var(--color-border)',
                  borderRadius: '0.5rem',
                  backgroundColor: selectedPlatform === 'custom' ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                  color: selectedPlatform === 'custom' ? '#fff' : 'inherit',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                {l.custom}
              </button>
            </div>

            {selectedPlatform === 'custom' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{l.targetDuration} ({l.seconds})</label>
                <input
                  type="number"
                  min={1}
                  max={3600}
                  value={customTarget}
                  onChange={(e) => setCustomTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: '120px',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--color-bg-secondary)',
                    fontSize: '1rem',
                  }}
                />
              </div>
            )}

            {/* Speed Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: needsSpeedup ? 'rgba(99,102,241,0.06)' : 'rgba(34,197,94,0.06)',
              border: '1px solid',
              borderColor: needsSpeedup ? 'rgba(99,102,241,0.15)' : 'rgba(34,197,94,0.15)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.speedMultiplier}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{speedMultiplier.toFixed(2)}x</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.targetDuration}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatDuration(targetSeconds)}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.originalDuration}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatDuration(duration)}</div>
              </div>
            </div>

            {!needsSpeedup && duration > 0 && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(34,197,94,0.08)', color: '#16a34a', fontWeight: 500, textAlign: 'center' }}>
                {l.noSpeedNeeded}
              </div>
            )}
          </div>

          {/* Audio Option */}
          {needsSpeedup && (
            <div style={cardStyle}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="radio" name="audio" checked={keepAudio} onChange={() => setKeepAudio(true)} />
                  {l.keepAudio}
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                  <input type="radio" name="audio" checked={!keepAudio} onChange={() => setKeepAudio(false)} />
                  {l.removeAudio}
                </label>
              </div>
            </div>
          )}

          {/* Process Button */}
          {needsSpeedup && !resultUrl && (
            <button
              onClick={processVideo}
              disabled={processing}
              style={{
                ...btnPrimary,
                opacity: processing ? 0.7 : 1,
                cursor: processing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                alignSelf: 'stretch',
              }}
            >
              {processing ? (
                <>
                  {loadingFfmpeg ? l.loadingFfmpeg : `${l.processing} ${progress}%`}
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '2px', marginTop: '0.5rem', position: 'absolute', bottom: 0, left: 0 }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#fff', borderRadius: '2px', transition: 'width 0.3s' }} />
                  </div>
                </>
              ) : l.process}
            </button>
          )}

          {/* Progress Bar (shown separately for better visibility) */}
          {processing && (
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '4px', transition: 'width 0.3s' }} />
            </div>
          )}

          {/* Result */}
          {resultUrl && (
            <div style={cardStyle}>
              <label style={labelStyle}>{l.preview}</label>
              <video
                src={resultUrl}
                controls
                style={{ width: '100%', maxHeight: '360px', borderRadius: '0.5rem', backgroundColor: '#000', marginBottom: '1rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                  {speedMultiplier.toFixed(2)}x — ~{formatDuration(estimatedDuration)}
                  {resultBlob && ` — ${(resultBlob.size / 1024 / 1024).toFixed(1)} MB`}
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleDownload} style={btnPrimary}>{l.download}</button>
                </div>
              </div>
            </div>
          )}

          {/* Reset */}
          <button onClick={handleReset} style={btnSecondary}>{l.reset}</button>
        </>
      )}
    </div>
  )
}
