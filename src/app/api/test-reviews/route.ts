import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for test data
let mockReviews = [
  {
    id: 'cmbwuh7j30003w6wyl6atq1ll',
    name: 'Sarah Johnson',
    country: 'United States',
    rating: 5,
    text: 'Absolutely amazing experience! The team at Happy Smile Clinics transformed my smile completely. Professional, caring, and the results exceeded my expectations.',
    verified: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cmbwuh7j30004w6wyl6atq1mm',
    name: 'Michael Chen',
    country: 'Canada',
    rating: 5,
    text: 'Best dental experience of my life. The clinic is state-of-the-art and the staff is incredibly professional. My veneers look natural and beautiful.',
    verified: true,
    featured: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'cmbwuh7j30005w6wyl6atq1nn',
    name: 'Emma Williams',
    country: 'United Kingdom',
    rating: 5,
    text: 'I traveled from the UK for my dental treatment and it was worth every mile. The quality of care and attention to detail is exceptional.',
    verified: true,
    featured: false,
    createdAt: new Date().toISOString()
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      reviews: mockReviews,
      pagination: {
        page: 1,
        limit: 10,
        total: mockReviews.length,
        pages: 1
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newReview = {
      ...body,
      id: `review_${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    mockReviews.push(newReview)
    return NextResponse.json(newReview)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create review', details: error.message },
      { status: 500 }
    )
  }
}