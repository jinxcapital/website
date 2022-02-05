import { useCoins } from 'data/coins/hooks';
import { useMemo } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFunding = (refreshInterval = 60000) => {
  const { coins } = useCoins(100);
  const responseFunding = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/funding`,
    fetcher,
    {
      refreshInterval,
    },
  );

  const funding = useMemo(() => {
    return coins
      .map((coin) => {
        if (!responseFunding?.data?.data) {
          return null;
        }

        const rates = Object.entries(responseFunding?.data?.data)
          .find(([coinId]) => coinId === coin.id)
          ?.pop();
        if (rates) {
          return { coin, rates };
        }

        return null;
      })
      .filter(Boolean);
  }, [responseFunding?.data?.data, coins]);

  return useMemo(() => ({ funding }), [funding]);
};
