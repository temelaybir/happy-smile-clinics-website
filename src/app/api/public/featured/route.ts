import { NextResponse } from 'next/server'
import { getFeaturedVideos, getFeaturedReviews } from '@/lib/cms'
import { getResults } from '@/app/api/admin/results/route'

export async function GET() {
  try {
    const [videos, reviews] = await Promise.all([
      getFeaturedVideos(),
      getFeaturedReviews()
    ])
    
    // Get results from our file storage
    const allResults = await getResults()
    const results = allResults.filter(r => r.featured)

    const response = NextResponse.json({
      success: true,
      data: {
        videos,
        results,
        reviews
      }
    })
    
    // Add cache headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
    
    return response
  } catch (error) {
    console.error('Error fetching featured content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured content',
        data: {
          videos: [],
          results: [],
          reviews: []
        }
      },
      { status: 500 }
    )
  }
} 