'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import type { PatientResult } from '@/lib/cms'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

gsap.registerPlugin(ScrollTrigger)

interface ResultsCarouselProps {
  results: PatientResult[]
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 3.5,
    partialVisibilityGutter: 40
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
}

export default function ResultsCarousel({ results }: ResultsCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  useEffect(() => {
    const resultCards = gsap.utils.toArray('.result-carousel-card')
    
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

  const CustomLeftArrow = ({ onClick }: any) => {
    return (
      <button 
        onClick={() => onClick()}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )
  }

  const CustomRightArrow = ({ onClick }: any) => {
    return (
      <button 
        onClick={() => onClick()}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      </motion.div>

      <div className="relative container mx-auto px-4">
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
            Discover the life-changing transformations our patients have experienced
          </motion.p>
        </motion.div>

        <div className="relative">
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            swipeable={true}
            draggable={true}
            showDots={true}
            partialVisible={true}
            customDot={<CustomDot />}
            renderDotsOutside={true}
            containerClass="carousel-container pb-12"
            itemClass="px-3"
            dotListClass="custom-dot-list-style"
            arrows={true}
            renderButtonGroupOutside={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                className="result-carousel-card group relative h-full py-4"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden border-2 border-gray-700/50">
                    <Image
                      src={result.afterImage}
                      alt={`${result.name} - Result`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
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
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
                          {result.name}
                        </h3>
                      </div>

                      <div className="space-y-2 text-sm">
                        {(result as any).treatments?.map((treatment: string, idx: number) => (
                          <p key={idx} className="text-gray-300">
                            {treatment}
                          </p>
                        )) || (
                          <>
                            <p className="text-gray-300">Smile Design</p>
                            <p className="text-gray-300">All on Four / All on X Implants System</p>
                            <p className="text-gray-300">x28 Zirconia Porcelain Crowns</p>
                            <p className="text-gray-300">x12 Dental Implants</p>
                            <p className="text-gray-300">Color: BL3</p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
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
              <ArrowRight className="w-5 h-5" />
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