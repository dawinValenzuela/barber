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
  FormErrorMessage,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import md5 from 'md5';
import { useUsers } from 'src/services/useUsers';
import { isEmpty } from 'lodash';

interface FormData {
  email: string;
  password: string;
  root: {
    serverError: string;
  };
}

export const LoginForm = ({ signIn, router }) => {
  const { register, handleSubmit, formState, setError } = useForm<FormData>();
  const { errors } = formState;

  const handleReset = () => {
    // resetPassword('dawin.valenzuela@gmail.com');
  };

  const onSubmit = async (credentials: FormData) => {
    console.log(credentials);

    const accessData = {
      email: credentials.email,
      password: md5(credentials.password),
    };

    try {
      const { ok, status } = await signIn('google-credentials', {
        redirect: false,
        ...accessData,
      });

      if (!ok) {
        setError('root.serverError', {
          type: status,
        });
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isInvalid = !isEmpty(errors);

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
                {/* <HStack justify='space-between'>
                  <Checkbox defaultChecked>Recordar contraseña</Checkbox>
                </HStack> */}
                {isInvalid && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Usuario y/o contraseña incorrectos</AlertTitle>
                  </Alert>
                )}
                <Stack spacing='6'>
                  <Button variant='solid' colorScheme='blue' type='submit'>
                    Iniciar sessión
                  </Button>
                </Stack>
                {/* Reset password link button */}
                {/* <Stack spacing='6'>
                  <Button
                    variant='outline'
                    colorScheme='gray'
                    onClick={handleReset}
                    isDisabled={isLoading}
                  >
                    Recuperar contraseña
                  </Button>
                </Stack> */}
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
