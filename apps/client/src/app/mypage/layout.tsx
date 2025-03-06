import SideBar from '@/components/MyPage/SideBar';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex py-10'>
      <SideBar />
      <section className='flex-1'>{children}</section>
    </div>
  );
}
