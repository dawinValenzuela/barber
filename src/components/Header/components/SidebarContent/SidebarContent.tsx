import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { LoggedUser } from 'types';
import { NAVIGATION_LINKS } from '../../navigationLinks';
import { NavItem } from '../NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  user: LoggedUser;
}

export const SidebarContent = ({ onClose, user, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 80 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          {user.fullName}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {NAVIGATION_LINKS.map((link) => (
        <NavItem key={link.label} href={link.href} icon={link.icon}>
          {link.label}
        </NavItem>
      ))}
    </Box>
  );
};
