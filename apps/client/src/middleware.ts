import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz/:path*', '/portfolio', '/challenge/:path*', '/result/:path*', '/mypage']
};
