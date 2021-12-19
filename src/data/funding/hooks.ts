import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFunding = (refreshInterval = 30000) => {
  const responseFunding = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/funding`,
    fetcher,
    {
      refreshInterval,
    },
  );

  const funding = useMemo(() => {
    return responseFunding?.data?.data;
  }, [responseFunding?.data?.data]);

  return useMemo(() => ({ funding }), [funding]);
};
