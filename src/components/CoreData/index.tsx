import TextSpinner from 'components/TextSpinner';
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
      <li className={styles.entry}>
        <div>
          <strong className={styles.title}>Bitcoin exchange netflow</strong>
          <ul>
            <li>
              {exchangeNetflow?.change?.day ? (
                <>
                  <strong>24H</strong>{' '}
                  <span>{formatBigNumber(exchangeNetflow.change.day)} BTC</span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
            <li>
              {exchangeNetflow?.change?.week ? (
                <>
                  <strong>7D</strong>{' '}
                  <span>
                    {formatBigNumber(exchangeNetflow.change.week)} BTC
                  </span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
            <li>
              {exchangeNetflow?.change?.month ? (
                <>
                  <strong>30D</strong>{' '}
                  <span>
                    {formatBigNumber(exchangeNetflow.change.month)} BTC
                  </span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
          </ul>
        </div>
      </li>
      <li className={styles.entry}>
        <div>
          <strong className={styles.title}>Leverage in the market</strong>
          <ul>
            <li>
              {leverage?.openInterest ? (
                <>
                  <strong>Open interest</strong>{' '}
                  <span>{formatCurrenyCompact(leverage?.openInterest)}</span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
            <li>
              {leverage?.liquidations24h ? (
                <>
                  <strong>24H liquidations</strong>{' '}
                  <span>{formatCurrenyCompact(leverage?.liquidations24h)}</span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
            <li>
              {leverage?.longRate && leverage?.shortRate ? (
                <>
                  <strong>LSR</strong>{' '}
                  <span>
                    {percentageFormatter.format(leverage?.longRate / 100)}{' '}
                    {percentageFormatter.format(leverage?.shortRate / 100)}
                  </span>
                </>
              ) : (
                <TextSpinner />
              )}
            </li>
          </ul>
        </div>
      </li>
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
