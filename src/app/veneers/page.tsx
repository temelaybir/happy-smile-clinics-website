'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Star, Award, Clock, Users, Sparkles, Shield, Palette, Zap } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const treatmentTypes = [
  {
    title: "Porcelain Veneers",
    description: "Ultra-thin porcelain shells custom-crafted for natural beauty and durability",
    features: ["Natural translucency", "Stain resistant", "15-20 year lifespan", "Custom color matching"],
    bestFor: "Major smile transformations and long-term results",
    icon: <Sparkles className="w-6 h-6 text-pink-500" />
  },
  {
    title: "Composite Veneers", 
    description: "Direct resin veneers applied and sculpted in a single visit",
    features: ["Same-day treatment", "More affordable", "Reversible procedure", "Easy repairs"],
    bestFor: "Minor corrections and budget-conscious patients",
    icon: <Zap className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Zirconia Crowns",
    description: "Full coverage crowns made from premium zirconia for maximum strength",
    features: ["Maximum durability", "Natural appearance", "Metal-free", "Biocompatible"],
    bestFor: "Heavily damaged teeth requiring full coverage",
    icon: <Shield className="w-6 h-6 text-yellow-500" />
  }
]

const process = [
  {
    step: "01",
    title: "Digital Smile Design",
    description: "Advanced imaging to preview your perfect smile before treatment"
  },
  {
    step: "02", 
    title: "Tooth Preparation",
    description: "Minimal tooth preparation to preserve maximum natural structure"
  },
  {
    step: "03",
    title: "Impression & Temporaries",
    description: "Precise impressions and beautiful temporary veneers"
  },
  {
    step: "04",
    title: "Final Placement",
    description: "Expert bonding for a perfect, long-lasting smile"
  }
]

const faqItems = [
  {
    question: 'What are Porcelain Veneers?',
    answer: 'Porcelain veneers are ultra-thin shells of medical-grade ceramic that are attached to the front surfaces of teeth. They are custom-made to match your natural teeth and can transform your smile by correcting issues like discoloration, chips, gaps, and misalignment.'
  },
  {
    question: 'How Long Do Veneers Last?',
    answer: 'With proper care, porcelain veneers typically last 15-20 years, while composite veneers last 5-7 years. The lifespan depends on factors like oral hygiene, lifestyle habits, and the quality of the initial placement. Regular dental check-ups help ensure longevity.'
  },
  {
    question: 'Are Veneers Reversible?',
    answer: 'Traditional porcelain veneers require some tooth preparation and are not reversible. However, minimal-prep or no-prep veneers preserve more tooth structure. Composite veneers are generally reversible as they require little to no tooth preparation.'
  },
  {
    question: 'What is the Difference Between Veneers and Crowns?',
    answer: 'Veneers cover only the front surface of teeth and require minimal tooth preparation. Crowns cover the entire tooth and require more extensive preparation. Veneers are ideal for cosmetic improvements, while crowns are better for severely damaged teeth.'
  },
  {
    question: 'How Many Visits Are Required?',
    answer: 'Porcelain veneers typically require 2-3 visits over 2-3 weeks: consultation and planning, preparation and temporaries, and final placement. Composite veneers can often be completed in a single visit.'
  },
  {
    question: 'Do Veneers Look Natural?',
    answer: 'Modern veneers are designed to look completely natural. We customize the shape, size, color, and translucency to match your natural teeth and facial features. Our expert ceramists create veneers that are virtually indistinguishable from natural teeth.'
  }
]

export default function VeneersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }
  
  // Preload hero image
  useEffect(() => {
    const img = new window.Image()
    img.src = '/images/hero/veneers-hero.webp'
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

  return (
    <>
      <Header />
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <main ref={containerRef} className="bg-black text-white" style={{ overflowX: 'hidden' }}>
        {/* Hero Section - Dental Implants Style */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
          {/* Background with Scroll Animation Only */}
          <div className="absolute inset-0" style={{ willChange: 'auto' }}>
            {/* Static background for mobile */}
            <div 
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: 'url("/images/hero/veneers-hero.webp")',
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
                  backgroundImage: 'url("/images/hero/veneers-hero.webp")',
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
                      VENEERS &
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden mt-1 sm:mt-2">
                    <motion.span
                      className="block relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    >
                      CROWNS
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
                  Transform your smile with custom-crafted porcelain veneers and zirconia crowns. Experience the perfect blend of artistry and technology.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center"
                   style={{ 
                     fontFamily: '"Inter", sans-serif',
                     fontWeight: '300',
                     textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                   }}
                >
                  Our expert cosmetic dentists create natural-looking, long-lasting results that enhance your unique features and boost your confidence.
                </p>
              </motion.div>

              {/* Mobile-Friendly CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="flex justify-center w-full px-4"
              >
                <Button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-wider font-light transition-all duration-500 group w-full sm:w-auto max-w-xs">
                  Design Your Smile
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

        {/* Treatment Types Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Treatment Options
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Choose from our range of premium cosmetic dental solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {treatmentTypes.map((treatment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 rounded-xl p-8"
                >
                  <div className="mb-6">{treatment.icon}</div>
                  <h3 className="text-2xl font-light text-white mb-4">{treatment.title}</h3>
                  <p className="text-gray-400 mb-6">{treatment.description}</p>
                  <ul className="space-y-2 mb-6">
                    {treatment.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500">
                    <span className="font-light">Best for:</span> {treatment.bestFor}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-gray-950 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                The Treatment Journey
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Your path to a perfect smile in four simple steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-light text-purple-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                  Why Choose Veneers?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Veneers offer a minimally invasive solution to dramatically improve your smile. Our custom-crafted veneers address multiple cosmetic concerns while preserving your natural tooth structure.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Fix chips, cracks, and worn edges instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Close gaps and correct minor misalignments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Whiten permanently stained teeth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Create uniform shape and size for perfect symmetry</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/veneers-result.jpg"
                    alt="Veneer Treatment Result"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Before & After Gallery
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                See the dramatic transformations achieved with our veneer treatments
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: num * 0.1 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={`/images/gallery/${num}.jpg`}
                    alt={`Before & After ${num}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-light">View Case Study</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-400">
                Everything you need to know about veneers and crowns
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <h3 className="text-lg font-light text-white pr-4">{item.question}</h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Ready for Your Dream Smile?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Start your smile transformation journey with a personalized consultation
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 text-lg font-light">
                Book Your Smile Design Session
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}