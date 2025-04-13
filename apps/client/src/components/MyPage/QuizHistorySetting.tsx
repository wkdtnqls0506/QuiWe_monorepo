'use client';

import { getMyPageHistories } from '@/apis/mypage';
import { useUserStore } from '@/providers/user-provider';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import NoHistory from './NoHistory';

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
    <section className='w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8'>
      {/**TODO: 타입 변경 */}
      {data?.quizzes && data.quizzes.length > 0 ? (
        data.quizzes
          .filter((quiz: any) => quiz.results.totalResults !== 0)
          .map((quiz: any) => {
            const progress = (quiz.results.correctResults / quiz.results.totalResults) * 100;
            const levelColor = classNames({
              'bg-orange-700': quiz.level === 3,
              'bg-orange-500': quiz.level === 2,
              'bg-orange-300': quiz.level === 1
            });

            return (
              <div
                key={quiz.id}
                className='w-full flex flex-col justify-between gap-4 min-h-[220px] p-4 bg-gray-200 shadow-sm rounded-lg'
              >
                <p className='text-sm text-[#031228B3]'>{quiz.createdAt}</p>
                <div className='flex items-center justify-between w-full min-w-0'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-2xl font-bold max-w-full'>{quiz.category}</p>
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
                    <div
                      className='h-3 bg-green-500 transition-all duration-500'
                      style={{ width: `${progress}%` }}
                    ></div>
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
          })
      ) : (
        <NoHistory
          title='아직 퀴즈 기록이 없어요!'
          description='새로운 퀴즈를 생성하고 학습을 시작해보세요.'
          buttonText='퀴즈 풀러 가기 🚀'
          redirectUrl='/quiz'
        />
      )}
    </section>
  );
};

export default QuizHistorySetting;
