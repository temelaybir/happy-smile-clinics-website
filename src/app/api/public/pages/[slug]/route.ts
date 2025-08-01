import { NextRequest, NextResponse } from 'next/server'
import { loadPages } from '@/lib/file-storage'

// GET page by slug (public API)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params as required in Next.js 15
    const { slug } = await params
    
    // Load pages from file storage
    const pagesData = await loadPages()
    
    // Find page by slug
    const page = Object.values(pagesData).find(
      (p: any) => p.slug === slug && p.isPublished
    )

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}