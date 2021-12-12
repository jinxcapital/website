import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ul>
        <li>
          <a
            href="https://ftx.com/referrals#a=jinxcapital"
            target="_blank"
            rel="noreferrer"
          >
            Trade with FTX
          </a>
        </li>
        <li>
          <a
            href="https://app.coinmarketman.com/exchanges/?rf=38514"
            target="_blank"
            rel="noreferrer"
          >
            Track with CoinMarketMan
          </a>
        </li>
      </ul>
      &copy; {new Date().getFullYear()} Jinx Capital
    </footer>
  );
};

export default Footer;
