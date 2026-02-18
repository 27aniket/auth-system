import { NextRequest, NextResponse } from 'next/server'

export default function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

