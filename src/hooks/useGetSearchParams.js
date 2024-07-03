import { useLocation, useSearchParams } from 'react-router-dom';

export function useGetSearchParams(key) {
  const location = useLocation();
  const [searchParams] = useSearchParams(location.search);
  const q = searchParams.get(key) || '';
  return { q };
}
