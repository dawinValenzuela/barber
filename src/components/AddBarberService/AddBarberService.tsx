import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Stack,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  value: number;
}

const DEFAULT_VALUES = {
  name: '',
  value: 0,
};

export const AddBarberService = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: DEFAULT_VALUES,
  });

  const toast = useToast();
  const { addBarberService, user } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      await addBarberService({
        name: data.name.toLowerCase(),
        value: Number(data.value),
        userId: user.uid,
      });
      reset(DEFAULT_VALUES);
      toast({
        title: 'Muy bien',
        description: 'El servicio se ha guardado correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Ah ocurrido un error',
        description: 'Error al guardar el servicio',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack align='stretch' spacing={5} px={4}>
      <Heading>Agregar nuevo servicio</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FormControl isInvalid={!!errors?.name}>
            <FormLabel htmlFor='name'>Nombre</FormLabel>
            <Input
              type='text'
              {...register('name', {
                required: 'El nombre es obligatorio',
              })}
            />
            {errors?.name && (
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.value}>
            <FormLabel htmlFor='value'>Valor</FormLabel>
            <Input
              type='number'
              {...register('value', {
                required: 'El valor es obligatorio',
              })}
            />
            {errors?.value && (
              <FormErrorMessage>{errors?.value?.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button colorScheme='blue' type='submit'>
            Agregar
          </Button>
        </Stack>
      </form>
    </VStack>
  );
};
