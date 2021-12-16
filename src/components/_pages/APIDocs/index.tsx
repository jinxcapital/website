import Layout from 'components/Layout';

import styles from './styles.module.css';

const API_ENDPOINTS = [
  {
    method: 'GET',
    path: '/coins',
    description: 'Get a list of coins with their id, symbol & name',
  },
  {
    method: 'GET',
    path: '/coins/:id',
    description:
      'Get detailed info for a coin (rank, price, price change, market cap, ath, pullback, website, ...)',
    params: {
      id: {
        description: 'the id of the coin',
        type: 'string',
        examples: ['bitcoin', 'ethereum', 'litecoin'],
      },
    },
  },
  {
    method: 'GET',
    path: '/coins/:id/image.png',
    description: 'Coin image as image/png',
    params: {
      id: {
        description: 'the id of the coin',
        type: 'string',
        examples: ['bitcoin', 'ethereum', 'litecoin'],
      },
    },
  },
  {
    method: 'GET',
    path: '/coins-top',
    description:
      'Get detailed info for top 100 coins (rank, price, price change, market cap, ath, pullback, website, ...)',
  },
  {
    method: 'GET',
    path: '/exchange-flows/:id',
    description: 'Get exchange flow data for a coin',
    params: {
      id: {
        description: 'the id of the coin',
        type: 'string',
        examples: ['bitcoin', 'ethereum', 'litecoin'],
      },
    },
  },
  {
    method: 'GET',
    path: '/candles/:pair',
    description:
      'Get candle data for a pair (high, low, open, close, timestamp)',
    params: {
      pair: {
        description:
          'a coin pair separated with a colon, works best with fiat or stablecoin as quote currency',
        type: 'string',
        examples: ['btc:usd', 'eth:usdc', 'bnb:busd'],
      },
    },
  },
  {
    method: 'GET',
    path: '/chart/:pair.jpg',
    description:
      'Generate a 1H chart for a pair over the last 72 hours as image/jpeg',
    params: {
      pair: {
        description:
          'a coin pair separated with a colon, works best with fiat or stablecoin as quote currency',
        type: 'string',
        examples: ['btc:usd', 'eth:usdc', 'bnb:busd'],
      },
    },
  },
];

const APIDocs = () => {
  return (
    <Layout title="API docs - Jinx Capital">
      <div className={styles.container}>
        <h1>API Docs</h1>
        <p className={styles.baseUrl}>
          <strong>Base URL:</strong>{' '}
          <a href="https://api.jinx.capital" target="_blank" rel="noreferrer">
            https://api.jinx.capital
          </a>
        </p>
        <ul className={styles.docs}>
          {API_ENDPOINTS.map((endpoint, index) => (
            <li key={`api-endpoint:${index}`} tabIndex={index}>
              <div className={styles.summary}>
                <span className={styles.method}>{endpoint.method}</span>
                <span className={styles.path}>{endpoint.path}</span>
                <span className={styles.description}>
                  {endpoint.description}
                </span>
              </div>
              <div className={styles.content}>
                <p>{endpoint.description}</p>
                {endpoint.params && (
                  <ul className={styles.params}>
                    <li>Parameters</li>
                    {Object.entries(endpoint.params).map(
                      ([param, info], paramIndex) => (
                        <li key={`api-endpoint:${index}-param:${paramIndex}`}>
                          <strong className={styles.param}>:{param}</strong>
                          <br />
                          <strong>description:</strong> {info.description}
                          <br />
                          <strong>type:</strong> {info.type}
                          <br />
                          <strong>examples:</strong> {info.examples.join(', ')}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default APIDocs;
