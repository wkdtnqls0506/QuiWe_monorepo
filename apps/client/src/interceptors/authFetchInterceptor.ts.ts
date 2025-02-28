import { kakaoLogout, refreshAccessToken } from '@/apis/auth';

export async function fetchWithAuth<T>(url: string, options: RequestInit = {}) {
  let response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (response.status === 401) {
    try {
      await refreshAccessToken();
      response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
    } catch (error) {
      console.error('리프레시 토큰 만료', error);
      await kakaoLogout();
      return null;
    }
  }
  return response.json() as Promise<T>;
}
