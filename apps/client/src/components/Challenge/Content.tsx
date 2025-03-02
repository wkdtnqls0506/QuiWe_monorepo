'use client';

import { getChallengeQuestions } from '@/apis/challenge';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Timer from './Timer';
import QuizNumber from './QuizNumber';
import QuizProblem from './QuizProblem';
import toast from 'react-hot-toast';
import { useAnswerStore } from '@/providers/userAnswer-store-provider';
import { createResult } from '@/apis/result';
import { useRouter } from 'next/navigation';

const Content = ({ quizId }: { quizId: number }) => {
  const router = useRouter();

  const { answers } = useAnswerStore((state) => state);

  const { data } = useQuery({
    queryKey: ['challenge', quizId],
    queryFn: () => getChallengeQuestions(quizId),
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

  const handleClick = async () => {
    try {
      await createResult({
        quizId,
        resultRequest: { answers }
      });
      router.push(`/result/${quizId}`);
    } catch (error) {
      toast.error('퀴즈 결과 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

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
