import { AppProps } from 'next/app';

import 'semantic-ui-css/semantic.min.css';

import AppProvider from '@/hooks';

import GlobalStyles from '@/styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <GlobalStyles />
    </AppProvider>
  );
}

export default App;
