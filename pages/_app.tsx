import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { Layout } from 'src/components';

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const Auth = Component.Auth || Noop;

  return (
    <ChakraProvider>
      <Provider store={store}>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
