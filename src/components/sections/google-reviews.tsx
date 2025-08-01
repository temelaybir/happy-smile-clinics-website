'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

gsap.registerPlugin(ScrollTrigger)

interface Review {
  id: number
  name: string
  country: string
  image: string
  rating: number
  text: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Matthew",
    country: "Malta",
    image: "/images/reviews/matthew.webp",
    rating: 5,
    text: "My name is Matthew Magri from Malta. I can say that now I have the perfect smile. I started this journey from a message with Mr. Ekrem who responded to all of my concerns in impeccable timing. One week prior to my journey to Istanbul, Mr. Ekrem prepared everything for me, including the details of the operation and transportation services. The entire experience from consultation to final result exceeded my expectations. The clinic's modern facilities and professional approach made me feel confident throughout the entire process. I would definitely recommend Happy Smile Clinic to anyone considering dental treatment in Istanbul."
  },
  {
    id: 2,
    name: "Justyna",
    country: "Germany",
    image: "/images/reviews/justyna.webp",
    rating: 5,
    text: "I would like to share my experiences. I am more than happy. I met people who gave me such beautiful smiles. Every step is accompanied by professional staff. I knew that I had found the best clinic with a laboratory. No doubt. I received all the important information before the treatment. The attention to detail was remarkable, and the team made sure I understood every step of the procedure. The results are absolutely stunning, and I feel like a completely new person. The aftercare service was exceptional, and they followed up to ensure my complete satisfaction with the treatment."
  },
  {
    id: 3,
    name: "Shannah",
    country: "Malta",
    image: "/images/reviews/shannah.webp",
    rating: 5,
    text: "I visited Istanbul after careful research in choosing a dental clinic for my perfect smile. I had veneers done at Happy Smile, and they are absolutely perfect! The service is fantastic, and everyone is really kind. They assisted us with transfers to and from the airport, hotel, and clinic. The consultation process was thorough and informative, helping me understand all my options. The clinic's technology is state-of-the-art, and Dr. Saygın's expertise is evident in the flawless results. I'm thrilled with my new smile and the confidence it has given me. The entire team made my dental journey comfortable and stress-free."
  },
  {
    id: 4,
    name: "Olena",
    country: "Canada",
    image: "/images/reviews/olena.webp",
    rating: 5,
    text: "Happy Smile Clinic and its amazing team were incredible. The professionalism and friendliness of the team were absolutely outstanding. The entire office was very up-to-date with modern equipment, and it had such a pleasant environment. I couldn't be happier with the result. From the initial consultation to the final appointment, every interaction was seamless and professional. The clinic's commitment to excellence is evident in every aspect of their service. My new smile has transformed not just my appearance but also my self-confidence. I would highly recommend this clinic to anyone seeking top-quality dental care in a welcoming environment."
  },
  {
    id: 5,
    name: "Sarah",
    country: "UK",
    image: "/images/reviews/sarah.webp",
    rating: 5,
    text: "I traveled from the UK to Istanbul for my dental treatment, and it was the best decision I've ever made. The clinic exceeded all my expectations with their professional service and outstanding results. The team was incredibly welcoming and made sure I was comfortable throughout my entire stay. The quality of work is exceptional - my veneers look so natural that people can't believe they're not my real teeth. The aftercare instructions were clear and comprehensive, and they've been available for any questions I've had since returning home."
  },
  {
    id: 6,
    name: "Michael",
    country: "Australia",
    image: "/images/reviews/michael.webp",
    rating: 5,
    text: "Flying all the way from Australia seemed daunting at first, but Happy Smile Clinic made everything so easy. From the moment I landed, their team took care of everything. The clinic itself is stunning - modern, clean, and equipped with the latest technology. Dr. Saygın and his team are true professionals who genuinely care about their patients. My dental implants were completed flawlessly, and the recovery process was smoother than I expected. The cost savings compared to Australia were significant, and the quality is world-class."
  }
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 3,
    partialVisibilityGutter: 30
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 2.5,
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

export default function GoogleReviews() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  useEffect(() => {
    const reviewCards = gsap.utils.toArray('.google-review-card')
    
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

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="py-24 bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4">
            Google Reviews
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </motion.div>

        {/* Google Rating Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image
              src="/images/google-logo.svg"
              alt="Google"
              width={120}
              height={40}
              className="opacity-90"
            />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          <div className="text-3xl font-light text-white mb-2">
            4.9 out of 5
          </div>
          
          <div className="text-gray-400 text-sm">
            Based on 287 reviews
          </div>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="max-w-7xl mx-auto relative">
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            swipeable={true}
            draggable={true}
            showDots={true}
            partialVisible={true}
            customDot={<CustomDot />}
            renderDotsOutside={true}
            containerClass="carousel-container pb-12"
            itemClass="px-2"
            dotListClass="custom-dot-list-style"
            arrows={true}
            customLeftArrow={
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            }
            customRightArrow={
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            }
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="h-full google-review-card py-4"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="h-[500px] bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Review Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-semibold mb-1">
                          {review.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {review.country}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <Image
                        src="/images/google-icon.svg"
                        alt="Google Review"
                        width={24}
                        height={24}
                        className="opacity-60"
                      />
                    </div>

                    {/* Review Text */}
                    <div className="flex-1 overflow-y-auto">
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {review.text}
                      </p>
                    </div>

                    {/* Review Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Verified Google Review
                        </span>
                        <span className="text-xs text-gray-500">
                          {index % 2 === 0 ? '2 weeks ago' : '1 month ago'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Carousel>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.google.com/search?q=happy+smile+clinics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <span>View All Google Reviews</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}