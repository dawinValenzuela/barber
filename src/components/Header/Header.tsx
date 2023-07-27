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
// import { useAuth } from 'context/AuthContext';
import { useAuth } from 'src/services/userService';
import Link from 'next/link';

export const Header = () => {
  // const { handleLogout, user } = useAuth();

  const handleLogout = () => {};
  const user = {};

  console.log('user', user);

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
        <Heading size='lg'>{user?.fullName}</Heading>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              name={user?.fullName}
              size='md'
              bg='gray.700'
              color='white'
            />
          </MenuButton>
          <MenuList zIndex={10}>
            <MenuItem onClick={handleLogout}>Cerrar sesion</MenuItem>
            {user?.role === 'owner' && (
              <Link href='/users/add'>
                <MenuItem>Crear usuario</MenuItem>
              </Link>
            )}
            {user?.role === 'owner' && (
              <Link href='/report'>
                <MenuItem>Reporte</MenuItem>
              </Link>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
