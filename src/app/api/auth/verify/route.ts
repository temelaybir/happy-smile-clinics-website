import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }
    
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json({ 
        error: 'Invalid token', 
        token: token.substring(0, 20) + '...',
        jwt_secret_exists: !!process.env.JWT_SECRET,
        jwt_secret_length: process.env.JWT_SECRET?.length
      }, { status: 401 })
    }
    
    return NextResponse.json({ 
      valid: true, 
      payload,
      jwt_secret_exists: !!process.env.JWT_SECRET
    })
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}