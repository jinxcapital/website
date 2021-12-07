import { usePreviousValue } from 'beautiful-react-hooks';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
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
const bigNumberFormatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1,
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
  const { data } = useSWR('https://api.jinx.capital/coins-top', fetcher, {
    refreshInterval: 15000,
  });

  const coins = useMemo(() => {
    if (!data) {
      return [];
    }

    return data?.data?.slice(0, 15);
  }, [data]);
  const previousCoins = usePreviousValue(coins);

  useEffect(() => {
    console.log({ coins });
  }, [coins]);
  useEffect(() => {
    console.log({ previousCoins });
  }, [previousCoins]);

  const responseExchangeNetflow = useSWR(
    'https://api.jinx.capital/exchange-flows/bitcoin',
    fetcher,
    {
      refreshInterval: 30000,
    },
  );

  const exchangeNetflow = useMemo(() => {
    return responseExchangeNetflow.data?.data?.total;
  }, [responseExchangeNetflow]);

  const bitcoin = useMemo(
    () => coins.find((coin: Coin) => coin.id === 'bitcoin'),
    [coins],
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>
          Jinx Capital
          {!!bitcoin &&
            ` - Bitcoin: ${currencyFormatter.format(bitcoin.price)}`}
        </title>
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
        {exchangeNetflow && (
          <div className={styles.exchangeNetFlow}>
            <strong>Bitcoin exchange netflow</strong>{' '}
            <ul>
              <li>
                <strong>24H</strong>{' '}
                <span>
                  {bigNumberFormatter.format(exchangeNetflow.change.day)} BTC
                </span>
              </li>
              <li>
                <strong>7D</strong>{' '}
                <span>
                  {bigNumberFormatter.format(exchangeNetflow.change.week)} BTC
                </span>
              </li>
              <li>
                <strong>30D</strong>{' '}
                <span>
                  {bigNumberFormatter.format(exchangeNetflow.change.month)} BTC
                </span>
              </li>
            </ul>
          </div>
        )}

        <div className={styles.charts}>
          {coins
            .filter(
              (coin: Coin) =>
                !['usdt', 'usdc', 'dai', 'ust', 'busd'].includes(coin.symbol),
            )
            .slice(0, 10)
            .map((coin: Coin) => {
              const previousCoin = (previousCoins || []).find(
                (previousCoin: Coin) => previousCoin.id === coin.id,
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
