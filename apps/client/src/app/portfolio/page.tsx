import FileUpload from '@/components/Portfolio/FileUpload';

const PortfolioPage = () => {
  return (
    <div className='flex flex-col items-center min-h-[750px] bg-gradient-to-b from-white to-gray-50 p-8'>
      <h1 className='text-4xl font-bold text-gray-900 mt-10 mb-6'>📁 포트폴리오 업로드</h1>
      <p className='text-lg text-gray-600 mb-20'>
        기술 면접 준비를 위한 포트폴리오를 업로드하고 맞춤형 퀴즈를 풀어보세요.
      </p>
      <FileUpload />
    </div>
  );
};

export default PortfolioPage;
