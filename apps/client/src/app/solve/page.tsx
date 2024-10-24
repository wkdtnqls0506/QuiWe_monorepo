'use client'

import QuizNumber from '@/components/Quiz/Solve/QuizNumber'
import QuizProblem from '@/components/Quiz/Solve/QuizProblem'
import Timer from '@/components/Quiz/Solve/Timer'
import { mockData } from '@/mock'
import { useEffect, useRef, useState } from 'react'

const QuizSolvePage = () => {
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedNumber, setSelectedNumber] = useState<number>(1)

  useEffect(() => {
    const handleScroll = () => {
      const questionTops = questionRefs.current?.map((ref) =>
        ref ? ref.getBoundingClientRect().top : 0,
      )

      const closestQuestionIndex = questionTops.reduce(
        (closestIndex, top, index) => {
          return Math.abs(top ?? 0) < Math.abs(questionTops[closestIndex] ?? 0)
            ? index
            : closestIndex
        },
        0,
      )
      setSelectedNumber(closestQuestionIndex + 1)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="p-8 flex">
      <div>
        <div className="w-[17rem] sticky top-[2rem] flex flex-col gap-8">
          <Timer />
          <QuizNumber
            quiz={mockData}
            questionRefs={questionRefs}
            selectedNumber={selectedNumber}
          />
          <button className="w-full p-3 rounded-md bg-green-100 transition-all duration-300 ease-out hover:bg-green-200">
            답안 제출하기
          </button>
        </div>
      </div>
      <div className="w-full">
        <QuizProblem quiz={mockData} questionRefs={questionRefs} />
      </div>
    </div>
  )
}

export default QuizSolvePage
