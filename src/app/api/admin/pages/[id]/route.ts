import { NextRequest, NextResponse } from 'next/server'
import { loadPages, savePages } from '@/lib/file-storage'

// GET single page
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get from file storage
    const pagesData = await loadPages()
    const page = pagesData[params.id]

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}

// PUT update page
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const userId = request.headers.get('x-user-id') || 'admin-user'

    // Load existing pages
    const pagesData = await loadPages()

    // Store the updated page
    const updatedPage = {
      id: params.id,
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      sections: data.sections || [],
      seo: data.seo || {
        title: data.title,
        description: data.description || '',
        keywords: ''
      },
      isPublished: data.isPublished,
      lastUpdated: new Date().toISOString(),
      updatedBy: userId
    }

    // Store in file
    pagesData[params.id] = updatedPage
    await savePages(pagesData)

    console.log('Page updated successfully:', params.id)

    return NextResponse.json(updatedPage)
  } catch (error: any) {
    console.error('Error updating page:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

// DELETE page
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Load existing pages
    const pagesData = await loadPages()
    
    // Delete from storage
    delete pagesData[params.id]
    
    // Save updated data
    await savePages(pagesData)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}