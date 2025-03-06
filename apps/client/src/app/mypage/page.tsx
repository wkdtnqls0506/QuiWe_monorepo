import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Content = dynamic(() => import('@/components/MyPage/Content'), {
  ssr: false
});

const MyPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
};

export default MyPage;
