'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'
import { useOptimizedAnimation, gpuAcceleration } from '@/hooks/useOptimizedAnimation'

interface OptimizedAnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
  once?: boolean
}

const OptimizedAnimatedSection = memo(({ 
  children, 
  className = '',
  delay = 0,
  threshold = 0.1,
  once = true
}: OptimizedAnimatedSectionProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    margin: '-50px',
    amount: threshold 
  })
  
  const { animationProps, isHighPerformance } = useOptimizedAnimation({ delay })

  if (!isHighPerformance) {
    // For low-end devices, skip animations
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={gpuAcceleration}
      className={className}
    >
      {children}
    </motion.div>
  )
})

OptimizedAnimatedSection.displayName = 'OptimizedAnimatedSection'

export default OptimizedAnimatedSection