'use client';

import { useSearchParams } from 'next/navigation';
import ProfileSetting from './ProfileSetting';
import QuizHistorySetting from './QuizHistorySetting';

const MyPageContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return <div className='w-full max-w-[81rem]'>{tab === 'profile' ? <ProfileSetting /> : <QuizHistorySetting />}</div>;
};

export default MyPageContent;
