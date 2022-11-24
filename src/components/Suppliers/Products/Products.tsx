import {
  Button,
  Heading,
  Stack,
  VStack,
  useToast,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  InputWithLabel,
  ProductFormData,
  SelectWithLabel,
  NumberWithLabel,
} from "src/components";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  FormProvider,
} from "react-hook-form";
import { useAuth } from "context/AuthContext";
import Link from "next/link";

const defaultValues: DefaultValues<ProductFormData> = {
  name: "",
  value: "0",
  supplierId: "",
};

export const Products = () => {
  const { addProduct, suppliers, getSuppliers } = useAuth();
  const toast = useToast();

  const methods = useForm<ProductFormData>({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    getSuppliers();
  }, []);

  const onSubmit: SubmitHandler<ProductFormData> = (data: ProductFormData) => {
    try {
      addProduct(data);
      reset(defaultValues);
      toast({
        title: "Muy bien",
        description: "El producto se ha guardado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Ah ocurrido un error",
        description: "Error al guardar el servicio",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const optionsSuppliers = suppliers?.map((data) => ({
    label: data.name,
    value: data.id,
  }));

  console.log({ errors });

  return (
    <VStack mt={7} align="stretch" px={4} spacing={5}>
      <Heading textAlign="center">Crear Articulo</Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <InputWithLabel
              formLabel="Nombre producto"
              placeholder="Escriba nombre del producto"
              inputName="name"
              rules={{ required: "El nombre del producto es requerido" }}
            />
            <SelectWithLabel
              formLabel="proveedor"
              placeholder="Seleccione proveedor"
              inputName="supplierId"
              rules={{ required: "El nombre del proveedor es requerido" }}
              options={optionsSuppliers}
            />
            <NumberWithLabel
              formLabel="Precio"
              inputName="value"
              rules={{
                required: "El valor es requerido",
                min: {
                  value: 1,
                  message: "El valor debe ser mayor que 0",
                },
              }}
            />
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Registrar
            </Button>
          </Stack>
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
