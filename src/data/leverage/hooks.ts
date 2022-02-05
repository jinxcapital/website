import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useLeverage = (refreshInterval = 60000) => {
  const responseLeverage = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/leverage`,
    fetcher,
    {
      refreshInterval,
    },
  );

  const leverage = useMemo(() => {
    return responseLeverage?.data?.data;
  }, [responseLeverage?.data?.data]);

  return useMemo(() => ({ leverage }), [leverage]);
};
