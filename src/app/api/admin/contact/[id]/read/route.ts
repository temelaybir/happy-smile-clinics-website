import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const message = await prisma.contactMessage.update({
      where: { id: resolvedParams.id },
      data: { read: true }
    })

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    )
  }
}