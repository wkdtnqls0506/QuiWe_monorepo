'use client';

import { getPortfolio } from '@/apis/portfolio';
import { useUserStore } from '@/providers/user-provider';
import { useQuery } from '@tanstack/react-query';
import { HiDocumentText } from 'react-icons/hi';
import NoHistory from './NoHistory';

const PortfolioSetting = () => {
  const { user } = useUserStore((set) => set);

  const { data } = useQuery({
    queryKey: ['portfolio', user?.id],
    queryFn: () => getPortfolio(user!.id),
    enabled: !!user?.id,
    staleTime: Infinity
  });

  return (
    <section className='flex flex-col items-center justify-center w-full h-full px-4 py-10'>
      {data && data.length > 0 ? (
        <ul className='flex flex-col max-w-5xl gap-8 w-full'>
          {data.map((portfolio) => (
            <li key={portfolio.id}>
              <div className='p-6 bg-white border rounded-xl shadow hover:bg-gray-50 transition-all space-y-4'>
                <div className='flex items-center space-x-4'>
                  <HiDocumentText className='text-green-600 text-3xl' />
                  <div className='flex flex-col'>
                    <p className='text-gray-800 font-medium truncate max-w-[300px]'>{portfolio.fileName}</p>
                    <span className='text-sm text-gray-500 mt-1'>
                      업로드 날짜: {new Date(portfolio.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className='w-full h-96 border rounded-md overflow-hidden'>
                  <object data={portfolio.signedUrl} type='application/pdf' width='100%' height='100%'>
                    <embed src={portfolio.signedUrl} type='application/pdf' width='100%' height='100%' />
                  </object>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <NoHistory
          title='등록된 포트폴리오가 없습니다'
          description='포트폴리오를 등록하고 퀴즈를 풀어보세요.'
          buttonText='포트폴리오 등록하러 가기'
          redirectUrl='/portfolio'
        />
      )}
    </section>
  );
};

export default PortfolioSetting;
