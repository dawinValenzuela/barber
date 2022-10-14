import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AddIcon, StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <Flex
      as='nav'
      background='white'
      position='sticky'
      width='full'
      height='49px'
      borderTop='1px solid #eee'
      justifyContent='center'
      bottom={0}
    >
      <Flex
        h='100%'
        flex='1 1 auto'
        justifyContent='center'
        alignItems='center'
      >
        <Box>
          <Link href='/home'>
            <IconButton aria-label='Home' variant='ghost' icon={<StarIcon />} />
          </Link>
        </Box>
      </Flex>
      <Flex
        h='100%'
        flex='1 1 auto'
        justifyContent='center'
        alignItems='center'
      >
        <Box>
          <Link href='/services/add'>
            <IconButton aria-label='Home' variant='ghost' icon={<AddIcon />} />
          </Link>
        </Box>
      </Flex>
      <Flex
        h='100%'
        flex='1 1 auto'
        justifyContent='center'
        alignItems='center'
      >
        <Flex height='100%' alignItems='center' px={5}>
          <Link href='/home'>
            <StarIcon />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
