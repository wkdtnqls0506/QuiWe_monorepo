'use client';

import { getChallengeQuestions } from '@/apis/challenge';
import { TQuiz } from '@/types/quiz.type';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Timer from './Timer';
import QuizNumber from './QuizNumber';
import QuizProblem from './QuizProblem';

const Content = ({ challengeId }: { challengeId: number }) => {
  const { data } = useQuery<TQuiz>({
    queryKey: ['challenge', challengeId],
    queryFn: () => getChallengeQuestions(challengeId),
    staleTime: Infinity
  });

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

  return (
    <div className='p-8 flex'>
      <div>
        <div className='w-[15rem] sticky top-[2rem] flex flex-col gap-8'>
          <Timer />
          <QuizNumber questions={data?.questions ?? []} questionRefs={questionRefs} selectedNumber={selectedNumber} />
          <button className='w-full p-3 rounded-md bg-green-100 transition-all duration-300 ease-out hover:bg-green-200'>
            답안 제출하기
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
