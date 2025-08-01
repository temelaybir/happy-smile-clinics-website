'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function KineticTextThree() {
  const [text, setText] = useState("READY TO SMILE?")
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  // Fetch homepage content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/homepage?t=' + Date.now())
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

  useEffect(() => {
    const letters = gsap.utils.toArray('.simple-letter')
    
    gsap.fromTo(letters,
      {
        opacity: 0,
        y: 10
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [text])

  return (
    <section ref={sectionRef} className="relative py-12 bg-black overflow-hidden">
      <motion.div style={{ opacity }} className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl md:text-3xl font-light text-gray-400 tracking-widest">
            {text.split('').map((letter, index) => (
              <span
                key={index}
                className="simple-letter inline-block"
                style={{ marginRight: letter === ' ' ? '0.5em' : '0.1em' }}
              >
                {letter}
              </span>
            ))}
          </h3>
        </div>
        
        {/* Simple underline animation */}
        <motion.div
          className="mt-6 mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </section>
  )
}