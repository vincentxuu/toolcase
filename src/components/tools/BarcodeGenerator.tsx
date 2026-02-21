'use client'
import { useState, useRef, useCallback } from 'react'

interface BarcodeGeneratorProps {
  labels?: {
    inputText: string
    barWidth: string
    barcodeHeight: string
    canvasWidth: string
    generate: string
    download: string
    preview: string
    placeholder: string
  }
}

// Code 128B encoding patterns (bars: 1=black, 0=white)
const CODE128B_START = '11010010000'
const CODE128B_STOP = '1100011101011'
const CODE128B_PATTERNS: string[] = [
  '11011001100','11001101100','11001100110','10010011000','10010001100',
  '10001001100','10011001000','10011000100','10001100100','11001001000',
  '11001000100','11000100100','10110011100','10011011100','10011001110',
  '10111001100','10011101100','10011100110','11001110010','11001011100',
  '11001001110','11011100100','11001110100','11101101110','11101001100',
  '11100101100','11100100110','11101100100','11100110100','11100110010',
  '11011011000','11011000110','11000110110','10100011000','10001011000',
  '10001000110','10110001000','10001101000','10001100010','11010001000',
  '11000101000','11000100010','10110111000','10110001110','10001101110',
  '10111011000','10111000110','10001110110','11101110110','11010001110',
  '11000101110','11011101000','11011100010','11011101110','11101011000',
  '11101000110','11100010110','11101101000','11101100010','11100011010',
  '11101111010','11001000010','11110001010','10100110000','10100001100',
  '10010110000','10010000110','10000101100','10000100110','10110010000',
  '10110000100','10011010000','10011000010','10000110100','10000110010',
  '11000010010','11001010000','11110111010','11000010100','10001111010',
  '10100111100','10010111100','10010011110','10111100100','10011110100',
  '10011110010','11110100100','11110010100','11110010010','11011011110',
  '11011110110','11110110110','10101111000','10100011110','10001011110',
  '10111101000','10111100010','11110101000','11110100010','10111011110',
  '10111101110','11101011110','11110101110','11010000100','11010010000',
  '11010011100','1100011101011',
]

function encodeCode128B(text: string): string {
  let encoded = CODE128B_START
  let checksum = 104 // Start B value

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) - 32
    if (charCode < 0 || charCode > 94) continue
    encoded += CODE128B_PATTERNS[charCode]
    checksum += charCode * (i + 1)
  }

  const checksumChar = checksum % 103
  encoded += CODE128B_PATTERNS[checksumChar]
  encoded += CODE128B_STOP

  return encoded
}

export default function BarcodeGenerator({ labels }: BarcodeGeneratorProps) {
  const l = {
    inputText: labels?.inputText ?? 'Text / Number',
    barWidth: labels?.barWidth ?? 'Bar Width',
    barcodeHeight: labels?.barcodeHeight ?? 'Height',
    canvasWidth: labels?.canvasWidth ?? 'Canvas Width',
    generate: labels?.generate ?? 'Generate',
    download: labels?.download ?? 'Download PNG',
    preview: labels?.preview ?? 'Preview',
    placeholder: labels?.placeholder ?? 'Enter text or number...',
  }

  const [text, setText] = useState('')
  const [barWidth, setBarWidth] = useState(2)
  const [barcodeHeight, setBarcodeHeight] = useState(100)
  const [barcodeUrl, setBarcodeUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleGenerate = useCallback(() => {
    if (!text.trim()) return

    const encoded = encodeCode128B(text.trim())
    const canvas = canvasRef.current
    if (!canvas) return

    const totalWidth = encoded.length * barWidth + 20
    canvas.width = totalWidth
    canvas.height = barcodeHeight + 30

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const startX = 10
    for (let i = 0; i < encoded.length; i++) {
      ctx.fillStyle = encoded[i] === '1' ? '#000000' : '#ffffff'
      ctx.fillRect(startX + i * barWidth, 5, barWidth, barcodeHeight)
    }

    ctx.fillStyle = '#000000'
    ctx.font = '12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText(text.trim(), canvas.width / 2, barcodeHeight + 22)

    setBarcodeUrl(canvas.toDataURL('image/png'))
  }, [text, barWidth, barcodeHeight])

  const handleDownload = useCallback(() => {
    if (!barcodeUrl) return
    const a = document.createElement('a')
    a.href = barcodeUrl
    a.download = 'barcode.png'
    a.click()
  }, [barcodeUrl])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={labelStyle}>{l.inputText}</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={l.placeholder}
          style={{ ...inputStyle, width: '100%', maxWidth: '400px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.barWidth}:</label>
          <input
            type="number"
            value={barWidth}
            onChange={(e) => setBarWidth(Math.max(1, Number(e.target.value)))}
            min={1}
            max={5}
            style={{ ...inputStyle, width: '70px' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>px</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.barcodeHeight}:</label>
          <input
            type="number"
            value={barcodeHeight}
            onChange={(e) => setBarcodeHeight(Math.max(30, Number(e.target.value)))}
            min={30}
            max={300}
            style={{ ...inputStyle, width: '70px' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>px</span>
        </div>

        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={!text.trim()}
        >
          {l.generate}
        </button>
      </div>

      {barcodeUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
              {l.preview}
            </span>
            <button className="btn-primary" onClick={handleDownload}>
              {l.download}
            </button>
          </div>
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '1rem',
            backgroundColor: '#ffffff',
            textAlign: 'center',
          }}>
            <img
              src={barcodeUrl}
              alt="Generated barcode"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
