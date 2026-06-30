import { NextResponse } from 'next/server'

export function middleware(request) { 
  const token = request.cookies.get('token')?.value

  if (token && (request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/']
}
