import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ProtectedRoute } from 'src/components/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { SessionProvider } from 'next-auth/react';
import { Layout } from 'src/components';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
