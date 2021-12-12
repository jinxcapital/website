import { usePreviousValue } from 'beautiful-react-hooks';
import Header from 'components/Header';
import { useCoins } from 'data/coins/hooks';
import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import Head from 'next/head';
import { useMemo } from 'react';
import {
  formatBigNumber,
  formatCurrency,
  formatPercentage,
} from 'utils/formatters';

import styles from './styles.module.css';

const Landing = () => {
  const { exchangeNetflow } = useExchangeNetflow();
  const { bitcoin, coins } = useCoins();
  const previousCoins = usePreviousValue(coins);

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
          content="https://api.jinx.capital/chart/btc:usd.jpg"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content="https://api.jinx.capital/chart/btc:usd.jpg"
        />
        <meta property="og:url" content="https://jinx.capital" />
      </Head>

      <Header coins={coins} />

      <main>
        {exchangeNetflow && (
          <div className={styles.exchangeNetFlow}>
            <strong>Bitcoin exchange netflow</strong>{' '}
            <ul>
              <li className={styles.item}>
                <strong>24H</strong>{' '}
                <span>{formatBigNumber(exchangeNetflow.change.day)} BTC</span>
              </li>
              <li className={styles.item}>
                <strong>7D</strong>{' '}
                <span>{formatBigNumber(exchangeNetflow.change.week)} BTC</span>
              </li>
              <li className={styles.item}>
                <strong>30D</strong>{' '}
                <span>{formatBigNumber(exchangeNetflow.change.month)} BTC</span>
              </li>
            </ul>
          </div>
        )}

        <div className={styles.charts}>
          {coins
            .filter(
              (coin) =>
                !['usdt', 'usdc', 'dai', 'ust', 'busd'].includes(coin.symbol),
            )
            .slice(0, 10)
            .map((coin) => {
              const previousCoin = (previousCoins || []).find(
                (previousCoin) => previousCoin.id === coin.id,
              );

              if (coin.id === 'bitcoin') {
                console.log(coin?.price, previousCoin?.price);
              }

              return (
                <a
                  className={styles.link}
                  href={`https://api.jinx.capital/chart/${coin.symbol}:usdt.jpg`}
                  key={`chart-${coin.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`https://api.jinx.capital/chart/${
                      (previousCoin || coin).symbol
                    }:usdt.jpg?${(previousCoin || coin).price}`}
                    alt={`${(previousCoin || coin).symbol}:usdt.jpg`}
                    loading="lazy"
                    width="640"
                    height="360"
                  />
                  {previousCoin && (
                    <img
                      src={`https://api.jinx.capital/chart/${coin.symbol}:usdt.jpg?${coin.price}`}
                      alt={`${coin.symbol}:usdt.jpg`}
                      loading="lazy"
                      width="640"
                      height="360"
                      className={styles.new}
                    />
                  )}
                </a>
              );
            })}
        </div>
      </main>

      <footer>&copy; {new Date().getFullYear()} Jinx Capital</footer>
    </div>
  );
};

export default Landing;
