import { getChallengeQuestions } from '@/apis/challenge';
import Content from '@/components/Challenge/Content';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ChallegePage = async ({ params }: { params: { challengeId: number } }) => {
  const { challengeId } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['challenge', params.challengeId],
    queryFn: () => getChallengeQuestions(params.challengeId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Content challengeId={challengeId} />
    </HydrationBoundary>
  );
};

export default ChallegePage;
