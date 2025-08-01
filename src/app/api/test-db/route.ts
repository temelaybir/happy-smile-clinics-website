import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check if admin user exists
    const users = await prisma.user.findMany()
    
    if (users.length === 0) {
      // Create admin user if not exists
      const hashedPassword = await hashPassword('admin123')
      const admin = await prisma.user.create({
        data: {
          email: 'admin@demo.com',
          password: hashedPassword,
          name: 'Admin User',
          role: 'admin'
        }
      })
      
      return NextResponse.json({
        message: 'Admin user created',
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name
        }
      })
    }
    
    return NextResponse.json({
      message: 'Users found',
      count: users.length,
      users: users.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name
      }))
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}