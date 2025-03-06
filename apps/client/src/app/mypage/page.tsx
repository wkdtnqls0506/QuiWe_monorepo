'use client';

import ProfileSetting from '@/components/MyPage/ProfileSetting';
import QuizHistorySetting from '@/components/MyPage/QuizHistorySetting';
import { useSearchParams } from 'next/navigation';

const MyPage = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className='w-full max-w-[81rem]'>
      {tab === 'profile' && <ProfileSetting />}
      {tab === 'my-quizzes' && <QuizHistorySetting />}
    </div>
  );
};

export default MyPage;
