'use client'
import { useState, useCallback, useRef } from 'react'
import { Upload, Download } from 'lucide-react'
import CopyButton from '@/components/shared/CopyButton'

interface ChineseConverterProps {
  labels?: {
    toTraditional: string
    toSimplified: string
    copy: string
    copied: string
    clear: string
    swap: string
    uploadFile: string
    downloadFile: string
    inputPlaceholder: string
    outputPlaceholder: string
    charCount: string
  }
}

// Simplified → Traditional mapping (common characters)
const S2T: Record<string, string> = {
  '国': '國', '会': '會', '发': '發', '学': '學', '经': '經', '说': '說', '开': '開',
  '问': '問', '关': '關', '时': '時', '电': '電', '动': '動', '长': '長', '书': '書',
  '机': '機', '东': '東', '车': '車', '见': '見', '观': '觀', '进': '進', '种': '種',
  '面': '面', '门': '門', '头': '頭', '实': '實', '风': '風', '产': '產', '业': '業',
  '体': '體', '员': '員', '报': '報', '华': '華', '边': '邊', '万': '萬', '决': '決',
  '条': '條', '设': '設', '变': '變', '级': '級', '结': '結', '点': '點', '样': '樣',
  '压': '壓', '传': '傳', '爱': '愛', '让': '讓', '认': '認', '义': '義', '难': '難',
  '带': '帶', '达': '達', '区': '區', '单': '單', '历': '歷', '办': '辦', '运': '運',
  '则': '則', '团': '團', '组': '組', '处': '處', '马': '馬', '场': '場', '节': '節',
  '师': '師', '乐': '樂', '张': '張', '议': '議', '连': '連', '无': '無', '将': '將',
  '军': '軍', '计': '計', '选': '選', '划': '劃', '写': '寫', '记': '記', '构': '構',
  '飞': '飛', '鱼': '魚', '鸟': '鳥', '龙': '龍', '龟': '龜', '丰': '豐', '习': '習',
  '乡': '鄉', '买': '買', '亲': '親', '仅': '僅', '众': '眾', '优': '優', '伤': '傷',
  '们': '們', '价': '價', '份': '份', '创': '創', '别': '別', '刘': '劉',
  '剧': '劇', '务': '務', '势': '勢', '医': '醫', '卫': '衛', '厅': '廳', '双': '雙',
  '县': '縣', '号': '號', '听': '聽', '响': '響', '够': '夠', '夺': '奪', '奖': '獎',
  '妇': '婦', '孙': '孫', '对': '對', '导': '導', '层': '層', '岁': '歲', '岛': '島',
  '币': '幣', '广': '廣', '应': '應', '总': '總', '扩': '擴', '担': '擔',
  '拥': '擁', '据': '據', '损': '損', '换': '換', '护': '護', '执': '執', '择': '擇',
  '拨': '撥', '显': '顯', '标': '標', '权': '權', '欢': '歡', '归': '歸', '残': '殘',
  '气': '氣', '汉': '漢', '济': '濟', '浏': '瀏', '测': '測', '满': '滿', '热': '熱',
  '灯': '燈', '灵': '靈', '献': '獻', '环': '環', '现': '現', '画': '畫', '确': '確',
  '离': '離', '积': '積', '称': '稱', '移': '移', '究': '究', '简': '簡', '类': '類',
  '细': '細', '终': '終', '线': '線', '绝': '絕', '统': '統', '续': '續', '维': '維',
  '网': '網', '罗': '羅', '联': '聯', '职': '職', '药': '藥', '补': '補', '规': '規',
  '视': '視', '览': '覽', '订': '訂', '论': '論', '证': '證', '评': '評', '识': '識',
  '详': '詳', '语': '語', '误': '誤', '读': '讀', '调': '調', '谈': '談', '谢': '謝',
  '质': '質', '贝': '貝', '费': '費', '资': '資', '赵': '趙', '输': '輸', '辑': '輯',
  '过': '過', '还': '還', '这': '這', '远': '遠', '适': '適', '递': '遞',
  '钟': '鐘', '铁': '鐵', '银': '銀', '销': '銷', '锁': '鎖', '际': '際', '随': '隨',
  '险': '險', '隐': '隱', '集': '集', '须': '須', '顾': '顧', '验': '驗', '鲜': '鮮',
  '黄': '黃', '齐': '齊',
}

// Build reverse mapping
const T2S: Record<string, string> = {}
for (const [s, t] of Object.entries(S2T)) {
  T2S[t] = s
}

function convertText(text: string, map: Record<string, string>): string {
  return text.split('').map((char) => map[char] ?? char).join('')
}

export default function ChineseConverter({ labels }: ChineseConverterProps) {
  const l = {
    toTraditional: labels?.toTraditional ?? 'To Traditional',
    toSimplified: labels?.toSimplified ?? 'To Simplified',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    clear: labels?.clear ?? 'Clear',
    swap: labels?.swap ?? 'Swap',
    uploadFile: labels?.uploadFile ?? 'Upload File',
    downloadFile: labels?.downloadFile ?? 'Download',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter Chinese text here...',
    outputPlaceholder: labels?.outputPlaceholder ?? 'Converted text will appear here...',
    charCount: labels?.charCount ?? 'characters',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [direction, setDirection] = useState<'s2t' | 't2s'>('s2t')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSwap = useCallback(() => {
    setDirection((d) => (d === 's2t' ? 't2s' : 's2t'))
    setInput(output)
    setOutput(input)
  }, [input, output])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setInput(text)
      const result = direction === 's2t' ? convertText(text, S2T) : convertText(text, T2S)
      setOutput(result)
    }
    reader.readAsText(file)
    e.target.value = ''
  }, [direction])

  const handleDownload = useCallback(() => {
    if (!output) return
    const ext = fileName ? fileName.replace(/^(.+)\.[^.]+$/, '$1') + '_converted.txt' : 'converted.txt'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = ext
    a.click()
    URL.revokeObjectURL(url)
  }, [output, fileName])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button
          className={direction === 's2t' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
          onClick={() => setDirection('s2t')}
        >
          {l.toTraditional} (簡→繁)
        </button>
        <button
          className={direction === 't2s' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
          onClick={() => setDirection('t2s')}
        >
          {l.toSimplified} (繁→簡)
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleSwap}>{l.swap} ⇄</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={() => { setInput(''); setOutput(''); setFileName('') }}>{l.clear}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={() => fileInputRef.current?.click()}>
          <Upload size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
          {l.uploadFile}
        </button>
        {output && (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleDownload}>
            <Download size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
            {l.downloadFile}
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.csv,.md,.html,.xml,.json,.srt,.ass,.vtt,.log"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      {fileName && (
        <div className="text-xs text-[var(--color-text-secondary)]">
          {fileName}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.inputPlaceholder}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              const result = direction === 's2t' ? convertText(e.target.value, S2T) : convertText(e.target.value, T2S)
              setOutput(result)
            }}
          />
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            {input.length} {l.charCount}
          </div>
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.outputPlaceholder}
            value={output}
            readOnly
          />
          {output && (
            <div className="absolute top-2 right-2">
              <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
          <div className="text-xs text-[var(--color-text-secondary)] mt-1">
            {output.length} {l.charCount}
          </div>
        </div>
      </div>
    </div>
  )
}
