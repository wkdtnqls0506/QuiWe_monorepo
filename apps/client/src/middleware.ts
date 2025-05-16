import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 공개 접근 가능한 경로들
const PUBLIC_PATHS = ['/login', '/oauth/kakao/callback', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 정적 리소스나 API 요청은 무시
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 공개 경로는 항상 접근 허용 (정확히 일치하는 경우)
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // 쿠키 확인 (콘솔에 디버깅 정보 출력)
  const cookies = request.cookies.getAll();
  console.log(
    'All cookies:',
    cookies.map((c) => `${c.name}=${c.value.substring(0, 10)}...`)
  );

  const accessToken = request.cookies.get('accessToken');

  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken || !accessToken.value) {
    console.log('No valid access token found, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 토큰이 있으면 그대로 진행하고 쿠키 유지
  const response = NextResponse.next();

  // 기존 토큰을 응답에도 포함시켜 유지
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
