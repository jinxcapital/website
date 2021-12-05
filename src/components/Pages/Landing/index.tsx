import Head from 'next/head';
import Link from 'next/link';

import styles from './styles.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jinx Capital</title>
      </Head>

      <header>
        <Link href="/">
          <a>
            <img
              src="/jinx-capital.svg"
              alt="JINX CAPITAL"
              className={styles.logo}
            />
          </a>
        </Link>

        <nav>
          <ul>
            <li>
              <a
                href="https://api.jinx.capital"
                target="_blank"
                rel="noreferrer"
              >
                API
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={styles.chart}>
          <img
            src="https://api.jinx.capital/chart/btc:usd.jpg"
            alt="btc:usd.jpg"
            width="640"
            height="360"
          />
          <img
            src="https://api.jinx.capital/chart/eth:usd.jpg"
            alt="eth:usd.jpg"
            width="640"
            height="360"
          />
          <img
            src="https://api.jinx.capital/chart/ltc:usd.jpg"
            alt="ltc:usd.jpg"
            width="640"
            height="360"
          />
        </div>
      </main>

      <footer>&copy; {new Date().getFullYear()} Jinx Capital</footer>
    </div>
  );
};

export default Landing;
