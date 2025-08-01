'use client'

import { useEffect, useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { deduplicatedRequest } from '@/lib/request-dedup'
import FastLazySection from '@/components/FastLazySection'
import type { VideoContent, PatientResult, ReviewData } from '@/lib/cms'

// Critical components - load immediately
import Header from "@/components/layout/header"
import PureHero from "@/components/sections/pure-hero"

// Lazy load heavy components with optimized loading
const EnhancedReviews = dynamic(() => import('@/components/sections/enhanced-reviews'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const PremiumServices = dynamic(() => import('@/components/sections/premium-services'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const FlowingGallery = dynamic(() => import('@/components/sections/flowing-gallery'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const AboutPreview = dynamic(() => import('@/components/sections/about-preview-simple'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const VideoCarousel = dynamic(() => import('@/components/sections/video-carousel-optimized'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const ResultsCarousel = dynamic(() => import('@/components/sections/results-carousel'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const ContactSection = dynamic(() => import('@/components/sections/contact-section'), {
  loading: () => <div className="h-96 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

const Footer = dynamic(() => import('@/components/sections/footer'), {
  loading: () => <div className="h-64 bg-gray-900/10 animate-pulse" />,
  ssr: true
})

// Lazy load kinetic text components - simplified versions
const KineticText = dynamic(() => import("@/components/sections/kinetic-text-simple"), {
  loading: () => <div className="h-96 bg-black" />,
  ssr: true
})
const KineticTextTwo = dynamic(() => import("@/components/sections/kinetic-text-two-simple"), {
  loading: () => <div className="h-96 bg-black" />,
  ssr: true
})
const KineticTextThree = dynamic(() => import("@/components/sections/kinetic-text-three-simple"), {
  loading: () => <div className="h-96 bg-black" />,
  ssr: true
})

export default function HomePage() {
  const [videos, setVideos] = useState<VideoContent[]>([])
  const [results, setResults] = useState<PatientResult[]>([])
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        console.log('🔄 Loading featured content from API...')
        
        const result = await deduplicatedRequest('featured-content', async () => {
          const response = await fetch('/api/public/featured')
          return response.json()
        })
        
        if (result.success) {
          console.log('✅ API Response:', result.data)
          setVideos(result.data.videos || [])
          setResults(result.data.results || [])
          setReviews(result.data.reviews || [])
          
          console.log('📊 Loaded:', {
            videos: result.data.videos?.length || 0,
            results: result.data.results?.length || 0,  
            reviews: result.data.reviews?.length || 0
          })
          
          // Debug: First result details
          if (result.data.results?.length > 0) {
            console.log('🔍 First Result:', result.data.results[0])
          }
          if (result.data.reviews?.length > 0) {
            console.log('🔍 First Review:', result.data.reviews[0])
          }
        } else {
          console.error('❌ API Error:', result.error)
        }
      } catch (error) {
        console.error('❌ Fetch Error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()

    // Add performance optimizations
    if (typeof window !== 'undefined') {
      // Optimize for mobile
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        // Disable parallax on mobile
        document.documentElement.classList.add('no-parallax')
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-black">
        {/* Critical above-the-fold content */}
        <PureHero />
        
        {/* Load all sections quickly with minimal delay */}
        <FastLazySection delay={50}>
          <EnhancedReviews reviews={reviews} />
        </FastLazySection>
        
        <FastLazySection delay={80}>
          <PremiumServices />
        </FastLazySection>
        
        <FastLazySection delay={110}>
          <VideoCarousel videos={videos} />
        </FastLazySection>
        
        <FastLazySection delay={140}>
          <KineticTextTwo />
        </FastLazySection>
        
        <FastLazySection delay={170}>
          <FlowingGallery />
        </FastLazySection>
        
        <FastLazySection delay={200}>
          <AboutPreview />
        </FastLazySection>
        
        <FastLazySection delay={230}>
          <ResultsCarousel results={results} />
        </FastLazySection>
        
        <FastLazySection delay={260}>
          <KineticTextThree />
        </FastLazySection>
        
        <FastLazySection delay={290}>
          <ContactSection />
        </FastLazySection>
      </main>
      
      <FastLazySection delay={320}>
        <Footer />
      </FastLazySection>
    </>
  )
}
