import { getResult } from '@/apis/result';
import Description from '@/components/Result/Description';
import TitleList from '@/components/Result/TitleList';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ResultPage = async ({ params }: { params: { quizId: number } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['result', params.quizId],
    queryFn: () => getResult(params.quizId)
  });

  const { quizId } = params;

  return (
    <div className='w-full h-full flex gap-8 p-8 bg-gray-50 text-gray-900 '>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TitleList quizId={quizId} />
        <Description quizId={quizId} />
      </HydrationBoundary>
    </div>
  );
};

export default ResultPage;
