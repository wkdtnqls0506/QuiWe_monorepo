import SideBar from '@/components/MyPage/SideBar';
import { Suspense } from 'react';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex py-10'>
      <Suspense>
        <SideBar />
      </Suspense>
      <section className='flex-1'>{children}</section>
    </div>
  );
}
