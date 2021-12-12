import BitcoinExchangeNetflow from 'components/BitcoinExchangeNetflow';
import Charts from 'components/Charts';
import Layout from 'components/Layout';
import { useCoins } from 'data/coins/hooks';
import { useMemo } from 'react';
import { formatCurrency, formatPercentage } from 'utils/formatters';

const Landing = () => {
  const { bitcoin } = useCoins();

  const title = useMemo(() => {
    if (bitcoin) {
      return `Jinx Capital - Bitcoin: ${formatCurrency(bitcoin.price)}`;
    }

    return 'Jinx Capital';
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
