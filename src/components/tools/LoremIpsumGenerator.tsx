'use client'
import { useState } from 'react'

const LOREM_SENTENCES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus nunc pellentesque.',
  'Nullam quis risus eget urna mollis ornare vel eu leo.',
  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  'Donec sed odio dui nulla vitae elit libero a pharetra augue.',
  'Maecenas faucibus mollis interdum sed posuere consectetur est at lobortis.',
  'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  'Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  'Aenean eu leo quam pellentesque ornare sem lacinia quam venenatis vestibulum.',
  'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
  'Etiam porta sem malesuada magna mollis euismod.',
  'Cras mattis consectetur purus sit amet fermentum.',
  'Vestibulum id ligula porta felis euismod semper.',
  'Nulla vitae elit libero, a pharetra augue mollis interdum.',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
]

interface Props {
  labels?: {
    paragraphs: string; sentences: string; words: string
    count: string; type: string; startWithLorem: string
    generate: string; copy: string; copied: string
  }
}

export default function LoremIpsumGenerator({ labels }: Props) {
  const l = {
    paragraphs: labels?.paragraphs ?? 'Paragraphs',
    sentences: labels?.sentences ?? 'Sentences',
    words: labels?.words ?? 'Words',
    count: labels?.count ?? 'Count',
    type: labels?.type ?? 'Type',
    startWithLorem: labels?.startWithLorem ?? 'Start with "Lorem ipsum..."',
    generate: labels?.generate ?? 'Generate',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const randSentence = (i: number) => LOREM_SENTENCES[i % LOREM_SENTENCES.length]

  const generate = () => {
    let result = ''
    if (type === 'paragraphs') {
      const paras: string[] = []
      for (let p = 0; p < count; p++) {
        const numSentences = 4 + Math.floor(Math.random() * 4)
        const sentences: string[] = []
        for (let s = 0; s < numSentences; s++) {
          if (p === 0 && s === 0 && startWithLorem) sentences.push(LOREM_SENTENCES[0])
          else sentences.push(randSentence(Math.floor(Math.random() * LOREM_SENTENCES.length)))
        }
        paras.push(sentences.join(' '))
      }
      result = paras.join('\n\n')
    } else if (type === 'sentences') {
      const sentences: string[] = []
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) sentences.push(LOREM_SENTENCES[0])
        else sentences.push(randSentence(Math.floor(Math.random() * LOREM_SENTENCES.length)))
      }
      result = sentences.join(' ')
    } else {
      const allWords = LOREM_SENTENCES.join(' ').split(/\s+/)
      const words: string[] = []
      for (let i = 0; i < count; i++) {
        if (i === 0 && startWithLorem) words.push('Lorem')
        else if (i === 1 && startWithLorem) words.push('ipsum')
        else words.push(allWords[Math.floor(Math.random() * allWords.length)])
      }
      result = words.join(' ') + '.'
    }
    setOutput(result)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.count}</label>
          <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ ...inputStyle, width: '80px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.type}</label>
          <select value={type} onChange={(e) => setType(e.target.value as 'paragraphs' | 'sentences' | 'words')} style={inputStyle}>
            <option value="paragraphs">{l.paragraphs}</option>
            <option value="sentences">{l.sentences}</option>
            <option value="words">{l.words}</option>
          </select>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />
          {l.startWithLorem}
        </label>
        <button className="btn-primary" onClick={generate}>{l.generate}</button>
      </div>
      {output && (
        <div style={{ position: 'relative' }}>
          <textarea readOnly value={output} style={{ ...inputStyle, width: '100%', minHeight: '200px', resize: 'vertical' }} />
          <button className="btn-secondary" onClick={handleCopy} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
            {copied ? l.copied : l.copy}
          </button>
        </div>
      )}
    </div>
  )
}
