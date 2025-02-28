export async function kakaoLogout() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/kakao/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('카카오 로그아웃에 실패하였습니다.');
  }

  return response;
}

export async function refreshAccessToken() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('카카오 로그아웃에 실패하였습니다.');
  }

  return response;
}
