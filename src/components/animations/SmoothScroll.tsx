'use client'

import { useEffect, useRef } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let Lenis: any

    const initSmoothScroll = async () => {
      try {
        // Import Lenis
        const lenisModule = await import('lenis')
        Lenis = lenisModule.default

        // Check if mobile
        const isMobile = window.innerWidth < 768

        // Disable smooth scroll on mobile for better performance
        if (isMobile) {
          console.log('Smooth scroll disabled on mobile')
          return
        }

        // Create Lenis instance for desktop only
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 1.5,
          infinite: false,
          lerp: 0.1,
          autoResize: true,
          normalizeWheel: true,
        })

        lenisRef.current = lenis

        // Animation loop
        function raf(time: number) {
          lenis.raf(time)
          rafRef.current = requestAnimationFrame(raf)
        }

        rafRef.current = requestAnimationFrame(raf)

        // Make lenis available globally
        if (typeof window !== 'undefined') {
          (window as any).lenis = lenis
        }

        // Handle resize
        const handleResize = () => {
          lenis.resize()
        }
        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
          cancelAnimationFrame(rafRef.current)
          lenis.destroy()
          window.removeEventListener('resize', handleResize)
          if (typeof window !== 'undefined') {
            delete (window as any).lenis
          }
        }
      } catch (error) {
        console.error('Failed to initialize smooth scroll:', error)
      }
    }

    const cleanup = initSmoothScroll()

    return () => {
      cleanup.then(fn => fn && fn())
    }
  }, [])

  return <>{children}</>
}