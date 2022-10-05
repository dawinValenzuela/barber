import { Box, Flex, Text, Heading } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Flex
      as='header'
      px={4}
      bg='gray.200'
      position='fixed'
      width='full'
      zIndex={1}
      top={0}
    >
      <Flex h={16} alignItems='center'>
        <Heading size='lg'>Dawin Valenzuela</Heading>
      </Flex>
    </Flex>
  );
};
