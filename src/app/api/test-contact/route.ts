import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const mockMessages = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 234 567 8900',
        subject: 'Inquiry about veneers',
        message: 'I am interested in getting veneers. Can you provide more information about the procedure and costs?',
        country: 'United States',
        read: false,
        replied: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        phone: '+34 123 456 789',
        subject: 'Appointment request',
        message: 'I would like to schedule a consultation for dental implants. What dates are available?',
        country: 'Spain',
        read: true,
        replied: true,
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json({ messages: mockMessages })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch messages', details: error.message },
      { status: 500 }
    )
  }
}