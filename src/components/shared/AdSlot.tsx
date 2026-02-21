'use client'

interface AdSlotProps {
  adClient?: string
  adSlot: string
  format?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export default function AdSlot({
  adClient = '',
  adSlot,
  format = 'auto',
  fullWidthResponsive = true,
  style,
}: AdSlotProps) {
  return (
    <div style={{ textAlign: 'center', margin: '2rem 0', ...style }}>
      <ins
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
