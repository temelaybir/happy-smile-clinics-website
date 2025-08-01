'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const treatments = [
  {
    id: 1,
    title: "Veneers",
    subtitle: "Your Smile, Your Style",
    description: "Ultra-thin porcelain shells that transform your smile instantly",
    image: "/images/services/veneers.webp",
    stats: { duration: "3-5 Days", satisfaction: "99%", warranty: "10 Years" }
  },
  {
    id: 2,
    title: "Implants",
    subtitle: "Permanent Solution",
    description: "Replace missing teeth with natural-looking, permanent implants",
    image: "/images/services/implants.webp",
    stats: { duration: "1-3 Days", satisfaction: "98%", warranty: "Lifetime" }
  },
  {
    id: 3,
    title: "Smile Design",
    subtitle: "Complete Makeover",
    description: "Comprehensive smile transformation using advanced digital planning",
    image: "/images/services/smile-design.webp",
    stats: { duration: "5-7 Days", satisfaction: "100%", warranty: "15 Years" }
  }
]

export default function MorphingCards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  useEffect(() => {
    const cards = gsap.utils.toArray('.morph-card')
    
    cards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          rotateY: 90,
          z: -200
        },
        {
          opacity: 1,
          rotateY: 0,
          z: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.3
        }
      )
    })

    // Auto-rotate cards
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % treatments.length)
    }, 4000)

    return () => {
      clearInterval(interval)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden perspective-1000">
      <motion.div style={{ scale }} className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Our Treatments
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced dental procedures designed to give you the perfect smile
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              className="morph-card relative group cursor-pointer"
              onMouseEnter={() => setActiveCard(index)}
              whileHover={{ 
                rotateY: 15,
                rotateX: 10,
                z: 50,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className={`relative h-[500px] rounded-3xl overflow-hidden transition-all duration-700 transform-3d ${
                activeCard === index ? 'scale-105 shadow-2xl shadow-purple-500/20' : 'scale-100'
              }`}>
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${treatment.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-lg text-purple-300 mb-4">
                      {treatment.subtitle}
                    </p>
                    <p className="text-gray-300 mb-6 group-hover:text-white transition-colors">
                      {treatment.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-400">Duration</div>
                        <div className="text-white font-semibold">{treatment.stats.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Satisfaction</div>
                        <div className="text-white font-semibold">{treatment.stats.satisfaction}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Warranty</div>
                        <div className="text-white font-semibold">{treatment.stats.warranty}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Morphing Border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  animate={{
                    borderColor: activeCard === index ? 
                      ['rgba(147, 51, 234, 0.5)', 'rgba(236, 72, 153, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(147, 51, 234, 0.5)'] :
                      'rgba(255, 255, 255, 0.1)'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Floating particles */}
                {activeCard === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [-20, -100],
                          opacity: [1, 0],
                          scale: [1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}