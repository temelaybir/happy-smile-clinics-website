'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function MinimalHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    // Minimalist text animation
    const words = gsap.utils.toArray('.hero-word')
    
    gsap.fromTo(words,
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.5
      }
    )

    // Floating elements
    const floatingElements = gsap.utils.toArray('.floating-element')
    floatingElements.forEach((element: any) => {
      gsap.to(element, {
        y: -30,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Minimalist Video Background */}
      <motion.video
        ref={videoRef}
        style={{ scale: videoScale }}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </motion.video>

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Minimal Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex items-center justify-center px-4"
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title - Ultra Minimal */}
          <div className="overflow-hidden">
            <motion.h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extralight tracking-[0.3em] leading-none">
              <span className="hero-word block text-white/95">
                SMILE
              </span>
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full" />
        <div className="floating-element absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full" />
        <div className="floating-element absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/15 rounded-full" />
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-white/30"
        />
      </motion.div>
    </section>
  )
}