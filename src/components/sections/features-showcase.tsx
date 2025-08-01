'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 1,
    title: "Advanced Technology",
    description: "State-of-the-art equipment and cutting-edge techniques for the best results",
    icon: "🔬",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "Expert Team",
    description: "Internationally trained specialists with years of experience",
    icon: "👨‍⚕️",
    color: "from-green-500 to-teal-600"
  },
  {
    id: 3,
    title: "Comfort First",
    description: "Painless procedures with premium care and attention to detail",
    icon: "❤️",
    color: "from-pink-500 to-red-600"
  },
  {
    id: 4,
    title: "Global Standards",
    description: "Meeting international quality and safety standards",
    icon: "🌍",
    color: "from-orange-500 to-yellow-600"
  }
]

export default function FeaturesShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    const cards = gsap.utils.toArray('.feature-card')
    
    cards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          rotateX: 60,
          opacity: 0,
          y: 100
        },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
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

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience excellence in dental care with our world-class facility and expert team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card perspective-1000"
              whileHover={{ 
                rotateY: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform-3d">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}