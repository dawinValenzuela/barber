import {
  Button,
  Heading,
  Stack,
  VStack,
  useToast,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React from 'react';
import { InputWithLabel } from 'src/components';
import { useForm } from 'react-hook-form';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';

const DEFAULT_VALUES = {
  name: '',
};

export const Suppliers = () => {
  const { addSupplier } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    try {
      addSupplier(data);
      reset();
      toast({
        title: 'Muy bien',
        description: 'El proveedor se ha guardado correctamente',
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
      <Heading textAlign='center'>Crear proveedor</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <InputWithLabel
            formLabel='Nombre proveedor'
            placeholder='Escriba nombre del proveedor'
            inputName='name'
            register={register}
            rules={{ required: 'El nombre del proveedor es requerido' }}
            errors={errors}
            isDisabled={isSubmitting}
          />
          <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
            Registrar
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
