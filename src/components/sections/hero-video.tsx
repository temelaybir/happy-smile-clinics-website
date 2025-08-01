'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function HeroVideo() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const floatingTextsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parallax effect on scroll
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    // Floating texts animation
    const floatingTexts = gsap.utils.toArray('.floating-text')
    floatingTexts.forEach((text: any, index) => {
      gsap.fromTo(text, 
        {
          opacity: 1,
          y: 0,
          scale: 1
        },
        {
          opacity: 0,
          y: -200,
          scale: 0.5,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              // Create flowing effect
              const progress = self.progress
              gsap.set(text, {
                x: Math.sin(progress * Math.PI * 2 + index) * 100,
                rotation: progress * 360,
              })
            }
          }
        }
      )
    })

    // Main text scroll animation
    gsap.to(textContainerRef.current, {
      y: 150,
      opacity: 0.3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const floatingWords = [
    "Smile", "Design", "Veneers", "Implants", "Perfect", "Beautiful", 
    "Transform", "Confidence", "Excellence", "Modern", "Technology", "Care"
  ]

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-110"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Hero Content */}
      <div ref={textContainerRef} className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block text-white">
              Your Smile
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Your Style
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Floating Scattered Texts */}
      <div ref={floatingTextsRef} className="absolute inset-0 pointer-events-none z-5">
        {floatingWords.map((word, index) => (
          <motion.div
            key={word}
            className="floating-text absolute text-white/20 font-bold select-none"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              fontSize: `${Math.random() * 2 + 1.5}rem`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 1 }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}