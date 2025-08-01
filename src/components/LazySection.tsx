'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
  preload?: boolean
}

export default function LazySection({
  children,
  fallback = <div className="h-96 bg-gray-900/20 animate-pulse rounded-lg" />,
  rootMargin = '50px',
  threshold = 0.1,
  className = '',
  preload = false
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin,
    amount: threshold
  })
  
  const [isLoaded, setIsLoaded] = useState(preload)

  useEffect(() => {
    if (isInView && !isLoaded) {
      // Small delay to prevent too many simultaneous loads
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, isLoaded])

  return (
    <div ref={ref} className={className}>
      {isLoaded ? children : fallback}
    </div>
  )
}