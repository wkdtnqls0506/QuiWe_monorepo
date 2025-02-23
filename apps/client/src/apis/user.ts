import { TUserResponse } from '@/types/user.type';

export async function getUser(): Promise<TUserResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return res.json();
}

export async function kakaoLogout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/oauth/kakao/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('카카오 로그아웃에 실패하였습니다.');
  }

  return res.json();
}
