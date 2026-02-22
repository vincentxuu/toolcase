'use client'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Maximize, Ruler, RotateCw } from 'lucide-react'

interface OnlineRulerProps {
  labels?: {
    unit: string
    cm: string
    inch: string
    fullscreen: string
    rotate: string
    calibrate: string
    calibrateDesc: string
    measureTip: string
    actualSize: string
    dpi: string
  }
}

export default function OnlineRuler({ labels }: OnlineRulerProps) {
  const l = {
    unit: labels?.unit ?? 'Unit',
    cm: labels?.cm ?? 'Centimeter',
    inch: labels?.inch ?? 'Inch',
    fullscreen: labels?.fullscreen ?? 'Fullscreen',
    rotate: labels?.rotate ?? 'Rotate',
    calibrate: labels?.calibrate ?? 'Calibrate',
    calibrateDesc: labels?.calibrateDesc ?? 'Adjust DPI to match your screen',
    measureTip: labels?.measureTip ?? 'Use a real ruler or credit card to verify the scale',
    actualSize: labels?.actualSize ?? 'Actual Size',
    dpi: labels?.dpi ?? 'DPI',
  }

  const [unit, setUnit] = useState<'cm' | 'inch'>('cm')
  const [isVertical, setIsVertical] = useState(false)
  const [dpi, setDpi] = useState(96) // Default DPI
  const rulerRef = useRef<HTMLDivElement>(null)

  // Auto-detect DPI on mount
  useEffect(() => {
    const detectDPI = () => {
      const div = document.createElement('div')
      div.style.width = '1in'
      div.style.visibility = 'hidden'
      document.body.appendChild(div)
      const measuredDPI = div.offsetWidth
      document.body.removeChild(div)
      return measuredDPI
    }

    setDpi(detectDPI())
  }, [])

  const toggleFullscreen = async () => {
    if (!rulerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await rulerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (err) {
      console.log('Fullscreen not supported or denied')
    }
  }

  const toggleRotate = () => {
    setIsVertical(!isVertical)
  }

  // Calculate pixels per unit
  const pixelsPerCm = dpi / 2.54
  const pixelsPerInch = dpi

  // Ruler length in units
  const maxLength = unit === 'cm' ? 30 : 12
  const smallDivision = unit === 'cm' ? 0.1 : 0.0625 // 1mm for cm, 1/16 inch for inch
  const mediumDivision = unit === 'cm' ? 0.5 : 0.25 // 5mm for cm, 1/4 inch for inch
  const largeDivision = unit === 'cm' ? 1 : 1 // 1cm for cm, 1 inch for inch

  // Generate ruler marks
  const marks = []
  for (let i = 0; i <= maxLength / smallDivision; i++) {
    const position = i * smallDivision
    let height = 8 // Small mark
    let showLabel = false

    if (position % largeDivision === 0) {
      height = 32 // Large mark (cm/inch)
      showLabel = true
    } else if (position % mediumDivision === 0) {
      height = 20 // Medium mark (5mm/0.25inch)
    }

    marks.push({
      position,
      height,
      label: showLabel ? Math.round(position / largeDivision) : null,
    })
  }

  const pixelsPerUnit = unit === 'cm' ? pixelsPerCm : pixelsPerInch
  const rulerLengthPx = maxLength * pixelsPerUnit

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Controls */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Unit Selection */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">{l.unit}:</label>
            <div className="flex rounded-md border">
              <button
                onClick={() => setUnit('cm')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  unit === 'cm'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                {l.cm}
              </button>
              <button
                onClick={() => setUnit('inch')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  unit === 'inch'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                {l.inch}
              </button>
            </div>
          </div>

          {/* DPI Calibration */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">{l.dpi}:</label>
            <input
              type="number"
              value={dpi}
              onChange={e => setDpi(Math.max(50, Math.min(300, parseInt(e.target.value) || 96)))}
              className="w-20 rounded-md border px-3 py-2 text-sm"
              min="50"
              max="300"
            />
          </div>

          {/* Actions */}
          <div className="ml-auto flex gap-2">
            <Button onClick={toggleRotate} variant="outline" size="sm" className="gap-2">
              <RotateCw className="h-4 w-4" />
              {l.rotate}
            </Button>
            <Button onClick={toggleFullscreen} variant="outline" size="sm" className="gap-2">
              <Maximize className="h-4 w-4" />
              {l.fullscreen}
            </Button>
          </div>
        </div>
      </Card>

      {/* Ruler Display */}
      <div ref={rulerRef} className="overflow-auto bg-background">
        <Card
          className={`inline-block bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 ${
            isVertical ? 'p-4' : 'p-6'
          }`}
        >
          <div
            className={`relative bg-amber-100 dark:bg-amber-900 ${
              isVertical ? 'flex flex-col' : ''
            }`}
            style={{
              [isVertical ? 'height' : 'width']: `${rulerLengthPx}px`,
              [isVertical ? 'width' : 'height']: '80px',
            }}
          >
            {/* Ruler marks */}
            {marks.map((mark, index) => {
              const positionPx = mark.position * pixelsPerUnit

              return (
                <div
                  key={index}
                  className="absolute flex items-start"
                  style={
                    isVertical
                      ? {
                          top: `${positionPx}px`,
                          left: 0,
                          right: 0,
                        }
                      : {
                          left: `${positionPx}px`,
                          top: 0,
                          bottom: 0,
                        }
                  }
                >
                  {/* Mark line */}
                  <div
                    className="bg-gray-700 dark:bg-gray-300"
                    style={
                      isVertical
                        ? {
                            width: `${mark.height}px`,
                            height: '1px',
                          }
                        : {
                            width: '1px',
                            height: `${mark.height}px`,
                          }
                    }
                  />

                  {/* Label */}
                  {mark.label !== null && (
                    <span
                      className="text-xs font-medium text-gray-700 dark:text-gray-300"
                      style={
                        isVertical
                          ? {
                              position: 'absolute',
                              left: `${mark.height + 4}px`,
                              top: '-6px',
                            }
                          : {
                              position: 'absolute',
                              left: '-6px',
                              top: `${mark.height + 2}px`,
                              writingMode: 'horizontal-tb',
                            }
                      }
                    >
                      {mark.label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>{l.calibrate}:</strong> {l.calibrateDesc}</li>
          <li>• <strong>{l.measureTip}:</strong> 用實體尺或標準物品(如信用卡 8.5cm)校準</li>
          <li>• 信用卡標準尺寸: 8.56cm × 5.398cm (3.375" × 2.125")</li>
          <li>• 不同螢幕的 DPI 可能不同,建議在使用前先校準</li>
          <li>• 全螢幕模式下測量更準確</li>
        </ul>
      </Card>
    </div>
  )
}
