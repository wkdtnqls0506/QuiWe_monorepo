import SelectQuiz from '@/components/Quiz/SelectQuiz';
import { Suspense } from 'react';

const QuizPage = () => {
  return (
    <div className='flex justify-center h-full'>
      <Suspense>
        <SelectQuiz />
      </Suspense>
    </div>
  );
};

export default QuizPage;
