'use client'
import { useEffect, useState } from 'react'
import IconSearch from '@/components/tools/IconSearch'

type IconSearchClientProps = React.ComponentProps<typeof IconSearch>

export default function IconSearchClient(props: IconSearchClientProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <IconSearch {...props} />
}
