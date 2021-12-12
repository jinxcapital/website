import { usePreviousValue } from 'beautiful-react-hooks';
import { useMemo } from 'react';
import { Coin } from 'types/coin';

import styles from './styles.module.css';

interface Props {
  coins: Coin[];
}

const Charts = (props: Props) => {
  const coins = useMemo(() => {
    return props.coins
      .filter(
        (coin) => !['usdt', 'usdc', 'dai', 'ust', 'busd'].includes(coin.symbol),
      )
      .slice(0, 10);
  }, [props.coins]);
  const previousCoins = usePreviousValue(coins);

  return (
    <div className={styles.container}>
      {coins.map((coin) => {
        const previousCoin = (previousCoins || []).find(
          (previousCoin) => previousCoin.id === coin.id,
        );

        return (
          <a
            className={styles.link}
            href={`${process.env.NEXT_PUBLIC_API_URL}/chart/${coin.symbol}:usdt.jpg`}
            key={`chart-${coin.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/chart/${
                (previousCoin || coin).symbol
              }:usdt.jpg?${(previousCoin || coin).price}`}
              alt={`${(previousCoin || coin).symbol}:usdt.jpg`}
              loading="lazy"
              width="640"
              height="360"
            />
            {previousCoin && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/chart/${coin.symbol}:usdt.jpg?${coin.price}`}
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
  );
};

export default Charts;
