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
import { useAuth } from 'context/AuthContext';

export const Header = () => {
  const { logout } = useAuth();

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
        <Heading size='lg'>Dawin Valenzuela</Heading>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Avatar
              name='Dawin Valenzuela'
              size='md'
              bg='gray.700'
              color='white'
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
