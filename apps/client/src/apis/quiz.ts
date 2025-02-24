import { TQuizRequest } from '@/types/quiz.type';

export async function createQuiz(quizRequest: TQuizRequest) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quizRequest)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
