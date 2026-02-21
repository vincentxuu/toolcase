'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface ChineseConverterProps {
  labels?: {
    toTraditional: string
    toSimplified: string
    copy: string
    copied: string
    clear: string
    swap: string
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
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter Chinese text here...',
    outputPlaceholder: labels?.outputPlaceholder ?? 'Converted text will appear here...',
    charCount: labels?.charCount ?? 'characters',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [direction, setDirection] = useState<'s2t' | 't2s'>('s2t')

  const handleConvert = useCallback(() => {
    if (!input.trim()) return
    const result = direction === 's2t' ? convertText(input, S2T) : convertText(input, T2S)
    setOutput(result)
  }, [input, direction])

  const handleSwap = useCallback(() => {
    setDirection((d) => (d === 's2t' ? 't2s' : 's2t'))
    setInput(output)
    setOutput(input)
  }, [input, output])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          className={direction === 's2t' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setDirection('s2t')}
        >
          {l.toTraditional} (簡→繁)
        </button>
        <button
          className={direction === 't2s' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setDirection('t2s')}
        >
          {l.toSimplified} (繁→簡)
        </button>
        <button className="btn-secondary" onClick={handleSwap}>{l.swap} ⇄</button>
        <button className="btn-secondary" onClick={() => { setInput(''); setOutput('') }}>{l.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.inputPlaceholder}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              const result = direction === 's2t' ? convertText(e.target.value, S2T) : convertText(e.target.value, T2S)
              setOutput(result)
            }}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            {input.length} {l.charCount}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.outputPlaceholder}
            value={output}
            readOnly
          />
          {output && (
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
            {output.length} {l.charCount}
          </div>
        </div>
      </div>
    </div>
  )
}
