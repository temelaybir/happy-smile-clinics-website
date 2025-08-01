'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ServiceItem {
  id: number
  title: string
  subtitle: string
  image: string
  href: string
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "VENEERS &",
    subtitle: "ZIRCONIA CROWNS",
    image: "/images/services/veneers.webp",
    href: "/services/veneers"
  },
  {
    id: 2,
    title: "DENTAL IMPLANTS &",
    subtitle: "ALL ON FOUR",
    image: "/images/services/implants.webp",
    href: "/services/implants"
  },
  {
    id: 3,
    title: "SMILE DESIGN",
    subtitle: "RESULTS GALLERY",
    image: "/images/services/smile-design.webp",
    href: "/gallery"
  },
  {
    id: 4,
    title: "ABOUT US",
    subtitle: "EXCLUSIVE EXPERIENCE",
    image: "/images/services/about.webp",
    href: "/about"
  }
]

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const items = gsap.utils.toArray('.service-item')
    
    items.forEach((item: any, index) => {
      gsap.fromTo(item,
        {
          opacity: 0,
          scale: 0.9,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
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
    <section ref={sectionRef} className="bg-black py-20 overflow-hidden">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Dünya standartlarında tedavi seçenekleri ile mükemmel sonuçlar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-item relative overflow-hidden rounded-2xl aspect-[16/9] group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={service.href} className="block w-full h-full">
                {/* Background Image with Parallax */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ scale: 1.2 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <p className="text-lg lg:text-xl text-gray-300 group-hover:text-white transition-colors duration-300">
                      {service.subtitle}
                    </p>
                    
                    {/* Arrow indicator */}
                    <motion.div
                      className="mt-4 inline-flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -20 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="mr-2">Explore</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}