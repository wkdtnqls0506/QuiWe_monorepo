import quizCategory from '@/constants/quizCategory'
import { useSearchParams } from 'next/navigation'

const QuizCategory = () => {
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get('category')

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categoryId)
    window.history.pushState({}, '', `?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-3 gap-10 auto-rows-[6rem] mt-8">
      {quizCategory.map((item) => (
        <div
          className={`h-20 flex justify-center items-center text-center p-3 bg-green-100 rounded-md font-bold text-green-800 transition-all duration-200 ease-in-out cursor-pointer
          ${categoryParams === item.id ? 'bg-green-200' : ''}`}
          key={item.id}
          onClick={() => handleCategoryClick(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default QuizCategory
