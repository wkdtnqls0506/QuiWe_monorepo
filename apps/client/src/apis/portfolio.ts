import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TPortfolio, TPortfolioResponse } from '@/types/portfolio.type';

export async function createPortfolio(file: File | null): Promise<TPortfolio | null> {
  if (!file) return null;

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response) {
    throw new Error('포트폴리오 업로드에 실패하였습니다.');
  }

  return response as TPortfolio;
}

export async function getPortfolio(userId: number | undefined): Promise<TPortfolioResponse[] | null> {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/portfolio/${userId}`);

  if (!response) {
    throw new Error('포트폴리오를 가져오는 데 실패하였습니다.');
  }

  return response as TPortfolioResponse[];
}
