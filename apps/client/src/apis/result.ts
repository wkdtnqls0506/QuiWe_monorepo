import { TResultRequest } from '@/types/result.type';

export async function createResult({ quizId, resultRequest }: { quizId: number; resultRequest: TResultRequest }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/result/${quizId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resultRequest)
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function getResult(quizId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/result/${quizId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
