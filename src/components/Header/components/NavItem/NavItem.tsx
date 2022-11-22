import { Flex, Icon, Link as ChakraLink, FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import Link from 'next/link';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  href: string;
}

export const NavItem = ({
  icon,
  href = '#',
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Link href={href}>
      <ChakraLink
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align='center'
          p='4'
          mx='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          _hover={{
            bg: 'brand.700',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr='4'
              fontSize='16'
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </ChakraLink>
    </Link>
  );
};
