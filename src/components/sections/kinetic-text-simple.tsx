'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function KineticText() {
  const [textLines, setTextLines] = useState(["PERFECT", "SMILE", "DESIGN"])
  const [subtitle, setSubtitle] = useState("Premium cosmetic dentistry in Istanbul")

  // Fetch homepage content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/homepage?t=' + Date.now(), {
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.content?.effectTexts?.kineticOne) {
            setTextLines(data.content.effectTexts.kineticOne.lines)
            setSubtitle(data.content.effectTexts.kineticOne.subtitle)
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
      {/* Subtle moving spotlights */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-64 h-64 bg-white/[0.02] rounded-full blur-[100px]"
          animate={{
            x: ['-20%', '120%'],
            y: ['20%', '80%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute w-48 h-48 bg-purple-500/[0.03] rounded-full blur-[80px]"
          animate={{
            x: ['100%', '-20%'],
            y: ['80%', '20%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {textLines.filter(line => line.length > 0).map((line, lineIndex) => (
          <motion.div
            key={line}
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: lineIndex * 0.1 }}
          >
            <div className="flex justify-center">
              {line.split('').map((letter, letterIndex) => (
                <span
                  key={`${line}-${letterIndex}`}
                  className="inline-block text-6xl md:text-8xl lg:text-9xl font-bold relative"
                  style={{
                    background: lineIndex % 2 === 0 
                      ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)' 
                      : 'linear-gradient(45deg, #10b981, #06b6d4, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(139, 92, 246, 0.2)',
                    filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.15))'
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.p 
          className="mt-12 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}