'use client'

import { useEffect, useRef } from 'react'

interface AdSlotProps {
  adSlot: string
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSlot({
  adSlot,
  format = 'auto',
  fullWidthResponsive = true,
  style,
  className = '',
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null)
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  useEffect(() => {
    // 只在有 adClient 且廣告尚未推送時執行
    if (adClient && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (error) {
        console.error('AdSense error:', error)
      }
    }
  }, [adClient])

  // 如果沒有設定 adClient，不顯示廣告
  if (!adClient) {
    return null
  }

  return (
    <div className={`ad-container ${className}`} style={{ textAlign: 'center', margin: '2rem 0', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}
