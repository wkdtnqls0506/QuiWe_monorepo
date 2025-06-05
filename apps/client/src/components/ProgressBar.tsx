'use client';

type ProgressBarProps = {
  step: number;
  total: number;
};

const ProgressBar = ({ step, total }: ProgressBarProps) => {
  const percentage = Math.floor((step / total) * 100);

  return (
    <div className='w-[200px] h-2 bg-gray-200 rounded-full overflow-hidden mt-4'>
      <div className='h-full bg-green-400 transition-all duration-500' style={{ width: `${percentage}%` }} />
    </div>
  );
};

export default ProgressBar;
