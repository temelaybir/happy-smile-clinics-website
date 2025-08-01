'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Logo from '../common/logo'
import FullScreenMenu from './fullscreen-menu'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 w-full z-40 transition-all duration-300 fixed-element"
        style={{
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBlur}px)`,
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform, opacity'
        }}
      >
        <motion.div 
          className="flex items-center justify-between p-6 md:p-8"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Logo variant="white" />
          </motion.div>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(prev => !prev)}
            className="relative w-12 h-12 flex items-center justify-center group z-50"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 10 : 0,
                  scaleX: isMenuOpen ? 1.2 : 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block w-full h-0.5 bg-white group-hover:bg-purple-400 transition-colors origin-left"
              />
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  x: isMenuOpen ? -10 : 0,
                  scaleX: isMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block w-full h-0.5 bg-white group-hover:bg-purple-400 transition-colors"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -10 : 0,
                  scaleX: isMenuOpen ? 1.2 : 1
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block w-full h-0.5 bg-white group-hover:bg-purple-400 transition-colors origin-left"
              />
            </div>
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Full Screen Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && <FullScreenMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}