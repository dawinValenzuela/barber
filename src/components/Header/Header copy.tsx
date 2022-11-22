import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Collapse,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
import { MobileNav } from './components/MovileNavbar';
import { Navbar } from './components/NavItem';

export const Header = () => {
  const { logout, user } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  return (
    // <Flex
    //   as='header'
    //   px={4}
    //   bg={useColorModeValue('gray.100', 'gray.900')}
    //   width='full'
    //   // position='sticky'
    //   // top={0}
    // >
    <Box>
      <Flex
        h={16}
        alignItems='center'
        justifyContent='space-between'
        width='full'
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        {/* <Heading size='lg'>{user?.fullName}</Heading> */}
        <Flex alignItems='center' gap={5}>
          <Flex display={{ base: 'none', md: 'flex' }}>
            <Navbar />
          </Flex>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
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
              <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {/* <Menu>
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
            <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
            {user.role === 'owner' && (
              <Link href='/users/add'>
                <MenuItem>Crear usuario</MenuItem>
              </Link>
            )}
            {user.role === 'owner' && (
              <Link href='/report'>
                <MenuItem>Reporte</MenuItem>
              </Link>
            )}
            {user.role === 'owner' && (
              <Link href='/suppliers'>
                <MenuItem>Proveedores</MenuItem>
              </Link>
            )}
            {user.role === 'owner' && (
              <Link href='/suppliers/products'>
                <MenuItem>Productos</MenuItem>
              </Link>
            )}
          </MenuList>
        </Menu> */}
      </Flex>
    </Box>
    // </Flex>
  );
};
