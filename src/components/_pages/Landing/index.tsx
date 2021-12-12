import BitcoinExchangeNetflow from 'components/BitcoinExchangeNetflow';
import Charts from 'components/Charts';
import Layout from 'components/Layout';

const Landing = () => {
  return (
    <Layout>
      <BitcoinExchangeNetflow />
      <Charts />
    </Layout>
  );
};

export default Landing;
