import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Basit authentication kontrolü
function checkAuth(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  return !!token
}

// GET - Hero background görsellerini getir
export async function GET() {
  try {
    const backgrounds = await prisma.heroBackground.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({
      success: true,
      data: backgrounds
    })
  } catch (error) {
    console.error('Error fetching hero backgrounds:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero backgrounds' },
      { status: 500 }
    )
  }
}

// POST - Yeni hero background ekle
export async function POST(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { imageUrl, title, order = 0, isActive = true, animationType = 'slide', transparency = 0.3 } = body

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      )
    }

    const background = await prisma.heroBackground.create({
      data: {
        imageUrl,
        title: title || '',
        order,
        isActive,
        animationType,
        transparency
      }
    })

    return NextResponse.json({
      success: true,
      data: background
    })
  } catch (error) {
    console.error('Error creating hero background:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create hero background' },
      { status: 500 }
    )
  }
}

// PUT - Hero background güncelle veya oluştur (upsert)
export async function PUT(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, imageUrl, title, order, isActive, animationType, transparency } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      )
    }

    // Kayıt mevcut mu kontrol et
    const existingRecord = await prisma.heroBackground.findUnique({
      where: { id }
    })

    let background
    if (existingRecord) {
      // Kayıt varsa güncelle
      background = await prisma.heroBackground.update({
        where: { id },
        data: {
          imageUrl,
          title,
          order,
          isActive,
          animationType,
          transparency
        }
      })
    } else {
      // Kayıt yoksa yeni oluştur
      background = await prisma.heroBackground.create({
        data: {
          id, // Gelen ID'yi kullan
          imageUrl,
          title: title || '',
          order: order || 0,
          isActive: isActive !== undefined ? isActive : true,
          animationType: animationType || 'slide',
          transparency: transparency || 0.3
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: background
    })
  } catch (error) {
    console.error('Error updating hero background:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update hero background' },
      { status: 500 }
    )
  }
}

// DELETE - Hero background sil
export async function DELETE(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' },
        { status: 400 }
      )
    }

    await prisma.heroBackground.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Hero background deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting hero background:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete hero background' },
      { status: 500 }
    )
  }
} 