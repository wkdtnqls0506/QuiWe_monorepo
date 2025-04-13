'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type NoHistoryProps = {
  title: string;
  description: string;
  buttonText: string;
  redirectUrl: string;
};

const NoHistory = ({ title, description, buttonText, redirectUrl }: NoHistoryProps) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col items-center justify-center p-10 bg-white shadow-md rounded-lg text-center'
    >
      <Image src='/images/quiweX.png' alt='Empty State' width={100} height={100} className='mb-4' />
      <p className='mt-4 text-xl font-semibold text-gray-700'>{title}</p>
      <p className='mt-2 text-gray-500'>{description}</p>
      <button
        className='mt-6 px-6 py-3 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-300 transition'
        onClick={() => router.push(redirectUrl)}
      >
        {buttonText}
      </button>
    </motion.div>
  );
};

export default NoHistory;
