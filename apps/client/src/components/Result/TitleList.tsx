'use client';

import { getResult } from '@/apis/result';
import { useExplanationVisibleStore } from '@/providers/explanationVisible-provider';
import { useResultStore } from '@/providers/result-store-provider';
import { TResultResponse } from '@/types/result.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const TitleList = ({ quizId }: { quizId: number }) => {
  const { data } = useQuery({
    queryKey: ['result', quizId],
    queryFn: () => getResult(quizId),
    staleTime: 5000, // TODO: Infinity로 변경
    refetchOnMount: true
  });

  const { resultId, setResultId } = useResultStore((state) => state);
  const { setIsExplanationVisible } = useExplanationVisibleStore((state) => state);

  useEffect(() => {
    if (data.results && resultId === 1) {
      setResultId(data.results[0].id);
    }
  }, []);

  const [isClickedQuestion, setIsClickedQuestion] = useState(1);

  const correctCount = data.results.filter((result: TResultResponse) => result.isCorrect).length;

  return (
    <div className='w-1/4'>
      <p className='font-semibold text-lg text-gray-700 mb-4'>
        <span className='text-green-600 font-bold'>
          {correctCount < 10 ? String(correctCount).padStart(2, '0') : correctCount}
        </span>{' '}
        / {data.results.length}
      </p>
      <ul className='flex flex-col gap-2 p-4 bg-white shadow-lg rounded-xl border'>
        {data?.results?.map((result: TResultResponse, index: number) => (
          <li
            key={result.id}
            className={`border-b border-gray-300 pb-2 px-3 py-2 rounded-md transition cursor-pointer ${
              index + 1 === isClickedQuestion
                ? 'bg-green-100 text-green-600 font-semibold border-l-4 border-green-500'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => {
              setIsClickedQuestion(index + 1);
              setResultId(result.id);
              setIsExplanationVisible(false);
            }}
          >
            {index + 1}. {result.question.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TitleList;
