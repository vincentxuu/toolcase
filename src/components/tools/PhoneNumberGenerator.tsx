'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Copy, Check, RefreshCw } from 'lucide-react'

interface PhoneNumberGeneratorProps {
  labels?: {
    title: string
    description: string
    carrier: string
    allCarriers: string
    chunghwa: string
    taiwanMobile: string
    farEasTone: string
    taiwanStar: string
    aptg: string
    count: string
    generate: string
    results: string
    copy: string
    copied: string
    copyAll: string
    format: string
    withDashes: string
    withoutDashes: string
  }
}

export default function PhoneNumberGenerator({ labels }: PhoneNumberGeneratorProps) {
  const l = {
    title: labels?.title ?? 'Taiwan Mobile Phone Number Generator',
    description: labels?.description ?? 'Generate valid Taiwan mobile phone numbers',
    carrier: labels?.carrier ?? 'Carrier',
    allCarriers: labels?.allCarriers ?? 'All Carriers',
    chunghwa: labels?.chunghwa ?? 'Chunghwa Telecom',
    taiwanMobile: labels?.taiwanMobile ?? 'Taiwan Mobile',
    farEasTone: labels?.farEasTone ?? 'FarEasTone',
    taiwanStar: labels?.taiwanStar ?? 'Taiwan Star',
    aptg: labels?.aptg ?? 'APTG',
    count: labels?.count ?? 'Count',
    generate: labels?.generate ?? 'Generate',
    results: labels?.results ?? 'Generated Numbers',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    copyAll: labels?.copyAll ?? 'Copy All',
    format: labels?.format ?? 'Format',
    withDashes: labels?.withDashes ?? 'With Dashes',
    withoutDashes: labels?.withoutDashes ?? 'Without Dashes',
  }

  // 台灣電信商號段
  const carrierPrefixes = {
    all: ['09'],
    chunghwa: ['0910', '0911', '0912', '0919', '0921', '0928', '0932', '0933', '0934', '0963', '0972', '0975'],
    taiwanMobile: ['0920', '0930', '0931', '0937', '0938', '0952', '0953', '0960', '0961', '0970', '0976', '0989'],
    farEasTone: ['0922', '0923', '0939', '0955', '0966', '0973', '0988'],
    taiwanStar: ['0981', '0982', '0983', '0984', '0985', '0986'],
    aptg: ['0905', '0906', '0907', '0908'],
  }

  const [carrier, setCarrier] = useState<keyof typeof carrierPrefixes>('all')
  const [count, setCount] = useState(10)
  const [useDashes, setUseDashes] = useState(true)
  const [numbers, setNumbers] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const generateNumber = (prefix: string): string => {
    // 如果是完整前綴(如 0910),補足後6碼
    if (prefix.length === 4) {
      const suffix = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0')
      const fullNumber = prefix + suffix
      return useDashes ? `${fullNumber.slice(0, 4)}-${fullNumber.slice(4, 7)}-${fullNumber.slice(7)}` : fullNumber
    }
    // 如果是簡短前綴(如 09),補足後8碼
    else {
      const suffix = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, '0')
      const fullNumber = prefix + suffix
      return useDashes ? `${fullNumber.slice(0, 4)}-${fullNumber.slice(4, 7)}-${fullNumber.slice(7)}` : fullNumber
    }
  }

  const handleGenerate = () => {
    const prefixes = carrierPrefixes[carrier]
    const generated: string[] = []

    for (let i = 0; i < count; i++) {
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]
      generated.push(generateNumber(randomPrefix))
    }

    setNumbers(generated)
    setCopiedIndex(null)
    setCopiedAll(false)
  }

  const copyNumber = async (number: string, index: number) => {
    await navigator.clipboard.writeText(number)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const copyAllNumbers = async () => {
    await navigator.clipboard.writeText(numbers.join('\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 控制面板 */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* 電信商選擇 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{l.carrier}</label>
            <select
              value={carrier}
              onChange={e => setCarrier(e.target.value as keyof typeof carrierPrefixes)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">{l.allCarriers}</option>
              <option value="chunghwa">{l.chunghwa} (中華電信)</option>
              <option value="taiwanMobile">{l.taiwanMobile} (台灣大哥大)</option>
              <option value="farEasTone">{l.farEasTone} (遠傳電信)</option>
              <option value="taiwanStar">{l.taiwanStar} (台灣之星)</option>
              <option value="aptg">{l.aptg} (亞太電信)</option>
            </select>
          </div>

          {/* 數量 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{l.count}</label>
            <Input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>
        </div>

        {/* 格式選擇 */}
        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium">{l.format}</label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                checked={useDashes}
                onChange={() => setUseDashes(true)}
                className="h-4 w-4"
              />
              <span className="text-sm">{l.withDashes} (0912-345-678)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                checked={!useDashes}
                onChange={() => setUseDashes(false)}
                className="h-4 w-4"
              />
              <span className="text-sm">{l.withoutDashes} (0912345678)</span>
            </label>
          </div>
        </div>

        {/* 產生按鈕 */}
        <Button onClick={handleGenerate} className="mt-4 w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          {l.generate}
        </Button>
      </Card>

      {/* 結果顯示 */}
      {numbers.length > 0 && (
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {l.results} ({numbers.length})
            </h3>
            <Button onClick={copyAllNumbers} variant="outline" size="sm" className="gap-2">
              {copiedAll ? (
                <>
                  <Check className="h-4 w-4" />
                  {l.copied}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  {l.copyAll}
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {numbers.map((number, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-3"
              >
                <span className="font-mono text-sm">{number}</span>
                <Button
                  onClick={() => copyNumber(number, index)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {copiedIndex === index ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 說明 */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 產生的號碼僅供測試使用,並非真實可用號碼</li>
          <li>• 號段資訊基於台灣電信商公開資料</li>
          <li>• 每次產生的號碼都是隨機的</li>
          <li>• 適用於測試表單驗證、資料庫測試等場景</li>
        </ul>
      </Card>
    </div>
  )
}
