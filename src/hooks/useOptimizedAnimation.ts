import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface OptimizedAnimationConfig {
  duration?: number
  delay?: number
  ease?: number[] | string
  stagger?: number
}

export const useOptimizedAnimation = (config: OptimizedAnimationConfig = {}) => {
  const shouldReduceMotion = useReducedMotion()
  const [isHighPerformance, setIsHighPerformance] = useState(true)

  useEffect(() => {
    // Check device performance
    if (typeof window !== 'undefined') {
      const checkPerformance = () => {
        // Check for low-end devices
        const memory = (navigator as any).deviceMemory
        const cores = navigator.hardwareConcurrency
        
        setIsHighPerformance(
          memory >= 4 && cores >= 4
        )
      }

      checkPerformance()
    }
  }, [])

  // Return optimized animation values
  const getAnimationProps = () => {
    if (shouldReduceMotion) {
      return {
        initial: false,
        animate: false,
        exit: false,
        transition: { duration: 0 }
      }
    }

    const isMobile = window.innerWidth < 768

    const baseTransition = {
      duration: config.duration || (isMobile ? 0.8 : 1.2),
      delay: config.delay || 0,
      ease: config.ease || [0.25, 0.1, 0.25, 1], // Smoother easing
    }

    if (!isHighPerformance) {
      // Reduce animation complexity for low-end devices
      baseTransition.duration *= 0.7
    }

    return {
      transition: baseTransition,
      style: {
        willChange: isHighPerformance ? 'transform, opacity' : 'auto',
      }
    }
  }

  const optimizedVariants = {
    hidden: { 
      opacity: 0, 
      y: isHighPerformance ? 20 : 10,
      transition: { duration: 0 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: getAnimationProps().transition
    }
  }

  return {
    animationProps: getAnimationProps(),
    variants: optimizedVariants,
    isHighPerformance,
    shouldReduceMotion
  }
}

// GPU-accelerated transform utilities
export const gpuAcceleration = {
  transform: 'translate3d(0, 0, 0)',
  willChange: 'transform',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
}

// Optimized animation presets
export const animationPresets = {
  fadeIn: {
    initial: { opacity: 0, ...gpuAcceleration },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  slideUp: {
    initial: { y: 30, opacity: 0, ...gpuAcceleration },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0, ...gpuAcceleration },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}