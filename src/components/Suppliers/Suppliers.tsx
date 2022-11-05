import { Button, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { InputWithLabel } from 'src/components';
import { useForm } from 'react-hook-form';

export const Suppliers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {};

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
          />
          <Button colorScheme='blue' type='submit'>
            Registrar
          </Button>
        </Stack>
      </form>
    </VStack>
  );
};
