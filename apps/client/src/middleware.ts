import { NextResponse, NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    applySetCookie(request, response);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz/:path*', '/portfolio', '/challenge/:path*', '/result/:path*', '/mypage']
};

// Set-Cookie 값을 현재 요청에 반영하는 함수
// 이 함수는 응답에서 Set-Cookie 헤더를 읽고, 요청의 쿠키에 추가하는 역할을 함
function applySetCookie(req: NextRequest, res: NextResponse): void {
  // 응답에서 Set-Cookie 헤더에 있는 쿠키들을 읽음
  const setCookies = new ResponseCookies(res.headers);

  // 기존 요청 헤더를 복사해서 새로운 헤더 객체 생성
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  // Set-Cookie에 있는 쿠키들을 Request Cookie에 강제로 설정
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // NextResponse.next()를 통해 요청 헤더를 덮어씀
  NextResponse.next({ request: { headers: newReqHeaders } }).headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}
