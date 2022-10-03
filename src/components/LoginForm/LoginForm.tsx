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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => console.log(data);

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
          shadow='md'
          borderWidth='1px'
          borderRadius={{ base: 'xl' }}
        >
          <Stack spacing='6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing='5'>
                <FormControl isInvalid={!!errors?.email}>
                  <FormLabel htmlFor='email'>email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    {...register('email', {
                      required: 'El email es obligatorio',
                    })}
                  />
                  {errors?.email && (
                    <FormErrorMessage>
                      {errors?.email?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors?.password}>
                  <FormLabel htmlFor='password'>Contraseña</FormLabel>
                  <Input
                    id='password'
                    type='password'
                    {...register('password', {
                      required: 'la contraseña es obligatoria',
                    })}
                  />
                  {errors?.password && (
                    <FormErrorMessage>
                      {errors?.password?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <HStack justify='space-between'>
                  <Checkbox defaultChecked>Recordar contraseña</Checkbox>
                </HStack>
                <Stack spacing='6'>
                  <Button variant='solid' colorScheme='blue' type='submit'>
                    Iniciar sessión
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
