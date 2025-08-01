import { useEffect, useRef, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  memory: {
    used: number
    total: number
    percent: number
  }
  renderTime: number
  paintTime: number
}

export const usePerformanceMonitor = (enabled = true) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: { used: 0, total: 0, percent: 0 },
    renderTime: 0,
    paintTime: 0
  })
  
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    let rafId: number
    let metricsInterval: NodeJS.Timeout

    // FPS Counter
    const measureFPS = (currentTime: number) => {
      frameCountRef.current++
      
      if (currentTime - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current))
        frameCountRef.current = 0
        lastTimeRef.current = currentTime
        
        setMetrics(prev => ({ ...prev, fps }))
      }
      
      rafId = requestAnimationFrame(measureFPS)
    }

    rafId = requestAnimationFrame(measureFPS)

    // Performance Observer for paint timings
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, paintTime: entry.startTime }))
          }
        }
      })
    })

    try {
      observer.observe({ entryTypes: ['paint', 'navigation'] })
    } catch (e) {
      console.warn('Performance Observer not supported')
    }

    // Memory monitoring (Chrome only)
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memory: {
            used: Math.round(memory.usedJSHeapSize / 1048576),
            total: Math.round(memory.totalJSHeapSize / 1048576),
            percent: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
          }
        }))
      }
    }

    metricsInterval = setInterval(measureMemory, 2000)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(metricsInterval)
      observer.disconnect()
    }
  }, [enabled])

  return metrics
}

// Performance logger utility
export const logPerformance = (label: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`⚡ ${label}: ${(end - start).toFixed(2)}ms`)
}

// Check if running on low-end device
export const isLowEndDevice = () => {
  if (typeof window === 'undefined') return false
  
  const memory = (navigator as any).deviceMemory
  const cores = navigator.hardwareConcurrency
  const connection = (navigator as any).connection
  
  return (
    memory < 4 ||
    cores < 4 ||
    (connection && connection.saveData) ||
    (connection && connection.effectiveType && connection.effectiveType !== '4g')
  )
}