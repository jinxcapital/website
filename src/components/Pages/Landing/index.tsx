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
          <img
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
