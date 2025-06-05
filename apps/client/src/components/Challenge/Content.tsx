'use client';

import { getChallengeQuestions } from '@/apis/challenge';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Timer from './Timer';
import QuizNumber from './QuizNumber';
import QuizProblem from './QuizProblem';
import { useAnswerStore } from '@/providers/userAnswer-store-provider';
import { useCreateResult } from '@/hooks/useCreateResult';
import CustomLoading from '../Layout/CustomLoading';
import { CREATE_RESULT_MESSAGES, LOADING_MESSAGE } from '@/constants/loadingMessage';
import { useNavigationOnSuccess } from '@/hooks/useNavigationOnSuccess';

const Content = ({ quizId }: { quizId: number }) => {
  const { mutate, isPending, isSuccess, data: createResultData } = useCreateResult();

  const { data } = useQuery({
    queryKey: ['challenge', quizId],
    queryFn: () => getChallengeQuestions(quizId),
    staleTime: Infinity
  });

  const { answers } = useAnswerStore((state) => state);

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(1);

  useEffect(() => {
    const handleScroll = () => {
      const questionTops = questionRefs.current?.map((ref) => (ref ? ref.getBoundingClientRect().top : 0));

      const closestQuestionIndex = questionTops.reduce((closestIndex, top, index) => {
        return Math.abs(top ?? 0) < Math.abs(questionTops[closestIndex] ?? 0) ? index : closestIndex;
      }, 0);
      setSelectedNumber(closestQuestionIndex + 1);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = async () => {
    mutate({ quizId, answers });
  };

  const { isNavigating } = useNavigationOnSuccess({
    isSuccess,
    data: createResultData,
    getRedirectPath: (data) => `/result/${data?.quizId}`
  });

  if (isPending) {
    return <CustomLoading messages={CREATE_RESULT_MESSAGES} intervalTime={3000} />;
  }

  if (isNavigating) {
    return <CustomLoading messages={LOADING_MESSAGE} />;
  }

  return (
    <div className='p-8 flex'>
      <div>
        <div className='w-[15rem] sticky top-[2rem] flex flex-col gap-8'>
          <Timer />
          <QuizNumber questions={data?.questions ?? []} questionRefs={questionRefs} selectedNumber={selectedNumber} />
          <button
            className={`w-full p-3 rounded-md transition-all duration-300 ease-out 
    ${
      data?.questions.length !== answers.length
        ? 'bg-gray-200 cursor-not-allowed opacity-50'
        : 'bg-green-100 hover:bg-green-200'
    }`}
            onClick={handleClick}
            disabled={data?.questions.length !== answers.length}
          >
            {data?.questions.length !== answers.length ? '모든 문제를 완료하세요' : '답안 제출하기'}
          </button>
        </div>
      </div>
      <div className='w-full'>
        <QuizProblem questions={data?.questions ?? []} questionRefs={questionRefs} />
      </div>
    </div>
  );
};

export default Content;
