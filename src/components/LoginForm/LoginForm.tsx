import {
  Stack,
  Heading,
  HStack,
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';

export const LoginForm = () => {
  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Stack spacing='8' w='md' px={5}>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={useBreakpointValue({ base: 'sm' })}>
              Inicio de Sesion
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '8', sm: '8' }}
          px={{ base: '8', sm: '10' }}
          bg={useBreakpointValue({
            base: 'bg-surface',
          })}
          boxShadow={{
            base: useColorModeValue('md', 'md-dark'),
          }}
          borderRadius={{ base: 'xl' }}
        >
          <Stack spacing='6'>
            <Stack spacing='5'>
              <FormControl>
                <FormLabel htmlFor='email'>Usuario</FormLabel>
                <Input id='user' type='user' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='password'>Contraseña</FormLabel>
                <Input id='password' type='password' />
              </FormControl>
            </Stack>
            <HStack justify='space-between'>
              <Checkbox defaultChecked>Recordar contraseña</Checkbox>
              {/* <Button variant='link' colorScheme='blue' size='sm'>
                    Forgot password?
                  </Button> */}
            </HStack>
            <Stack spacing='6'>
              <Button variant='solid' colorScheme='blue'>
                Iniciar sessión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
