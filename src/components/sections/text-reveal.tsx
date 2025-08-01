'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [200, -200])

  useEffect(() => {
    // Split text animation
    const text = textRef.current
    if (text) {
      const words = text.textContent?.split(' ') || []
      text.innerHTML = words.map(word => 
        `<span class="word inline-block">${word}&nbsp;</span>`
      ).join('')

      const wordElements = gsap.utils.toArray('.word')
      
      gsap.fromTo(wordElements,
        {
          opacity: 0.1,
          y: 100,
          rotateX: 90
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1
          }
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-40 bg-black overflow-hidden">
      <motion.div style={{ y }} className="max-w-6xl mx-auto px-4">
        <motion.div
          ref={textRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          Transform your smile with world-class dental treatments that combine artistry, technology, and exceptional care for results that last a lifetime
        </motion.div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}