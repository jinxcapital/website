import BitcoinExchangeNetflow from 'components/BitcoinExchangeNetflow';
import Charts from 'components/Charts';
import Layout from 'components/Layout';
import { useCoins } from 'data/coins/hooks';

const Landing = () => {
  const { coins } = useCoins();

  return (
    <Layout>
      <BitcoinExchangeNetflow />
      <Charts coins={coins} />
    </Layout>
  );
};

export default Landing;
