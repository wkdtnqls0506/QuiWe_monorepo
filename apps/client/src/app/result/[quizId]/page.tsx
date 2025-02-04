'use client';

import { useState } from 'react';

const ResultPage = () => {
  const questions = Array(15).fill('Promise의 상태 중 비동기 처리 중인 상태는 무엇인가요?');

  const answers = ['Pending', 'Fulfilled', 'Rejected'];

  const [isExplanationVisible, setIsExplanationVisible] = useState(false);
  const [isClickedQuestion, setIsClickedQuestion] = useState(1);

  return (
    <div className='w-full h-full flex gap-8 p-8 bg-gray-50 text-gray-900'>
      <div className='w-1/4'>
        <p className='font-semibold text-lg text-gray-700 mb-4'>
          <span className='text-green-600 font-bold'>09</span> / 15
        </p>
        <ul className='flex flex-col gap-2 p-4 bg-white shadow-lg rounded-xl border'>
          {questions.map((question, index) => (
            <li
              key={index}
              className={`border-b border-gray-300 pb-2 px-3 py-2 rounded-md transition cursor-pointer ${
                index + 1 === isClickedQuestion
                  ? 'bg-green-100 text-green-600 font-semibold border-l-4 border-green-500'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsClickedQuestion(index + 1)}
            >
              {index + 1}. {question}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-10 w-3/4 flex flex-col gap-6 bg-white px-10 py-8 shadow-md rounded-lg'>
        <h3 className='mt-2 text-xl font-semibold'>1. Promise의 상태 중 비동기 처리 중인 상태는 무엇인가요?</h3>
        <ul className='flex flex-col gap-4'>
          {answers.map((answer, index) => (
            <li key={index} className='text-lg  px-4 py-2 rounded-md cursor-pointer'>
              {index + 1}) {answer}
            </li>
          ))}
        </ul>
        <div
          className='relative flex flex-col gap-4 border border-gray-300 rounded-md p-6 cursor-pointer transition'
          onClick={() => setIsExplanationVisible(true)}
        >
          <p className='font-semibold text-gray-700'>해설</p>
          <p className={`transition ${isExplanationVisible ? 'blur-none' : 'blur-sm text-gray-500'}`}>
            Promise의 상태 중 비동기 처리 중인 상태는 Pending입니다. Pending 상태는 Promise가 아직 처리 중이며 결과가
            아직 결정되지 않았음을 나타냅니다.
          </p>
          {!isExplanationVisible && (
            <div className='absolute inset-0 flex items-center justify-center bg-white/50'>
              <p className='text-gray-600 text-sm'>클릭하여 해설 보기</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
