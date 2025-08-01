import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if data already exists
    const reviewCount = await prisma.review.count()
    
    if (reviewCount > 0) {
      return NextResponse.json({ 
        message: 'Data already seeded',
        counts: {
          reviews: await prisma.review.count(),
          results: await prisma.patientResult.count(),
          messages: await prisma.contactMessage.count()
        }
      })
    }

    // Create sample reviews
    const reviews = await prisma.review.createMany({
      data: [
        {
          name: 'Sarah Johnson',
          country: 'United States',
          rating: 5,
          text: 'Absolutely amazing experience! The team at Happy Smile Clinics transformed my smile completely. Professional, caring, and the results exceeded my expectations.',
          verified: true,
          featured: true,
          googleId: 'google_sarah_123'
        },
        {
          name: 'Michael Chen',
          country: 'Canada',
          rating: 5,
          text: 'Best dental experience of my life. The clinic is state-of-the-art and the staff is incredibly professional. My veneers look natural and beautiful.',
          verified: true,
          featured: true,
          googleId: 'google_michael_456'
        },
        {
          name: 'Emma Williams',
          country: 'United Kingdom',
          rating: 5,
          text: 'I traveled from the UK for my dental treatment and it was worth every mile. The quality of care and attention to detail is exceptional.',
          verified: true,
          featured: false,
          googleId: 'google_emma_789'
        },
        {
          name: 'Yuki Tanaka',
          country: 'Japan',
          rating: 5,
          text: '素晴らしいサービスと結果でした。The international team made me feel comfortable and the results are perfect. Highly recommend!',
          verified: true,
          featured: false,
          googleId: 'google_yuki_012'
        },
        {
          name: 'Ahmed Al-Rashid',
          country: 'UAE',
          rating: 5,
          text: 'World-class dental care. The attention to detail and patient comfort is unmatched. My smile makeover changed my life.',
          verified: true,
          featured: true,
          googleId: 'google_ahmed_345'
        }
      ]
    })

    // Create sample patient results
    const results = await prisma.patientResult.createMany({
      data: [
        {
          patientName: 'Patient A',
          treatment: 'veneers',
          beforeImage: '/images/before-1.jpg',
          afterImage: '/images/after-1.jpg',
          description: 'Complete smile transformation with 20 porcelain veneers',
          featured: true,
          order: 1
        },
        {
          patientName: 'Patient B',
          treatment: 'implants',
          beforeImage: '/images/before-2.jpg',
          afterImage: '/images/after-2.jpg',
          description: 'Full mouth reconstruction with dental implants',
          featured: true,
          order: 2
        },
        {
          patientName: 'Patient C',
          treatment: 'whitening',
          beforeImage: '/images/before-3.jpg',
          afterImage: '/images/after-3.jpg',
          description: 'Professional teeth whitening treatment',
          featured: false,
          order: 3
        }
      ]
    })

    // Create sample contact messages
    const messages = await prisma.contactMessage.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 234 567 8900',
          subject: 'Inquiry about veneers',
          message: 'I am interested in getting veneers. Can you provide more information about the procedure and costs?',
          country: 'United States',
          read: false,
          replied: false
        },
        {
          name: 'Maria Garcia',
          email: 'maria.garcia@email.com',
          phone: '+34 123 456 789',
          subject: 'Appointment request',
          message: 'I would like to schedule a consultation for dental implants. What dates are available?',
          country: 'Spain',
          read: true,
          replied: true
        }
      ]
    })

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      reviews: reviews.count,
      results: results.count,
      messages: messages.count
    })
  } catch (error: any) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    )
  }
}