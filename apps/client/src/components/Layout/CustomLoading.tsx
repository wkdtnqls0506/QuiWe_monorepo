'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CustomLoadingProps = {
  messages?: string[];
};

const CustomLoading = ({ messages = ['로딩 중입니다...'] }: CustomLoadingProps) => {
  const [index, setIndex] = useState(0);
  const messageList = messages.length > 0 ? messages : ['로딩 중입니다...'];

  useEffect(() => {
    if (index >= messageList.length - 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, messageList.length]);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white'>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
        <Image src='/images/quiwe.png' alt='QUIWE 로딩 중' width={70} height={70} className='object-contain' />
      </motion.div>
      <div className='mt-4 h-6'>
        <AnimatePresence mode='wait'>
          <motion.p
            key={messageList[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className='text-lg font-semibold text-gray-600'
          >
            {messageList[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomLoading;
