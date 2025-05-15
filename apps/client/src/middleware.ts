import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const setCookies = new ResponseCookies(res.headers);

  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  const overrideRes = NextResponse.next({ request: { headers: newReqHeaders } });
  overrideRes.headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  console.log('📌 Access Token:', accessToken);

  // accessToken이 없다면 로그인 페이지로 이동
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
