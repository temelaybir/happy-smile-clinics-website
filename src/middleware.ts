import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  // Check if the path starts with /admin or /api/admin
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api/admin')) {
    
    const token = request.cookies.get('auth-token')?.value

    // Temporarily bypass auth for development
    // TODO: Re-enable auth after fixing database issues
    if (!token && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin') {
      // Only redirect to login for non-dashboard admin pages
      // return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add user ID header for API routes (temporary)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', 'admin-user')
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
}