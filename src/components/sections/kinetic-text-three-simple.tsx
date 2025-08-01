'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function KineticTextThree() {
  const [text, setText] = useState("READY TO SMILE?")

  // Fetch homepage content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/homepage?t=' + Date.now(), {
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.content?.effectTexts?.kineticThree) {
            setText(data.content.effectTexts.kineticThree.text)
          }
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error)
      }
    }
    fetchContent()
  }, [])

  return (
    <section className="relative py-12 bg-black overflow-hidden">
      {/* Gentle floating spotlight */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-20 h-20 bg-white/[0.02] rounded-full blur-[40px]"
          animate={{
            x: ['-10%', '110%'],
            y: ['50%', '50%'],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div 
        className="relative max-w-4xl mx-auto px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 
          className="text-2xl md:text-3xl font-light text-gray-400 tracking-widest"
          style={{
            textShadow: '0 0 30px rgba(255, 255, 255, 0.1)',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.05))'
          }}
        >
          {text}
        </h3>
        
        <motion.div
          className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.div>
    </section>
  )
}