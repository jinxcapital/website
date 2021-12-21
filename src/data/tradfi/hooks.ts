import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useTradfi = (refreshInterval = 20000) => {
  const responseTrafi = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/tradfi`,
    fetcher,
    {
      refreshInterval,
    },
  );

  const tradfi = useMemo(() => {
    return (
      (responseTrafi?.data?.data as Array<{
        symbol: string;
        value: number;
        percentageChange: number;
      }>) || []
    );
  }, [responseTrafi?.data?.data]);

  return useMemo(() => {
    const ndx = tradfi.find((item) => item.symbol === 'NDX');
    const spx = tradfi.find((item) => item.symbol === 'SPX');
    const dji = tradfi.find((item) => item.symbol === 'DJI');

    return { ndx, spx, dji, tradfi };
  }, [tradfi]);
};
