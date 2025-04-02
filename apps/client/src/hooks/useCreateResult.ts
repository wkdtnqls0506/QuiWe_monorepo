import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createResult } from '@/apis/result';
import { TUserAnswer } from '@/types/result.type';

export const useCreateResult = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ['result'],
    mutationFn: ({ quizId, answers }: { quizId: number; answers: TUserAnswer[] }) => createResult(quizId, answers),
    onSuccess: (resultData: any) => {
      if (!resultData?.quizId) {
        toast.error('결과 데이터가 존재하지 않습니다');
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ['result', resultData.quizId]
      });

      router.push(`/result/${resultData.quizId}`);
    },
    onError: () => {
      toast.error('해설 생성에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
