'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])

  useEffect(() => {
    const elements = gsap.utils.toArray('.fade-in-element')
    
    elements.forEach((element: any, index) => {
      gsap.fromTo(element,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true
          },
          delay: index * 0.15
        }
      )
    })

    // Signature animation
    const signature = gsap.timeline({
      scrollTrigger: {
        trigger: '.signature-text',
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      }
    })

    signature.fromTo('.signature-text', 
      { 
        opacity: 0,
        scale: 0.9,
        rotateZ: -2
      },
      { 
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-black overflow-hidden">
      {/* Subtle Background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-transparent to-gray-900/30" />
        {/* Elegant lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </motion.div>

      <div ref={contentRef} className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div className="space-y-8">
            {/* Small Label */}
            <div className="fade-in-element">
              <span className="text-xs font-light text-gray-500 tracking-[0.3em] uppercase">
                Istanbul's Premier Dental Clinic
              </span>
            </div>

            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-6xl font-light text-white mb-4">
                About Happy Smile
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </motion.div>

            {/* Subtitle */}
            <div className="fade-in-element">
              <h3 className="text-2xl md:text-3xl font-extralight text-gray-300 leading-tight mb-6">
                Istanbul's Premier
                <br />
                <span className="italic font-thin">Dental Clinic</span>
                <br />
                Excellence
              </h3>
            </div>

            {/* Description */}
            <div className="fade-in-element max-w-lg">
              <p className="text-lg text-gray-400 font-light leading-relaxed">
                Happy Smile Clinics stands as Istanbul's most prestigious dental destination, 
                where state-of-the-art technology meets unparalleled expertise. Our world-class 
                facility combines luxury, innovation, and compassionate care to deliver 
                transformative results for patients from over 50 countries.
              </p>
            </div>

            {/* Stats */}
            <div className="fade-in-element grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-thin text-white">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-thin text-white">12K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">sqft Facility</div>
              </div>
              <div>
                <div className="text-3xl font-thin text-white">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Patient Support</div>
              </div>
            </div>

            {/* CTA */}
            <motion.div className="fade-in-element pt-4">
              <Link href="/about-us">
                <motion.div 
                  className="group inline-flex items-center gap-4 cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-light tracking-wider">Explore Our Clinic</span>
                  <div className="w-12 h-px bg-white/30 group-hover:bg-white/60 transition-all duration-300" />
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Signature & Image */}
          <motion.div className="relative">
            {/* Background Image */}
            <motion.div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/clinic-interior.jpg"
                alt="Happy Smile Clinics Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>

            {/* Clinic Info Overlay */}
            <motion.div 
              className="signature-text absolute bottom-8 left-8 right-8 bg-black/80 backdrop-blur-sm p-8 rounded-xl"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-light text-white mb-2">
                      International Excellence
                    </h3>
                    <div className="text-white/60 text-sm font-light leading-relaxed">
                      Digital Dental Technology<br />
                      All on Four & All on Six Implant System<br />
                      Smile Design
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 border border-white/10 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 border border-white/5 rounded-full"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-3xl font-extralight text-gray-400 italic">
            "Setting the standard for cosmetic dentistry in Europe and beyond"
          </p>
        </motion.div>
      </div>
    </section>
  )
}