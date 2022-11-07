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
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form';
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

  const methods = useForm<ProductFormData>({ defaultValues });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getSuppliers();
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    console.log({ data });
  };

  const optionsSuppliers = suppliers?.map((data) => ({
    label: data.name,
    value: data.id,
  }));

  return (
    <VStack mt={7} align='stretch' px={4} spacing={5}>
      <Heading textAlign='center'>Crear producto</Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <InputWithLabel
              formLabel='Nombre producto'
              placeholder='Escriba nombre del producto'
              inputName='name'
              rules={{ required: 'El nombre del producto es requerido' }}
            />
            <SelectWithLabel
              formLabel='proveedor'
              placeholder='Seleccione proveedor'
              inputName='supplierId'
              rules={{ required: 'El nombre del proveedor es requerido' }}
              options={optionsSuppliers}
            />
            <InputWithLabel
              formLabel='Precio'
              placeholder='Escriba nombre del proveedor'
              inputName='value'
              rules={{ required: 'El nombre del proveedor es requerido' }}
            />
            <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
              Registrar
            </Button>
          </Stack>
        </form>
      </FormProvider>
      <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al home</ChakraLink>
        </Text>
      </Link>
    </VStack>
  );
};
