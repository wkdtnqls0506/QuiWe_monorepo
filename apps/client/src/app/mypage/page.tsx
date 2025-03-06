'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

// TODO: loading 컴포넌트
const ProfileSetting = dynamic(() => import('@/components/MyPage/ProfileSetting'), { ssr: false });
const QuizHistorySetting = dynamic(() => import('@/components/MyPage/QuizHistorySetting'), { ssr: false });

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
