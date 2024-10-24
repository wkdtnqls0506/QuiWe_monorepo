'use client'

import logo from 'public/logo.svg?url'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

const Header = () => {
  const router = useRouter()
  const pathName = usePathname()

  return (
    <header className="flex justify-between items-center px-8 py-2 border-b border-gray-300">
      <Link href="/" className="cursor-pointer">
        <Image src={logo} alt="로고 이미지" width={150} height={50} />
      </Link>
      <div className="flex items-center">
        <button
          className={classNames(
            'ml-2 text-green-700 p-2 transition-all duration-200 hover:bg-green-100 rounded',
            pathName === '/quiz' && 'bg-green-100',
          )}
          onClick={() => router.push('/quiz')}
        >
          퀴즈
        </button>
        <button
          className={classNames(
            'ml-2 text-green-700 p-2 transition-all duration-200 hover:bg-green-100 rounded',
            pathName === '/mypage' && 'bg-green-100',
          )}
          onClick={() => router.push('/mypage')}
        >
          마이페이지
        </button>
        <button
          className={classNames(
            'ml-2 text-green-700 p-2 transition-all duration-200 hover:bg-green-100 rounded',
            pathName === '/login' && 'bg-green-100',
          )}
          onClick={() => router.push('/login')}
        >
          로그인 / 회원가입
        </button>
      </div>
    </header>
  )
}

export default Header
