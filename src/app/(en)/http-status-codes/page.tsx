import { Metadata } from 'next'
import HttpStatusCodes from '@/components/tools/HttpStatusCodes'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'HTTP Status Code Reference - Free Online Tool | toolcase',
  description: 'Complete HTTP status code reference with descriptions. Search and filter all status codes from 1xx to 5xx. A quick reference for web developers.',
  alternates: { canonical: 'https://toolcase.cc/http-status-codes', languages: { en: 'https://toolcase.cc/http-status-codes', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/http-status-codes' } },
}

const faqs = [
  { question: 'What are HTTP status codes?', answer: 'HTTP status codes are three-digit numbers returned by a web server in response to a client request. They indicate whether the request was successful, redirected, or resulted in an error. Status codes are grouped into five categories: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), and 5xx (Server Error).' },
  { question: 'What is the difference between 401 and 403?', answer: '401 (Unauthorized) means the request lacks valid authentication credentials — the client needs to log in or provide an API key. 403 (Forbidden) means the server understands the request and knows who the client is, but the client does not have permission to access the resource. In short: 401 = "who are you?", 403 = "I know who you are, but you can\'t access this."' },
  { question: 'What does a 503 status code mean?', answer: '503 (Service Unavailable) indicates the server is temporarily unable to handle the request. Common causes include server maintenance, temporary overloading, or a backend service being down. Unlike 500 (Internal Server Error), a 503 suggests the issue is temporary and the client should retry after some time. Servers often include a Retry-After header with this response.' },
]

export default function HttpStatusCodesPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>HTTP Status Code Reference</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>A searchable reference of all HTTP status codes with descriptions.</p>
      <HttpStatusCodes />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Browse the complete list of HTTP status codes or use the search box to filter by code number, name, or description. Click the category buttons to filter by type — Informational (1xx), Success (2xx), Redirection (3xx), Client Error (4xx), or Server Error (5xx). Each entry shows the status code, its official name, and a clear description of what it means.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="http-status-codes" locale="en" />
    </div>
  )
}
