import Portfolio from '@/components/Quiz/Portfolio'
import SelectQuiz from '@/components/Quiz/SelectQuiz'
import { Suspense } from 'react'

const QuizPage = () => {
  return (
    <div className="flex justify-between">
      <Suspense>
        <SelectQuiz />
      </Suspense>
      <div className="w-[1px] h-[700px] my-10 bg-gray-400"></div>
      <Portfolio />
    </div>
  )
}

export default QuizPage
