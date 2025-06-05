import { createPortfolio } from '@/apis/portfolio';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['portfolio'],
    mutationFn: (file: File | null) => createPortfolio(file),
    onSuccess: (pdfUploadData) => {
      if (!pdfUploadData || !pdfUploadData.quizId) {
        toast.error('업로드한 PDF에서 유효한 텍스트를 추출할 수 없습니다. 다른 파일을 시도해주세요.');
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ['challenge', pdfUploadData.quizId]
      });
    },
    onError: () => {
      toast.error('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
    }
  });
};
