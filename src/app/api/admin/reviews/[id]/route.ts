import { NextRequest, NextResponse } from 'next/server'
import { loadReviews, saveReviews } from '@/lib/file-storage'

// GET single review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await loadReviews()
    const review = reviews.find(r => r.id === params.id)
    
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(review)
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}

// PUT update review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const reviews = await loadReviews()
    const index = reviews.findIndex(r => r.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    // Update review
    reviews[index] = {
      ...reviews[index],
      name: data.name?.trim() || reviews[index].name,
      country: data.country?.trim() || reviews[index].country,
      rating: data.rating || reviews[index].rating,
      text: data.text?.trim() || reviews[index].text,
      image: data.image?.trim() || reviews[index].image,
      verified: data.verified !== undefined ? data.verified : reviews[index].verified,
      featured: data.featured !== undefined ? data.featured : reviews[index].featured
    }
    
    await saveReviews(reviews)
    
    return NextResponse.json(reviews[index])
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await loadReviews()
    const filteredReviews = reviews.filter(r => r.id !== params.id)
    
    if (reviews.length === filteredReviews.length) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }
    
    await saveReviews(filteredReviews)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}