'use client'

import { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import toast from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'

const DetailInput = () => {
  const searchParams = useSearchParams()
  const search = searchParams.getAll('detail')
  const params = new URLSearchParams(searchParams.toString())

  const [inputText, setInputText] = useState('')

  const handleDeleteClick = (topic: string) => {
    params.delete('detail', topic)
    window.history.pushState({}, '', `?${params.toString()}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      inputText !== '' &&
      e.key === 'Enter' &&
      e.nativeEvent.isComposing === false
    ) {
      if (search.includes(inputText)) {
        toast('이미 등록된 주제입니다.', {
          icon: '🥝',
          position: 'top-right',
          style: {
            padding: '1rem',
          },
        })
        return
      }
      setInputText('')
      const params = new URLSearchParams(searchParams.toString())
      params.append('detail', inputText)
      window.history.pushState({}, '', `?${params.toString()}`)
      if (search.length >= 3) {
        params.delete('detail', search[0])
        window.history.pushState({}, '', `?${params.toString()}`)
      }
    }
  }

  return (
    <div className="flex flex-col w-full p-8 border-2 border-dashed border-green-200">
      <p className="text-green-800 text-lg font-bold mb-4">
        세부 주제 또는 분야를 입력해주세요.
      </p>
      <div className="w-full relative mb-6">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="text-sm text-gray-900 w-full border-b border-gray-500 pb-2 px-2 focus:outline-none focus:border-green-600"
          placeholder="1가지 주제씩 작성해주세요!"
        />
        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-600 transition-all"></span>
      </div>
      <div className="flex items-center gap-4 h-16 mb-4">
        {search.map((topic, index) => (
          <div
            key={`${topic}-${index}`}
            className="flex justify-between items-center w-1/3 h-5/6 px-4 py-2 bg-green-100 rounded-md animate-fadeIn"
          >
            {topic}
            <IoClose
              className="w-5 h-5 cursor-pointer text-gray-600 animate-fadeOut"
              onClick={() => handleDeleteClick(topic)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetailInput
