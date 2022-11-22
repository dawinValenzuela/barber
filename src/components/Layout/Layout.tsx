import React, { ReactNode } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Header } from '../Header';
import { Navbar } from 'src/components';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.300', 'gray.900')}>
      <Header />
      <Box ml={{ base: 0, md: 80 }} p='4' minH='100vh'>
        <Box p={4} bg='white' rounded='md' minH='100vh'>
          {children}
        </Box>
      </Box>
      <Navbar />
    </Box>
  );
};
