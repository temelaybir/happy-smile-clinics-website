'use client'

import { use, useEffect, useState, useRef } from 'react'
import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import ContactSection from "@/components/sections/contact-section"
import FAQ from "@/components/sections/faq"
import ContactFormPopup from "@/components/ui/contact-form-popup"
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2, MessageCircle, Mail } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import SectionButtons from '@/components/SectionButtons'

interface PageSection {
  id: string
  type: 'hero' | 'text' | 'image-text' | 'cta'
  title: string
  content: string
  image?: string
  order: number
  metadata?: any
}

interface ButtonSettings {
  text: string
  url: string
  openInNewTab: boolean
  enabled: boolean
}

interface SiteSettings {
  buttons: {
    whatsapp: ButtonSettings
    contact: ButtonSettings
    hero: ButtonSettings
  }
}

interface PageData {
  id: string
  slug: string
  title: string
  description: string
  sections: PageSection[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  isPublished: boolean
}

export default function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchPageData()
    fetchSettings()
  }, [resolvedParams.slug])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      if (response.ok) {
        const settings = await response.json()
        setSiteSettings(settings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  useEffect(() => {
    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      setScrollProgress((currentScroll / totalScroll) * 100)
    }
    
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

  const fetchPageData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/public/pages/${resolvedParams.slug}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Failed to fetch page')
      }
      
      const page = await response.json()
      setPageData(page)
    } catch (err) {
      console.error('Error fetching page:', err)
      setError('Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </main>
        <Footer />
      </>
    )
  }

  if (error || !pageData) {
    return notFound()
  }

  const heroSection = pageData.sections.find(s => s.type === 'hero')
  const otherSections = pageData.sections.filter(s => s.type !== 'hero').sort((a, b) => a.order - b.order)

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
      
      
      <main className="bg-black text-white" style={{ overflowX: 'hidden' }}>
        {/* Hero Section */}
        {heroSection && (
          <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ isolation: 'isolate' }}>
            {/* Background with Scroll Animation */}
            <div className="absolute inset-0">
              {heroSection.image && (
                <>
                  {/* Static background for mobile */}
                  <div 
                    className="absolute inset-0 md:hidden"
                    style={{
                      backgroundImage: `url("${heroSection.image}")`,
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
                        backgroundImage: `url("${heroSection.image}")`,
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: 'auto 100%',
                        opacity: 0.75
                      }}
                    />
                  </div>
                </>
              )}
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen"
              >
                {/* Page Title */}
                <div className="mb-8 sm:mb-10 w-full">
                  <motion.div 
                    className="relative inline-block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <h1 
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin tracking-tight text-white uppercase text-center"
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.2',
                        textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.1)'
                      }}
                    >
                      {heroSection.title}
                      {resolvedParams.slug === 'all-on-four' && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.8, duration: 0.5, type: "spring" }}
                          className="ml-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-full shadow-lg"
                          style={{
                            fontSize: '0.25em',
                            verticalAlign: 'middle',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)'
                          }}
                        >
                          <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M13 10V3L4 14h7v7l9-11h-7z" 
                            />
                          </svg>
                          NEW, HIGH-END TECHNOLOGY
                        </motion.span>
                      )}
                    </h1>
                  </motion.div>
                </div>
                
                {/* Enhanced Subtitle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-10 sm:mb-12 px-4"
                  dangerouslySetInnerHTML={{ __html: heroSection.content }}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: '300',
                    letterSpacing: '0.01em',
                    textShadow: '0 1px 10px rgba(0,0,0,0.5)'
                  }}
                />

                {/* CTA Button */}
                {siteSettings?.buttons.hero.enabled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex justify-center w-full px-4"
                  >
                    <Button 
                      onClick={() => {
                        if (siteSettings.buttons.hero.url === '/contact') {
                          setContactModalOpen(true)
                        } else {
                          if (siteSettings.buttons.hero.openInNewTab) {
                            window.open(siteSettings.buttons.hero.url, '_blank')
                          } else {
                            window.location.href = siteSettings.buttons.hero.url
                          }
                        }
                      }}
                      className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-wider font-light transition-all duration-500 group w-full sm:w-auto max-w-xs"
                    >
                      {siteSettings.buttons.hero.text}
                      <ArrowRight className="ml-2 sm:ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Scroll Indicator */}
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
        )}

        {/* Other Sections */}
        {otherSections.map((section, index) => (
          <section key={section.id} className="py-16 sm:py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              {section.type === 'text' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="text-center"
                  style={{ willChange: 'transform' }}
                >
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl font-thin text-white uppercase tracking-wide mb-12 sm:mb-16"
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                      willChange: 'auto'
                    }}
                  >
                    {section.title}
                  </motion.h2>
                  <div 
                    className="prose prose-xl prose-invert mx-auto max-w-5xl"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    style={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: '300',
                      fontSize: '1.25rem',
                      lineHeight: '1.75',
                      willChange: 'auto'
                    }}
                  />
                  <SectionButtons settings={siteSettings} />
                </motion.div>
              )}

              {section.type === 'image-text' && (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.2 }}
                      viewport={{ once: true }}
                      className={`relative z-10 ${index % 2 === 1 ? 'lg:order-2' : ''} lg:py-8`}
                    >
                      {/* Floating Number */}
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className={`absolute ${index % 2 === 0 ? '-left-4 sm:-left-8 md:-left-12' : '-right-4 sm:-right-8 md:-right-12'} top-0 text-[100px] sm:text-[140px] md:text-[180px] font-thin text-white/[0.02] select-none hidden sm:block`}
                        style={{ fontFamily: '"Inter", sans-serif' }}
                      >
                        {String(index + 1).padStart(2, '0')}
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
                          <span className="block">{section.title.split(' ')[0]}</span>
                          {section.title.split(' ').slice(1).length > 0 && (
                            <span className="block text-blue-400/80">{section.title.split(' ').slice(1).join(' ')}</span>
                          )}
                        </motion.h2>
                        
                        <div
                          className="prose prose-lg prose-invert"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                          style={{ 
                            fontFamily: '"Inter", sans-serif',
                            fontWeight: '300',
                            textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                          }}
                        />
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-6 pt-4"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-px bg-white/30" />
                            <span className="text-xs uppercase tracking-widest text-gray-500">Your Smile, Your Style</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Visual Content */}
                    {section.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        className={`relative mt-8 lg:mt-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                      >
                        {/* Background accent */}
                        <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl" />
                        
                        <motion.div 
                          className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-900"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                        >
                          <div className="relative w-full" style={{ 
                            aspectRatio: resolvedParams.slug === 'about-us' ? '16/10' : '4/5' 
                          }}>
                            <Image
                              src={section.image}
                              alt={section.title}
                              fill
                              className={resolvedParams.slug === 'about-us' ? "object-cover" : "object-contain"}
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                              priority={index < 2}
                              quality={90}
                            />
                          </div>
                          
                          {/* Subtle gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Section Buttons - Below the grid */}
                  <div className="mt-12">
                    <SectionButtons settings={siteSettings} />
                  </div>
                </div>
              )}

              {section.type === 'cta' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin text-white uppercase tracking-tight mb-4 sm:mb-6"
                      style={{ 
                        fontFamily: '"Inter", sans-serif', 
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 15px rgba(0,0,0,0.5)'
                      }}
                  >
                    {section.title}
                  </h2>
                  <div 
                    className="prose prose-lg prose-invert mx-auto mb-8 max-w-md"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                    style={{ 
                      fontFamily: '"Inter", sans-serif', 
                      fontWeight: '300',
                      textShadow: '0 1px 8px rgba(0,0,0,0.4)'
                    }}
                  />
                  <Button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-sm uppercase tracking-wider font-light transition-all duration-500 group">
                    Get Started
                    <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                  </Button>
                  
                  {/* Section Buttons for CTA */}
                  <div className="mt-8">
                    <SectionButtons settings={siteSettings} />
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        ))}
        
        {/* FAQ Section - Always at the end */}
        <FAQ />
        
        {/* Contact Section - Always at the end */}
        <ContactSection />
      </main>
      <Footer />
      
      {/* Contact Modal */}
      {contactModalOpen && (
        <ContactFormPopup onClose={() => setContactModalOpen(false)} />
      )}
    </>
  )
}