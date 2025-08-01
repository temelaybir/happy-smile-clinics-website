// Simple in-memory cache for API responses
interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class SimpleCache {
  private cache = new Map<string, CacheEntry<any>>()
  
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }
  
  set<T>(key: string, data: T, ttl: number = 60000): void { // Default TTL: 1 minute
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  delete(key: string): void {
    this.cache.delete(key)
  }
}

export const apiCache = new SimpleCache()

// Cache keys
export const CACHE_KEYS = {
  FEATURED_CONTENT: 'featured_content',
  FEATURED_VIDEOS: 'featured_videos',
  FEATURED_RESULTS: 'featured_results',
  FEATURED_REVIEWS: 'featured_reviews',
  HERO_VIDEO: 'hero_video',
  CLINIC_INFO: 'clinic_info'
}

// Cache TTLs (in milliseconds)
export const CACHE_TTL = {
  SHORT: 30000,    // 30 seconds
  MEDIUM: 300000,  // 5 minutes
  LONG: 900000,    // 15 minutes
  VERY_LONG: 3600000 // 1 hour
}