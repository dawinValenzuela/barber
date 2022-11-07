import {
  Button,
  Heading,
  Stack,
  VStack,
  useToast,
  Text,
  Link as ChakraLink,
  OrderedList,
  Box,
  ListItem,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { InputWithLabel } from 'src/components';
import {
  useForm,
  SubmitHandler,
  DefaultValues,
  FormProvider,
} from 'react-hook-form';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';
import { SupplierFormData } from './types';

const defaultValues: DefaultValues<SupplierFormData> = {
  name: '',
};

export const Suppliers = () => {
  const { addSupplier, suppliers, getSuppliers } = useAuth();
  const toast = useToast();

  useEffect(() => {
    getSuppliers();
  }, []);

  const methods = useForm<SupplierFormData>({ defaultValues });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<SupplierFormData> = (
    data: SupplierFormData
  ) => {
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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <InputWithLabel
              formLabel='Nombre proveedor'
              placeholder='Escriba nombre del proveedor'
              inputName='name'
              rules={{ required: 'El nombre del proveedor es requerido' }}
            />
            <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
              Registrar
            </Button>
          </Stack>
        </form>
      </FormProvider>
      <Box>
        <Heading textAlign='left'>Proveedores registrados</Heading>
        <OrderedList>
          {suppliers?.map((supplier) => (
            <ListItem key={supplier.id}>{supplier.name}</ListItem>
          ))}
        </OrderedList>
      </Box>
      <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al home</ChakraLink>
        </Text>
      </Link>
    </VStack>
  );
};
