import { Metadata } from 'next'
import HttpStatusCodes from '@/components/tools/HttpStatusCodes'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'HTTP 狀態碼查詢 - 免費線上工具 | toolcase',
  description: '完整的 HTTP 狀態碼參考手冊，附說明。可搜尋與篩選 1xx 到 5xx 所有狀態碼。網頁開發者的快速參考工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/http-status-codes', languages: { en: 'https://toolcase.cc/http-status-codes', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/http-status-codes' } },
}

const faqs = [
  { question: '什麼是 HTTP 狀態碼？', answer: 'HTTP 狀態碼是伺服器回應用戶端請求時返回的三位數字代碼。它們指出請求是成功、被重新導向，還是發生了錯誤。狀態碼分為五大類：1xx（資訊回應）、2xx（成功）、3xx（重新導向）、4xx（用戶端錯誤）、5xx（伺服器錯誤）。' },
  { question: '401 和 403 有什麼不同？', answer: '401（未授權）表示請求缺少有效的身份驗證憑證——用戶端需要登入或提供 API 金鑰。403（禁止存取）表示伺服器了解請求且知道用戶端身份，但用戶端沒有存取該資源的權限。簡而言之：401 是「你是誰？」，403 是「我知道你是誰，但你無權存取這個資源。」' },
  { question: '503 狀態碼是什麼意思？', answer: '503（服務不可用）表示伺服器暫時無法處理請求。常見原因包括伺服器維護、暫時超載或後端服務當機。與 500（內部伺服器錯誤）不同，503 暗示問題是暫時性的，用戶端應在一段時間後重試。伺服器通常會在回應中附帶 Retry-After 標頭。' },
]

export default function HttpStatusCodesPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTTP 狀態碼查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>可搜尋的完整 HTTP 狀態碼參考手冊，附詳細說明。</p>
      <HttpStatusCodes labels={{
        searchPlaceholder: '搜尋狀態碼...',
        informational: '資訊回應',
        success: '成功',
        redirection: '重新導向',
        clientError: '用戶端錯誤',
        serverError: '伺服器錯誤',
        allCategories: '全部',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>瀏覽完整的 HTTP 狀態碼列表，或使用搜尋框依代碼數字、名稱或說明進行篩選。點擊分類按鈕可依類型篩選——資訊回應（1xx）、成功（2xx）、重新導向（3xx）、用戶端錯誤（4xx）或伺服器錯誤（5xx）。每個條目顯示狀態碼、官方名稱及清楚的說明。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="http-status-codes" locale="zh-tw" />
    </div>
  )
}
