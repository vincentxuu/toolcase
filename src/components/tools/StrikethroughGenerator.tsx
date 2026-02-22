'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check } from 'lucide-react'

interface StrikethroughGeneratorProps {
  labels?: {
    inputText: string
    inputPlaceholder: string
    results: string
    copy: string
    copied: string
    type1: string
    type2: string
    type3: string
    type4: string
    type5: string
  }
}

export default function StrikethroughGenerator({ labels }: StrikethroughGeneratorProps) {
  const l = {
    inputText: labels?.inputText ?? 'Input Text',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter your text here...',
    results: labels?.results ?? 'Results',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    type1: labels?.type1 ?? 'Single Line',
    type2: labels?.type2 ?? 'Double Line',
    type3: labels?.type3 ?? 'Slash',
    type4: labels?.type4 ?? 'Tilde',
    type5: labels?.type5 ?? 'X Mark',
  }

  const [text, setText] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Unicode 組合字元
  const COMBINING_LONG_STROKE_OVERLAY = '\u0336' // ̶ 單線刪除線
  const COMBINING_SHORT_STROKE_OVERLAY = '\u0335' // ̵ 短線
  const COMBINING_LONG_SOLIDUS_OVERLAY = '\u0338' // ̸ 斜線
  const COMBINING_TILDE_OVERLAY = '\u0303' // ̃ 波浪線
  const COMBINING_X_ABOVE = '\u033D' // ̽ X 標記

  const applyStrikethrough = (input: string, combiningChar: string): string => {
    return input
      .split('')
      .map(char => {
        // 跳過空白字元和換行
        if (char === ' ' || char === '\n' || char === '\t') return char
        return char + combiningChar
      })
      .join('')
  }

  const variants = [
    {
      name: l.type1,
      text: applyStrikethrough(text, COMBINING_LONG_STROKE_OVERLAY),
      example: applyStrikethrough('Example', COMBINING_LONG_STROKE_OVERLAY),
    },
    {
      name: l.type2,
      text: applyStrikethrough(text, COMBINING_LONG_STROKE_OVERLAY + COMBINING_SHORT_STROKE_OVERLAY),
      example: applyStrikethrough('Example', COMBINING_LONG_STROKE_OVERLAY + COMBINING_SHORT_STROKE_OVERLAY),
    },
    {
      name: l.type3,
      text: applyStrikethrough(text, COMBINING_LONG_SOLIDUS_OVERLAY),
      example: applyStrikethrough('Example', COMBINING_LONG_SOLIDUS_OVERLAY),
    },
    {
      name: l.type4,
      text: applyStrikethrough(text, COMBINING_TILDE_OVERLAY),
      example: applyStrikethrough('Example', COMBINING_TILDE_OVERLAY),
    },
    {
      name: l.type5,
      text: applyStrikethrough(text, COMBINING_X_ABOVE),
      example: applyStrikethrough('Example', COMBINING_X_ABOVE),
    },
  ]

  const copyText = async (textToCopy: string, index: number) => {
    await navigator.clipboard.writeText(textToCopy)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 輸入區 */}
      <Card className="p-6">
        <label className="mb-2 block text-sm font-medium">{l.inputText}</label>
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={l.inputPlaceholder}
          className="min-h-[120px] text-lg"
        />
      </Card>

      {/* 結果區 */}
      {text && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{l.results}</h3>

          {variants.map((variant, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">{variant.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      範例: {variant.example}
                    </p>
                  </div>
                  <Button
                    onClick={() => copyText(variant.text, index)}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4" />
                        {l.copied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        {l.copy}
                      </>
                    )}
                  </Button>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <p className="break-words text-lg leading-relaxed" style={{ wordBreak: 'break-word' }}>
                    {variant.text}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 說明 */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用提示</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 這些刪除線文字使用 Unicode 組合字元產生</li>
          <li>• 可直接複製到社群媒體(Facebook、Instagram、Twitter)使用</li>
          <li>• 不同平台顯示效果可能略有差異</li>
          <li>• 支援中文、英文和其他 Unicode 字元</li>
        </ul>
      </Card>
    </div>
  )
}
