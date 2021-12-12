import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import { formatBigNumber } from 'utils/formatters';

import styles from './styles.module.css';

const BitcoinExchangeNetflow = () => {
  const { exchangeNetflow } = useExchangeNetflow('bitcoin');

  if (!exchangeNetflow) {
    return null;
  }

  return (
    <div className={styles.container}>
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
  );
};

export default BitcoinExchangeNetflow;
