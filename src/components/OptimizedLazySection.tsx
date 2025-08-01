'use client'

import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, ReactNode } from 'react'

interface OptimizedLazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  priority?: 'high' | 'medium' | 'low'
  className?: string
  skeleton?: boolean
  delay?: number
}

export default function OptimizedLazySection({
  children,
  fallback,
  priority = 'medium',
  className = '',
  skeleton = true,
  delay = 0
}: OptimizedLazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  
  // Different thresholds based on priority
  const rootMargin = priority === 'high' ? '200px' : priority === 'medium' ? '100px' : '50px'
  const threshold = priority === 'high' ? 0 : 0.1
  
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin,
    amount: threshold
  })

  useEffect(() => {
    // For high priority, load immediately after mount
    if (priority === 'high') {
      const timer = setTimeout(() => {
        setShouldRender(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [priority, delay])

  useEffect(() => {
    if (isInView && !shouldRender) {
      // Add progressive delay based on priority
      const loadDelay = priority === 'medium' ? delay + 100 : delay + 200
      const timer = setTimeout(() => {
        setShouldRender(true)
      }, loadDelay)
      
      return () => clearTimeout(timer)
    }
  }, [isInView, shouldRender, priority, delay])

  useEffect(() => {
    if (shouldRender && !isLoaded) {
      // Use requestIdleCallback for low priority items
      if (priority === 'low' && 'requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => {
          setIsLoaded(true)
        })
        return () => window.cancelIdleCallback(id)
      } else {
        setIsLoaded(true)
      }
    }
  }, [shouldRender, isLoaded, priority])

  // Custom skeleton loader
  const defaultFallback = skeleton ? (
    <div className={`${className} animate-pulse`}>
      <div className="bg-gradient-to-r from-gray-900/20 via-gray-900/10 to-gray-900/20 h-96 rounded-lg">
        <div className="h-full flex items-center justify-center">
          <div className="space-y-4">
            <div className="h-4 bg-gray-800/20 rounded w-48 mx-auto"></div>
            <div className="h-4 bg-gray-800/20 rounded w-36 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div ref={ref} className={className}>
      {isLoaded ? children : (fallback || defaultFallback)}
    </div>
  )
}