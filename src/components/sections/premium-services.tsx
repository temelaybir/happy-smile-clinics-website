'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { ArrowUpRight, Zap, Diamond } from 'lucide-react'
import StandardButton from '@/components/ui/standard-button'

const services = [
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement with titanium precision. All-on-4 technology for complete smile restoration.',
    image: '/images/services/implantshome.webp',
    color: '#00D4FF',
    href: '/dental-implants'
  },
  {
    id: 'veneers', 
    title: 'Porcelain Veneers',
    description: 'Ultra-thin porcelain shells designed with digital precision. Transform your smile in just one visit.',
    image: '/images/services/veneershome.webp',
    color: '#FF6B9D',
    href: '/veneers'
  }
]

export default function PremiumServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" })

  return (
    <section ref={sectionRef} className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-white/90 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </motion.div>

        {/* Services Grid - Horizontal */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="group relative"
            >
              {/* Clickable Image */}
              <Link href={service.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 cursor-pointer"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Color Overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}40, transparent)` 
                    }}
                  />

                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowUpRight className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-light text-white group-hover:translate-x-2 transition-transform duration-500">
                  {service.title}
                </h3>
                
                <p className="text-lg text-gray-300 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA */}
                <StandardButton
                  href={service.href}
                  icon={<ArrowUpRight className="w-5 h-5" />}
                  className="text-sm tracking-wider uppercase"
                >
                  Learn More
                </StandardButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-xl text-gray-400 font-light italic max-w-2xl mx-auto">
            "Excellence in dental care through precision, artistry, and innovation."
          </p>
        </motion.div>

      </div>
    </section>
  )
}