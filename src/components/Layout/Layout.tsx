import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { Header } from '../Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};
