import { NextResponse } from 'next/server'
import { apiCache } from '@/lib/cache'

export async function POST() {
  try {
    // Clear all API cache
    apiCache.clear()
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully'
    })
  } catch (error) {
    console.error('Error clearing cache:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to clear cache' },
      { status: 500 }
    )
  }
}