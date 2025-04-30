'use client';

import Image from 'next/image';

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL}`;
  };

  return (
    <div className='flex min-h-[715px] items-center justify-center bg-gray-100 bg-gradient-to-b from-green-200 to-green-100'>
      <div className='w-full max-w-xl p-10 bg-white rounded-lg shadow-lg text-center'>
        <h1 className='text-2xl font-bold text-gray-800'>QUIWE에 오신 것을 환영합니다</h1>
        <p className='text-gray-600 mt-2'>간편하게 카카오 계정으로 로그인하세요.</p>
        <button
          className='mt-6 w-full flex items-center justify-center gap-2 bg-[#FEE500] text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition'
          onClick={handleKakaoLogin}
        >
          <Image src='/images/kakao_logo.svg' alt='카카오 로고' width={24} height={24} />
          카카오 로그인
        </button>
        <p className='text-sm text-gray-500 mt-4'>
          로그인에 문제가 있으신가요? &nbsp;&nbsp;
          <a href='#' className='text-blue-500 font-medium'>
            고객센터 문의하기
          </a>
        </p>
      </div>
    </div>
  );
}
