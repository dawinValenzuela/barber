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
  AlertDescription,
} from '@chakra-ui/react';
// import { useAuth } from 'context/AuthContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { useAuth } from 'src/services/useUsers';

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
  const { handleLogin, error, status } = useAuth();

  const isLoading = status === 'loading';

  const handleReset = () => {
    // resetPassword('dawin.valenzuela@gmail.com');
  };

  const onSubmit = async (data: FormData) => {
    // N9qNh8TApnD9fvh
    console.log(data.email, data.password);
    console.log(data.email, md5(data.password));
    handleLogin(data);
  };

  return (
    <Flex minH='100vh' align='center' justify='center'>
      <Stack spacing='8' w='md' px={5}>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'sm' }}>Inicio de Sesion</Heading>
          </Stack>
        </Stack>
        {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>Usuario y/o contraseña incorrectos</AlertTitle>
          </Alert>
        )}
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
                    isDisabled={isLoading}
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
                    isDisabled={isLoading}
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
                  <Button
                    variant='solid'
                    colorScheme='blue'
                    type='submit'
                    isDisabled={isLoading}
                  >
                    Iniciar sessión
                  </Button>
                </Stack>
                {/* Reset password link button */}
                <Stack spacing='6'>
                  <Button
                    variant='outline'
                    colorScheme='gray'
                    onClick={handleReset}
                    isDisabled={isLoading}
                  >
                    Recuperar contraseña
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
