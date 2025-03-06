import dynamic from 'next/dynamic';

const Content = dynamic(() => import('@/components/MyPage/Content'), {
  ssr: false
});

const MyPage = () => {
  return <Content />;
};

export default MyPage;
