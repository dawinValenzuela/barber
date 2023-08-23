import { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Link as ChakraLink,
  VStack,
  Button,
  Heading,
  Stack,
  FormErrorMessage,
  Textarea,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Input,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { FormData } from './types';
import Link from 'next/link';
import { useOutputs } from 'src/services/useOutputs';

const DEFAULT_VALUES = {
  paymentDate: '',
  detail: '',
  value: 0,
};

export const OutputsForm = () => {
  const { createOutput } = useOutputs();

  const toast = useToast();

  const isAdmin = true;

  const formDefaultValues = {
    ...DEFAULT_VALUES,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormData>({
    defaultValues: formDefaultValues,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createOutput(data).unwrap();
      reset(formDefaultValues);
      toast({
        title: 'Muy bien',
        description: 'El pago se ha guardado correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Ah ocurrido un error',
        description: 'Error al guardar el pago',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={5} align='stretch' px={4} mt={7}>
      <Heading>Compras y pagos</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          {isAdmin && (
            <>
              <FormControl isInvalid={!!errors?.paymentDate}>
                <FormLabel>Fecha del pago</FormLabel>
                <Input
                  type='datetime-local'
                  {...register('paymentDate', {
                    required: 'La fecha es obligatoria',
                  })}
                />
                {errors?.paymentDate && (
                  <FormErrorMessage>
                    {errors?.paymentDate?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </>
          )}
          <FormControl isInvalid={!!errors?.detail}>
            <FormLabel>Detalle del pago</FormLabel>
            <Textarea
              {...register('detail', { required: 'El detalle es obligatorio' })}
              isDisabled={isSubmitting}
            />
            {errors?.detail && (
              <FormErrorMessage>{errors?.detail?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.value}>
            <FormLabel>Valor</FormLabel>
            <Controller
              control={control}
              name='value'
              rules={{ required: 'El valor del servicio es obligatorio' }}
              render={({ field }) => {
                return (
                  <NumberInput step={1000} {...field} isDisabled={isSubmitting}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                );
              }}
            />
            {errors?.value && (
              <FormErrorMessage>{errors?.value?.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
            Registrar
          </Button>
        </Stack>
      </form>
      {/* <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al listado de servicios</ChakraLink>
        </Text>
      </Link> */}
    </VStack>
  );
};
