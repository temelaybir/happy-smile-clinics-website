import { NextRequest, NextResponse } from 'next/server'

// Import the mock data from the parent route
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const index = mockReviews.findIndex(r => r.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    mockReviews[index] = { ...mockReviews[index], ...body }
    return NextResponse.json(mockReviews[index])
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update review', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = mockReviews.findIndex(r => r.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    mockReviews.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete review', details: error.message },
      { status: 500 }
    )
  }
}