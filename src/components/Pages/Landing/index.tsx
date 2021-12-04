import Head from 'next/head';

import styles from './styles.module.css';

const Landing = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jinx Capital</title>
      </Head>

      <header>
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
            <li>
              <a
                href="https://github.com/jinxcapital"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={styles.logo}>
          <img src="/jinx-capital.svg" alt="JINX CAPITAL" />
        </div>
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
