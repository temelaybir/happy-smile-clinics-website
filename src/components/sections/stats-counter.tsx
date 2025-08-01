'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { id: 1, number: 5000, suffix: '+', title: 'Happy Patients', icon: '😊' },
  { id: 2, number: 15, suffix: '', title: 'Years Experience', icon: '⭐' },
  { id: 3, number: 99, suffix: '%', title: 'Success Rate', icon: '🎯' },
  { id: 4, number: 50, suffix: '+', title: 'Countries Served', icon: '🌍' }
]

function AnimatedNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to({ count: 0 }, {
            count: value,
            duration,
            ease: "power2.out",
            onUpdate: function() {
              setCount(Math.floor(this.targets()[0].count))
            }
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value, duration])

  return <span ref={nodeRef}>{count}</span>
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    const statCards = gsap.utils.toArray('.stat-card')
    
    statCards.forEach((card: any, index) => {
      gsap.fromTo(card,
        {
          scale: 0,
          rotation: 180,
          opacity: 0
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Our Impact
          </h2>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Numbers that speak for our commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="stat-card relative group"
              whileHover={{ 
                scale: 1.1,
                rotateY: 15,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500 transform-3d">
                {/* Floating Icon */}
                <motion.div
                  className="text-6xl mb-4 inline-block"
                  style={{ rotate }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                
                {/* Animated Number */}
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.number} />
                  <span className="text-purple-300">{stat.suffix}</span>
                </div>
                
                <p className="text-purple-200 font-medium text-lg">
                  {stat.title}
                </p>

                {/* Pulsing Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />

                {/* Corner Sparkles */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-50 animate-ping" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-300 rounded-full opacity-70 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -200, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}