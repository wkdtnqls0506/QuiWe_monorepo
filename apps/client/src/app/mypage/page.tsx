import MyPageContent from '@/components/MyPage/MyPageContent';
import { Suspense } from 'react';

const MyPage = () => {
  return (
    <Suspense>
      <MyPageContent />
    </Suspense>
  );
};

export default MyPage;
