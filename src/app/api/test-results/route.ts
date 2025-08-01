import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockResults = [
      {
        id: '1',
        patientName: 'Patient A',
        treatment: 'veneers',
        beforeImage: 'https://via.placeholder.com/300x300/cccccc/666666?text=Before',
        afterImage: 'https://via.placeholder.com/300x300/333333/ffffff?text=After',
        description: 'Complete smile transformation with 20 porcelain veneers',
        featured: true,
        order: 1,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        patientName: 'Patient B',
        treatment: 'implants',
        beforeImage: 'https://via.placeholder.com/300x300/cccccc/666666?text=Before',
        afterImage: 'https://via.placeholder.com/300x300/333333/ffffff?text=After',
        description: 'Full mouth reconstruction with dental implants',
        featured: true,
        order: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        patientName: 'Patient C',
        treatment: 'whitening',
        beforeImage: 'https://via.placeholder.com/300x300/cccccc/666666?text=Before',
        afterImage: 'https://via.placeholder.com/300x300/333333/ffffff?text=After',
        description: 'Professional teeth whitening treatment',
        featured: false,
        order: 3,
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json({
      results: mockResults,
      pagination: {
        page: 1,
        limit: 9,
        total: 3,
        pages: 1
      }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch results', details: error.message },
      { status: 500 }
    )
  }
}