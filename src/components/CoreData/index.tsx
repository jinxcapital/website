import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import { useLeverage } from 'data/leverage/hooks';
import { formatBigNumber, formatCurrenyCompact } from 'utils/formatters';

import styles from './styles.module.css';

const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const CoreData = () => {
  const { exchangeNetflow } = useExchangeNetflow('bitcoin');
  const { leverage } = useLeverage();

  return (
    <ul className={styles.container}>
      {exchangeNetflow && (
        <li className={styles.entry}>
          <strong className={styles.title}>Bitcoin exchange netflow</strong>{' '}
          <ul>
            <li>
              <strong>24 hours</strong>{' '}
              <span>
                {exchangeNetflow?.change?.day
                  ? formatBigNumber(exchangeNetflow.change.day)
                  : '--'}{' '}
                BTC
              </span>
            </li>
            <li>
              <strong>7 days</strong>{' '}
              <span>
                {exchangeNetflow?.change?.week
                  ? formatBigNumber(exchangeNetflow.change.week)
                  : '--'}{' '}
                BTC
              </span>
            </li>
            <li>
              <strong>30 days</strong>{' '}
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
          <strong className={styles.title}>Leverage in the market</strong>{' '}
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
              <strong>L/S ratio</strong>{' '}
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
    </ul>
  );
};

export default CoreData;
