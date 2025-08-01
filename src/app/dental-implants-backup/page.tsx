'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import styles from './dental-implants.module.css'

const faqItems = [
  {
    question: 'WHAT ARE DENTAL IMPLANTS?',
    answer: 'Dental implants are titanium posts that are surgically placed into the jawbone to replace missing tooth roots. They provide a strong foundation for fixed or removable replacement teeth that are made to match your natural teeth. Our professional oral surgeons & implant team is highly experienced in implants and works closely with our master ceramist to create natural or dramatic results.'
  },
  {
    question: 'WHAT ARE THE BENEFITS OF DENTAL IMPLANTS?',
    answer: 'Dental implants offer numerous advantages: they look and feel like natural teeth, preserve facial structure by preventing bone loss, don\'t require altering adjacent healthy teeth, and can last a lifetime with proper care. They also restore full chewing power and eliminate the inconvenience of removable dentures.'
  },
  {
    question: 'WHY DO WE LOSE OUR TEETH?',
    answer: 'Tooth loss can occur due to various reasons including advanced gum disease, severe tooth decay, trauma or injury, genetic conditions, and certain medical treatments. Understanding the cause helps in determining the best treatment approach for replacement.'
  },
  {
    question: 'WHY DO WE NEED IMPLANTS?',
    answer: 'Dental implants are essential for maintaining oral health, preserving jawbone structure, restoring proper chewing function, improving speech, and maintaining facial aesthetics. They prevent the bone loss that occurs when teeth are missing and provide a permanent solution for tooth replacement.'
  },
  {
    question: 'WHAT MAKES DENTAL IMPLANTS "THE GOLD STANDARD"?',
    answer: 'Dental implants are considered the gold standard because they provide the most natural-looking and functional replacement for missing teeth. They integrate with the jawbone, prevent bone loss, don\'t affect adjacent teeth, and can last a lifetime with proper care.'
  },
  {
    question: 'WHAT IS THE SUCCESS RATE OF DENTAL IMPLANTS?',
    answer: 'Dental implants have a success rate of over 95% when placed by experienced professionals. Success depends on proper patient selection, surgical technique, and post-operative care. Our clinic maintains excellent success rates through advanced technology and experienced specialists.'
  },
  {
    question: 'WHAT IS THE QUALITY OF DENTAL IMPLANTS?',
    answer: 'We use only the highest quality implant systems from leading manufacturers. Our implants are made from medical-grade titanium, which is biocompatible and integrates naturally with bone tissue. We also use premium materials for crowns and restorations to ensure optimal aesthetics and durability.'
  },
  {
    question: 'ARE IMPLANTS BETTER THAN DENTURES?',
    answer: 'Yes, dental implants are significantly better than traditional dentures. They provide superior stability, comfort, and chewing efficiency. Unlike dentures, implants don\'t slip or cause speech problems, and they prevent bone loss in the jaw. They also look and feel more natural.'
  },
  {
    question: 'DO DENTAL IMPLANTS LOOK NATURAL?',
    answer: 'Absolutely. Modern dental implants are designed to look completely natural. Our custom-made crowns are color-matched to your existing teeth and shaped to blend seamlessly with your smile. Most people cannot tell the difference between natural teeth and well-placed implants.'
  },
  {
    question: 'CAN I EAT ANYTHING WITH DENTAL IMPLANTS?',
    answer: 'Yes, once fully healed, you can eat virtually anything with dental implants. They provide the same chewing power as natural teeth, allowing you to enjoy all your favorite foods without restrictions. This is one of the major advantages over traditional dentures.'
  },
  {
    question: 'HOW DO DENTAL IMPLANTS PREVENT BONE LOSS?',
    answer: 'Dental implants stimulate the jawbone just like natural tooth roots, preventing the bone resorption that occurs when teeth are missing. This stimulation maintains bone density and preserves facial structure, preventing the sunken appearance that often occurs with missing teeth.'
  },
  {
    question: 'ARE THERE ANY ADDITIONAL PROCEDURES NEEDED?',
    answer: 'Some patients may require additional procedures such as bone grafting if they have insufficient bone density, or sinus lifts for upper jaw implants. These procedures are common and help ensure the long-term success of your implants. We assess each patient individually.'
  },
  {
    question: 'IS IT PAINFUL TO GET DENTAL IMPLANTS?',
    answer: 'Most patients report that implant surgery is much more comfortable than they expected. We use local anesthesia and sedation options to ensure a pain-free experience. Post-operative discomfort is typically minimal and can be managed with over-the-counter pain medications.'
  }
]

const stats = [
  { number: "98%", label: "Success Rate" },
  { number: "3000+", label: "Happy Patients" },
  { number: "15+", label: "Years Experience" },
  { number: "5★", label: "Patient Rating" },
]

export default function DentalImplantsPage() {
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
    img.src = '/images/hero/dental-patients-hero.webp'
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

  // Removed old animation code - using simpler animations now

  return (
    <>
      <Header />
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      <main ref={containerRef} className="bg-black text-white" style={{ overflowX: 'hidden' }}>
        {/* Hero Section - Ultra Minimalist */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
          {/* Background with Scroll Animation Only */}
          <div className="absolute inset-0">
            {/* Static background for mobile */}
            <div 
              className="absolute inset-0 md:hidden"
              style={{
                backgroundImage: 'url("/images/hero/dental-patients-hero.webp")',
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
                  backgroundImage: 'url("/images/hero/dental-patients-hero.webp")',
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
                      DENTAL
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
                  Transform your smile with permanent, natural-looking dental implants that seamlessly integrate with your natural teeth.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center"
                   style={{ 
                     fontFamily: '"Inter", sans-serif',
                     fontWeight: '300',
                     textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                   }}
                >
                  Our state-of-the-art facility combines cutting-edge technology with decades of expertise to deliver exceptional results. Experience the confidence of a perfect smile that lasts a lifetime.
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


        {/* Visual-Text Blend Section 1 - Mobile Optimized with Parallax */}
        <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                {/* Floating Number - Mobile Hidden on Small Screens */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="absolute -left-4 sm:-left-8 md:-left-12 top-0 text-[100px] sm:text-[140px] md:text-[180px] font-thin text-white/[0.02] select-none hidden sm:block"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  01
                </motion.div>
                
                <div className="space-y-6">
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 15px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.05)'
                    }}
                  >
                    <span className="block">NATURAL</span>
                    <span className="block text-blue-400/80">PERFECTION</span>
                  </motion.h2>
                  
                  <div className="space-y-4">
                    <motion.p 
                      className="text-sm sm:text-base text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '300',
                        textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                      }}
                    >
                      Dental implants represent the pinnacle of modern restorative dentistry, offering a revolutionary solution that goes far beyond traditional tooth replacement methods. These sophisticated titanium posts are meticulously engineered to mimic the natural root structure of your teeth.
                    </motion.p>
                    
                    <motion.p 
                      className="text-sm sm:text-base text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '300',
                        textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                      }}
                    >
                      Through a process called osseointegration, the implant literally becomes part of your jawbone, creating an unbreakable bond that provides unparalleled stability and longevity. This biological fusion ensures that your new teeth feel completely natural.
                    </motion.p>
                    
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-400 leading-relaxed hidden sm:block"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      viewport={{ once: true }}
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: '300'
                      }}
                    >
                      Our advanced techniques ensure perfect harmony between form and function, delivering results that are indistinguishable from natural teeth while providing superior durability and performance.
                    </motion.p>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-px bg-white/30" />
                      <span className="text-xs uppercase tracking-widest text-gray-500">Premium Materials</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Visual Content - Mobile Optimized with Parallax */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative mt-8 lg:mt-0"
              >
                {/* Background accent */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                
                <motion.div 
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="optimized-image">
                    <Image
                      src="/images/services/implants.webp"
                      alt="Dental implant visualization"
                      width={700}
                      height={800}
                      className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating text overlay - Mobile Optimized */}
                  <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-black/50 backdrop-blur-md rounded-lg p-3 sm:p-4">
                      <p className="text-white/90 text-xs sm:text-sm font-light uppercase tracking-wider">
                        Titanium Integration
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visual-Text Blend Section 2 - Mobile Optimized */}
        <section className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
              {/* Visual Content - Mobile First, Desktop Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                {/* Background accent */}
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src="/images/services/smile-design.webp"
                    alt="All-on-Four dental implants"
                    width={700}
                    height={800}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-full object-cover"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating text overlay - Mobile Optimized */}
                  <motion.div
                    className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-black/50 backdrop-blur-md rounded-lg p-3 sm:p-4">
                      <p className="text-white/90 text-xs sm:text-sm font-light uppercase tracking-wider">
                        Full Arch Solution
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content - Mobile First, Desktop Right */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative z-10 order-1 lg:order-2"
              >
                {/* Floating Number - Mobile Hidden on Small Screens */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="absolute -right-4 sm:-right-8 md:-right-12 top-0 text-[100px] sm:text-[140px] md:text-[180px] font-thin text-white/[0.02] select-none hidden sm:block"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  02
                </motion.div>
                
                <div className="space-y-6">
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 15px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.05)'
                    }}
                  >
                    <span className="block">ALL-ON-FOUR</span>
                    <span className="block text-purple-400/80">TECHNOLOGY</span>
                  </motion.h2>
                  
                  <motion.p 
                    className="text-sm sm:text-base text-gray-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: '300',
                      textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                    }}
                  >
                    Revolutionary full-arch rehabilitation using just four strategically placed implants. 
                    <span className="hidden sm:inline">This innovative approach provides immediate function and aesthetics, transforming smiles in a single day.</span>
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 pt-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-px bg-white/30" />
                      <span className="text-xs uppercase tracking-widest text-gray-500">Same Day Results</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Minimalist Text Feature Section - Enhanced Scroll Effects */}
        <section className="py-20 sm:py-32 bg-black relative">
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-12 sm:space-y-16"
            >
              <motion.h3 
                className="text-2xl sm:text-3xl md:text-4xl font-thin text-white uppercase tracking-wide"
                viewport={{ once: true }}
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                Why Choose Implants
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                {[
                  { 
                    title: "LIFETIME SOLUTION", 
                    desc: "Unlike traditional dentures or bridges that require replacement every 5-10 years, dental implants are designed to last a lifetime. Made from biocompatible titanium, they become a permanent part of your jaw structure.",
                    detail: "With proper oral hygiene and regular check-ups, your implants can serve you for decades without any degradation in function or appearance.",
                    icon: "∞" 
                  },
                  { 
                    title: "BONE PRESERVATION", 
                    desc: "When you lose a tooth, the underlying bone begins to deteriorate immediately. Dental implants are the only solution that actively stimulates bone growth through natural chewing forces.",
                    detail: "This preservation of bone density maintains your facial structure and prevents the sunken appearance often associated with tooth loss.",
                    icon: "◆" 
                  },
                  { 
                    title: "NATURAL FUNCTION", 
                    desc: "Dental implants restore 100% of your chewing power, allowing you to enjoy all your favorite foods without restriction. They feel and function exactly like natural teeth.",
                    detail: "No more avoiding certain foods, no more speech impediments, and no more worrying about dentures slipping at inopportune moments.",
                    icon: "✦" 
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    viewport={{ once: true }}
                    className="group relative p-6 sm:p-8 rounded-xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:border-white/20 transition-all duration-700 overflow-hidden"
                  >
                    
                    {/* Icon */}
                    <div className="text-3xl sm:text-4xl text-white/20 mb-6 group-hover:text-white/40 transition-colors duration-500">
                      {feature.icon}
                    </div>
                    
                    <h4 className="text-sm sm:text-base font-light text-white mb-4 tracking-[0.15em] sm:tracking-widest group-hover:text-blue-400 transition-colors duration-500"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {feature.title}
                    </h4>
                    
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed"
                         style={{ 
                           fontFamily: '"Inter", sans-serif', 
                           fontWeight: '300',
                           textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                         }}
                      >
                        {feature.desc}
                      </p>
                      
                      <motion.p 
                        className="text-xs text-gray-400 leading-relaxed overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{ 
                          fontFamily: '"Inter", sans-serif', 
                          fontWeight: '300'
                        }}
                      >
                        {feature.detail}
                      </motion.p>
                    </div>
                    
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Implant Process Steps - Mobile Interactive */}
        <section className="py-20 sm:py-32 bg-black relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-thin text-white uppercase tracking-wide mb-4"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
              >
                Your Journey to a New Smile
              </h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto"
                 style={{ fontFamily: '"Inter", sans-serif', fontWeight: '300' }}
              >
                From initial consultation to your perfect smile, every step is carefully planned and executed with precision
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  step: "01",
                  title: "CONSULTATION",
                  desc: "Your journey begins with a comprehensive consultation where we assess your oral health, discuss your goals, and create a personalized treatment plan.",
                  detail: "Advanced 3D imaging technology allows us to visualize your jaw structure and plan implant placement with millimeter precision.",
                  duration: "60-90 minutes"
                },
                {
                  step: "02",
                  title: "PREPARATION",
                  desc: "We prepare your mouth for implant placement, which may include tooth extraction, bone grafting, or sinus lifting if necessary.",
                  detail: "Our minimally invasive techniques ensure faster healing and reduced discomfort throughout the preparation phase.",
                  duration: "1-3 months healing"
                },
                {
                  step: "03",
                  title: "IMPLANT PLACEMENT",
                  desc: "The titanium implant is surgically placed into your jawbone with precision guidance technology for optimal positioning.",
                  detail: "Most patients are surprised by how comfortable the procedure is, often comparing it to a routine filling.",
                  duration: "30-60 minutes per implant"
                },
                {
                  step: "04",
                  title: "RESTORATION",
                  desc: "After healing, your custom-crafted crown is attached to the implant, completing your smile transformation.",
                  detail: "Each restoration is meticulously designed to match your natural teeth in color, shape, and function.",
                  duration: "2-3 weeks fabrication"
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Step Number */}
                  <motion.div 
                    className="text-6xl sm:text-7xl font-thin text-white/5 absolute -top-4 -left-2"
                    whileInView={{ opacity: [0, 0.05] }}
                    transition={{ duration: 1 }}
                  >
                    {process.step}
                  </motion.div>
                  
                  <div className="relative z-10 p-6 sm:p-8 h-full bg-white/[0.02] backdrop-blur-sm rounded-xl border border-white/[0.05] hover:border-white/20 transition-all duration-700">
                    <div className="mb-4">
                      <span className="text-xs text-blue-400/80 font-light tracking-widest">
                        {process.duration}
                      </span>
                    </div>
                    
                    <h4 className="text-sm sm:text-base font-light text-white mb-4 tracking-widest"
                        style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {process.title}
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3"
                       style={{ 
                         fontFamily: '"Inter", sans-serif', 
                         fontWeight: '300',
                         textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                       }}
                    >
                      {process.desc}
                    </p>
                    
                    <motion.p 
                      className="text-xs text-gray-400 leading-relaxed"
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      style={{ 
                        fontFamily: '"Inter", sans-serif', 
                        fontWeight: '300'
                      }}
                    >
                      {process.detail}
                    </motion.p>
                    
                    {/* Progress Line */}
                    {index < 3 && (
                      <motion.div 
                        className="absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent hidden lg:block"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Mobile Optimized */}
        <section className="py-16 sm:py-24 md:py-32 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-thin text-white text-center mb-12 sm:mb-20 uppercase tracking-wide"
                  style={{ 
                    fontFamily: '"Inter", sans-serif',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
              >
                Frequently Asked
              </h2>
            </motion.div>
            
            <div className="space-y-0 divide-y divide-white/10">
              {faqItems.slice(0, 8).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer faq-item"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="py-4 sm:py-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm sm:text-base font-light text-white pr-2 sm:pr-8 sm:hover:text-gray-300 transition-colors duration-300"
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            lineHeight: '1.5'
                          }}
                      >
                        {item.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <div className="w-4 h-4 relative touch-manipulation">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-px bg-white/60 sm:group-hover:bg-white/80 transition-colors" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-full w-px bg-white/60 sm:group-hover:bg-white/80 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: openFaq === index ? 'auto' : 0,
                        opacity: openFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mt-4 pr-8 sm:pr-12"
                         style={{ 
                           fontFamily: '"Inter", sans-serif', 
                           fontWeight: '300',
                           textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                         }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section - Mobile Optimized */}
        <section className="py-16 sm:py-24 md:py-32 bg-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-20"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white uppercase tracking-tight mb-4 sm:mb-6"
                  style={{ 
                    fontFamily: '"Inter", sans-serif', 
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 15px rgba(0,0,0,0.5)'
                  }}
              >
                GET STARTED
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto px-4"
                 style={{ 
                   fontFamily: '"Inter", sans-serif', 
                   fontWeight: '300',
                   textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                 }}
              >
                Begin your journey to a perfect smile with a free consultation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16 xl:gap-24">
              {/* Contact Info - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8 text-center lg:text-left"
              >
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:bg-transparent lg:p-0">
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Contact
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <a href="tel:+908503059595" className="block text-white font-light hover:text-blue-400 transition-colors">
                      +90 850 305 95 95
                    </a>
                    <a href="mailto:hello@hsctro.com" className="block text-white font-light hover:text-blue-400 transition-colors">
                      hello@hsctro.com
                    </a>
                  </div>
                </div>
                
                <div className="bg-white/[0.02] backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:bg-transparent lg:p-0">
                  <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4"
                      style={{ fontFamily: '"Inter", sans-serif' }}
                  >
                    Location
                  </h3>
                  <p className="text-white font-light text-sm leading-relaxed">
                    Altunizade, Kısıklı Cad.<br />
                    34662 Üsküdar/İstanbul
                  </p>
                </div>
              </motion.div>

              {/* Quick Form - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 text-sm transition-all duration-300 font-light"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 text-sm transition-all duration-300 font-light"
                    />
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 text-sm transition-all duration-300 font-light"
                  />
                  
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="w-full px-0 py-4 bg-transparent border-b border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/40 resize-none text-sm transition-all duration-300 font-light"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-center pt-4 sm:pt-8">
                    <span className="text-xs text-gray-400 uppercase tracking-wider order-2 sm:order-1">
                      Free Consultation
                    </span>
                    <Button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-xs uppercase tracking-wider font-light transition-all duration-300 w-full sm:w-auto order-1 sm:order-2 touch-manipulation active:scale-95">
                      Send Request
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}