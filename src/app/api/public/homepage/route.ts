import { NextRequest, NextResponse } from 'next/server'
import { getHomepageContent } from '@/app/api/admin/homepage/route'

// GET homepage content for public website
export async function GET(request: NextRequest) {
  try {
    const content = getHomepageContent()
    
    // Add cache control headers to prevent caching
    const response = NextResponse.json({ 
      success: true,
      content
    })
    
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch homepage content' 
    }, { status: 500 })
  }
}