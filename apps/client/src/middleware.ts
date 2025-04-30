import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz/:path*', '/portfolio', '/challenge/:path*', '/result/:path*', '/mypage']
};
