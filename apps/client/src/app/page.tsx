import Main from '@/components/Home/Main';
import Feature from '@/components/Home/Feature';
import HowToUse from '@/components/Home/HowToUse';
import Action from '@/components/Home/Action';

const HomePage = () => {
  return (
    <main className='w-full min-h-screen flex flex-col items-center bg-white text-[#111827]'>
      <Main />
      <Feature />
      <HowToUse />
      <Action />
    </main>
  );
};

export default HomePage;
