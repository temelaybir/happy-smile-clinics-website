'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import InstagramVideo from '../videos/instagram-video'

gsap.registerPlugin(ScrollTrigger)

const premiumVideos = [
  {
    id: 1,
    videoUrl: "/videos/hero-video.mp4",
    thumbnail: "/images/services/veneers.webp",
    title: "Porcelain Veneers",
    category: "Aesthetic Dentistry",
    treatment: "E-Max Veneers",
    duration: "3 Days"
  },
  {
    id: 2,
    videoUrl: "/videos/hero-video.mp4",
    thumbnail: "/images/services/implants.webp",
    title: "All-on-4 Implants",
    category: "Implant Surgery",
    treatment: "Full Arch Restoration",
    duration: "1 Day"
  },
  {
    id: 3,
    videoUrl: "/videos/hero-video.mp4",
    thumbnail: "/images/services/smile-design.webp",
    title: "Digital Smile Design",
    category: "Complete Makeover",
    treatment: "DSD Protocol",
    duration: "5 Days"
  },
  {
    id: 4,
    videoUrl: "/videos/hero-video.mp4",
    thumbnail: "/images/reviews/matthew.webp",
    title: "Zirconia Crowns",
    category: "Prosthetic Dentistry",
    treatment: "CAD/CAM Technology",
    duration: "2 Days"
  }
]

export default function PremiumVideoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeVideo, setActiveVideo] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const videoCards = gsap.utils.toArray('.premium-video-card')
    
    videoCards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80,
          rotateX: 25
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.15
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Premium Background Pattern */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.02)_50%,_transparent_75%)] bg-[length:60px_60px]" />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="mb-4">
            <span className="text-sm font-medium text-purple-400 tracking-[0.2em] uppercase">
              Treatment Portfolio
            </span>
          </motion.div>
          
          <motion.h2 className="text-5xl md:text-6xl font-light mb-8 text-white leading-tight">
            {["Exceptional", "Results"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <span className={index === 1 ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400" : ""}>
                  {word}
                </span>
              </motion.span>
            ))}
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Witness the artistry of advanced dental procedures and life-changing transformations
          </motion.p>
        </motion.div>

        {/* Premium Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {premiumVideos.map((video, index) => (
            <motion.div
              key={video.id}
              className="premium-video-card group relative"
              onMouseEnter={() => setActiveVideo(index)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                {/* Premium Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-purple-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-full bg-black rounded-xl overflow-hidden">
                  <InstagramVideo
                    videoUrl={video.videoUrl}
                    thumbnail={video.thumbnail}
                    className="w-full h-full"
                  />
                  
                  {/* Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  
                  {/* Premium Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="mb-2">
                        <span className="text-xs font-medium text-purple-300 tracking-wide uppercase">
                          {video.category}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors">
                        {video.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-300 mb-1">
                            {video.treatment}
                          </p>
                          <p className="text-xs text-purple-300 font-medium">
                            Treatment: {video.duration}
                          </p>
                        </div>
                        
                        {/* Premium Status Badge */}
                        <div className="bg-gradient-to-r from-gold-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                          PREMIUM
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Luxury Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-0 h-0 border-l-[5px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Complete Portfolio</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}