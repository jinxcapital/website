import Link from 'next/link';
import { IoMenu } from 'react-icons/io5';
import { Coin } from 'types/coin';
import {
  formatCurrency,
  formatCurrencyExtraSmall,
  formatCurrencySmall,
  formatCurrenyBig,
  formatPercentage,
} from 'utils/formatters';

import styles from './styles.module.css';

interface Props {
  coins: Coin[];
}

const Header = ({ coins }: Props) => {
  return (
    <header className={styles.container}>
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
            <a>
              <IoMenu />
              <span>Menu</span>
            </a>
            <ul className={styles.subMenu}>
              <li className={styles.dropdownLink}>
                <a
                  href="https://api.jinx.capital"
                  target="_blank"
                  rel="noreferrer"
                >
                  API
                </a>
              </li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://ftx.com/referrals#a=jinxcapital"
                  target="_blank"
                  rel="noreferrer"
                >
                  Trade on FTX
                </a>
              </li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://app.coinmarketman.com/exchanges/?rf=38514"
                  target="_blank"
                  rel="noreferrer"
                >
                  Coin Market Manager
                </a>
              </li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://twitter.com/0xpowder"
                  target="_blank"
                  rel="noreferrer"
                >
                  @0xpowder on Twitter
                </a>
              </li>
              <li className={styles.dropdownLink}>
                <a href="mailto:0xpowder@protonmail.com">
                  0xpowder@protonmail.com
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {!!coins.length && (
        <div className={styles.scroller}>
          <ul className={styles.coins}>
            {[...coins, ...coins].map((coin: Coin, index: number) => (
              <li
                key={`scroller-coin-${coin.id}:${index}`}
                className={styles.coin}
              >
                <strong>{coin.name}</strong>{' '}
                <span>
                  {coin.price >= 1000
                    ? formatCurrenyBig(coin.price)
                    : coin.price >= 0.1
                    ? formatCurrency(coin.price)
                    : coin.price >= 0.01
                    ? formatCurrencySmall(coin.price)
                    : formatCurrencyExtraSmall(coin.price)}{' '}
                  {coin.percentageChange24h > 0 ? '▲' : '▼'}{' '}
                  {formatPercentage(coin.percentageChange24h / 100)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
