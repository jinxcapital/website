import { useCoins } from 'data/coins/hooks';
import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import { useFunding } from 'data/funding/hooks';
import { useLeverage } from 'data/leverage/hooks';
import { formatBigNumber, formatCurrenyCompact } from 'utils/formatters';

import styles from './styles.module.css';

const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fundingFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

const CoreData = () => {
  const { coins } = useCoins();
  const { exchangeNetflow } = useExchangeNetflow('bitcoin');
  const { leverage } = useLeverage();
  const { funding } = useFunding();

  return (
    <ul className={styles.container}>
      {exchangeNetflow && (
        <li className={styles.entry}>
          <strong className={styles.title}>Bitcoin exchange netflow</strong>
          <ul>
            <li>
              <strong>24H</strong>{' '}
              <span>
                {exchangeNetflow?.change?.day
                  ? formatBigNumber(exchangeNetflow.change.day)
                  : '--'}{' '}
                BTC
              </span>
            </li>
            <li>
              <strong>7D</strong>{' '}
              <span>
                {exchangeNetflow?.change?.week
                  ? formatBigNumber(exchangeNetflow.change.week)
                  : '--'}{' '}
                BTC
              </span>
            </li>
            <li>
              <strong>30D</strong>{' '}
              <span>
                {exchangeNetflow?.change?.month
                  ? formatBigNumber(exchangeNetflow.change.month)
                  : '--'}{' '}
                BTC
              </span>
            </li>
          </ul>
        </li>
      )}
      {leverage && (
        <li className={styles.entry}>
          <strong className={styles.title}>Leverage in the market</strong>
          <ul>
            <li>
              <strong>Open interest</strong>{' '}
              <span>
                {leverage?.openInterest
                  ? formatCurrenyCompact(leverage?.openInterest)
                  : '--'}
              </span>
            </li>
            <li>
              <strong>24H liquidations</strong>{' '}
              <span>
                {leverage?.liquidations24h
                  ? formatCurrenyCompact(leverage?.liquidations24h)
                  : '--'}
              </span>
            </li>
            <li>
              <strong>LSR</strong>{' '}
              <span>
                {leverage?.longRate && leverage?.shortRate
                  ? `${percentageFormatter.format(
                      leverage?.longRate / 100,
                    )} ${percentageFormatter.format(leverage?.shortRate / 100)}`
                  : '--'}
              </span>
            </li>
          </ul>
        </li>
      )}
      {funding &&
        Array.from(
          Array(Math.ceil(Object.keys(funding).length / 3)).keys(),
        ).map((index) => (
          <li className={styles.entry} key={`aggr-funding.list:${index}`}>
            <strong className={styles.title}>Aggregated funding rates</strong>
            <ul>
              {Object.entries(funding)
                .slice(index * 3, index * 3 + 3)
                .map(([coinId, data]) => {
                  const coin = coins.find((coin) => coin.id === coinId);
                  const rates = (data as Array<{ rate: number }>).filter(
                    (value) => !isNaN(value.rate),
                  );

                  return (
                    <li key={`aggr-funding:${coin}`}>
                      <strong>{coin?.name}</strong>{' '}
                      <span>
                        {fundingFormatter.format(
                          rates.reduce((sum, value) => {
                            return sum + value.rate;
                          }, 0) /
                            rates.length /
                            100,
                        )}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </li>
        ))}
    </ul>
  );
};

export default CoreData;
