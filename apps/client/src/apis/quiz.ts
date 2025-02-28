import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TQuizRequest } from '@/types/quiz.type';

export async function createQuiz(quizRequest: TQuizRequest) {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizRequest)
  });

  if (!response) {
    console.error('퀴즈 정보를 생성하지 못했습니다.');
    return null;
  }

  return response;
}
