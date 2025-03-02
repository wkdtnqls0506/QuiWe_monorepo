import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TQuiz } from '@/types/quiz.type';

export async function getChallengeQuestions(challengeId: number): Promise<TQuiz | null> {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quiz/${challengeId}`, {
    cache: 'no-cache',
    headers: {
      'Cache-Control': 'no-cache, must-revalidate'
    }
  });

  if (!response) {
    console.error('퀴즈 정보를 불러오지 못했습니다.');
    return null;
  }

  return response as TQuiz;
}
