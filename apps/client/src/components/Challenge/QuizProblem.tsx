import { useAnswerStore } from '@/providers/userAnswer-store-provider';
import { TQuestion } from '@/types/quiz.type';

type TQuizProps = {
  questions: TQuestion[];
  questionRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const QuizProblem = ({ questions, questionRefs }: TQuizProps) => {
  const { answers, setAnswers } = useAnswerStore((state) => state);

  const handleClick = (questionId: number, questionTitle: string) => {
    setAnswers(questionId, questionTitle);
  };

  const handleInputChange = (questionId: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers(questionId, event.target.value);
  };

  return (
    <div className='flex justify-center px-4'>
      <div className='w-full max-w-[1000px]'>
        {questions.map((question, questionIndex) => (
          <div
            key={question.id}
            ref={(el) => {
              questionRefs.current[questionIndex] = el;
            }}
            className='flex flex-col gap-4 p-8'
          >
            <h3 className='text-green-800 text-lg font-semibold'>{`${questionIndex + 1}. ${question.title}`}</h3>

            {question.type === 'multiple_choice' ? (
              <div className='flex flex-col gap-2'>
                {question.options?.map((option, optionIndex) => {
                  const isSelected = answers.find((a) => a.questionId === question.id)?.userAnswer === option;

                  return (
                    <button
                      key={`${question.id}-${optionIndex}`}
                      onClick={() => handleClick(question.id, option)}
                      className={`flex items-center gap-4 w-full text-left p-3 rounded-md border text-md transition 
                        ${
                          isSelected
                            ? 'bg-green-100 border-green-500 text-green-800 font-medium'
                            : 'hover:bg-gray-50 border-gray-300'
                        }`}
                    >
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full border text-sm font-semibold
            ${isSelected ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'}`}
                      >
                        {optionIndex + 1}
                      </div>
                      <span className='text-gray-800'>{option}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                required
                rows={5}
                placeholder='정답을 입력해주세요'
                value={answers.find((a) => a.questionId === question.id)?.userAnswer || ''}
                onChange={(event) => handleInputChange(question.id, event)}
                className='w-full min-h-[100px] text-gray-900 border border-gray-400 p-3 rounded-md placeholder:text-gray-500 focus:outline-none focus:border-green-700'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizProblem;
