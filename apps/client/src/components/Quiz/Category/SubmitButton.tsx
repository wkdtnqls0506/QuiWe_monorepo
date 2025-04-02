'use client';

import { useCreateQuiz } from '@/hooks/useCreateQuiz';
import { usePathname, useSearchParams } from 'next/navigation';
import CustomLoading from '@/components/Layout/CustomLoading';
import toast from 'react-hot-toast';
import { CREATE_QUIZ_MESSAGES } from '@/constants/loadingMessage';

const SubmitButton = () => {
  const lastPath = usePathname().split('/').pop();
  const searchParams = useSearchParams();
  const detailsParams = searchParams.getAll('detail');
  const levelParams = searchParams.get('level');

  const { mutate, isPending } = useCreateQuiz();

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

  return (
    <button
      onClick={handleClick}
      className='w-full mt-6 p-3 text-md rounded-lg transition-all duration-300 bg-green-100 hover:bg-green-200'
    >
      {isPending ? <CustomLoading messages={CREATE_QUIZ_MESSAGES} /> : '제출하고 퀴즈 풀러가기'}
    </button>
  );
};

export default SubmitButton;
