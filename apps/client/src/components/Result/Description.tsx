'use client';

import { getResult } from '@/apis/result';
import { useResultStore } from '@/providers/result-store-provider';
import { TResultResponse } from '@/types/result.type';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const Description = ({ quizId }: { quizId: number }) => {
  const { data } = useQuery({
    queryKey: ['result', quizId],
    queryFn: () => getResult(quizId),
    staleTime: 5000,
    refetchOnMount: true
  });

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);

  const resultId = useResultStore((state) => state.resultId);
  const resultData = data?.results?.find((result: TResultResponse) => result.id === resultId);

  if (!resultData) {
    return <div className='text-gray-500'>결과를 불러오는 중입니다...</div>;
  }

  const { question, userAnswer, correctAnswer, description, isCorrect } = resultData;

  const userOptionSelect = question.options?.find((option: string) => {
    return userAnswer === option;
  });

  return (
    <div className='mt-10 w-3/4 flex flex-col gap-8 bg-white px-10 py-8 shadow-md rounded-lg'>
      <h3 className='text-2xl font-bold text-gray-900'>💡 {question.title}</h3>
      {question.options ? (
        <ul className='flex flex-col gap-4'>
          {question.options.map((option: string, index: number) => {
            const isUserSelected = option === userOptionSelect;
            const isOptionCorrect = option === correctAnswer;
            let optionStyle;

            if (isUserSelected) {
              optionStyle = isCorrect
                ? 'bg-green-100 border-green-500 text-green-700 font-bold'
                : 'bg-red-100 border-red-500 text-red-700 font-bold';
            } else if (!isUserSelected && !isCorrect && isOptionCorrect) {
              optionStyle = 'bg-green-100 border-green-500 text-green-700 font-bold';
            }

            return (
              <li
                key={option}
                className={`flex items-center gap-3 text-lg px-5 py-4 rounded-lg border transition-all cursor-pointer bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-50 ${optionStyle}`}
              >
                <span className='w-8 h-8 flex items-center justify-center font-semibold text-base bg-gray-300 text-white rounded-full'>
                  {index + 1}
                </span>
                <span>{option}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='flex flex-col gap-3 p-4 rounded-lg border bg-gray-50'>
          <p className='text-gray-600 text-sm font-medium'>📝 사용자의 답변</p>
          <p
            className={`text-lg font-semibold px-4 py-3 rounded-md ${
              userAnswer === correctAnswer
                ? 'bg-green-100 text-green-700 border border-green-400'
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}
          >
            {userAnswer}
          </p>
        </div>
      )}
      <div
        className='relative flex flex-col gap-4 border border-gray-300 rounded-lg p-6 cursor-pointer transition hover:shadow-md'
        onClick={() => setIsExplanationVisible(true)}
      >
        <p className='font-bold text-gray-800'>🔎 해설</p>
        <p
          className={`text-gray-700 leading-relaxed transition-opacity ${
            isExplanationVisible ? 'opacity-100' : 'opacity-30'
          }`}
        >
          {description}
          <br />
          <br />
          <span className='font-semibold text-gray-900'>{correctAnswer}</span>
        </p>
        {!isExplanationVisible && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/70'>
            <p className='text-gray-700 text-sm'>💬 클릭하여 해설 보기</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
