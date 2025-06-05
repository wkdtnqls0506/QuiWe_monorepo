import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type UseNavigationOnSuccessProps<T> = {
  isSuccess: boolean;
  data: T | undefined;
  getRedirectPath: (data: T) => string;
};

export const useNavigationOnSuccess = <T>({ isSuccess, data, getRedirectPath }: UseNavigationOnSuccessProps<T>) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      setIsNavigating(true);
      router.replace(getRedirectPath(data));
    }
  }, [isSuccess, data, router, getRedirectPath]);

  return { isNavigating };
};
