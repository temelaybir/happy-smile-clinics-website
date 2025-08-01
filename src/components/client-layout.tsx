'use client'

import { useState, useEffect } from 'react'
import SimpleSmoothScroll from '@/components/animations/SimpleSmoothScroll'
import ScrollModeToggle from '@/components/ui/scroll-mode-toggle'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [smoothEnabled, setSmoothEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check localStorage after mounting
    const saved = localStorage.getItem('smoothScroll')
    setSmoothEnabled(saved === 'true')
    setMounted(true)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      {smoothEnabled ? (
        <SimpleSmoothScroll>{children}</SimpleSmoothScroll>
      ) : (
        children
      )}
      <ScrollModeToggle onModeChange={setSmoothEnabled} />
    </>
  )
}