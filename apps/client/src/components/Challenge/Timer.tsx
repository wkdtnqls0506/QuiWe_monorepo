'use client';

import { INTERVAL } from '@/constants/timer';
import { MdOutlineTimer } from 'react-icons/md';
import { useEffect, useState } from 'react';

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0); // ⏳ 경과 시간 (초기값 0)

  const minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(2, '0');
  const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + INTERVAL);
    }, INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='flex justify-center items-center p-2 bg-green-100 rounded-md shadow-sm w-36'>
      <span className='flex items-center gap-1 text-lg font-semibold text-green-800'>
        <MdOutlineTimer size={18} className='mt-[1px]' />
        {minutes} : {seconds}
      </span>
    </div>
  );
};

export default Timer;
