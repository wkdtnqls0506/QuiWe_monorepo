import { fetchWithAuth } from '@/interceptors/authFetchInterceptor.ts';
import { TUserResponse } from '@/types/user.type';

export async function getUser(): Promise<TUserResponse | null> {
  const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);

  if (!response) {
    return null;
  }

  return response as TUserResponse;
}
