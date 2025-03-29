'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NoQuizHistory = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center p-10 bg-white shadow-md rounded-lg text-center'
    >
      <Image src='/images/quiweX.png' alt='No Quiz' width={40} height={40} className='mb-4' />
      <p className='mt-4 text-xl font-semibold text-gray-700'>아직 퀴즈 기록이 없어요!</p>
      <p className='mt-2 text-gray-500'>새로운 퀴즈를 생성하고 학습을 시작해보세요.</p>
      <button
        className='mt-6 px-6 py-3 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-300 transition'
        onClick={() => router.push('/quiz')}
      >
        퀴즈 풀러 가기 🚀
      </button>
    </motion.div>
  );
};

export default NoQuizHistory;
