'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

gsap.registerPlugin(ScrollTrigger)

const patientResults = [
  {
    id: 1,
    name: "Sarah M.",
    age: 28,
    location: "London, UK",
    treatment: "Porcelain Veneers",
    beforeImage: "/images/carousel/carousel-1.webp",
    afterImage: "/images/carousel/carousel-2.webp",
    testimonial: "Life-changing results beyond my expectations",
    rating: 5,
    duration: "3 Days",
    teethCount: "8 Veneers"
  },
  {
    id: 2,
    name: "Michael K.",
    age: 34,
    location: "Malta",
    treatment: "All-on-4 Implants",
    beforeImage: "/images/carousel/carousel-3.webp",
    afterImage: "/images/carousel/carousel-4.jpg",
    testimonial: "Perfect function and aesthetics restored",
    rating: 5,
    duration: "1 Day",
    teethCount: "Full Arch"
  },
  {
    id: 3,
    name: "Emma R.",
    age: 31,
    location: "Germany",
    treatment: "Smile Design",
    beforeImage: "/images/carousel/carousel-5.webp",
    afterImage: "/images/carousel/carousel-6.webp",
    testimonial: "The smile I always dreamed of having",
    rating: 5,
    duration: "5 Days",
    teethCount: "12 Veneers"
  },
  {
    id: 4,
    name: "James L.",
    age: 42,
    location: "Canada",
    treatment: "Zirconia Crowns",
    beforeImage: "/images/carousel/carousel-7.webp",
    afterImage: "/images/carousel/carousel-1.webp",
    testimonial: "Exceptional craftsmanship and care",
    rating: 5,
    duration: "4 Days",
    teethCount: "6 Crowns"
  },
  {
    id: 5,
    name: "Lisa W.",
    age: 26,
    location: "Australia",
    treatment: "Composite Veneers",
    beforeImage: "/images/carousel/carousel-2.webp",
    afterImage: "/images/carousel/carousel-3.webp",
    testimonial: "Natural and beautiful results",
    rating: 5,
    duration: "2 Days",
    teethCount: "10 Veneers"
  },
  {
    id: 6,
    name: "David S.",
    age: 38,
    location: "USA",
    treatment: "Hybrid Dentures",
    beforeImage: "/images/carousel/carousel-4.jpg",
    afterImage: "/images/carousel/carousel-5.webp",
    testimonial: "Confidence restored completely",
    rating: 5,
    duration: "3 Days",
    teethCount: "Full Mouth"
  }
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 1,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
}

export default function ResultsGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedResult, setSelectedResult] = useState<number | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  
  // Group results in sets of 3 for 3-row display
  const groupedResults = []
  for (let i = 0; i < patientResults.length; i += 3) {
    groupedResults.push({
      id: i,
      results: [patientResults[i], patientResults[i + 1], patientResults[i + 2]].filter(Boolean)
    })
  }

  useEffect(() => {
    const resultCards = gsap.utils.toArray('.result-card')
    
    resultCards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
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

  const CustomDot = ({ onMove, index, active, carouselState }: any) => {
    return (
      <button
        className={`transition-all duration-300 mx-1 ${
          active
            ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'
            : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
        }`}
        onClick={() => onMove(index)}
      />
    )
  }

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="mb-6">
            <span className="text-sm font-medium text-purple-400 tracking-[0.3em] uppercase">
              Patient Transformations
            </span>
          </motion.div>
          
          <motion.h2 className="text-5xl md:text-7xl font-light mb-8 text-white leading-tight">
            <motion.span
              className="inline-block mr-6"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Results
            </motion.span>
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Gallery
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Real patients, real transformations. Discover the life-changing results achieved through our expert care.
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative px-16">
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            swipeable={true}
            draggable={true}
            showDots={true}
            partialVisible={false}
            customDot={<CustomDot />}
            renderDotsOutside={true}
            containerClass="carousel-container pb-12"
            itemClass="px-0"
            dotListClass="custom-dot-list-style"
            arrows={true}
            customLeftArrow={
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            }
            customRightArrow={
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            }
          >
            {groupedResults.map((group) => (
              <div key={group.id} className="grid grid-rows-3 gap-4 px-4">
                {group.results.map((result) => (
                  <motion.div
                    key={result.id}
                    className="result-card group relative cursor-pointer h-full"
                    onClick={() => setSelectedResult(selectedResult === result.id ? null : result.id)}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 h-[280px]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="grid grid-cols-2 h-full">
                      <div className="relative">
                        <Image
                          src={result.beforeImage}
                          alt="Before"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                          Before
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Image
                          src={result.afterImage}
                          alt="After"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                          After
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 transform -translate-x-1/2" />
                    
                    <motion.div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    >
                      <div className="text-white text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <p className="text-sm font-medium">View Details</p>
                      </div>
                    </motion.div>
                  </div>

                      <motion.div 
                        className="p-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <div className="mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {result.name}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {result.age} years • {result.location}
                          </p>
                        </div>

                        <div className="mb-2">
                          <span className="text-purple-400 text-xs font-medium">{result.treatment}</span>
                          <div className="flex gap-3 text-xs mt-1">
                            <span className="text-gray-400">{result.duration}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-400">{result.teethCount}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(result.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">⭐</span>
                          ))}
                        </div>
                      </motion.div>

                      <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                        CERTIFIED
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-medium rounded-full overflow-hidden shadow-2xl shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>Start Your Transformation</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}