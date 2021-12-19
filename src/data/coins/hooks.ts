import { useContext, useMemo } from 'react';

import { CoinsContext } from './context';

export const useCoins = (limit = 15) => {
  const { coins, bitcoin } = useContext(CoinsContext);

  return useMemo(() => {
    return { coins: coins.slice(0, limit), bitcoin };
  }, [coins, bitcoin, limit]);
};
