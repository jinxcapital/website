import { useContext, useMemo } from 'react';

import { CoinsContext } from './context';

export const useCoins = () => {
  const { coins, bitcoin } = useContext(CoinsContext);

  return useMemo(() => ({ coins, bitcoin }), [coins, bitcoin]);
};
