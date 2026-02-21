'use client'
import { useState, useRef, useCallback } from 'react'

interface PdfToolsProps {
  labels?: {
    uploadPdf: string
    fileName: string
    fileSize: string
    openInNewTab: string
    download: string
    note: string
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function PdfTools({ labels }: PdfToolsProps) {
  const l = {
    uploadPdf: labels?.uploadPdf ?? 'Upload PDF',
    fileName: labels?.fileName ?? 'File Name',
    fileSize: labels?.fileSize ?? 'File Size',
    openInNewTab: labels?.openInNewTab ?? 'Open in New Tab',
    download: labels?.download ?? 'Download',
    note: labels?.note ?? 'For advanced PDF operations such as merging, splitting, or rearranging pages, use your browser\'s built-in print dialog (Ctrl+P / Cmd+P) with the "Save as PDF" option.',
  }

  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
    }

    setFile(selected)
    const url = URL.createObjectURL(selected)
    setFileUrl(url)
  }, [fileUrl])

  const handleOpenInNewTab = useCallback(() => {
    if (!fileUrl) return
    window.open(fileUrl, '_blank')
  }, [fileUrl])

  const handleDownload = useCallback(() => {
    if (!fileUrl || !file) return
    const a = document.createElement('a')
    a.href = fileUrl
    a.download = file.name
    a.click()
  }, [fileUrl, file])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
          {l.uploadPdf}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {file && (
        <>
          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
              <span style={labelStyle}>{l.fileName}:</span>
              <span style={valueStyle}>{file.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}>
              <span style={labelStyle}>{l.fileSize}:</span>
              <span style={valueStyle}>{formatBytes(file.size)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleOpenInNewTab}>
              {l.openInNewTab}
            </button>
            <button className="btn-secondary" onClick={handleDownload}>
              {l.download}
            </button>
          </div>

          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.5,
          }}>
            {l.note}
          </div>
        </>
      )}
    </div>
  )
}
