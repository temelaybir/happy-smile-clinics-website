import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET page by slug (public API)
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await prisma.page.findUnique({
      where: { 
        slug: params.slug,
        isPublished: true
      },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Transform data for frontend consumption
    const transformedPage = {
      id: page.id,
      slug: page.slug,
      title: page.title,
      description: page.description,
      sections: page.sections.map(section => ({
        id: section.id,
        type: section.type,
        title: section.title,
        content: section.content,
        image: section.image,
        metadata: section.metadata ? JSON.parse(section.metadata) : undefined
      })),
      seo: {
        title: page.seoTitle || page.title,
        description: page.seoDesc || page.description || '',
        keywords: page.seoKeywords || ''
      }
    }

    return NextResponse.json(transformedPage)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}