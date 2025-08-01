'use client'

import { useEffect } from 'react'

interface SimpleSmoothScrollProps {
  children: React.ReactNode
}

export default function SimpleSmoothScroll({ children }: SimpleSmoothScrollProps) {
  useEffect(() => {
    // Add smooth scroll class to html
    document.documentElement.classList.add('smooth-scroll')
    
    // Cleanup
    return () => {
      document.documentElement.classList.remove('smooth-scroll')
    }
  }, [])

  return <>{children}</>
}