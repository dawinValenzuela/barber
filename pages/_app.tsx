import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthContextProvider } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { ProtectedRoute } from 'src/components/ProtectedRoute';
import { Layout } from 'src/components';

const noAuthRequired = ['/login'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <AuthContextProvider>
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoute>
        )}
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
