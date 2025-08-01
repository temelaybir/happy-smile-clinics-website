'use client'

import { ReactNode, useEffect, useState } from 'react'

interface FastLazySectionProps {
  children: ReactNode
  delay?: number
}

export default function FastLazySection({ children, delay = 0 }: FastLazySectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load everything after initial mount with minimal delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isLoaded) {
    return <div className="min-h-[400px]" /> // Simple placeholder, no animations
  }

  return <>{children}</>
}