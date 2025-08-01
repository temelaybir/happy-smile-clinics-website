import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { replied: true }
    })

    return NextResponse.json(message)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark message as replied' },
      { status: 500 }
    )
  }
}