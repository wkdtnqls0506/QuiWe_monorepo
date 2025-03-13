'use client';

import { createQuiz } from '@/apis/quiz';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const SubmitButton = () => {
  const router = useRouter();

  const lastPath = usePathname().split('/').pop();

  const searchParams = useSearchParams();
  const detailParams = searchParams.getAll('detail');
  const levelParams = searchParams.get('level');

  const handleClick = async () => {
    if (!detailParams || !levelParams || !lastPath) {
      toast.error('세부 주제와 레벨을 반드시 선택해주세요!');
      return;
    }

    try {
      const quizData = await createQuiz({
        category: lastPath || '',
        details: detailParams,
        level: Number(levelParams)
      });

      router.push(`/challenge/${quizData?.id}`);
    } catch (error) {
      toast.error('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className='w-full mt-6 p-3 text-md rounded-lg bg-green-100 transition-all duration-300 hover:bg-green-200'
    >
      제출하고 퀴즈 풀러가기
    </button>
  );
};

export default SubmitButton;
