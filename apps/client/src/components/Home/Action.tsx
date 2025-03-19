'use client';

import { useRouter } from 'next/navigation';

const Action = () => {
  const router = useRouter();

  return (
    <section className='w-full py-24 px-6 text-center'>
      <h2 className='text-5xl font-bold'>QUIWE와 함께 성장하세요!</h2>
      <p className='text-2xl mt-6 text-gray-500'>지금 바로 퀴즈를 풀고 개발 실력을 키워보세요.</p>
      <button
        className='mt-8 px-12 py-4 bg-green-300 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-400 transition'
        onClick={() => router.push('/quiz')}
      >
        🚀 퀴즈 풀러 가기
      </button>
    </section>
  );
};

export default Action;
