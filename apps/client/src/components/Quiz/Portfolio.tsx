'use client';

import UploadFile from './UploadFile';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Portfolio = () => {
  //   const fileName = useRecoilValue(fileState)
  const router = useRouter();

  //   const handleClick = () => {
  //     if (!fileName) {
  //       toast.error('이력서 및 포트폴리오를 업로드해주세요.')
  //     } else {
  //       router.push('/quizSolve')
  //     }
  //   }

  return (
    <div className='flex flex-col items-center w-1/2 h-full mt-12 px-4'>
      <h2 className='font-bold text-green-800'>🪄 이력서 및 포트폴리오 업로드하여 맞춤형 퀴즈를 풀어보세요!</h2>
      <UploadFile />
      <button
        // onClick={handleClick}
        className='rounded-md py-2.5 px-40 mt-12 mb-8 bg-green-300 transition-all duration-200 ease-in-out text-white text-lg hover:bg-green-200'
      >
        퀴즈 풀러가기
      </button>
    </div>
  );
};

export default Portfolio;
