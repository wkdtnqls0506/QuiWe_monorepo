'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

const SubmitButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const detailParams = searchParams.get('detail')
  const levelParams = searchParams.get('level')

  const handleClick = () => {
    if (!detailParams || !levelParams) {
      toast.error('세부 주제와 레벨을 반드시 선택해주세요!')
    } else {
      router.push('/solve')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="w-full mt-6 p-3 text-md rounded-lg bg-green-100 transition-all duration-300 hover:bg-green-200"
    >
      제출하고 퀴즈 풀러가기
    </button>
  )
}

export default SubmitButton
