'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageToPdfProps {
  labels?: {
    uploadImages: string
    addImages: string
    removeAll: string
    printAsPdf: string
    noImages: string
  }
}

interface ImageItem {
  id: string
  file: File
  url: string
}

export default function ImageToPdf({ labels }: ImageToPdfProps) {
  const l = {
    uploadImages: labels?.uploadImages ?? 'Upload Images',
    addImages: labels?.addImages ?? 'Add Images',
    removeAll: labels?.removeAll ?? 'Remove All',
    printAsPdf: labels?.printAsPdf ?? 'Print as PDF',
    noImages: labels?.noImages ?? 'No images uploaded. Upload images to arrange them into a PDF.',
  }

  const [images, setImages] = useState<ImageItem[]>([])
  const fileRef = useRef<HTMLInputElement>(null)
  const printRef = useRef<HTMLDivElement>(null)

  const handleFilesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: ImageItem[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      newImages.push({
        id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        url: URL.createObjectURL(file),
      })
    }

    setImages((prev) => [...prev, ...newImages])
    e.target.value = ''
  }, [])

  const handleRemoveAll = useCallback(() => {
    images.forEach((img) => URL.revokeObjectURL(img.url))
    setImages([])
  }, [images])

  const handleRemove = useCallback((id: string) => {
    setImages((prev) => {
      const item = prev.find((img) => img.id === id)
      if (item) URL.revokeObjectURL(item.url)
      return prev.filter((img) => img.id !== id)
    })
  }, [])

  const handleMoveUp = useCallback((index: number) => {
    if (index === 0) return
    setImages((prev) => {
      const next = [...prev]
      const temp = next[index - 1]
      next[index - 1] = next[index]
      next[index] = temp
      return next
    })
  }, [])

  const handleMoveDown = useCallback((index: number) => {
    setImages((prev) => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      const temp = next[index + 1]
      next[index + 1] = next[index]
      next[index] = temp
      return next
    })
  }, [])

  const handlePrint = useCallback(() => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const imagesHtml = images
      .map(
        (img) =>
          `<div style="page-break-after: always; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; box-sizing: border-box;">
            <img src="${img.url}" style="max-width: 100%; max-height: 100vh; object-fit: contain;" />
          </div>`
      )
      .join('')

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Images to PDF</title>
          <style>
            * { margin: 0; padding: 0; }
            body { background: white; }
            @media print {
              div { page-break-after: always; }
              div:last-child { page-break-after: auto; }
            }
          </style>
        </head>
        <body>${imagesHtml}</body>
      </html>
    `)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.print()
    }, 500)
  }, [images])

  const btnSmallStyle: React.CSSProperties = {
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontSize: '0.75rem',
    lineHeight: 1,
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={() => fileRef.current?.click()}>
          {images.length === 0 ? l.uploadImages : l.addImages}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="hidden"
        />
        {images.length > 0 && (
          <>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleRemoveAll}>
              {l.removeAll}
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handlePrint}>
              {l.printAsPdf}
            </button>
          </>
        )}
      </div>

      {images.length === 0 ? (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--color-text-secondary)',
          fontSize: '0.875rem',
          border: '2px dashed var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}>
          {l.noImages}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {images.map((img, index) => (
            <div
              key={img.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <img
                src={img.url}
                alt={img.file.name}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--color-border)',
                  flexShrink: 0,
                }}
              />
              <span style={{
                flex: 1,
                fontSize: '0.875rem',
                color: 'var(--color-text)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {img.file.name}
              </span>
              <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                <button
                  style={btnSmallStyle}
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  style={btnSmallStyle}
                  onClick={() => handleMoveDown(index)}
                  disabled={index === images.length - 1}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  style={{
                    ...btnSmallStyle,
                    color: 'var(--color-error, #ef4444)',
                  }}
                  onClick={() => handleRemove(img.id)}
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={printRef} className="hidden" />
    </div>
  )
}
