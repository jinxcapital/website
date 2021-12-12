import BitcoinExchangeNetflow from 'components/BitcoinExchangeNetflow';
import Charts from 'components/Charts';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { useCoins } from 'data/coins/hooks';
import Head from 'next/head';
import { useMemo } from 'react';
import { formatCurrency, formatPercentage } from 'utils/formatters';

import styles from './styles.module.css';

const Landing = () => {
  const { bitcoin, coins } = useCoins();

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
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:site" content="@jinxcapital" />
        <meta name="twitter:creator" content="@0xpowder" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
        />
        <meta property="og:url" content="https://jinx.capital" />
      </Head>

      <Header coins={coins} />

      <main>
        <BitcoinExchangeNetflow />
        <Charts coins={coins} />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
