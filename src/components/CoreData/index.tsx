import TextSpinner from 'components/TextSpinner';
import { useExchangeNetflow } from 'data/exchange-netflow/hooks';
import { useFunding } from 'data/funding/hooks';
import { useLeverage } from 'data/leverage/hooks';
import { useTradfi } from 'data/tradfi/hooks';
import { useCallback } from 'react';
import { formatBigNumber, formatCurrenyCompact } from 'utils/formatters';

import styles from './styles.module.css';

const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentageWithSignFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'always',
});

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const fundingFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
  signDisplay: 'always',
});

const CoreData = () => {
  const { exchangeNetflow: bitcoinNetflow } = useExchangeNetflow('bitcoin');
  const { exchangeNetflow: ethereumNetflow } = useExchangeNetflow('ethereum');
  const { leverage } = useLeverage();
  const { funding } = useFunding();
  const { ndx, spx, dji, tradfi } = useTradfi();

  const CoreData = useCallback(
    () => (
      <ul className={styles.coreData}>
        <li className={styles.entry}>
          <div>
            <strong className={styles.title}>Tradfi US stock markets</strong>
            <ul>
              <li>
                {spx ? (
                  <>
                    <strong>{spx.symbol}</strong>{' '}
                    <span>{formatter.format(spx.value)}</span>{' '}
                    <span>
                      {spx.percentageChange > 0 ? '▲ ' : '▼ '}
                      {percentageWithSignFormatter.format(
                        spx.percentageChange / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {ndx ? (
                  <>
                    <strong>{ndx.symbol}</strong>{' '}
                    <span>{formatter.format(ndx.value)}</span>{' '}
                    <span>
                      {ndx.percentageChange > 0 ? '▲ ' : '▼ '}
                      {percentageWithSignFormatter.format(
                        ndx.percentageChange / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {dji ? (
                  <>
                    <strong>{dji.symbol}</strong>{' '}
                    <span>{formatter.format(dji.value)}</span>{' '}
                    <span>
                      {dji.percentageChange > 0 ? '▲ ' : '▼ '}
                      {percentageWithSignFormatter.format(
                        dji.percentageChange / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.entry}>
          <div>
            <strong className={styles.title}>Bitcoin exchange netflow</strong>
            <ul>
              <li>
                {bitcoinNetflow?.diff24h ? (
                  <>
                    <strong>24H</strong>{' '}
                    <span>{formatBigNumber(bitcoinNetflow.diff24h)} BTC</span>
                    <span>
                      {bitcoinNetflow.percentageChange24h > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        bitcoinNetflow.percentageChange24h / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {bitcoinNetflow?.diff7d ? (
                  <>
                    <strong>7D</strong>{' '}
                    <span>{formatBigNumber(bitcoinNetflow.diff7d)} BTC</span>
                    <span>
                      {bitcoinNetflow.percentageChange7d > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        bitcoinNetflow.percentageChange7d / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {bitcoinNetflow?.diff30d ? (
                  <>
                    <strong>30D</strong>{' '}
                    <span>{formatBigNumber(bitcoinNetflow.diff30d)} BTC</span>
                    <span>
                      {bitcoinNetflow.percentageChange30d > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        bitcoinNetflow.percentageChange30d / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.entry}>
          <div>
            <strong className={styles.title}>Ethereum exchange netflow</strong>
            <ul>
              <li>
                {ethereumNetflow?.diff24h ? (
                  <>
                    <strong>24H</strong>{' '}
                    <span>{formatBigNumber(ethereumNetflow.diff24h)} ETH</span>
                    <span>
                      {ethereumNetflow.percentageChange24h > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        ethereumNetflow.percentageChange24h / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {ethereumNetflow?.diff7d ? (
                  <>
                    <strong>7D</strong>{' '}
                    <span>{formatBigNumber(ethereumNetflow.diff7d)} ETH</span>
                    <span>
                      {ethereumNetflow.percentageChange7d > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        ethereumNetflow.percentageChange7d / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {ethereumNetflow?.diff30d ? (
                  <>
                    <strong>30D</strong>{' '}
                    <span>{formatBigNumber(ethereumNetflow.diff30d)} ETH</span>
                    <span>
                      {ethereumNetflow.percentageChange30d > 0 ? ' ▲ ' : ' ▼ '}
                      {percentageWithSignFormatter.format(
                        ethereumNetflow.percentageChange30d / 100,
                      )}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
            </ul>
          </div>
        </li>
        <li className={styles.entry}>
          <div>
            <strong className={styles.title}>Leverage in the market</strong>
            <ul>
              <li>
                {leverage?.openInterest ? (
                  <>
                    <strong>Open interest</strong>{' '}
                    <span>{formatCurrenyCompact(leverage?.openInterest)}</span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {leverage?.liquidations24h ? (
                  <>
                    <strong>24H liq.</strong>{' '}
                    <span>
                      {formatCurrenyCompact(leverage?.liquidations24h)}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
              <li>
                {leverage?.longRate && leverage?.shortRate ? (
                  <>
                    <strong>LSR</strong>{' '}
                    <span>
                      {percentageFormatter.format(leverage?.longRate / 100)}{' '}
                      {percentageFormatter.format(leverage?.shortRate / 100)}
                    </span>
                  </>
                ) : (
                  <TextSpinner />
                )}
              </li>
            </ul>
          </div>
        </li>
        {!!funding.length &&
          Array.from(Array(Math.floor(7)).keys()).map((index) => (
            <li className={styles.entry} key={`aggr-funding.list:${index}`}>
              <div>
                <strong className={styles.title}>
                  Aggregated funding rates
                </strong>
                <ul>
                  {funding.slice(index * 3, index * 3 + 3).map((funding) => {
                    const rates = (
                      funding?.rates as Array<{ rate: number }>
                    ).filter((value) => !isNaN(value.rate));

                    const rate =
                      rates.reduce((sum, value) => {
                        return sum + value.rate;
                      }, 0) /
                      rates.length /
                      100;

                    return (
                      <li key={`aggr-funding:${funding?.coin.id}`}>
                        <strong>{funding?.coin.name}</strong>{' '}
                        <span>{fundingFormatter.format(rate)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
      </ul>
    ),
    [funding, leverage, bitcoinNetflow, ethereumNetflow, ndx, spx, dji],
  );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.data} ${
          bitcoinNetflow && leverage && funding && tradfi.length
            ? styles.loaded
            : ''
        }`}
      >
        <CoreData />
        <CoreData />
      </div>
    </div>
  );
};

export default CoreData;
