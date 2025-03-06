'use client';

import { getMyPageHistories } from '@/apis/mypage';
import { useUserStore } from '@/providers/user-provider';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

const QuizHistorySetting = () => {
  const router = useRouter();

  const { user } = useUserStore((set) => set);

  const { data } = useQuery({
    queryKey: ['history', user?.id],
    queryFn: getMyPageHistories,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: !!user?.id
  });

  return (
    <section className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] p-4 gap-8'>
      {data?.quizzes.map((quiz: any) => {
        const progress = (quiz.results.correctResults / quiz.results.totalResults) * 100;
        const levelColor = classNames({
          'bg-orange-700': quiz.level === 3,
          'bg-orange-500': quiz.level === 2,
          'bg-orange-300': quiz.level === 1
        });

        return (
          <div
            key={quiz.id}
            className='w-full flex flex-col justify-between gap-4 h-[190px] p-4 bg-gray-200 shadow-sm rounded-lg'
          >
            <p className='text-sm text-[#031228B3]'>{quiz.createdAt}</p>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-2'>
                <p className='text-2xl font-bold'>{quiz.category}</p>
                <p className='text-sm text-[#031228B3]'>{quiz.details}</p>
              </div>
              <span
                className={`text-xs font-semibold text-white px-2 py-1 rounded-full whitespace-nowrap ${levelColor}`}
              >
                Level {quiz.level}
              </span>
            </div>
            <div className='w-full'>
              <div className='w-full bg-gray-300 rounded-full h-3 overflow-hidden'>
                <div className='h-3 bg-green-500 transition-all duration-500' style={{ width: `${progress}%` }}></div>
              </div>
              <p className='text-xs text-[#031228B3] text-right mt-1'>
                {quiz.results.correctResults} / {quiz.results.totalResults}
              </p>
            </div>
            <button className='text-sm self-end' onClick={() => router.push(`/result/${quiz.id}`)}>
              해설 확인
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default QuizHistorySetting;
