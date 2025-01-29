import { getQuiz } from '@/apis/quiz';
import Sample from '@/components/Sample';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from '@tanstack/react-query';

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['quiz'],
    queryFn: getQuiz
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Sample />
    </HydrationBoundary>
  );
};

export default HomePage;
