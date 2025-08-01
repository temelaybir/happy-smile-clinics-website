import { NextRequest, NextResponse } from 'next/server'
import { loadResults, saveResults } from '@/lib/data-storage'

// GET results
export async function GET(request: NextRequest) {
  try {
    const resultsData = await loadResults()
    
    const response = NextResponse.json({ 
      success: true,
      ...resultsData
    })
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch results' 
    }, { status: 500 })
  }
}

// POST update results
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Save to file system
    const savedData = await saveResults(body)
    
    return NextResponse.json({ 
      success: true,
      message: 'Results updated successfully',
      ...savedData
    })
  } catch (error) {
    console.error('Error updating results:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update results' 
    }, { status: 500 })
  }
}

// Export results for use in other parts of the app
export async function getResults() {
  const data = await loadResults()
  return data.results
}