import 'styles/globals.css';

import { CoinsContextProvider } from 'data/coins/context';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <CoinsContextProvider refreshInterval={15000}>
      <Component {...pageProps} />
    </CoinsContextProvider>
  );
}

export default App;
