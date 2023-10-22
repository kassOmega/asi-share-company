import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const useParams = (): [
  URLSearchParams,
  (name: string, val: string) => void
] => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const setParams = useCallback(
    (name: string, val: string) => {
      params.delete(name);
      params.append(name, val);
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    },
    [navigate, location.pathname, params]
  );

  return [params, setParams];
};
