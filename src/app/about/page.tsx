'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import ContactFormPopup from "@/components/ui/contact-form-popup"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Award, Clock, Users, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    id: '01',
    title: 'Complete Smile Makeover',
    category: 'Full Mouth Rehabilitation',
    image: '/images/gallery/1.jpg',
    description: 'Transform your entire smile with our comprehensive treatment approach'
  },
  {
    id: '02',
    title: 'Hollywood Smile Design',
    category: 'Cosmetic Dentistry',
    image: '/images/gallery/2.jpg',
    description: 'Achieve the perfect celebrity smile with custom veneers'
  },
  {
    id: '03',
    title: 'All-on-4 Implants',
    category: 'Dental Implants',
    image: '/images/gallery/3.jpg',
    description: 'Full arch restoration with just four strategic implants'
  },
  {
    id: '04',
    title: 'Digital Smile Design',
    category: 'Advanced Technology',
    image: '/images/gallery/4.jpg',
    description: 'Preview your new smile before treatment begins'
  },
  {
    id: '05',
    title: 'Teeth Whitening',
    category: 'Cosmetic Treatment',
    image: '/images/gallery/5.jpg',
    description: 'Professional whitening for a brighter, confident smile'
  },
  {
    id: '06',
    title: 'Orthodontic Solutions',
    category: 'Teeth Alignment',
    image: '/images/gallery/6.jpg',
    description: 'Modern solutions for perfectly aligned teeth'
  }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Preload hero image
  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/hero/about-hero.webp'
  }, [])
  
  useEffect(() => {
    // Simplified scroll handler for better performance
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress((currentScroll / totalScroll) * 100)
    }
    
    // Debounced scroll handler
    let scrollTimeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 10)
    }
    
    window.addEventListener('scroll', debouncedScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in learning more about your dental services."
    const whatsappUrl = `https://wa.me/905053059595?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleContactClick = () => {
    setShowContactModal(true)
  }

  return (
    <>
      <Header />
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <main className="bg-black text-white" ref={containerRef} style={{ overflowX: 'hidden' }}>
        {/* Hero Section - Dental Implants Style */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
          {/* Background with Scroll Animation Only */}
          <div className="absolute inset-0" style={{ willChange: 'auto' }}>
            {/* Static background for mobile */}
            <div 
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: 'url("/images/hero/about-hero.webp")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            {/* Animated background for desktop */}
            <div className="absolute inset-0 hidden md:block overflow-hidden">
              <motion.div 
                className="absolute h-full w-[200%]"
                animate={{
                  x: [0, "-50%"]
                }}
                transition={{
                  x: {
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }
                }}
                style={{
                  backgroundImage: 'url("/images/hero/about-hero.webp")',
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: 'auto 100%',
                  opacity: 0.75
                }}
              />
            </div>
            
            {/* Simple dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Hero Content - Mobile Optimized */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen"
            >
              {/* Page Title with Enhanced Mobile Readability */}
              <div className="mb-8 sm:mb-10 w-full">
                <motion.h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin tracking-tight text-white uppercase text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                    textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="block overflow-hidden">
                    <motion.span
                      className="block relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      ABOUT US
                    </motion.span>
                  </span>
                </motion.h1>
              </div>
              
              {/* Enhanced Mobile Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-10 sm:mb-12 px-4"
              >
                <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed text-center mb-4"
                   style={{ 
                     fontFamily: '"Inter", sans-serif',
                     fontWeight: '300',
                     letterSpacing: '0.01em',
                     textShadow: '0 1px 10px rgba(0,0,0,0.5)'
                   }}
                >
                  World-class dental care with a personal touch. Experience exceptional results through cutting-edge technology and compassionate service.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center"
                   style={{ 
                     fontFamily: '"Inter", sans-serif',
                     fontWeight: '300',
                     textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                   }}
                >
                  Since 2009, we&apos;ve been transforming smiles and changing lives with our comprehensive approach to dental excellence.
                </p>
              </motion.div>

              {/* Mobile-Friendly CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex justify-center w-full px-4"
              >
                <Button 
                  onClick={handleContactClick}
                  className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-wider font-light transition-all duration-500 group w-full sm:w-auto max-w-xs"
                >
                  Discover Our Story
                  <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile-Optimized Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-light">Scroll</span>
            </motion.div>
          </motion.div>
        </section>

        {/* About Content Section - Dark Theme */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Left - Image */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                >
                  <Image
                    src="/images/clinic-interior.jpg"
                    alt="Happy Smile Clinic Interior"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                {/* Floating accent */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-2xl"
                />
              </div>

              {/* Right - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                    Transforming Smiles,
                    <span className="block text-green-400">Changing Lives</span>
                  </h2>
                  
                  <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Since our founding in 2009, Happy Smile Clinics has been at the forefront of dental innovation. We combine artistry with advanced technology to create smiles that not only look beautiful but also function perfectly.
                    </p>
                    <p>
                      Our team of internationally trained specialists is dedicated to providing personalized care that exceeds expectations. From simple treatments to complex full-mouth rehabilitations, we approach each case with precision and care.
                    </p>
                    <p>
                      We believe everyone deserves a smile they can be proud of. That&apos;s why we&apos;ve made it our mission to provide world-class dental care that&apos;s accessible to patients from around the globe.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-light text-gray-400">ISO Certified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-light text-gray-400">15+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-light text-gray-400">Expert Team</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid - Dark Theme */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-light text-green-400 tracking-wider uppercase mb-4 block">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Treatments We Offer
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                From cosmetic enhancements to complete restorations, we provide comprehensive dental solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
                  onMouseLeave={() => !isMobile && setHoveredProject(null)}
                  className="group cursor-pointer"
                >
                  <Link href={`/services/${project.id}`}>
                    <div className="relative">
                      {/* Project Number */}
                      <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-sm font-light text-white">{project.id}</span>
                      </div>

                      {/* Image Container */}
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-900">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className={`object-cover transition-transform duration-700 ${
                            hoveredProject === project.id || isMobile ? 'scale-110' : 'scale-100'
                          }`}
                        />
                        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                          hoveredProject === project.id || isMobile ? 'opacity-40' : 'opacity-0'
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="mt-6">
                        <p className="text-sm text-green-400 font-light mb-2">{project.category}</p>
                        <h3 className="text-2xl font-light text-white mb-2 group-hover:text-green-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Button 
                onClick={handleContactClick}
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 py-6 text-base font-light group transition-all duration-300"
              >
                View All Services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Values Section - Dark Theme */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-light text-green-400 tracking-wider uppercase mb-4 block">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                The Happy Smile Difference
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Team",
                  description: "Internationally trained specialists with decades of combined experience",
                  icon: Users
                },
                {
                  title: "Advanced Technology",
                  description: "State-of-the-art equipment for precise diagnosis and treatment",
                  icon: Award
                },
                {
                  title: "Patient Care",
                  description: "Personalized treatment plans tailored to your unique needs",
                  icon: Star
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-950 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
                Ready to Start Your
                <span className="block text-green-400">Smile Journey?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied patients who have transformed their smiles with us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleContactClick}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg font-light group transition-all duration-300"
                >
                  Book Your Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline" 
                  className="border-gray-700 text-white hover:bg-gray-900 px-8 py-6 text-lg font-light transition-all duration-300"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Contact Form Modal */}
      {showContactModal && (
        <ContactFormPopup onClose={() => setShowContactModal(false)} />
      )}
    </>
  )
}