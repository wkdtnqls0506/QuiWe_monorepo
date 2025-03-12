'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import QuizCategory from './QuizCategory';
import { toast } from 'react-hot-toast';

const SelectQuiz = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  const handleClick = () => {
    if (!categoryParams) {
      toast.error('반드시 1개의 카테고리를 선택해주세요');
    } else {
      router.push(`/quiz/${categoryParams}`);
    }
  };

  return (
    <div className='flex flex-col items-center h-full mt-12 px-4'>
      <h2 className='font-bold text-green-800'>🥝 관심있는 퀴즈를 풀어보세요!</h2>
      <QuizCategory />
      <button
        onClick={handleClick}
        className='rounded-md py-2 px-40 mt-12 mb-8 bg-green-300 transition-all duration-200 ease-in-out text-white text-lg hover:bg-green-200'
      >
        퀴즈 풀러가기
      </button>
    </div>
  );
};

export default SelectQuiz;
