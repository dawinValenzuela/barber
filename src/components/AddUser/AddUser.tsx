import {
  VStack,
  Stack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Link as ChakraLink,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import md5 from 'md5';
import { FormData } from './types';
import { ROLE } from 'types';

const DEFAULT_VALUES = {
  fullName: '',
  nit: '',
  email: '',
  phone: '',
  password: '',
  role: '',
};

export const AddUser = () => {
  const { signup, registerUser } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: FormData) => {
    try {
      const createdUser = await signup({
        email: data.email,
        password: md5(data.password),
      });

      const {
        user: { uid },
      } = createdUser;

      await registerUser({
        ...data,
        password: md5(data.password),
        userId: uid,
      });

      reset(DEFAULT_VALUES);

      toast({
        title: 'Muy bien',
        description: 'El usuario se ha guardado correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Ah ocurrido un error',
        description: 'Error al crear el usuario',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack mt={7} align='stretch' px={4} spacing={5}>
      <Heading>Crear usuario</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors?.fullName}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type='text'
              isDisabled={isSubmitting}
              {...register('fullName', {
                required: 'El nombre es obligatorio',
              })}
            />
            {errors?.fullName && (
              <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.nit}>
            <FormLabel>Cedula</FormLabel>
            <Input
              type='text'
              isDisabled={isSubmitting}
              {...register('nit', { required: 'La cedula es obligatioria' })}
            />
            {errors?.nit && (
              <FormErrorMessage>{errors?.nit?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.email}>
            <FormLabel>email</FormLabel>
            <Input
              type='text'
              isDisabled={isSubmitting}
              {...register('email', { required: 'El correo es obligatorio' })}
            />
            {errors?.email && (
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Celular</FormLabel>
            <Input
              type='text'
              isDisabled={isSubmitting}
              {...register('phone')}
            />
          </FormControl>
          <FormControl isInvalid={!!errors?.password}>
            <FormLabel>contraseña</FormLabel>
            <Input
              type='password'
              isDisabled={isSubmitting}
              {...register('password', {
                required: 'El password es obligatorio',
              })}
            />
            {errors?.password && (
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.role}>
            <FormLabel>Permisos de usuario</FormLabel>
            <Select
              isDisabled={isSubmitting}
              placeholder='Seleccione un rol'
              {...register('role', { required: 'El rol es obligatorio' })}
            >
              {Object.keys(ROLE).map((option) => {
                return (
                  <option key={option} value={option.toLowerCase()}>
                    {option}
                  </option>
                );
              })}
            </Select>
            {errors?.role && (
              <FormErrorMessage>{errors?.role?.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            width='full'
            colorScheme='blue'
            type='submit'
            isLoading={isSubmitting}
          >
            Crear usuario
          </Button>
        </Stack>
      </form>
      <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al home</ChakraLink>
        </Text>
      </Link>
    </VStack>
  );
};
