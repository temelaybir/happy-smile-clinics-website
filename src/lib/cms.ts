// Content Management System - Database Interface
import { prisma } from './prisma'
import { apiCache, CACHE_KEYS, CACHE_TTL } from './cache'

export interface VideoContent {
  id: string
  title: string
  category: string
  treatment: string
  duration: string
  videoUrl: string
  thumbnail: string
  description?: string
  featured?: boolean
}

export interface PatientResult {
  id: string
  name: string
  age: number
  location: string
  treatment: string
  beforeImage: string
  afterImage: string
  testimonial: string
  rating: number
  duration: string
  teethCount: string
  featured?: boolean
}

export interface ReviewData {
  id: string
  name: string
  country: string
  image: string
  rating: number
  text: string
  verified: boolean
  featured?: boolean
}

export interface SiteContent {
  hero: {
    videoUrl: string
    overlayOpacity: number
  }
  videos: VideoContent[]
  results: PatientResult[]
  reviews: ReviewData[]
  siteSettings: {
    instagramHandle: string
    contactInfo: {
      phone: string
      email: string
      address: string
    }
  }
}

// Database Functions
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const [videos, results, reviews, heroVideo, clinicInfo] = await Promise.all([
      getFeaturedVideos(),
      getFeaturedResults(), 
      getFeaturedReviews(),
      getActiveHeroVideo(),
      getClinicInfo()
    ])

    return {
      hero: {
        videoUrl: heroVideo?.url || "/videos/hero-video.mp4",
        overlayOpacity: 0.4
      },
      videos,
      results,
      reviews,
      siteSettings: {
        instagramHandle: "@happysmileclinics",
        contactInfo: {
          phone: clinicInfo.phone || "+90 850 305 95 95",
          email: clinicInfo.email || "hello@hsctr.com",
          address: clinicInfo.address || "Istanbul, Turkey"
        }
      }
    }
  } catch (error) {
    console.error('Error fetching site content:', error)
    // Fallback to mock data on error
    return mockCMSData
  }
}

export async function getFeaturedVideos(): Promise<VideoContent[]> {
  try {
    // Check cache first
    const cached = apiCache.get<VideoContent[]>(CACHE_KEYS.FEATURED_VIDEOS)
    if (cached) {
      console.log('✨ Returning cached featured videos')
      return cached
    }

    const videos = await prisma.instagramVideo.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 6
    })

    const result = videos.map(video => ({
      id: video.id,
      title: video.title,
      category: video.category,
      treatment: video.treatment,
      duration: video.duration,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      featured: video.featured
    }))

    // Cache the result
    apiCache.set(CACHE_KEYS.FEATURED_VIDEOS, result, CACHE_TTL.MEDIUM)
    
    return result
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function getFeaturedResults(): Promise<PatientResult[]> {
  try {
    // Check cache first
    const cached = apiCache.get<PatientResult[]>(CACHE_KEYS.FEATURED_RESULTS)
    if (cached) {
      console.log('✨ Returning cached featured results')
      return cached
    }

    console.log('🔍 Fetching featured results...')
    const results = await prisma.patientResult.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 6
    })

    console.log('✅ Found', results.length, 'featured results')
    
    const result = results.map(result => ({
      id: result.id,
      name: result.name,
      age: result.age,
      location: result.location,
      treatment: result.treatment,
      beforeImage: result.beforeImage,
      afterImage: result.afterImage,
      testimonial: result.testimonial,
      rating: result.rating,
      duration: result.duration,
      teethCount: result.teethCount,
      featured: result.featured
    }))

    // Cache the result
    apiCache.set(CACHE_KEYS.FEATURED_RESULTS, result, CACHE_TTL.MEDIUM)
    
    return result
  } catch (error) {
    console.error('❌ Error fetching results:', error)
    return []
  }
}

export async function getFeaturedReviews(): Promise<ReviewData[]> {
  try {
    // Check cache first
    const cached = apiCache.get<ReviewData[]>(CACHE_KEYS.FEATURED_REVIEWS)
    if (cached) {
      console.log('✨ Returning cached featured reviews')
      return cached
    }

    console.log('🔍 Fetching featured reviews...')
    const reviews = await prisma.review.findMany({
      where: { featured: true },
      orderBy: { createdAt: 'desc' },
      take: 6
    })

    console.log('✅ Found', reviews.length, 'featured reviews')

    const result = reviews.map(review => ({
      id: review.id,
      name: review.name,
      country: review.country,
      image: review.image || `/images/reviews/${review.name.toLowerCase()}.webp`,
      rating: review.rating,
      text: review.text,
      verified: review.verified,
      featured: review.featured
    }))

    // Cache the result
    apiCache.set(CACHE_KEYS.FEATURED_REVIEWS, result, CACHE_TTL.MEDIUM)
    
    return result
  } catch (error) {
    console.error('❌ Error fetching reviews:', error)
    return []
  }
}

export async function getActiveHeroVideo() {
  try {
    return await prisma.heroVideo.findFirst({
      where: { active: true },
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error('Error fetching hero video:', error)
    return null
  }
}

export async function getClinicInfo() {
  try {
    const info = await prisma.clinicInfo.findMany({
      where: { category: 'contact' }
    })

    const contactInfo: Record<string, string> = {}
    info.forEach(item => {
      contactInfo[item.key] = item.value
    })

    return contactInfo
  } catch (error) {
    console.error('Error fetching clinic info:', error)
    return {}
  }
}

// Admin Functions
export async function updateSiteContent(content: Partial<SiteContent>): Promise<void> {
  console.log('Updating site content:', content)
}

export async function getAllVideos(): Promise<VideoContent[]> {
  try {
    const videos = await prisma.instagramVideo.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return videos.map(video => ({
      id: video.id,
      title: video.title,
      category: video.category,
      treatment: video.treatment,
      duration: video.duration,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail,
      featured: video.featured
    }))
  } catch (error) {
    console.error('Error fetching all videos:', error)
    return []
  }
}

export async function getAllResults(): Promise<PatientResult[]> {
  try {
    const results = await prisma.patientResult.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return results.map(result => ({
      id: result.id,
      name: result.name,
      age: result.age,
      location: result.location,
      treatment: result.treatment,
      beforeImage: result.beforeImage,
      afterImage: result.afterImage,
      testimonial: result.testimonial,
      rating: result.rating,
      duration: result.duration,
      teethCount: result.teethCount,
      featured: result.featured
    }))
  } catch (error) {
    console.error('Error fetching all results:', error)
    return []
  }
}

export async function getAllReviews(): Promise<ReviewData[]> {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return reviews.map(review => ({
      id: review.id,
      name: review.name,
      country: review.country,
      image: review.image || `/images/reviews/${review.name.toLowerCase()}.webp`,
      rating: review.rating,
      text: review.text,
      verified: review.verified,
      featured: review.featured
    }))
  } catch (error) {
    console.error('Error fetching all reviews:', error)
    return []
  }
}

// Mock CMS Data - Fallback only
const mockCMSData: SiteContent = {
  hero: {
    videoUrl: "/videos/hero-video.mp4",
    overlayOpacity: 0.4
  },
  videos: [
    {
      id: "1",
      title: "Porcelain Veneers",
      category: "Aesthetic Dentistry",
      treatment: "E-Max Veneers",
      duration: "3 Days",
      videoUrl: "/videos/hero-video.mp4",
      thumbnail: "/images/services/veneers.webp",
      featured: true
    },
    {
      id: "2", 
      title: "All-on-4 Implants",
      category: "Implant Surgery",
      treatment: "Full Arch Restoration",
      duration: "1 Day",
      videoUrl: "/videos/hero-video.mp4",
      thumbnail: "/images/services/implants.webp",
      featured: true
    }
  ],
  results: [
    {
      id: "1",
      name: "Sarah M.",
      age: 28,
      location: "London, UK", 
      treatment: "Porcelain Veneers",
      beforeImage: "/images/carousel/carousel-1.webp",
      afterImage: "/images/carousel/carousel-2.webp",
      testimonial: "Life-changing results beyond my expectations",
      rating: 5,
      duration: "3 Days", 
      teethCount: "8 Veneers",
      featured: true
    }
  ],
  reviews: [
    {
      id: "1",
      name: "Matthew",
      country: "Malta", 
      image: "/images/reviews/matthew.webp",
      rating: 5,
      text: "Perfect smile achieved! The entire experience exceeded my expectations.",
      verified: true,
      featured: true
    }
  ],
  siteSettings: {
    instagramHandle: "@happysmileclinics",
    contactInfo: {
      phone: "+90 850 305 95 95",
      email: "hello@hsctr.com", 
      address: "Istanbul, Turkey"
    }
  }
}