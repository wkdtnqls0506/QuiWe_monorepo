'use client';

import { useCreateQuiz } from '@/hooks/useCreateQuiz';
import { usePathname, useSearchParams } from 'next/navigation';
import CustomLoading from '@/components/Layout/CustomLoading';
import toast from 'react-hot-toast';
import { CREATE_QUIZ_MESSAGES, LOADING_MESSAGE } from '@/constants/loadingMessage';
import { useNavigationOnSuccess } from '@/hooks/useNavigationOnSuccess';

const GoToChallengeButton = () => {
  const { mutate, isPending, isSuccess, data } = useCreateQuiz();

  const lastPath = usePathname().split('/').pop();
  const searchParams = useSearchParams();
  const detailsParams = searchParams.getAll('detail');
  const levelParams = searchParams.get('level');

  const handleClick = () => {
    if (!detailsParams || !levelParams || !lastPath) {
      toast.error('세부 주제와 레벨을 반드시 선택해주세요!');
      return;
    }

    mutate({
      category: lastPath || '',
      details: detailsParams,
      level: Number(levelParams)
    });
  };

  const { isNavigating } = useNavigationOnSuccess({
    isSuccess,
    data,
    getRedirectPath: (data) => `/challenge/${data?.id}`
  });

  if (isPending) {
    return <CustomLoading messages={CREATE_QUIZ_MESSAGES} intervalTime={3000} />;
  }

  if (isNavigating) {
    return <CustomLoading messages={LOADING_MESSAGE} />;
  }

  return (
    <button
      onClick={handleClick}
      className='w-full mt-6 p-3 text-md rounded-lg transition-all duration-300 bg-green-100 hover:bg-green-200'
    >
      제출하고 퀴즈 풀러가기
    </button>
  );
};

export default GoToChallengeButton;
