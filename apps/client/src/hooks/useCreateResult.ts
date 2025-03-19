import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createResult } from '@/apis/result';
import { TResultRequest } from '@/types/result.type';

export const useCreateResult = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['result'],
    mutationFn: ({ quizId, resultRequest }: { quizId: number; resultRequest: TResultRequest }) =>
      createResult({ quizId, resultRequest }),
    onSuccess: (resultData: any) => {
      queryClient.invalidateQueries({
        queryKey: ['result', resultData[0].quiz.id]
      });

      router.push(`/result/${resultData[0].quiz.id}`);
    },
    onError: () => {
      toast.error('해설 생성에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
