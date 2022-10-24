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
  Select,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import md5 from 'md5';

interface FormData {
  displayName: string;
  email: string;
  password: string;
  role: string;
}

export interface Option {
  id: string;
  name: string;
}

const ROLES = [
  { id: 'Admin', name: 'Admin' },
  { id: 'User', name: 'User' },
];

export const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
      role: '',
    },
  });

  const router = useRouter();
  const toast = useToast();
  const { signup } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await signup(data.email, md5(data.password));
      // router.replace('/');
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
    <Flex minH='100vh' justify='center'>
      <Stack spacing='5' w='md'>
        <Stack textAlign='center' mt={4}>
          <Heading>Registro de usuarios</Heading>
        </Stack>
        <Box
          px={5}
          bg={{
            base: 'bg-surface',
          }}
        >
          <Stack spacing='6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing='5'>
                <FormControl isInvalid={!!errors?.displayName}>
                  <FormLabel htmlFor='displayName'>nombre</FormLabel>
                  <Input
                    id='displayName'
                    placeholder='Nombre'
                    isDisabled={isSubmitting}
                    type='text'
                    {...register('displayName', {
                      required: 'El nombre es obligatorio',
                    })}
                  />
                  {errors?.displayName && (
                    <FormErrorMessage>
                      {errors?.displayName?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors?.email}>
                  <FormLabel htmlFor='email'>email</FormLabel>
                  <Input
                    id='email'
                    type='email'
                    isDisabled={isSubmitting}
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
                    isDisabled={isSubmitting}
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
                <FormControl isInvalid={!!errors?.role}>
                  <FormLabel>Rol de usuario</FormLabel>
                  <Controller
                    control={control}
                    name='role'
                    rules={{ required: 'Debe seleccionar un rol' }}
                    render={({ field }) => {
                      return (
                        <Select
                          placeholder='Seleccione un servicio'
                          {...field}
                          isDisabled={isSubmitting}
                        >
                          {ROLES?.map((option: Option) => {
                            return (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />
                  {errors?.role && (
                    <FormErrorMessage>{errors?.role?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing='6'>
                  <Button
                    variant='solid'
                    colorScheme='blue'
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Registrar
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
