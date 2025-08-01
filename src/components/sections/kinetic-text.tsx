'use client'

import { useRef, useEffect, useState } from 'react'
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

  useEffect(() => {
    const lines = gsap.utils.toArray('.kinetic-line')
    
    lines.forEach((line: any, index) => {
      const letters = line.querySelectorAll('.letter')
      
      gsap.fromTo(letters,
        {
          opacity: 0,
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      )

      // Dynamic professional movement
      gsap.to(letters, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: line,
          start: "top 80%",
          end: "bottom 20%"
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [textLines])

  return (
    <section ref={sectionRef} className="relative py-16 bg-black overflow-hidden">
      <motion.div 
        style={{ x, opacity }}
        className="absolute inset-0"
      >
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 0.5, 0],
                opacity: [0, 0.3, 0],
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      <div ref={textRef} className="relative max-w-4xl mx-auto px-4 text-center">
        {textLines.filter(line => line.length > 0).map((line, lineIndex) => (
          <motion.div
            key={line}
            className="kinetic-line mb-4 overflow-hidden perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-center">
              {line.split('').map((letter, letterIndex) => (
                <motion.span
                  key={`${line}-${letterIndex}`}
                  className="letter inline-block text-6xl md:text-8xl lg:text-9xl font-bold"
                  style={{
                    background: lineIndex % 2 === 0 
                      ? 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)' 
                      : 'linear-gradient(45deg, #10b981, #06b6d4, #3b82f6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    transformStyle: "preserve-3d"
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Subtitle Animation */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}