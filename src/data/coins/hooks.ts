import { useMemo } from 'react';
import useSWR from 'swr';
import { Coin } from 'types/coin';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useCoins = () => {
  const { data } = useSWR('https://api.jinx.capital/coins-top', fetcher, {
    refreshInterval: 15000,
  });

  const coins: Coin[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.data?.slice(0, 15);
  }, [data]);

  const bitcoin: Coin | null = useMemo(
    () => coins.find((coin) => coin.id === 'bitcoin') || null,
    [coins],
  );

  return useMemo(() => ({ coins, bitcoin }), [coins, bitcoin]);
};
