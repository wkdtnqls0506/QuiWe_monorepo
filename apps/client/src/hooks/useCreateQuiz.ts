import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuiz } from '@/apis/quiz';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TQuizRequest } from '@/types/quiz.type';

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['quiz'],
    mutationFn: (quizRequest: TQuizRequest) => createQuiz(quizRequest),
    onSuccess: (quizData) => {
      if (!quizData?.id) {
        toast.error('퀴즈 생성에 실패했습니다.');
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ['challenge', quizData.id]
      });

      router.replace(`/challenge/${quizData.id}`);
    },
    onError: () => {
      toast.error('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
