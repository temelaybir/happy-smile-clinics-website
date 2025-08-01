'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ReviewData } from '@/lib/cms'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

gsap.registerPlugin(ScrollTrigger)

interface EnhancedReviewsProps {
  reviews: ReviewData[]
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 3,
    slidesToSlide: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 2,
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

export default function EnhancedReviews({ reviews }: EnhancedReviewsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Always use provided reviews, no fallback
  const displayReviews = reviews || []
  
  // Log reviews for debugging
  useEffect(() => {
    console.log('🎯 Enhanced Reviews - Received reviews:', reviews)
    console.log('🎯 Enhanced Reviews - Display reviews:', displayReviews)
  }, [reviews, displayReviews])
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  useEffect(() => {
    const reviewCards = gsap.utils.toArray('.professional-review-card')
    
    reviewCards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
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
            ? 'w-8 h-2 bg-white rounded-full'
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
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-50 hidden lg:flex"
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
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20 z-50 hidden lg:flex"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )
  }

  return (
    <div ref={sectionRef}>

      {/* Professional Reviews Section */}
      <section className="py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-4">
              Patient Reviews
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </motion.div>

          {/* Clean Reviews Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex flex-col items-center">
              {/* Google Reviews with Logo */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-20 h-6" viewBox="0 0 74 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
                    <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
                    <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z" fill="#FBBC05"/>
                    <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#34A853"/>
                    <path d="M58 .24h2.51v17.57H58V.24z" fill="#4285F4"/>
                    <path d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335"/>
                  </svg>
                  <span className="text-gray-300 text-sm font-medium ml-1">Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.1 * i, 
                        duration: 0.6, 
                        ease: "easeOut"
                      }}
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Rating */}
              <motion.div 
                className="text-4xl font-light text-white mb-3" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                4.8 / 5.0
              </motion.div>

              <motion.div 
                className="text-lg text-gray-400 font-light mb-6" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Based on 160+ verified patient reviews
              </motion.div>

              {/* Professional Trust Indicators */}
            </div>
          </motion.div>

          {/* Professional Reviews Carousel */}
          <div className="max-w-7xl mx-auto relative">
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
              itemClass="px-3"
              dotListClass="custom-dot-list-style"
              arrows={true}
              renderButtonGroupOutside={true}
              customLeftArrow={<CustomLeftArrow />}
              customRightArrow={<CustomRightArrow />}
            >
              {displayReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="h-full professional-review-card py-4"
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="h-[400px] w-full bg-gray-900/30 backdrop-blur-sm border border-gray-800/30 hover:border-gray-700/50 transition-all duration-500 rounded-lg shadow-xl">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* Professional Header */}
                      <div className="flex items-start gap-4 mb-4 flex-shrink-0">
                        <motion.div 
                          className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={review.image}
                            alt={`${review.name} from ${review.country}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-xl font-semibold leading-tight mb-2 truncate" style={{ 
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            {review.name}
                          </h3>
                          <p className="text-gray-400 text-sm font-medium mb-3 truncate">
                            {review.country}
                          </p>
                          
                          {/* Simple Rating */}
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Extended Review Text */}
                      <div className="flex-1 mb-4 overflow-hidden">
                        <motion.p 
                          className="text-gray-200 leading-relaxed text-sm overflow-hidden"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '400',
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: 'vertical'
                          }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 1 }}
                          viewport={{ once: true }}
                        >
                          {review.text}
                        </motion.p>
                      </div>

                      {/* Professional Footer */}
                      <div className="flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2 text-sm text-gray-400 truncate">
                          <span>Patient Review</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Carousel>
          </div>

          {/* Professional CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://instagram.com/happysmileclinics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-500"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>View More Patient Stories</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}