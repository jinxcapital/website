import Layout from 'components/Layout';
import { useCoins } from 'data/coins/hooks';

import styles from './styles.module.css';

const Charts = () => {
  const { bitcoin } = useCoins();
  return (
    <Layout title="Charts - Jinx Capital">
      <h1>Charts</h1>
      <div className={styles.charts}>
        <div className={styles.link}>
          <p>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
              target="_blank"
              rel="noreferrer"
            >
              {`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
            </a>
          </p>
        </div>
        <p>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg?${bitcoin?.price}`}
            alt={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
            loading="lazy"
            className={styles.img}
          />
        </p>
      </div>
    </Layout>
  );
};

export default Charts;
