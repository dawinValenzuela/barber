import {
  Button,
  Heading,
  Stack,
  VStack,
  useToast,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import {
  InputWithLabel,
  ProductFormData,
  SelectWithLabel,
} from 'src/components';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from 'context/AuthContext';
import Link from 'next/link';

const defaultValues: DefaultValues<ProductFormData> = {
  name: '',
  value: 0,
  supplierId: '',
};

export const Products = () => {
  const { addSupplier, suppliers, getSuppliers } = useAuth();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({ defaultValues });

  useEffect(() => {
    getSuppliers();
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log({ data });
  };

  const optionsSuppliers = suppliers?.map((data) => ({
    label: data.name,
    value: data.id,
  }));

  return (
    <VStack mt={7} align='stretch' px={4} spacing={5}>
      <Heading textAlign='center'>Crear producto</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <InputWithLabel
            formLabel='Nombre producto'
            placeholder='Escriba nombre del producto'
            inputName='name'
            register={register}
            rules={{ required: 'El nombre del producto es requerido' }}
            errors={errors}
            isDisabled={isSubmitting}
          />
          <SelectWithLabel
            formLabel='proveedor'
            placeholder='Seleccione proveedor'
            inputName='name'
            rules={{ required: 'El nombre del proveedor es requerido' }}
            errors={errors}
            isDisabled={isSubmitting}
            control={control}
            options={optionsSuppliers}
          />
          <InputWithLabel
            formLabel='Precio'
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
