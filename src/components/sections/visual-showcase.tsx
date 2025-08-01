'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const beforeAfter = [
  {
    id: 1,
    before: "/images/carousel/carousel-1.webp",
    after: "/images/carousel/carousel-2.webp",
    title: "Veneers Transformation",
    duration: "5 Days"
  },
  {
    id: 2,
    before: "/images/carousel/carousel-3.webp",
    after: "/images/carousel/carousel-4.jpg",
    title: "Implant Success",
    duration: "3 Days"
  },
  {
    id: 3,
    before: "/images/carousel/carousel-5.webp",
    after: "/images/carousel/carousel-6.webp",
    title: "Complete Smile Design",
    duration: "7 Days"
  }
]

export default function VisualShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  useEffect(() => {
    const items = gsap.utils.toArray('.showcase-item')
    
    items.forEach((item: any, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          scale: 0.8,
          rotateX: 45
        },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
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
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 via-transparent to-transparent" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Animated Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2 className="text-6xl md:text-7xl font-bold mb-6 overflow-hidden">
            {["Transform", "Your", "Smile"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <span className={index === 1 ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600" : "text-gray-900"}>
                  {word}
                </span>
              </motion.span>
            ))}
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            See the incredible transformations our patients achieve with our expert care
          </motion.p>
        </motion.div>

        {/* Before/After Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {beforeAfter.map((item, index) => (
            <motion.div
              key={item.id}
              className="showcase-item group relative"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 perspective-1000">
                {/* Before/After Images */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                  <motion.div
                    className="absolute inset-0 grid grid-cols-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Before */}
                    <div className="relative">
                      <Image
                        src={item.before}
                        alt="Before"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                        Before
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="relative">
                      <Image
                        src={item.after}
                        alt="After"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                        After
                      </div>
                    </div>
                  </motion.div>

                  {/* Divider Line */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white z-10 transform -translate-x-1/2" />
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">Treatment Duration:</span>
                    <span className="font-semibold text-purple-600">{item.duration}</span>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Kinetic Text Animation */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="text-4xl md:text-6xl font-bold text-gray-900 overflow-hidden">
            {["Your", "New", "Smile", "Awaits"].map((word, index) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                initial={{ y: 100, rotateX: 90 }}
                whileInView={{ y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  ease: "backOut"
                }}
                viewport={{ once: true }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}