'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface InstagramVideoProps {
  videoUrl: string
  thumbnail?: string
  className?: string
}

export default function InstagramVideo({ videoUrl, thumbnail, className = '' }: InstagramVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play()
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={thumbnail}
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Play indicator */}
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
      </motion.div>
    </motion.div>
  )
}