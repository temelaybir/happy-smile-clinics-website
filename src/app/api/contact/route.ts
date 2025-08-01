import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  country: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate form data
    const validatedData = contactSchema.parse(body)
    
    // Create contact submission
    const submission = await prisma.contactSubmission.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        country: validatedData.country || 'Unknown',
        message: validatedData.message,
        status: 'new'
      }
    })

    // TODO: Send email notification to admin
    console.log('New contact submission:', submission.id)

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message. We will get back to you soon!' 
    })
  } catch (error: any) {
    console.error('Contact form error:', error)
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid form data', 
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to submit form. Please try again.' 
      },
      { status: 500 }
    )
  }
} 