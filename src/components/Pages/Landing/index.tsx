import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import useSWR from 'swr';
import fetch from 'unfetch';

import styles from './styles.module.css';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
const currencyFormatterSmall = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const currencyFormatterExtraSmall = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});
const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
  signDisplay: 'always',
});

type Coin = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  percentageChange24h: number;
};

const Landing = () => {
  const { data } = useSWR('http://localhost:3001/coins-top', fetcher, {
    refreshInterval: 10000,
  });

  const coins = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.data?.slice(0, 25);
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Jinx Capital</title>
      </Head>

      <header>
        <nav>
          <Link href="/">
            <a>
              <img
                src="/jinx-capital.svg"
                alt="JINX CAPITAL"
                className={styles.logo}
              />
            </a>
          </Link>

          <ul>
            <li>
              <a
                href="https://api.jinx.capital"
                target="_blank"
                rel="noreferrer"
              >
                API
              </a>
            </li>
          </ul>
        </nav>
        {!!coins.length && (
          <div className={styles.scroller}>
            <ul>
              {[...coins, ...coins].map((coin: Coin, index: number) => (
                <li key={`scroller-coin-${coin.id}:${index}`}>
                  <strong>{coin.name}</strong>{' '}
                  {coin.price > 1.05
                    ? currencyFormatter.format(coin.price)
                    : coin.price > 0.01
                    ? currencyFormatterSmall.format(coin.price)
                    : currencyFormatterExtraSmall.format(coin.price)}{' '}
                  {coin.percentageChange24h > 0 ? '▲' : '▼'}{' '}
                  {percentageFormatter.format(coin.percentageChange24h / 100)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main>
        <div className={styles.charts}>
          {coins
            .filter(
              (coin: Coin) =>
                !['usdt', 'usdc', 'dai', 'ust', 'busd'].includes(coin.symbol),
            )
            .slice(0, 10)
            .map((coin: Coin) => (
              <img
                key={`chart-${coin}`}
                src={`https://api.jinx.capital/chart/${coin.symbol}:usdt.jpg`}
                alt={`${coin.symbol}:usdt.jpg`}
                loading="lazy"
                width="640"
                height="360"
              />
            ))}
        </div>
      </main>

      <footer>&copy; {new Date().getFullYear()} Jinx Capital</footer>
    </div>
  );
};

export default Landing;
