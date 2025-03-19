'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();

  return (
    <section className='w-full min-h-screen flex flex-col justify-center items-center text-center px-6'>
      <motion.h1
        className='text-6xl font-bold leading-tight tracking-tight'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        QUIWE에서
        <br />
        <span className='text-green-300'>퀴즈로 배우는 개발</span>
      </motion.h1>
      <motion.p
        className='mt-6 text-2xl font-medium text-gray-500'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        포트폴리오 기반 맞춤 퀴즈 & 다양한 개발 카테고리 학습을 경험하세요.
      </motion.p>
      <motion.div
        className='mt-10 flex gap-6'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          className='px-10 py-4 bg-green-300 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-400 transition'
          onClick={() => router.push('/quiz')}
        >
          🎯 퀴즈 풀기
        </button>
        <button
          className='px-10 py-4 bg-gray-100 text-[#111827] text-lg font-semibold rounded-lg shadow-md hover:bg-gray-200 transition'
          onClick={() => router.push('/portfolio')}
        >
          📁 포트폴리오 업로드
        </button>
      </motion.div>
    </section>
  );
};

export default Main;
