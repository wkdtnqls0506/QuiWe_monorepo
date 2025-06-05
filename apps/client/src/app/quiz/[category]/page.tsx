'use client';

import CheckLevel from '@/components/Quiz/Category/CheckLevel';
import DetailInput from '@/components/Quiz/Category/DetailInput';
import GoToChallengeButton from '@/components/Quiz/Category/GoToChallengeButton';
import quizCategory from '@/constants/quizCategory';

const QuizCategoryPage = ({ params }: { params: { category: string } }) => {
  const categoryName = quizCategory.find((category) => category.id === params.category)?.name;

  return (
    <div className='flex flex-col px-32 py-12'>
      <div className='w-full flex flex-col mb-12'>
        <div className='flex items-center'>
          <h1 className='mr-2 text-green-700'>{categoryName}</h1>
          <p className='text-2xl'>를 선택하셨습니다.</p>
        </div>
      </div>
      <div className='flex flex-col'>
        <DetailInput />
        <CheckLevel />
        <GoToChallengeButton />
      </div>
    </div>
  );
};

export default QuizCategoryPage;
