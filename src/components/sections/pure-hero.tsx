'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function PureHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => {
        setIsVideoLoaded(true)
      }
      
      video.addEventListener('canplay', handleCanPlay)
      
      // Also check if video is already ready
      if (video.readyState >= 3) {
        setIsVideoLoaded(true)
      }
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Initial black screen that fades out */}
      <motion.div
        className="absolute inset-0 bg-black z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVideoLoaded ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Pure Video Background */}
      <motion.div
        style={{ 
          scale: videoScale,
          opacity
        }}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/dental-patients-hero.webp"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
    </section>
  )
}