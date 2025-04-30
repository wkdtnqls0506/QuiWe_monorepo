import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  const accessToken = cookieHeader.includes('accessToken=');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz/:path*', '/portfolio', '/challenge/:path*', '/result/:path*', '/mypage']
};
