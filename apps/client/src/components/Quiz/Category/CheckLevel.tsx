'use client';

import level from '@/constants/level';
import { useSearchParams } from 'next/navigation';

const CheckLevel = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('level');

  const handleClick = (levelId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('level', levelId);
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  return (
    <div className='flex justify-end items-center gap-8 mt-6 h-4 p-4'>
      {level.map((item) => (
        <label
          key={item.id}
          htmlFor={item.id}
          className='flex items-center gap-2'
        >
          <input
            type='radio'
            id={item.id}
            name='level'
            onClick={() => handleClick(item.id)}
            className='appearance-none w-5 h-5 border-2 border-green-100 rounded-full cursor-pointer checked:bg-green-200 checked:border-white checked:shadow-[0_0_0_1.6px_#86efac]'
            checked={search === item.id}
            readOnly
          />
          <p className='mt-1 text-gray-900'>{item.name}</p>
        </label>
      ))}
    </div>
  );
};

export default CheckLevel;
