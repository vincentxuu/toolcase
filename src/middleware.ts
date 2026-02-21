import { NextRequest, NextResponse } from 'next/server'

const LOCALE_COOKIE = 'preferred-locale'

// Match Chinese language variants
function prefersChinese(acceptLanguage: string): boolean {
  // Parse Accept-Language header, e.g. "zh-TW,zh;q=0.9,en;q=0.8"
  const languages = acceptLanguage.split(',').map((lang) => {
    const [code, qStr] = lang.trim().split(';q=')
    return { code: code.trim().toLowerCase(), q: qStr ? parseFloat(qStr) : 1 }
  })

  // Sort by quality
  languages.sort((a, b) => b.q - a.q)

  // Check if the top preferred language is Chinese
  for (const { code } of languages) {
    if (code.startsWith('zh')) return true
    if (code.startsWith('en')) return false
  }

  return false
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip if already on /zh-tw, or if it's an asset/api route
  if (
    pathname.startsWith('/zh-tw') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // If user has a cookie preference, respect it
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale) {
    if (cookieLocale === 'zh-tw') {
      const url = request.nextUrl.clone()
      url.pathname = `/zh-tw${pathname === '/' ? '' : pathname}`
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Auto-detect from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  if (prefersChinese(acceptLanguage)) {
    const url = request.nextUrl.clone()
    url.pathname = `/zh-tw${pathname === '/' ? '' : pathname}`
    const response = NextResponse.redirect(url)
    response.cookies.set(LOCALE_COOKIE, 'zh-tw', { maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  // Set English preference cookie so we don't check again
  const response = NextResponse.next()
  response.cookies.set(LOCALE_COOKIE, 'en', { maxAge: 60 * 60 * 24 * 365 })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
