import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthContextProvider } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { ProtectedRoute } from 'src/components/ProtectedRoute';
import { Layout } from 'src/components';

const noAuthRequired = ['/login'];

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e2f4ff',
      100: '#b7dbfb',
      200: '#8ac3f5',
      300: '#5eabf1',
      400: '#3793ed',
      500: '#2479d4',
      600: '#1a5ea4',
      700: '#104376',
      800: '#042848',
      900: '#000d1c',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
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
