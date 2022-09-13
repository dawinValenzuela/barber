import { Box, Flex, Text, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box px={4} bg='gray.200'>
      <Flex h={16} alignItems='center'>
        <Heading size='lg'>Dawin Valenzuela</Heading>
      </Flex>
    </Box>
  );
};
