import Footer from 'components/Footer';
import Header from 'components/Header';
import Head from 'next/head';
import { ReactNode } from 'react';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ title, description, children }: Props) => {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        {title && <meta name="title" content={title} />}
        {description && <meta name="description" content={description} />}

        {title && <meta name="twitter:title" content={title} />}
        {description && (
          <meta name="twitter:description" content={description} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jinxcapital" />
        <meta name="twitter:creator" content="@jinxcapital" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
        />

        {title && <meta property="og:title" content={title} />}
        {description && (
          <meta property="og:description" content={description} />
        )}
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/chart/btc:usd.jpg`}
        />
      </Head>

      <div className={styles.container}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
