import { usePreviousValue } from 'beautiful-react-hooks';
import { useCoins } from 'data/coins/hooks';
import { useMemo } from 'react';

import styles from './styles.module.css';

const Charts = () => {
  const { coins: allCoins } = useCoins();
  const coins = useMemo(() => {
    return allCoins.filter(
      (coin) => !['usdt', 'usdc', 'dai', 'ust', 'busd'].includes(coin.symbol),
    );
  }, [allCoins]);
  const previousCoins = usePreviousValue(coins);

  return (
    <div className={styles.container}>
      {coins.map((coin) => {
        const previousCoin = (previousCoins || []).find(
          (previousCoin) => previousCoin.id === coin.id,
        );

        let quote = 'usd';
        if (['near', 'luna'].includes(coin.symbol)) {
          quote = 'usdt';
        }

        return (
          <a
            className={styles.link}
            href={`${process.env.NEXT_PUBLIC_API_URL}/chart/${coin.symbol}:${quote}.jpg`}
            key={`chart-${coin.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/chart/${
                (previousCoin || coin).symbol
              }:${quote}.jpg?${(previousCoin || coin).price}`}
              alt={`${(previousCoin || coin).symbol}:${quote}.jpg`}
              loading="lazy"
              width="640"
              height="360"
            />
            {previousCoin && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/chart/${coin.symbol}:${quote}.jpg?${coin.price}`}
                alt={`${coin.symbol}:${quote}.jpg`}
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
  );
};

export default Charts;
