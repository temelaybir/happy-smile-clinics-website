import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for homepage content
let homepageContent = {
  hero: {
    title: 'Welcome to Happy Smile Clinics',
    subtitle: 'Transform Your Smile, Transform Your Life',
    buttonText: 'Get A Free Quote'
  },
  services: {
    title: 'Our Premium Services',
    subtitle: 'World-class dental treatments tailored to your needs'
  },
  reviews: {
    title: 'Patient Testimonials',
    subtitle: 'Hear from our satisfied patients'
  },
  about: {
    title: 'About Happy Smile',
    subtitle: "Istanbul's Premier Dental Clinic Excellence",
    description: "Happy Smile Clinics stands as Istanbul's most prestigious dental destination, where state-of-the-art technology meets unparalleled expertise. Our world-class facility combines luxury, innovation, and compassionate care to deliver transformative results for patients from over 50 countries.",
    stats: {
      countries: '50+',
      facility: '12K+',
      support: '24/7'
    }
  },
  results: {
    title: 'Results Gallery',
    subtitle: 'Discover the life-changing transformations our patients have experienced'
  },
  contact: {
    title: 'Ready to Transform Your Smile?',
    subtitle: 'Contact us today for a free consultation'
  },
  effectTexts: {
    kineticOne: {
      lines: ['PERFECT', 'SMILE', 'DESIGN'],
      subtitle: 'Premium cosmetic dentistry in Istanbul'
    },
    kineticTwo: {
      phrases: ['GET A FREE', 'QUOTE', 'TODAY'],
      subtitle: 'Get your personalized treatment plan and pricing in 24 hours'
    },
    kineticThree: {
      text: 'READY TO SMILE?'
    }
  }
}

// GET homepage content
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      success: true,
      content: homepageContent 
    })
    
    // Add cache control headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch homepage content' 
    }, { status: 500 })
  }
}

// POST update homepage content
export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()
    
    // Update the in-memory storage
    homepageContent = {
      ...homepageContent,
      ...content
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Homepage content updated successfully',
      content: homepageContent
    })
  } catch (error) {
    console.error('Error updating homepage content:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Failed to update homepage content' 
    }, { status: 500 })
  }
}

