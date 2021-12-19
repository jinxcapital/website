import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import { formatBigNumber } from 'utils/formatters';

import styles from './styles.module.css';

const CoreData = () => {
  const { exchangeNetflow } = useExchangeNetflow('bitcoin');

  return (
    <ul className={styles.container}>
      <li className={styles.entry}>
        <strong className={styles.title}>Bitcoin exchange netflow</strong>{' '}
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
    </ul>
  );
};

export default CoreData;
