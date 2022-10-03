import { useEffect } from 'react';
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
  FormErrorMessage,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import md5 from 'md5';

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

  const router = useRouter();
  const toast = useToast();
  const { login, user, isLoading } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      router.replace('/');
    }
  }, [user]);

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, md5(data.password));
      router.replace('/');
    } catch (error) {
      toast({
        title: 'Ah ocurrido un error',
        description: 'Usuario y/o contraseña incorrectos',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Stack spacing='8' w='md' px={5}>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'sm' }}>Inicio de Sesion</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '8', sm: '8' }}
          px={{ base: '8', sm: '10' }}
          bg={{
            base: 'bg-surface',
          }}
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
