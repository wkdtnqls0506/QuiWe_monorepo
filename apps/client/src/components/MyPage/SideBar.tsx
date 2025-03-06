'use client';

import { sidebarItems } from '@/constants/sidebarItems';
import classNames from 'classnames';
import { useSearchParams, useRouter } from 'next/navigation';

const SideBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab');

  return (
    <nav className='w-[300px] h-full px-5'>
      <ul className='flex flex-col gap-4 p-4'>
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={classNames(
              'px-3 py-2 text-[#031228B3] font-medium rounded-lg hover:bg-green-100 transition-all cursor-pointer whitespace-nowrap',
              tab === `${item.id}` && 'bg-green-100'
            )}
            onClick={() => router.push(`/mypage?tab=${item.id}`)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
