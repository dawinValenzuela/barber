import React, { useEffect } from "react";
import {
  Select,
  VStack,
  Heading,
  Button,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useAuth } from "context/AuthContext";
import { ProductFormData, ProductInventoryFormData } from "src/components";
import { SelectWithLabel, InputWithLabel } from "src/components";

import {
  FormProvider,
  useForm,
  DefaultValues,
  SubmitHandler,
} from "react-hook-form";
import Link from "next/link";

const defaultValues: DefaultValues<ProductInventoryFormData> = {
  value: "0",
  productId: "",
};

export const AddInventoryProduct = () => {
  const { getProducts, products } = useAuth();
  const methods = useForm<ProductInventoryFormData>({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getProducts();
  }, []);

  const onSubmit: SubmitHandler<ProductInventoryFormData> = (
    data: ProductInventoryFormData
  ) => {
    console.log(data);
    reset(defaultValues);
  };

  const optionsProducts = products?.map((data) => ({
    value: data.id,
    label: data.name,
  }));

  return (
    <VStack align="stretch" px={4} mt={7} spacing={8}>
      <Heading textAlign="center">Agregar Producto a Inventario</Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align="stretch" spacing={4}>
            <SelectWithLabel
              formLabel="Productos"
              placeholder="Seleccione producto"
              inputName="productId"
              rules={{ required: "El nombre del producto es requerido" }}
              options={optionsProducts}
            />
            <InputWithLabel
              formLabel="Cantidad"
              placeholder="Escriba cantidad"
              inputName="value"
              rules={{ required: "La cantidad es requerida" }}
            />
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Agregar
            </Button>
          </VStack>
        </form>
      </FormProvider>
      <Text textAlign="center" fontSize="xl">
        <Link href="/">
          <ChakraLink>Regresar al home</ChakraLink>
        </Link>
      </Text>
    </VStack>
  );
};
