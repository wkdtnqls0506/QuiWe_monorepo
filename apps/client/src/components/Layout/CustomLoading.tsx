'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProgressBar from '../ProgressBar';

type CustomLoadingProps = {
  messages: string[];
  intervalTime?: number;
};

const CustomLoading = ({ messages, intervalTime }: CustomLoadingProps) => {
  const [index, setIndex] = useState(0);
  const messageList = messages ?? [];

  useEffect(() => {
    if (index >= messageList.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= messageList.length) {
          return prev;
        }
        return next;
      });
    }, intervalTime);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white'>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
        <Image src='/images/quiwe.png' alt='QUIWE 로딩 중' width={70} height={70} className='object-contain' />
      </motion.div>

      <div className='mt-6 h-6'>
        <AnimatePresence mode='wait'>
          <motion.p
            key={messageList[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className='text-lg font-semibold text-gray-700 text-center'
          >
            {messageList[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <ProgressBar step={index + 1} total={messageList.length} />
    </div>
  );
};

export default CustomLoading;
