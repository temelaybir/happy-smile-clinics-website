'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Star, Award, Clock, Users, Zap, Shield, Smile } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

const benefits = [
  {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: "Same Day Transformation",
    description: "Walk in with missing teeth and walk out with a complete, functional smile in one day"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Minimal Implants Required",
    description: "Only 4-6 implants needed per arch, reducing surgery time and recovery"
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Proven Technology",
    description: "FDA-approved technique with over 20 years of clinical success worldwide"
  },
  {
    icon: <Smile className="w-6 h-6 text-purple-500" />,
    title: "Immediate Function",
    description: "Eat, speak, and smile confidently from day one with your new teeth"
  }
]

const process = [
  {
    step: "01",
    title: "Consultation & Planning",
    description: "3D imaging and digital planning to design your perfect smile"
  },
  {
    step: "02", 
    title: "Implant Placement",
    description: "Precise placement of 4-6 implants using computer-guided surgery"
  },
  {
    step: "03",
    title: "Immediate Loading",
    description: "Temporary bridge attached immediately for instant function"
  },
  {
    step: "04",
    title: "Final Restoration",
    description: "Custom permanent bridge fitted after healing period"
  }
]

const faqItems = [
  {
    question: 'What is All-on-4 Treatment?',
    answer: 'All-on-4 is a revolutionary dental implant technique that replaces a full arch of teeth using only 4 strategically placed implants. This innovative approach provides a complete set of fixed teeth in a single day, eliminating the need for removable dentures.'
  },
  {
    question: 'How is All-on-4 Different from Traditional Implants?',
    answer: 'Traditional full-mouth implants may require 8-10 implants per arch and multiple surgeries. All-on-4 uses just 4 precisely angled implants that maximize bone contact and allow immediate loading, reducing treatment time from months to a single day.'
  },
  {
    question: 'Am I a Candidate for All-on-4?',
    answer: 'Most patients who have lost most or all of their teeth are candidates for All-on-4. Even patients with significant bone loss can often benefit from this treatment without needing bone grafting, thanks to the angled placement technique.'
  },
  {
    question: 'How Long Does All-on-4 Treatment Take?',
    answer: 'The initial surgery and temporary teeth placement can be completed in one day. After a 3-6 month healing period, the final custom prosthesis is fitted. Some patients may need preliminary procedures, extending the timeline slightly.'
  },
  {
    question: 'What is the Recovery Like?',
    answer: 'Most patients experience minimal discomfort and can return to soft foods immediately. Swelling typically subsides within a few days, and patients can gradually return to normal activities within a week while following post-operative instructions.'
  },
  {
    question: 'How Long Do All-on-4 Implants Last?',
    answer: 'With proper care and maintenance, All-on-4 implants can last 20+ years or even a lifetime. The prosthetic teeth may need replacement after 10-15 years due to normal wear, but the implants themselves are designed to be permanent.'
  }
]

export default function AllOnFourPage() {
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
    img.src = '/images/hero/all-on-four-hero.webp'
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
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
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
                backgroundImage: 'url("/images/hero/all-on-four-hero.webp")',
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
                  backgroundImage: 'url("/images/hero/all-on-four-hero.webp")',
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
                      ALL-ON-4
                    </motion.span>
                  </span>
                  <span className="block overflow-hidden mt-1 sm:mt-2">
                    <motion.span
                      className="block relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    >
                      IMPLANTS
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
                  Transform your life with a complete set of fixed teeth in just one day. Experience the revolutionary technique that has changed millions of smiles worldwide.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center"
                   style={{ 
                     fontFamily: '"Inter", sans-serif',
                     fontWeight: '300',
                     textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                   }}
                >
                  Our All-on-4 treatment combines cutting-edge technology with expert care to deliver permanent, natural-looking results with minimal surgery and maximum comfort.
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
                  Start Your Journey
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

        {/* Benefits Section */}
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
                Why Choose All-on-4?
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Revolutionary dental implant technique that provides a complete set of teeth in just one day with minimal implants and maximum comfort.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 rounded-xl p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-light mb-3 text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
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
                The Treatment Process
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                From consultation to your new smile - a seamless journey
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
                  <div className="w-20 h-20 bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-light text-orange-400">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-light text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Comparison Section */}
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
                  Life-Changing Results
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  All-on-4 treatment provides immediate results that transform not just your smile, but your entire quality of life. Our patients report increased confidence, improved nutrition, and enhanced social interactions.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Complete arch restoration with only 4 implants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Immediate function - eat and smile the same day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">No bone grafting required in most cases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">Permanent solution that looks and feels natural</span>
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
                    src="/images/services/all-on-4-result.jpg"
                    alt="All-on-4 Treatment Result"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 md:py-32 bg-gray-950">
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
                Everything you need to know about All-on-4 treatment
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
        <section className="py-20 md:py-32 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
                Ready for Your New Smile?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands who have transformed their lives with All-on-4 implants
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 text-lg font-light">
                Schedule Free Consultation
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