import {
  Flex,
  Icon,
  Link as ChakraLink,
  FlexProps,
  Collapse,
  Stack,
  useDisclosure,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface NavItemProps extends FlexProps {
  linkData?: any;
}

export const NavItem = ({ linkData, ...rest }: NavItemProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const { children, label, icon, href } = linkData;
  const { pathname } = router;

  useEffect(() => {
    console.log('pathname', pathname, label);
  }, [pathname]);

  const hoverState = {
    bg: useColorModeValue('brand.600', 'brand.700'),
    color: 'white',
  };

  const activeState = {
    backgroundColor: 'brand.700',
    color: 'white',
  };

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      {children && (
        <Flex
          align='center'
          justifyContent='space-between'
          p='4'
          mx='4'
          borderRadius='lg'
          role='group'
          cursor='pointer'
          _hover={hoverState}
          {...rest}
        >
          <Box>
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
            {label}
          </Box>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>
      )}
      {!children && (
        <Link href={href}>
          <ChakraLink
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Flex
              align='center'
              justifyContent='space-between'
              p='4'
              mx='4'
              borderRadius='lg'
              role='group'
              cursor='pointer'
              _hover={hoverState}
              {...(pathname === href && activeState)}
              {...rest}
            >
              <Box>
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
                {label}
              </Box>
              {children && (
                <Icon
                  as={ChevronDownIcon}
                  transition={'all .25s ease-in-out'}
                  transform={isOpen ? 'rotate(180deg)' : ''}
                  w={6}
                  h={6}
                />
              )}
            </Flex>
          </ChakraLink>
        </Link>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={1}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link href={child.href} key={child.label}>
                <ChakraLink
                  style={{ textDecoration: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                  width='full'
                >
                  <Flex
                    align='center'
                    p='4'
                    mx='4'
                    borderRadius='lg'
                    role='group'
                    cursor='pointer'
                    _hover={hoverState}
                    {...rest}
                  >
                    {child.icon && (
                      <Icon
                        mr='4'
                        fontSize='16'
                        _groupHover={{
                          color: 'white',
                        }}
                        as={child.icon}
                      />
                    )}
                    {child.label}
                  </Flex>
                </ChakraLink>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
