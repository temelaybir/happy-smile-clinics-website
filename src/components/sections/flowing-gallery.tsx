'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const galleryImages = [
  { id: 1, src: '/images/gallery/1.jpg', alt: 'Smile transformation 1' },
  { id: 2, src: '/images/gallery/2.jpg', alt: 'Smile transformation 2' },
  { id: 3, src: '/images/gallery/3.jpg', alt: 'Smile transformation 3' },
  { id: 4, src: '/images/gallery/4.jpg', alt: 'Smile transformation 4' },
  { id: 5, src: '/images/gallery/5.jpg', alt: 'Smile transformation 5' },
  { id: 6, src: '/images/gallery/6.jpg', alt: 'Smile transformation 6' },
  { id: 7, src: '/images/gallery/7.jpg', alt: 'Smile transformation 7' },
  { id: 8, src: '/images/gallery/8.jpg', alt: 'Smile transformation 8' },
  { id: 9, src: '/images/gallery/9.jpg', alt: 'Smile transformation 9' },
  { id: 10, src: '/images/gallery/10.jpg', alt: 'Smile transformation 10' },
  { id: 11, src: '/images/gallery/11.jpg', alt: 'Smile transformation 11' },
  { id: 12, src: '/images/gallery/12.jpg', alt: 'Smile transformation 12' },
  { id: 13, src: '/images/gallery/13.jpg', alt: 'Smile transformation 13' },
  { id: 14, src: '/images/gallery/14.jpg', alt: 'Smile transformation 14' },
  { id: 15, src: '/images/gallery/15.jpg', alt: 'Smile transformation 15' },
  { id: 16, src: '/images/gallery/16.jpg', alt: 'Smile transformation 16' },
]

export default function FlowingGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Use intersection observer to trigger animation
  const isInView = useInView(galleryRef, { 
    once: true,
    margin: "-20%"
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="py-12 md:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-3 md:px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-6xl font-light text-white/90 mb-3 md:mb-4">
            Happy Smiles
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </motion.div>
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Discover the transformative power of a perfect smile
          </p>
        </motion.div>

        {/* Gallery Frame */}
        <div 
          ref={galleryRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Gallery Container */}
          <div className="relative h-[400px] md:h-[720px] lg:h-[900px] rounded-lg md:rounded-2xl overflow-hidden bg-gray-950">
            {/* Image Grid with Domino Effect */}
            <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-4 p-3 md:p-8">
              {galleryImages.slice(0, isMobile ? 6 : 16).map((image, index) => {
                // Calculate delay for each image
                // Faster animation on mobile
                const delayPerImage = isMobile ? 0.15 : 0.45
                const animationDelay = index * delayPerImage
                
                return (
                  <motion.div
                    key={image.id}
                    initial={{ 
                      opacity: 0,
                      scale: 0.85,
                      x: -30,
                      y: 10
                    }}
                    animate={isInView ? {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0
                    } : {
                      opacity: 0,
                      scale: 0.85,
                      x: -30,
                      y: 10
                    }}
                    transition={{
                      delay: animationDelay,
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                  >
                    <div
                      className="relative aspect-square md:aspect-[3/4] rounded-md md:rounded-lg overflow-hidden shadow-xl md:shadow-2xl"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/results"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Transformations
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}