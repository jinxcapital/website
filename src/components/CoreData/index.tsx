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
  signDisplay: 'always',
});

const CoreData = () => {
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
              <div>
                <strong>24H</strong>{' '}
                <span>
                  {exchangeNetflow?.change?.day
                    ? formatBigNumber(exchangeNetflow.change.day)
                    : '--'}{' '}
                  BTC
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>7D</strong>{' '}
                <span>
                  {exchangeNetflow?.change?.week
                    ? formatBigNumber(exchangeNetflow.change.week)
                    : '--'}{' '}
                  BTC
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>30D</strong>{' '}
                <span>
                  {exchangeNetflow?.change?.month
                    ? formatBigNumber(exchangeNetflow.change.month)
                    : '--'}{' '}
                  BTC
                </span>
              </div>
            </li>
          </ul>
        </li>
      )}
      {leverage && (
        <li className={styles.entry}>
          <strong className={styles.title}>Leverage in the market</strong>
          <ul>
            <li>
              <div>
                <strong>Open interest</strong>{' '}
                <span>
                  {leverage?.openInterest
                    ? formatCurrenyCompact(leverage?.openInterest)
                    : '--'}
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>24H liquidations</strong>{' '}
                <span>
                  {leverage?.liquidations24h
                    ? formatCurrenyCompact(leverage?.liquidations24h)
                    : '--'}
                </span>
              </div>
            </li>
            <li>
              <div>
                <strong>LSR</strong>{' '}
                <span>
                  {leverage?.longRate && leverage?.shortRate
                    ? `${percentageFormatter.format(
                        leverage?.longRate / 100,
                      )} ${percentageFormatter.format(
                        leverage?.shortRate / 100,
                      )}`
                    : '--'}
                </span>
              </div>
            </li>
          </ul>
        </li>
      )}
      {funding &&
        Array.from(
          Array(Math.floor(Object.keys(funding).length / 3)).keys(),
        ).map((index) => (
          <li className={styles.entry} key={`aggr-funding.list:${index}`}>
            <div>
              <strong className={styles.title}>Aggregated funding rates</strong>
              <ul>
                {funding.slice(index * 3, index * 3 + 3).map((funding) => {
                  const rates = (
                    funding?.rates as Array<{ rate: number }>
                  ).filter((value) => !isNaN(value.rate));

                  const rate =
                    rates.reduce((sum, value) => {
                      return sum + value.rate;
                    }, 0) /
                    rates.length /
                    100;

                  return (
                    <li key={`aggr-funding:${funding?.coin.id}`}>
                      <strong>{funding?.coin.name}</strong>{' '}
                      <span>{fundingFormatter.format(rate)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default CoreData;
