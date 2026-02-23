import { Metadata } from 'next'
import TextEncryptDecrypt from '@/components/tools/TextEncryptDecrypt'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字加密 / 解密 - 免費線上工具 | toolcase',
  description: '使用 AES-256-GCM 加密與解密文字。安全的客戶端加密，使用 Web Crypto API，資料不會傳送到任何伺服器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/text-encrypt-decrypt', languages: { en: 'https://toolcase.cc/dev/text-encrypt-decrypt', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/text-encrypt-decrypt' } },
}

const faqs = [
  { question: '使用什麼加密演算法？', answer: '此工具使用 AES-256-GCM（Galois/Counter Mode），這是最強大的對稱加密演算法之一。密碼透過 PBKDF2 以 100,000 次迭代和 SHA-256 衍生金鑰，確保對暴力破解攻擊有強大的防護。' },
  { question: '沒有密碼可以解密嗎？', answer: '不行。AES-256-GCM 在沒有正確金鑰的情況下被認為在計算上不可能破解。沒有加密時使用的確切密碼，就無法解密文字。請務必記住您的密碼，因為無法恢復。' },
  { question: '資料會被傳送到伺服器嗎？', answer: '不會。所有加密和解密完全在您的瀏覽器中使用 Web Crypto API 完成。您的文字和密碼不會離開您的裝置。加密輸出是一段 base64 字串，可以安全地分享或儲存。' },
]

export default function TextEncryptDecryptPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字加密 / 解密', url: 'https://toolcase.cc/zh-tw/dev/text-encrypt-decrypt' },
        ]}
      />
      <ToolSchema
        name="文字加密 / 解密"
        description="使用 AES-256-GCM 加密與解密文字。安全的客戶端加密，使用 Web Crypto API，資料不會傳送到任何伺服器。"
        url="https://toolcase.cc/zh-tw/dev/text-encrypt-decrypt"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字加密 / 解密' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字加密 / 解密</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用 AES-256-GCM 安全地加密與解密文字，完全在瀏覽器中執行。</p>
      <TextEncryptDecrypt labels={{ encrypt: '加密', decrypt: '解密', inputText: '輸入文字', password: '密碼 / 金鑰', output: '輸出', run: '執行', copy: '複製', copied: '已複製！', encryptPlaceholder: '輸入要加密的文字...', decryptPlaceholder: '貼上 base64 加密文字...', passwordPlaceholder: '輸入密碼...', errorEncrypt: '加密失敗，請重試。', errorDecrypt: '解密失敗。密碼錯誤或資料損毀。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇「加密」或「解密」模式。加密時，輸入明文和密碼，點擊「加密」取得 base64 編碼的加密字串。解密時，貼上加密的 base64 文字並輸入加密時使用的相同密碼，點擊「解密」還原原始文字。使用複製按鈕複製輸出結果。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="text-encrypt-decrypt" locale="zh-tw" />
    </div>
    </>
  )
}
