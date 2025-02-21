'use client';

import logo from 'public/logo.svg?url';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import headerCategory from '@/constants/headerCategory';

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <header className='sticky top-0 flex justify-around items-center px-8 py-2 border-b bg-white border-gray-300 z-50'>
      <Link href='/' className='cursor-pointer'>
        <Image src={logo} alt='로고 이미지' width={150} height={50} />
      </Link>
      <div className='flex items-center gap-4'>
        {headerCategory.map((category) => (
          <button
            className={classNames(
              'ml-2 text-green-700 font-medium p-2 transition-all duration-200 hover:bg-green-100 rounded whitespace-nowrap',
              pathName.startsWith(`/${category.id}`) && 'bg-green-100'
            )}
            onClick={() => router.push(`/${category.id}`)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
