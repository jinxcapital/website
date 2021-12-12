import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useExchangeNetflow = (coinId: string, refreshInterval = 30000) => {
  const responseExchangeNetflow = useSWR(
    `https://api.jinx.capital/exchange-flows/${coinId}`,
    fetcher,
    {
      refreshInterval,
    },
  );

  const exchangeNetflow = useMemo(() => {
    return responseExchangeNetflow.data?.data?.total;
  }, [responseExchangeNetflow]);

  return useMemo(() => ({ exchangeNetflow }), [exchangeNetflow]);
};
