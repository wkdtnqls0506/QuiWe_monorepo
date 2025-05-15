import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/oauth/kakao/callback'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((publicPath) => pathname.startsWith(publicPath))) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.cookies.set({
    name: 'accessToken',
    value: accessToken.value,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/'
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)', '/login']
};
