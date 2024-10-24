import { TQuizProblem } from '@/mock'
import { useState } from 'react'

type TQuizProps = {
  quiz: TQuizProblem[]
  questionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>
}

const QuizProblem = ({ quiz, questionRefs }: TQuizProps) => {
  // FIX ME: 전역 상태로 관리되도록 변경해야 함.
  const [selectedAnswer, setSelectedAnswer] = useState<{
    [key: number]: number | string
  }>()

  const handleClick = (questionNumber: number, optionNumber: number) => {
    setSelectedAnswer((prevState) => ({
      ...prevState,
      [questionNumber]: optionNumber,
    }))
  }

  const handleInputChange = (
    questionNumber: number,
    event: React.ChangeEvent<HTMLInputElement | undefined>,
  ) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionNumber]: event.target.value,
    }))
  }

  return (
    <>
      {quiz.map((item, questionIndex) => (
        <div
          key={item.id}
          ref={(el) => (questionRefs.current[questionIndex] = el)}
          className="flex flex-col gap-4 p-8 pl-[100px]"
        >
          <h3 className="text-green-800">{`${questionIndex + 1}. ${item.question}`}</h3>
          {item.type === 'multiple-choice' ? (
            <div className="w-[70%] flex flex-col gap-2 px-4">
              {item.options?.map((option, optionIndex) => (
                <div
                  className={`cursor-pointer p-4 transition-all duration-300 ease-out hover:bg-green-100 hover:rounded-md
                        ${selectedAnswer?.[questionIndex + 1] === optionIndex + 1 ? 'bg-green-100 rounded' : ''}
                    `}
                  onClick={() =>
                    handleClick(questionIndex + 1, optionIndex + 1)
                  }
                >
                  {`${optionIndex + 1}) ${option}`}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-[70%] ml-5 mt-5">
              <input
                type="text"
                required
                placeholder="정답을 입력해주세요"
                onChange={(event) =>
                  handleInputChange(questionIndex + 1, event)
                }
                className="w-full text-gray-900 border border-gray-500 p-3 rounded-md placeholder:text-gray-500 focus:outline-none focus:border-2 focus:border-green-700"
              />
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default QuizProblem
