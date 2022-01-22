import { useCoins } from 'data/coins/hooks';
import Link from 'next/link';
import { MouseEvent, useCallback, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { Coin } from 'types/coin';
import {
  formatCurrency,
  formatCurrencyExtraSmall,
  formatCurrencySmall,
  formatCurrenyBig,
  formatPercentage,
} from 'utils/formatters';

import styles from './styles.module.css';

const Header = () => {
  const { coins } = useCoins();
  const [show, setShow] = useState(false);

  const onMenuClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setShow(true);
  }, []);

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
          <li className={show ? styles.isActive : undefined}>
            <a onClick={onMenuClick}>
              <IoMenu />
              <span>Menu</span>
            </a>
            <ul className={show ? styles.showSubMenu : undefined}>
              <li className={styles.closeButton}>
                <button onClick={() => setShow(false)}>
                  <IoClose />
                </button>
              </li>
              <li className={styles.dropdownHeading}>Menu</li>
              <li className={styles.dropdownLink}>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className={`${styles.dropdownLink} ${styles.last}`}>
                <Link href="/api-docs">
                  <a>API Docs</a>
                </Link>
              </li>
              <li className={styles.dropdownHeading}>Socials</li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://github.com/0xpowder"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://twitter.com/0xpowder"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li className={`${styles.dropdownLink} ${styles.last}`}>
                <a
                  href="https://tradingview.com/u/powder0x"
                  target="_blank"
                  rel="noreferrer"
                >
                  TradingView
                </a>
              </li>
              <li className={styles.dropdownHeading}>Referrals</li>
              <li className={styles.dropdownLink}>
                <a
                  href="https://ftx.com/referrals#a=jinxcapital"
                  target="_blank"
                  rel="noreferrer"
                >
                  Trade with FTX
                </a>
              </li>
              <li className={`${styles.dropdownLink} ${styles.last}`}>
                <a
                  href="https://app.coinmarketman.com/exchanges/?rf=38514"
                  target="_blank"
                  rel="noreferrer"
                >
                  Track with Coin Market Manager
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
                    : formatCurrencyExtraSmall(coin.price)}
                </span>{' '}
                {coin.priceChange24h && (
                  <span
                    className={`${styles.priceChange} ${
                      coin.priceChange24h > 0
                        ? styles.valueUp
                        : styles.valueDown
                    }`}
                  >
                    {coin.priceChange24h > 0 && '+'}
                    {coin.priceChange24h >= 1000
                      ? formatCurrenyBig(coin.priceChange24h)
                      : coin.priceChange24h >= 0.1
                      ? formatCurrency(coin.priceChange24h)
                      : coin.priceChange24h >= 0.01
                      ? formatCurrencySmall(coin.priceChange24h)
                      : formatCurrencyExtraSmall(coin.priceChange24h)}
                  </span>
                )}
                <span
                  className={
                    coin.percentageChange24h > 0
                      ? styles.arrowUp
                      : styles.arrowDown
                  }
                >
                  {coin.percentageChange24h > 0 ? '▲' : '▼'}
                </span>{' '}
                <span
                  className={`${styles.percentage} ${
                    coin.percentageChange24h > 0
                      ? styles.percentageUp
                      : styles.percentageDown
                  }`}
                >
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
