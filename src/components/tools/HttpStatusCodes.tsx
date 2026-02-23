'use client'
import { useState, useMemo } from 'react'

interface HttpStatusCodesProps {
  labels?: {
    searchPlaceholder: string
    informational: string
    success: string
    redirection: string
    clientError: string
    serverError: string
    allCategories: string
  }
}

interface StatusCode {
  code: number
  name: string
  description: string
}

const STATUS_CODES: StatusCode[] = [
  // 1xx Informational
  { code: 100, name: 'Continue', description: 'The server has received the request headers and the client should proceed to send the request body.' },
  { code: 101, name: 'Switching Protocols', description: 'The server is switching protocols as requested by the client via the Upgrade header.' },
  { code: 102, name: 'Processing', description: 'The server has received and is processing the request, but no response is available yet.' },
  { code: 103, name: 'Early Hints', description: 'Used to return some response headers before the final HTTP message.' },
  // 2xx Success
  { code: 200, name: 'OK', description: 'The request has succeeded. The meaning depends on the HTTP method used.' },
  { code: 201, name: 'Created', description: 'The request has been fulfilled and a new resource has been created.' },
  { code: 202, name: 'Accepted', description: 'The request has been accepted for processing, but the processing has not been completed.' },
  { code: 203, name: 'Non-Authoritative Information', description: 'The returned metadata is not exactly the same as available from the origin server.' },
  { code: 204, name: 'No Content', description: 'The server has fulfilled the request but does not need to return a response body.' },
  { code: 205, name: 'Reset Content', description: 'The server has fulfilled the request and the client should reset the document view.' },
  { code: 206, name: 'Partial Content', description: 'The server is delivering only part of the resource due to a range header sent by the client.' },
  { code: 207, name: 'Multi-Status', description: 'A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.' },
  { code: 208, name: 'Already Reported', description: 'Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.' },
  { code: 226, name: 'IM Used', description: 'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.' },
  // 3xx Redirection
  { code: 300, name: 'Multiple Choices', description: 'The request has more than one possible response. The client should choose one of them.' },
  { code: 301, name: 'Moved Permanently', description: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.' },
  { code: 302, name: 'Found', description: 'The URI of the requested resource has been changed temporarily. The client should continue to use the original URI.' },
  { code: 303, name: 'See Other', description: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.' },
  { code: 304, name: 'Not Modified', description: 'Indicates that the resource has not been modified since the version specified by the request headers.' },
  { code: 307, name: 'Temporary Redirect', description: 'The server sends this response to direct the client to get the requested resource at another URI with the same method.' },
  { code: 308, name: 'Permanent Redirect', description: 'The resource is now permanently located at another URI, specified in the response. The method must not change.' },
  // 4xx Client Error
  { code: 400, name: 'Bad Request', description: 'The server cannot process the request due to something perceived to be a client error (e.g., malformed request syntax).' },
  { code: 401, name: 'Unauthorized', description: 'The client must authenticate itself to get the requested response. Similar to 403 but authentication is possible.' },
  { code: 402, name: 'Payment Required', description: 'Reserved for future use. Originally created for digital payment systems, currently rarely used.' },
  { code: 403, name: 'Forbidden', description: 'The client does not have access rights to the content. Unlike 401, the server knows the client\'s identity.' },
  { code: 404, name: 'Not Found', description: 'The server cannot find the requested resource. The URL is not recognized or the resource does not exist.' },
  { code: 405, name: 'Method Not Allowed', description: 'The request method is known by the server but is not supported by the target resource.' },
  { code: 406, name: 'Not Acceptable', description: 'The server cannot produce a response matching the list of acceptable values defined in the request headers.' },
  { code: 407, name: 'Proxy Authentication Required', description: 'Similar to 401 but authentication needs to be done by a proxy.' },
  { code: 408, name: 'Request Timeout', description: 'The server would like to shut down this unused connection. It is sent on an idle connection by some servers.' },
  { code: 409, name: 'Conflict', description: 'The request conflicts with the current state of the server.' },
  { code: 410, name: 'Gone', description: 'The content has been permanently deleted from server, with no forwarding address.' },
  { code: 411, name: 'Length Required', description: 'The server rejected the request because the Content-Length header field is not defined.' },
  { code: 412, name: 'Precondition Failed', description: 'The client has indicated preconditions in its headers which the server does not meet.' },
  { code: 413, name: 'Payload Too Large', description: 'The request entity is larger than limits defined by the server.' },
  { code: 414, name: 'URI Too Long', description: 'The URI requested by the client is longer than the server is willing to interpret.' },
  { code: 415, name: 'Unsupported Media Type', description: 'The media format of the requested data is not supported by the server.' },
  { code: 416, name: 'Range Not Satisfiable', description: 'The range specified by the Range header in the request cannot be fulfilled.' },
  { code: 417, name: 'Expectation Failed', description: 'The expectation indicated by the Expect request header cannot be met by the server.' },
  { code: 418, name: "I'm a Teapot", description: 'The server refuses to brew coffee because it is, permanently, a teapot. (RFC 2324, an April Fools joke)' },
  { code: 422, name: 'Unprocessable Entity', description: 'The request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 425, name: 'Too Early', description: 'The server is unwilling to risk processing a request that might be replayed.' },
  { code: 426, name: 'Upgrade Required', description: 'The server refuses to perform the request using the current protocol but might be willing after the client upgrades.' },
  { code: 428, name: 'Precondition Required', description: 'The origin server requires the request to be conditional to prevent the lost update problem.' },
  { code: 429, name: 'Too Many Requests', description: 'The user has sent too many requests in a given amount of time (rate limiting).' },
  { code: 431, name: 'Request Header Fields Too Large', description: 'The server is unwilling to process the request because its header fields are too large.' },
  { code: 451, name: 'Unavailable For Legal Reasons', description: 'The user agent requested a resource that cannot legally be provided.' },
  // 5xx Server Error
  { code: 500, name: 'Internal Server Error', description: 'The server has encountered a situation it does not know how to handle.' },
  { code: 501, name: 'Not Implemented', description: 'The request method is not supported by the server and cannot be handled.' },
  { code: 502, name: 'Bad Gateway', description: 'The server, while acting as a gateway, got an invalid response from the upstream server.' },
  { code: 503, name: 'Service Unavailable', description: 'The server is not ready to handle the request. Common causes include maintenance or overloading.' },
  { code: 504, name: 'Gateway Timeout', description: 'The server is acting as a gateway and cannot get a response in time from the upstream server.' },
  { code: 505, name: 'HTTP Version Not Supported', description: 'The HTTP version used in the request is not supported by the server.' },
  { code: 506, name: 'Variant Also Negotiates', description: 'The server has an internal configuration error: transparent content negotiation results in a circular reference.' },
  { code: 507, name: 'Insufficient Storage', description: 'The server is unable to store the representation needed to complete the request.' },
  { code: 508, name: 'Loop Detected', description: 'The server detected an infinite loop while processing the request.' },
  { code: 510, name: 'Not Extended', description: 'Further extensions to the request are required for the server to fulfill it.' },
  { code: 511, name: 'Network Authentication Required', description: 'The client needs to authenticate to gain network access.' },
]

type Category = 'all' | '1xx' | '2xx' | '3xx' | '4xx' | '5xx'

const CATEGORIES: { key: Category; label: string; range: [number, number] }[] = [
  { key: '1xx', label: 'Informational', range: [100, 199] },
  { key: '2xx', label: 'Success', range: [200, 299] },
  { key: '3xx', label: 'Redirection', range: [300, 399] },
  { key: '4xx', label: 'Client Error', range: [400, 499] },
  { key: '5xx', label: 'Server Error', range: [500, 599] },
]

function getCategoryColor(code: number): string {
  if (code < 200) return '#6366f1' // indigo for 1xx
  if (code < 300) return '#10b981' // green for 2xx
  if (code < 400) return '#f59e0b' // amber for 3xx
  if (code < 500) return '#ef4444' // red for 4xx
  return '#dc2626' // darker red for 5xx
}

export default function HttpStatusCodes({ labels }: HttpStatusCodesProps) {
  const l = {
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search status codes...',
    informational: labels?.informational ?? 'Informational',
    success: labels?.success ?? 'Success',
    redirection: labels?.redirection ?? 'Redirection',
    clientError: labels?.clientError ?? 'Client Error',
    serverError: labels?.serverError ?? 'Server Error',
    allCategories: labels?.allCategories ?? 'All',
  }

  const categoryLabels: Record<string, string> = {
    '1xx': l.informational,
    '2xx': l.success,
    '3xx': l.redirection,
    '4xx': l.clientError,
    '5xx': l.serverError,
  }

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('all')

  const filteredCodes = useMemo(() => {
    let codes = STATUS_CODES

    if (category !== 'all') {
      const cat = CATEGORIES.find((c) => c.key === category)!
      codes = codes.filter((s) => s.code >= cat.range[0] && s.code <= cat.range[1])
    }

    if (search) {
      const q = search.toLowerCase()
      codes = codes.filter(
        (s) =>
          s.code.toString().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
    }

    return codes
  }, [search, category])

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.8125rem',
    border: active ? 'none' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <input
        type="text"
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ height: 'auto', padding: '0.75rem', fontSize: '1rem' }}
        placeholder={l.searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category filters */}
      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
        <button style={tabStyle(category === 'all')} onClick={() => setCategory('all')}>
          {l.allCategories}
        </button>
        {CATEGORIES.map((cat) => (
          <button key={cat.key} style={tabStyle(category === cat.key)} onClick={() => setCategory(cat.key)}>
            {cat.key} {categoryLabels[cat.key]}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex flex-col gap-2">
        {filteredCodes.map((status) => (
          <div
            key={status.code}
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: getCategoryColor(status.code),
                minWidth: '3rem',
                flexShrink: 0,
              }}
            >
              {status.code}
            </span>
            <div className="flex-1">
              <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: 'var(--color-text)' }}>
                {status.name}
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                {status.description}
              </div>
            </div>
          </div>
        ))}
        {filteredCodes.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            No matching status codes found.
          </div>
        )}
      </div>
    </div>
  )
}
