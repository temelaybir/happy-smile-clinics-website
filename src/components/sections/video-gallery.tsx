'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InstagramVideo from '../videos/instagram-video'

gsap.registerPlugin(ScrollTrigger)

// Demo Instagram-style videos - replace with your actual Instagram video URLs
const instagramVideos = [
  {
    id: 1,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/services/veneers.webp",
    title: "Perfect Veneers",
    description: "Amazing transformation"
  },
  {
    id: 2,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/services/implants.webp",
    title: "Dental Implants",
    description: "Life-changing results"
  },
  {
    id: 3,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/services/smile-design.webp",
    title: "Smile Design",
    description: "Complete makeover"
  },
  {
    id: 4,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/reviews/matthew.webp",
    title: "Patient Story",
    description: "Real testimonial"
  },
  {
    id: 5,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/reviews/sarah.webp",
    title: "Before & After",
    description: "Stunning results"
  },
  {
    id: 6,
    videoUrl: "/videos/hero-video.mp4", // Replace with Instagram video URL
    thumbnail: "/images/reviews/ahmed.webp",
    title: "Treatment Process",
    description: "Behind the scenes"
  }
]

export default function VideoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  useEffect(() => {
    const videoItems = gsap.utils.toArray('.video-item')
    
    videoItems.forEach((item: any, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          y: 60,
          rotateY: 15
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-black overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4">
        {/* Kinetic Typography Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 overflow-hidden"
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {["Real", "Stories,", "Real", "Results"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <span className={index % 2 === 0 ? "text-white" : "bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"}>
                  {word}
                </span>
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Follow our patients' transformation journeys through our Instagram stories
          </motion.p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instagramVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="video-item relative aspect-[9/16] group cursor-pointer"
              onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <InstagramVideo
                videoUrl={video.videoUrl}
                thumbnail={video.thumbnail}
                className="w-full h-full"
              />
              
              {/* Video Info Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-white font-semibold text-lg mb-1">
                  {video.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {video.description}
                </p>
              </motion.div>

              {/* Instagram-style heart animation on hover */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none"
                whileInView={selectedVideo === video.id ? { scale: [0, 1.2, 1] } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://instagram.com/yourhandle" // Replace with your Instagram
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow @happysmileclinics
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}