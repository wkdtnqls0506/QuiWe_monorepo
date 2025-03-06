import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TMyPageHistories } from '@/types/mypage.type';

export async function getMyPageHistories(): Promise<TMyPageHistories | null> {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/user/my-quizzes`, {
    cache: 'no-cache',
    headers: {
      'Cache-Control': 'no-cache, must-revalidate'
    }
  });

  if (!response) {
    console.error('퀴즈 정보를 불러오지 못했습니다.');
    return null;
  }

  return response as TMyPageHistories;
}
