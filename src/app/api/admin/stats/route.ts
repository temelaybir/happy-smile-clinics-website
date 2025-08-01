import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const [
      totalReviews,
      totalVideos,
      totalResults,
      totalPosts,
      recentContacts,
      totalViews
    ] = await Promise.all([
      prisma.review.count(),
      prisma.instagramVideo.count(),
      prisma.patientResult.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.contactSubmission.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.blogPost.aggregate({
        _sum: { views: true }
      })
    ])

    return NextResponse.json({
      totalReviews,
      totalVideos,
      totalResults,
      totalPosts,
      recentContacts,
      totalViews: totalViews._sum.views || 0
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}