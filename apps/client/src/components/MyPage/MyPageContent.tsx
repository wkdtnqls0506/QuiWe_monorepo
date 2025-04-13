'use client';

import { useSearchParams } from 'next/navigation';
import QuizHistorySetting from './QuizHistorySetting';
import PortfolioSetting from './PortfolioSetting';

const MyPageContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className='w-full max-w-[81rem] min-h-[400px] p-4'>
      {tab === 'my-quizzes' ? <QuizHistorySetting /> : <PortfolioSetting />}
    </div>
  );
};

export default MyPageContent;
