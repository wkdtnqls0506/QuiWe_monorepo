import { getChallengeQuestions } from '@/apis/challenge';
import Content from '@/components/Challenge/Content';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ChallengePage = async ({ params }: { params: { quizId: number } }) => {
  const { quizId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['challenge', params.quizId],
    queryFn: () => getChallengeQuestions(params.quizId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content quizId={quizId} />
    </HydrationBoundary>
  );
};

export default ChallengePage;
