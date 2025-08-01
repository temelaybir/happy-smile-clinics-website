import { NextRequest, NextResponse } from 'next/server'
import { getResults } from '@/app/api/admin/results/route'

// GET results for public website
export async function GET(request: NextRequest) {
  try {
    const results = await getResults()
    
    const response = NextResponse.json({ 
      success: true,
      results: results.filter(r => r.featured) // Only return featured results for public
    })
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching public results:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch results' 
    }, { status: 500 })
  }
}