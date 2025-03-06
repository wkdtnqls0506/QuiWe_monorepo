'use client';

import logo from 'public/logo.svg?url';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import { useUserStore } from '@/providers/user-provider';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import { getUser } from '@/apis/user';
import { TbLogout2, TbBookmark } from 'react-icons/tb';
import { kakaoLogout } from '@/apis/auth';

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser, setLogout } = useUserStore((set) => set);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isSuccess } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: getUser,
    enabled: !user,
    retry: false,
    staleTime: 1000 * 60 * 5
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [data, isSuccess, setUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await kakaoLogout();
      setLogout();
      location.reload();
    } catch (error) {
      console.error('카카오 로그아웃 실패: ', error);
    }
  };

  const headerCategories = user
    ? [
        { id: 'quiz', name: '퀴즈' },
        { id: 'portfolio', name: '포트폴리오' }
      ]
    : [
        { id: 'quiz', name: '퀴즈' },
        { id: 'portfolio', name: '포트폴리오' },
        { id: 'login', name: '로그인' }
      ];

  return (
    <header
      className='sticky top-0 flex justify-between items-center px-12 py-2 
  bg-white shadow-sm z-50'
    >
      <Link href='/' className='cursor-pointer'>
        <Image src={logo} alt='로고 이미지' width={150} height={50} />
      </Link>
      <div className='flex items-center gap-4 relative'>
        {headerCategories.map((category) => (
          <button
            key={category.id}
            className={classNames(
              'ml-2 text-green-700 font-medium p-2 transition-all duration-200 hover:bg-green-100 rounded whitespace-nowrap',
              pathName.startsWith(`/${category.id}`) && 'bg-green-100'
            )}
            onClick={() => router.push(`/${category.id}`)}
          >
            {category.name}
          </button>
        ))}

        {user && (
          <div className='relative' ref={dropdownRef}>
            <div
              className='w-10 h-10 ml-1 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 cursor-pointer'
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <Image
                src={user.profileImage}
                alt='프로필 이미지'
                width={40}
                height={40}
                className='w-full h-full object-cover'
              />
            </div>

            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 p-4'>
                <div className='flex flex-col gap-3 items-center'>
                  <Image
                    src={user.profileImage}
                    alt='프로필 이미지'
                    width={60}
                    height={60}
                    className='w-16 h-16 rounded-full object-cover mb-2'
                  />
                  <p className='font-semibold text-gray-900'>{user.name}님 안녕하세요</p>
                  <button
                    className='mt-2 px-4 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-100'
                    onClick={() => router.push('/mypage?tab=settings')}
                  >
                    내 정보 수정
                  </button>
                </div>
                <hr className='my-3 border-gray-300' />
                <button
                  className='flex items-center gap-3 w-full px-4 py-2 font-medium text-[#4E5968] hover:bg-gray-100 hover:rounded-lg'
                  onClick={() => router.push('/mypage?tab=my-quizzes')}
                >
                  <TbBookmark />
                  내가 푼 퀴즈
                </button>
                <button
                  className='flex items-center gap-3 w-full px-4 py-2 font-medium text-[#4E5968] hover:bg-gray-100 hover:rounded-lg'
                  onClick={handleLogout}
                >
                  <TbLogout2 />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
