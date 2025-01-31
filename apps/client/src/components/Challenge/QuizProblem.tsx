import { TQuestion } from '@/types/quiz.type';
import { useState } from 'react';

type TQuizProps = {
  questions: TQuestion[];
  questionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const QuizProblem = ({ questions, questionRefs }: TQuizProps) => {
  // 전역 상태로 관리 필요 (FIX ME)
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: number | string;
  }>({});

  const handleClick = (questionNumber: number, optionNumber: number) => {
    setSelectedAnswer((prevState) => ({
      ...prevState,
      [questionNumber]: optionNumber
    }));
  };

  const handleInputChange = (questionNumber: number, event: React.ChangeEvent<HTMLInputElement | undefined>) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionNumber]: event.target.value
    }));
  };

  return (
    <>
      {questions.map((question, questionIndex) => (
        <div
          key={question.id}
          ref={(el) => {
            questionRefs.current[questionIndex] = el;
          }}
          className='flex flex-col gap-4 p-8 pl-[100px]'
        >
          <h3 className='text-green-800 text-lg'>{`${questionIndex + 1}. ${question.title}`}</h3>
          {question.type === 'multiple_choice' ? (
            question?.options?.map((option, optionIndex) => (
              <div
                key={`${question.id}-${optionIndex}`}
                className={`cursor-pointer p-3 transition-all duration-300 ease-out hover:bg-green-100 hover:rounded-md
                  ${selectedAnswer?.[questionIndex + 1] === optionIndex + 1 ? 'bg-green-200 rounded' : ''}
                `}
                onClick={() => handleClick(questionIndex + 1, optionIndex + 1)}
              >
                {`${optionIndex + 1}) ${option}`}
              </div>
            ))
          ) : (
            <div className='w-[75%] ml-5 mt-5'>
              <input
                type='text'
                required
                placeholder='정답을 입력해주세요'
                onChange={(event) => handleInputChange(questionIndex + 1, event)}
                className='w-full text-gray-900 border border-gray-500 p-3 rounded-md placeholder:text-gray-500 focus:outline-none focus:border-2 focus:border-green-700'
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default QuizProblem;
