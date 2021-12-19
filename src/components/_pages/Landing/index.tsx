import Charts from 'components/Charts';
import BitcoinExchangeNetflow from 'components/CoreData';
import Layout from 'components/Layout';
import { useCoins } from 'data/coins/hooks';
import { useMemo } from 'react';
import { formatCurrency, formatPercentage } from 'utils/formatters';

const Landing = () => {
  const { bitcoin } = useCoins();

  const title = useMemo(() => {
    if (bitcoin) {
      return `Bitcoin: ${formatCurrency(bitcoin.price)} | JINX CAPITAL`;
    }

    return 'JINX CAPITAL';
  }, [bitcoin]);

  const description = useMemo(() => {
    if (bitcoin) {
      return `Jinx Capital is a fictive cryptonative investment fund of @0xpowder. Btw the price of Bitcoin changed with ${formatPercentage(
        bitcoin.percentageChange24h / 100,
      )} in the last 24h and is currently sitting at ${formatCurrency(
        bitcoin.price,
      )}!`;
    }

    return 'Jinx Capital is a fictive cryptonative investment fund of @0xpowder.';
  }, [bitcoin]);

  return (
    <Layout title={title} description={description}>
      <BitcoinExchangeNetflow />
      <Charts />
    </Layout>
  );
};

export default Landing;
