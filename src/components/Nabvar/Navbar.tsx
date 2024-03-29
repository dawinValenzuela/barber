import { Box, Flex, HStack, IconButton, Icon } from '@chakra-ui/react';
import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { MdContentCut, MdHome, MdCalendarViewMonth } from 'react-icons/md';
import Link from 'next/link';

interface NavbarProps {
  role: string;
}

export const Navbar = ({ role = '' }: NavbarProps) => {
  const isAdmin = role === 'owner' || role === 'admin';

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
          <Link href='/'>
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
          <Link href='/resume'>
            <IconButton
              aria-label='Service'
              variant='ghost'
              icon={<Icon as={MdCalendarViewMonth} h={6} w={6} />}
            />
          </Link>
        </Box>
      </Flex>
      {isAdmin && (
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
      )}
    </Flex>
  );
};
