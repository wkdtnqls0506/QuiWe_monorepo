export async function getChallengeQuestions(challengeId: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/${challengeId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
