'use client';

import { getResult } from '@/apis/result';
import { TResultResponse } from '@/types/result.type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const TitleList = ({ quizId }: { quizId: number }) => {
  const { data } = useQuery({
    queryKey: ['result', quizId],
    queryFn: () => getResult(quizId),
    staleTime: 5000 // TODO: Infinity로 변경
  });

  const [isClickedQuestion, setIsClickedQuestion] = useState(1);

  return (
    <div className='w-1/4'>
      <p className='font-semibold text-lg text-gray-700 mb-4'>
        <span className='text-green-600 font-bold'>09</span> / 15
      </p>
      <ul className='flex flex-col gap-2 p-4 bg-white shadow-lg rounded-xl border'>
        {data?.results?.map((result: TResultResponse, index: number) => (
          <li
            key={index}
            className={`border-b border-gray-300 pb-2 px-3 py-2 rounded-md transition cursor-pointer ${
              index + 1 === isClickedQuestion
                ? 'bg-green-100 text-green-600 font-semibold border-l-4 border-green-500'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => setIsClickedQuestion(index + 1)}
          >
            {index + 1}. {result.question.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TitleList;
