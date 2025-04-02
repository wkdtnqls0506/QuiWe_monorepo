import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TResultResponse, TUserAnswer } from '@/types/result.type';

export async function createResult(quizId: number, answers: TUserAnswer[]) {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/result`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quizId, answers })
  });

  if (!response) {
    console.error('퀴즈 해설을 생성하지 못했습니다.');
    return null;
  }

  return response;
}

export async function getResult(quizId: number): Promise<TResultResponse[] | null> {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/result/${quizId}`, {
    cache: 'no-cache',
    headers: {
      'Cache-Control': 'no-cache, must-revalidate'
    }
  });

  if (!response) {
    console.error('퀴즈 해설을 불러오지 못했습니다.');
    return null;
  }

  return response as TResultResponse[];
}
