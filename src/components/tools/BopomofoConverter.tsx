'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface BopomofoConverterProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    convert: string
    clear: string
    result: string
    copy: string
    copied: string
    note: string
  }
}

// Basic Bopomofo (Zhuyin) mapping for common characters
// This is a simplified mapping - a complete version would need thousands of characters
const bopomofoMap: Record<string, string> = {
  // Common characters
  '你': 'ㄋㄧˇ', '好': 'ㄏㄠˇ', '我': 'ㄨㄛˇ', '是': 'ㄕˋ', '的': '˙ㄉㄜ',
  '人': 'ㄖㄣˊ', '有': 'ㄧㄡˇ', '在': 'ㄗㄞˋ', '不': 'ㄅㄨˋ', '了': '˙ㄌㄜ',
  '一': 'ㄧ', '二': 'ㄦˋ', '三': 'ㄙㄢ', '四': 'ㄙˋ', '五': 'ㄨˇ',
  '六': 'ㄌㄧㄡˋ', '七': 'ㄑㄧ', '八': 'ㄅㄚ', '九': 'ㄐㄧㄡˇ', '十': 'ㄕˊ',
  '大': 'ㄉㄚˋ', '小': 'ㄒㄧㄠˇ', '中': 'ㄓㄨㄥ', '國': 'ㄍㄨㄛˊ', '台': 'ㄊㄞˊ',
  '灣': 'ㄨㄢ', '北': 'ㄅㄟˇ', '南': 'ㄋㄢˊ', '東': 'ㄉㄨㄥ', '西': 'ㄒㄧ',
  '上': 'ㄕㄤˋ', '下': 'ㄒㄧㄚˋ', '左': 'ㄗㄨㄛˇ', '右': 'ㄧㄡˋ', '前': 'ㄑㄧㄢˊ',
  '後': 'ㄏㄡˋ', '來': 'ㄌㄞˊ', '去': 'ㄑㄩˋ', '要': 'ㄧㄠˋ', '會': 'ㄏㄨㄟˋ',
  '以': 'ㄧˇ', '可': 'ㄎㄜˇ', '到': 'ㄉㄠˋ', '說': 'ㄕㄨㄛ', '他': 'ㄊㄚ',
  '她': 'ㄊㄚ', '它': 'ㄊㄚ', '們': '˙ㄇㄣ', '這': 'ㄓㄜˋ', '那': 'ㄋㄚˋ',
  '什': 'ㄕㄣˊ', '麼': '˙ㄇㄜ', '時': 'ㄕˊ', '候': 'ㄏㄡˋ', '年': 'ㄋㄧㄢˊ',
  '月': 'ㄩㄝˋ', '日': 'ㄖˋ', '天': 'ㄊㄧㄢ', '地': 'ㄉㄧˋ', '水': 'ㄕㄨㄟˇ',
  '火': 'ㄏㄨㄛˇ', '山': 'ㄕㄢ', '海': 'ㄏㄞˇ', '風': 'ㄈㄥ', '雨': 'ㄩˇ',
  '雪': 'ㄒㄩㄝˇ', '雲': 'ㄩㄣˊ', '電': 'ㄉㄧㄢˋ', '光': 'ㄍㄨㄤ', '星': 'ㄒㄧㄥ',
  '愛': 'ㄞˋ', '和': 'ㄏㄜˊ', '平': 'ㄆㄧㄥˊ', '家': 'ㄐㄧㄚ', '學': 'ㄒㄩㄝˊ',
  '校': 'ㄒㄧㄠˋ', '老': 'ㄌㄠˇ', '師': 'ㄕ', '生': 'ㄕㄥ',
  '吃': 'ㄔ', '飯': 'ㄈㄢˋ', '喝': 'ㄏㄜ', '茶': 'ㄔㄚˊ', '睡': 'ㄕㄨㄟˋ',
  '覺': 'ㄐㄧㄠˋ', '看': 'ㄎㄢˋ', '書': 'ㄕㄨ', '寫': 'ㄒㄧㄝˇ', '字': 'ㄗˋ',
  '聽': 'ㄊㄧㄥ', '音': 'ㄧㄣ', '樂': 'ㄩㄝˋ', '唱': 'ㄔㄤˋ', '歌': 'ㄍㄜ',
  '開': 'ㄎㄞ', '門': 'ㄇㄣˊ', '關': 'ㄍㄨㄢ', '窗': 'ㄔㄨㄤ', '坐': 'ㄗㄨㄛˋ',
  '站': 'ㄓㄢˋ', '走': 'ㄗㄡˇ', '跑': 'ㄆㄠˇ', '跳': 'ㄊㄧㄠˋ', '飛': 'ㄈㄟ',
  '長': 'ㄔㄤˊ', '短': 'ㄉㄨㄢˇ', '高': 'ㄍㄠ', '低': 'ㄉㄧ', '快': 'ㄎㄨㄞˋ',
  '慢': 'ㄇㄢˋ', '多': 'ㄉㄨㄛ', '少': 'ㄕㄠˇ', '新': 'ㄒㄧㄣ', '舊': 'ㄐㄧㄡˋ',
  '好': 'ㄏㄠˇ', '壞': 'ㄏㄨㄞˋ', '美': 'ㄇㄟˇ', '醜': 'ㄔㄡˇ', '冷': 'ㄌㄥˇ',
  '熱': 'ㄖㄜˋ', '黑': 'ㄏㄟ', '白': 'ㄅㄞˊ', '紅': 'ㄏㄨㄥˊ', '黃': 'ㄏㄨㄤˊ',
  '綠': 'ㄌㄩˋ', '藍': 'ㄌㄢˊ', '紫': 'ㄗˇ', '金': 'ㄐㄧㄣ', '銀': 'ㄧㄣˊ',
  '謝': 'ㄒㄧㄝˋ', '請': 'ㄑㄧㄥˇ', '對': 'ㄉㄨㄟˋ', '起': 'ㄑㄧˇ', '再': 'ㄗㄞˋ',
  '見': 'ㄐㄧㄢˋ', '明': 'ㄇㄧㄥˊ', '晚': 'ㄨㄢˇ', '安': 'ㄢ', '早': 'ㄗㄠˇ',
}

export default function BopomofoConverter({ labels }: BopomofoConverterProps) {
  const l = {
    title: labels?.title ?? 'Bopomofo Converter',
    input: labels?.input ?? 'Chinese Text',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter Chinese characters...',
    convert: labels?.convert ?? 'Convert',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    note: labels?.note ?? 'Note: This converter supports common Chinese characters.',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleConvert = useCallback(() => {
    if (!input.trim()) return

    const result = input.split('').map(char => {
      // If character is in our map, return bopomofo
      if (bopomofoMap[char]) {
        return bopomofoMap[char]
      }
      // If it's punctuation or space, keep it
      if (/[\s,\.!?;:，。！？；：、]/.test(char)) {
        return char
      }
      // Otherwise return the original character with a marker
      return `[${char}]`
    }).join(' ')

    setOutput(result)
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          {l.input}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={l.inputPlaceholder}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className="btn-primary"
          onClick={handleConvert}
          disabled={!input.trim()}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {l.convert}
        </button>
        <button
          className="btn-secondary"
          onClick={handleClear}
          disabled={!input && !output}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {l.clear}
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 500, fontSize: '0.875rem' }}>
              {l.result}
            </label>
            <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div style={{
            padding: '1.25rem',
            borderRadius: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            fontSize: '1.5rem',
            lineHeight: 2,
            wordBreak: 'break-all',
          }}>
            {output}
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.813rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--color-text)' }}>About Bopomofo:</strong> Bopomofo (注音符號), also called Zhuyin,
        is a phonetic system for transcribing Mandarin Chinese. It's primarily used in Taiwan for teaching pronunciation.
        <div style={{ marginTop: '0.5rem' }}>
          <strong style={{ color: 'var(--color-text)' }}>{l.note}</strong> Characters in [brackets] are not in the current dictionary.
        </div>
      </div>
    </div>
  )
}
