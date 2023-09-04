import { MouseEvent } from 'react';
import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth } from 'src/services/useAuth';
import { signOut } from 'next-auth/react';

export const Header = ({ fullName = '', role = '', isLoading = false }) => {
  const { logOut } = useAuth();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logOut();
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Flex
      as='header'
      px={4}
      bg='gray.200'
      width='full'
      position='sticky'
      top={0}
    >
      <Flex
        h={16}
        alignItems='center'
        justifyContent='space-between'
        width='full'
      >
        <Heading size='lg'>{fullName}</Heading>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar name={fullName} size='md' bg='gray.700' color='white' />
          </MenuButton>
          <MenuList zIndex={10}>
            {/* <MenuItem onClick={() => signOut()}>Cerrar sesion</MenuItem> */}
            <Link href='/api/auth/signout' onClick={handleLogout}>
              <MenuItem>Cerrar sesion</MenuItem>
            </Link>
            {role === 'owner' && (
              <Link href='/users/add'>
                <MenuItem>Crear usuario</MenuItem>
              </Link>
            )}
            {(role === 'owner' || role === 'admin') && (
              <Link href='/report'>
                <MenuItem>Reporte</MenuItem>
              </Link>
            )}
            {(role === 'owner' || role === 'admin') && (
              <Link href='/products'>
                <MenuItem>Productos</MenuItem>
              </Link>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
