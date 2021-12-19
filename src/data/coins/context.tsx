import React, { createContext, ReactNode, useMemo } from 'react';
import useSWR from 'swr';
import { Coin } from 'types/coin';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Context {
  coins: Coin[];
  bitcoin: Coin | null;
}

export const CoinsContext = createContext<Context>({
  coins: [],
  bitcoin: null,
});

interface CoinsContextProviderProps {
  children: ReactNode;
  refreshInterval: number;
}

export const CoinsContextProvider = ({
  children,
  refreshInterval,
}: CoinsContextProviderProps) => {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/coins/top`,
    fetcher,
    {
      refreshInterval,
    },
  );

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

  return (
    <CoinsContext.Provider value={{ coins, bitcoin }}>
      {children}
    </CoinsContext.Provider>
  );
};
