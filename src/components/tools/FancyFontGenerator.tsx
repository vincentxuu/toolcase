'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check } from 'lucide-react'

interface FancyFontGeneratorProps {
  labels?: {
    inputText: string
    inputPlaceholder: string
    results: string
    copy: string
    copied: string
  }
}

export default function FancyFontGenerator({ labels }: FancyFontGeneratorProps) {
  const l = {
    inputText: labels?.inputText ?? 'Input Text',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter your text here...',
    results: labels?.results ?? 'Fancy Fonts',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [text, setText] = useState('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Unicode character mappings for different fonts
  const fonts = {
    // Mathematical Bold
    bold: {
      name: 'Bold',
      nameZh: '粗體',
      uppercase: '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭',
      lowercase: '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇',
      numbers: '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵',
    },
    // Mathematical Italic
    italic: {
      name: 'Italic',
      nameZh: '斜體',
      uppercase: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡',
      lowercase: '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻',
      numbers: '0123456789',
    },
    // Mathematical Bold Italic
    boldItalic: {
      name: 'Bold Italic',
      nameZh: '粗斜體',
      uppercase: '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕',
      lowercase: '𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯',
      numbers: '0123456789',
    },
    // Sans-serif
    sans: {
      name: 'Sans',
      nameZh: '無襯線',
      uppercase: '𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹',
      lowercase: '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓',
      numbers: '𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫',
    },
    // Monospace
    mono: {
      name: 'Monospace',
      nameZh: '等寬字體',
      uppercase: '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉',
      lowercase: '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣',
      numbers: '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿',
    },
    // Double-struck
    double: {
      name: 'Double',
      nameZh: '雙線體',
      uppercase: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ',
      lowercase: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫',
      numbers: '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡',
    },
    // Script
    script: {
      name: 'Script',
      nameZh: '花體',
      uppercase: '𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵',
      lowercase: '𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏',
      numbers: '0123456789',
    },
    // Fraktur
    fraktur: {
      name: 'Fraktur',
      nameZh: '哥特體',
      uppercase: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ',
      lowercase: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷',
      numbers: '0123456789',
    },
    // Circled
    circled: {
      name: 'Circled',
      nameZh: '圓圈',
      uppercase: 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ',
      lowercase: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ',
      numbers: '⓪①②③④⑤⑥⑦⑧⑨',
    },
    // Squared
    squared: {
      name: 'Squared',
      nameZh: '方框',
      uppercase: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
      lowercase: '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉',
      numbers: '0123456789',
    },
    // Fullwidth
    fullwidth: {
      name: 'Fullwidth',
      nameZh: '全形',
      uppercase: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ',
      lowercase: 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
      numbers: '０１２３４５６７８９',
    },
  }

  const convertText = (fontKey: keyof typeof fonts): string => {
    const font = fonts[fontKey]
    const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const fancy = font.uppercase + font.lowercase + font.numbers

    return text
      .split('')
      .map(char => {
        const index = normal.indexOf(char)
        return index !== -1 ? fancy[index] : char
      })
      .join('')
  }

  const variants = Object.entries(fonts).map(([key, font]) => ({
    key,
    name: font.name,
    nameZh: font.nameZh,
    text: convertText(key as keyof typeof fonts),
    example: 'Hello World 123',
  }))

  const copyText = async (textToCopy: string, index: number) => {
    await navigator.clipboard.writeText(textToCopy)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Input */}
      <Card className="p-6">
        <label className="mb-2 block text-sm font-medium">{l.inputText}</label>
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={l.inputPlaceholder}
          className="min-h-[120px] text-lg"
        />
      </Card>

      {/* Results */}
      {text && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{l.results}</h3>

          {variants.map((variant, index) => (
            <Card key={variant.key} className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {variant.name} / {variant.nameZh}
                  </h4>
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

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用提示</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 使用 Unicode 數學字母和符號產生特殊字體效果</li>
          <li>• 可直接複製到 Instagram、Facebook、Twitter 等社群媒體</li>
          <li>• 支援英文大小寫和數字,部分字體可能不支援標點符號</li>
          <li>• 不同平台和裝置的顯示效果可能略有差異</li>
        </ul>
      </Card>
    </div>
  )
}
