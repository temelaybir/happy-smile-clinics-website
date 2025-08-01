'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ScrollModeToggleProps {
  onModeChange: (smoothEnabled: boolean) => void
}

export default function ScrollModeToggle({ onModeChange }: ScrollModeToggleProps) {
  const [smoothEnabled, setSmoothEnabled] = useState(false)

  useEffect(() => {
    // Load saved preference
    const saved = localStorage.getItem('smoothScroll')
    if (saved === 'true') {
      setSmoothEnabled(true)
      onModeChange(true)
      document.documentElement.classList.add('smooth-scroll')
    } else {
      document.documentElement.classList.remove('smooth-scroll')
    }
  }, [onModeChange])

  const toggleMode = () => {
    const newMode = !smoothEnabled
    setSmoothEnabled(newMode)
    localStorage.setItem('smoothScroll', String(newMode))
    onModeChange(newMode)
    
    // Apply or remove smooth scroll immediately
    if (newMode) {
      document.documentElement.classList.add('smooth-scroll')
    } else {
      document.documentElement.classList.remove('smooth-scroll')
    }
  }

  return null
}