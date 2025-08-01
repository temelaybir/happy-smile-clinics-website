import { NextRequest, NextResponse } from 'next/server'
import { loadReviews, saveReviews } from '@/lib/file-storage'

interface Review {
  id: string
  name: string
  country: string
  rating: number
  text: string
  image?: string
  verified: boolean
  featured: boolean
  createdAt: string
}

// GET all reviews with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const featured = searchParams.get('featured')
    const verified = searchParams.get('verified')
    const search = searchParams.get('search')

    let reviews = await loadReviews()

    // Apply filters
    if (featured !== null) {
      reviews = reviews.filter(r => r.featured === (featured === 'true'))
    }
    
    if (verified !== null) {
      reviews = reviews.filter(r => r.verified === (verified === 'true'))
    }
    
    if (search) {
      const searchLower = search.toLowerCase()
      reviews = reviews.filter(r => 
        r.name.toLowerCase().includes(searchLower) ||
        r.country.toLowerCase().includes(searchLower) ||
        r.text.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date (newest first)
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const total = reviews.length
    const startIndex = (page - 1) * limit
    const paginatedReviews = reviews.slice(startIndex, startIndex + limit)

    return NextResponse.json({
      reviews: paginatedReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST create new review
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.country || !data.rating || !data.text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Ensure rating is between 1 and 5
    const rating = Math.min(5, Math.max(1, parseInt(data.rating)))

    const reviews = await loadReviews()
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: data.name.trim(),
      country: data.country.trim(),
      rating: rating,
      text: data.text.trim(),
      image: data.image?.trim() || undefined,
      verified: Boolean(data.verified) ?? true,
      featured: Boolean(data.featured) ?? false,
      createdAt: new Date().toISOString()
    }

    reviews.push(newReview)
    await saveReviews(reviews)

    return NextResponse.json(newReview, { status: 201 })
  } catch (error: any) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    )
  }
}