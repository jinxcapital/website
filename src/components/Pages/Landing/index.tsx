import Head from 'next/head';
import Image from 'next/image';

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
                href="https://garbage.jinx.capital"
                target="_blank"
                rel="noreferrer"
              >
                Garbage
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/jinxcapital"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://ftx.com/#a=jinxcapital"
                target="_blank"
                rel="noreferrer"
              >
                Trade on FTX
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={styles.logo}>
          <Image
            src="/jinx-capital.svg"
            alt="JINX CAPITAL"
            width="600"
            height="278"
          />
        </div>

        <p>
          <a href="mailto:jinxcapital@protonmail.com">
            jinxcapital@protonmail.com
          </a>
        </p>
      </main>

      <footer>&copy; {new Date().getFullYear()} Jinx Capital</footer>
    </div>
  );
};

export default Landing;
