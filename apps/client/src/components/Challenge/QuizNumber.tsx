import { TQuestion } from '@/types/quiz.type';
import React, { useState } from 'react';

type TQuizProps = {
  questions: TQuestion[];
  questionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  selectedNumber: number;
};

const QuizNumber = ({ questions, questionRefs, selectedNumber }: TQuizProps) => {
  // FIX ME: 전역 상태로 관리되도록 변경해야 함.
  const [answer, setAnswer] = useState<string[]>(Array(questions.length).fill(''));

  const handleClick = (index: number) => {
    const questionElement = questionRefs.current[index - 1];
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAnswered = (index: number) => {
    return answer[index + 1] !== undefined && answer[index + 1] !== '';
  };

  return (
    <div className='grid grid-cols-4'>
      {questions.map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index + 1)}
          className={`flex justify-center items-center border border-green-400 w-12 h-12 p-2 text-center text-xs text-green-600 font-bold rounded-md m-1 cursor-pointer 
            ${selectedNumber === index + 1 ? 'text-white bg-green-400' : ''} 
            ${isAnswered(index) ? 'border-green-100 bg-green-100' : ''}`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default QuizNumber;
