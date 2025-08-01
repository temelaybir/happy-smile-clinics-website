import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const userId = request.headers.get('x-user-id')!

    const result = await prisma.patientResult.update({
      where: { id: params.id },
      data: {
        patientName: data.patientName,
        treatment: data.treatment,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        description: data.description,
        featured: data.featured,
        order: data.order
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'update',
        resource: 'result',
        resourceId: result.id,
        details: JSON.stringify({ patientName: result.patientName })
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update result' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('x-user-id')!

    const result = await prisma.patientResult.delete({
      where: { id: params.id }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId,
        action: 'delete',
        resource: 'result',
        resourceId: result.id,
        details: JSON.stringify({ patientName: result.patientName })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete result' },
      { status: 500 }
    )
  }
}