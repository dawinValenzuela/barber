import { Box, Flex, HStack, IconButton, Icon } from '@chakra-ui/react';
import React from 'react';
import { AddIcon, StarIcon } from '@chakra-ui/icons';
import { MdContentCut, MdHome } from 'react-icons/md';
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
            <IconButton
              aria-label='Home'
              variant='ghost'
              icon={<Icon as={MdHome} h={6} w={6} />}
            />
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
            <IconButton
              aria-label='Service'
              variant='ghost'
              icon={<Icon as={MdContentCut} h={6} w={6} />}
            />
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
          <Link href='/services/barber-service'>
            <IconButton
              aria-label='Barber service'
              variant='ghost'
              icon={<AddIcon h={6} w={6} />}
            />
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};
