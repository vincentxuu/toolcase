'use client'
import { useState, useCallback, useRef } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface Base64ImageConverterProps {
  labels?: {
    title: string
    uploadImage: string
    pasteBase64: string
    base64Output: string
    imagePreview: string
    convert: string
    clear: string
    copy: string
    copied: string
    imageInfo: string
    fileName: string
    fileSize: string
    dimensions: string
    invalidImage: string
    invalidBase64: string
    noImage: string
    selectImage: string
  }
}

export default function Base64ImageConverter({ labels }: Base64ImageConverterProps) {
  const l = {
    title: labels?.title ?? 'Base64 Image Converter',
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    pasteBase64: labels?.pasteBase64 ?? 'Paste Base64 to decode',
    base64Output: labels?.base64Output ?? 'Base64 Output',
    imagePreview: labels?.imagePreview ?? 'Image Preview',
    convert: labels?.convert ?? 'Convert to Image',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    imageInfo: labels?.imageInfo ?? 'Image Information',
    fileName: labels?.fileName ?? 'File Name',
    fileSize: labels?.fileSize ?? 'File Size',
    dimensions: labels?.dimensions ?? 'Dimensions',
    invalidImage: labels?.invalidImage ?? 'Invalid image file',
    invalidBase64: labels?.invalidBase64 ?? 'Invalid Base64 image data',
    noImage: labels?.noImage ?? 'No image loaded',
    selectImage: labels?.selectImage ?? 'Select an image file to convert to Base64',
  }

  const [base64Data, setBase64Data] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageInfo, setImageInfo] = useState<{
    name: string
    size: string
    width: number
    height: number
  } | null>(null)
  const [base64Input, setBase64Input] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError(l.invalidImage)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setBase64Data(result)
      setImageUrl(result)
      setError('')

      // Get image dimensions
      const img = new Image()
      img.onload = () => {
        setImageInfo({
          name: file.name,
          size: formatFileSize(file.size),
          width: img.width,
          height: img.height,
        })
      }
      img.src = result
    }
    reader.onerror = () => {
      setError(l.invalidImage)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [l.invalidImage])

  const handleBase64Convert = useCallback(() => {
    if (!base64Input.trim()) return

    try {
      let base64 = base64Input.trim()

      // If it doesn't start with data:image, add a default prefix
      if (!base64.startsWith('data:')) {
        base64 = `data:image/png;base64,${base64}`
      }

      // Validate by trying to load it as an image
      const img = new Image()
      img.onload = () => {
        setImageUrl(base64)
        setBase64Data(base64)
        setImageInfo({
          name: 'Converted from Base64',
          size: formatFileSize(base64.length),
          width: img.width,
          height: img.height,
        })
        setError('')
      }
      img.onerror = () => {
        setError(l.invalidBase64)
      }
      img.src = base64
    } catch {
      setError(l.invalidBase64)
    }
  }, [base64Input, l.invalidBase64])

  const handleClear = useCallback(() => {
    setBase64Data('')
    setImageUrl('')
    setImageInfo(null)
    setBase64Input('')
    setError('')
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Upload Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.uploadImage}
        </h3>
        <div className="flex gap-2 flex-wrap">
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
            onClick={() => fileRef.current?.click()}
          >
            {l.selectImage}
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>
            {l.clear}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Base64 to Image Section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.pasteBase64}
        </h3>
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
          style={{ minHeight: '100px', fontFamily: 'monospace', fontSize: '0.875rem' }}
          placeholder="data:image/png;base64,iVBORw0KGgo..."
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
        />
        <div className="mt-2">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleBase64Convert}>
            {l.convert}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Results Section */}
      {imageUrl ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Image Preview */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              {l.imagePreview}
            </h3>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
              }}
            >
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  borderRadius: '0.25rem',
                }}
              />
            </div>

            {/* Image Info */}
            {imageInfo && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {l.imageInfo}
                </h4>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  <div><strong>{l.fileName}:</strong> {imageInfo.name}</div>
                  <div><strong>{l.fileSize}:</strong> {imageInfo.size}</div>
                  <div><strong>{l.dimensions}:</strong> {imageInfo.width} × {imageInfo.height}</div>
                </div>
              </div>
            )}
          </div>

          {/* Base64 Output */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 className="text-lg font-semibold">
                {l.base64Output}
              </h3>
              <CopyButton text={base64Data} label={l.copy} copiedLabel={l.copied} />
            </div>
            <textarea
              className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
              style={{
                minHeight: '300px',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                lineHeight: 1.4,
              }}
              value={base64Data}
              readOnly
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            padding: '3rem 1rem',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            border: '2px dashed var(--color-border)',
            borderRadius: '0.5rem',
          }}
        >
          {l.noImage}
        </div>
      )}
    </div>
  )
}
