import { NextRequest, NextResponse } from 'next/server'
import { loadPages, savePages } from '@/lib/file-storage'

// GET all pages
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching pages from file storage...')
    
    // Get all pages from file storage
    const pagesData = await loadPages()
    const pages = Object.values(pagesData).sort((a: any, b: any) => {
      const dateA = new Date(a.lastUpdated || a.createdAt || 0).getTime()
      const dateB = new Date(b.lastUpdated || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    
    console.log(`Found ${pages.length} pages in file storage`)
    console.log('Returning pages:', pages.length)
    return NextResponse.json({ pages })
  } catch (error: any) {
    console.error('Error fetching pages:', error.message, error)
    
    // Return demo data if database fails
    return NextResponse.json({
      pages: [
        {
          id: '1',
          slug: 'dental-implants',
          title: 'Dental Implants',
          description: 'Premium dental implant treatments in Turkey',
          sections: [
            {
              id: 's1',
              type: 'hero',
              title: 'Transform Your Smile with Dental Implants',
              content: '<p>Experience world-class dental care with our expert team in Turkey. Our state-of-the-art facilities and experienced surgeons ensure the best possible results.</p>',
              order: 1
            },
            {
              id: 's2',
              type: 'text',
              title: 'Why Choose Our Clinic?',
              content: '<p>We offer state-of-the-art facilities, experienced surgeons, and comprehensive care packages. Our team is dedicated to providing you with the best dental care experience.</p>',
              order: 2
            },
            {
              id: 's3',
              type: 'image-text',
              title: 'Advanced Technology',
              content: '<p>We use cutting-edge 3D imaging and computer-guided implant placement for precision and optimal results.</p>',
              image: '/images/dental-technology.jpg',
              order: 3
            }
          ],
          seo: {
            title: 'Dental Implants in Turkey | Happy Smile Clinics',
            description: 'Get premium dental implants at affordable prices in Turkey.',
            keywords: 'dental implants, turkey, dental clinic'
          },
          isPublished: true,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Admin'
        },
        {
          id: '2',
          slug: 'about',
          title: 'About Us',
          description: 'Learn more about Happy Smile Clinics',
          sections: [
            {
              id: 's3',
              type: 'hero',
              title: 'About Happy Smile Clinics',
              content: 'Leading dental care provider in Turkey since 2010.',
              order: 1
            }
          ],
          seo: {
            title: 'About Us | Happy Smile Clinics',
            description: 'Learn about our experienced team and modern facilities.',
            keywords: 'about, dental clinic, turkey'
          },
          isPublished: true,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Admin'
        }
      ]
    })
  }
}

// POST create new page
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const userId = request.headers.get('x-user-id') || 'admin-user'

    // Load existing pages
    const pagesData = await loadPages()
    
    // Check if slug already exists
    const existingPage = Object.values(pagesData).find(
      (page: any) => page.slug === data.slug
    )
    
    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 409 }
      )
    }

    // Create new page
    const pageId = `page-${Date.now()}`
    const page = {
      id: pageId,
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      isPublished: data.isPublished ?? true,
      sections: data.sections?.map((section: any, index: number) => ({
        id: section.id || `section-${Date.now()}-${index}`,
        type: section.type,
        title: section.title,
        content: section.content,
        image: section.image,
        order: section.order || index,
        metadata: section.metadata
      })) || [],
      seo: data.seo || {
        title: data.title,
        description: data.description || '',
        keywords: ''
      },
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      updatedBy: userId
    }
    
    // Store in file
    pagesData[pageId] = page
    await savePages(pagesData)
    console.log('Page created:', page.id, page.title)

    return NextResponse.json(page, { status: 201 })
  } catch (error: any) {
    console.error('Error creating page:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}