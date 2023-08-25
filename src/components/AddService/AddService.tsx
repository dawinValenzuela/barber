import { useEffect } from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  Link as ChakraLink,
  VStack,
  Button,
  Heading,
  Stack,
  FormErrorMessage,
  RadioGroup,
  Radio,
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
import { FormData, Option, Service, User } from './types';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useUsers } from 'src/services/useUsers';
import { useServices } from 'src/services/useServices';

const DEFAULT_VALUES = {
  serviceId: '',
  name: '',
  value: 0,
  userId: '',
  createdAt: '',
  paymentMethod: 'cash',
  notes: '',
};

export const AddService = ({ userLogged }) => {
  const { users, getUsers } = useUsers();
  const { barberServices, createService } = useServices();
  const toast = useToast();

  const formDefaultValues = {
    ...DEFAULT_VALUES,
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm<FormData>({
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const serviceSelected = watch('serviceId');

  useEffect(() => {
    if (serviceSelected) {
      const service = barberServices.find(
        (service: Service) => service.id === serviceSelected
      );
      setValue('value', service.value);
      setValue('name', service.name);
    } else {
      setValue('value', 0);
      setValue('name', '');
    }
  }, [serviceSelected, barberServices, setValue]);

  const isAdmin = userLogged.role === 'owner' || userLogged.role === 'admin';

  const onSubmit = async (data: FormData) => {
    if (!isAdmin) {
      data.userId = userLogged.userId;
      data.createdAt = new Date().toISOString();
    }

    try {
      await createService(data).unwrap();
      toast({
        title: 'Muy bien',
        description: 'El servicio se ha guardado correctamente',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch {
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
    <VStack spacing={5} align='stretch' px={4} mt={7}>
      <Heading>Agregar servicio</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          {isAdmin && (
            <>
              <FormControl isInvalid={!!errors?.userId}>
                <FormLabel>Barbero</FormLabel>
                <Controller
                  control={control}
                  name='userId'
                  rules={{ required: 'Debe seleccionar un barbero' }}
                  render={({ field }) => {
                    return (
                      <Select
                        placeholder='Seleccione un barbero'
                        {...field}
                        isDisabled={isSubmitting}
                      >
                        {users?.map((option) => {
                          return (
                            <option key={option.userId} value={option.userId}>
                              {option.fullName}
                            </option>
                          );
                        })}
                      </Select>
                    );
                  }}
                />
                {errors?.userId && (
                  <FormErrorMessage>{errors?.userId?.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors?.createdAt}>
                <FormLabel>Fecha del servicio</FormLabel>
                <Input
                  type='datetime-local'
                  {...register('createdAt', {
                    required: 'Debe seleccionar una fecha',
                  })}
                />
                {errors?.createdAt && (
                  <FormErrorMessage>
                    {errors?.createdAt?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </>
          )}
          <FormControl isInvalid={!!errors?.serviceId}>
            <FormLabel>Servicio</FormLabel>
            <Controller
              control={control}
              name='serviceId'
              rules={{ required: 'Debe seleccionar un servicio' }}
              render={({ field }) => {
                return (
                  <Select
                    placeholder='Seleccione un servicio'
                    {...field}
                    isDisabled={isSubmitting}
                  >
                    {barberServices?.map((option: Option) => {
                      return (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Select>
                );
              }}
            />
            {errors?.serviceId && (
              <FormErrorMessage>{errors?.serviceId?.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors?.value}>
            <FormLabel>Valor</FormLabel>
            <Controller
              control={control}
              name='value'
              // Value must be greater than 0 and is required
              rules={{
                required: 'El valor del servicio es obligatorio',
                min: {
                  value: 1,
                  message: 'El valor del servicio debe ser mayor a 0',
                },
              }}
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
          <FormControl>
            <Controller
              control={control}
              name='paymentMethod'
              rules={{ required: 'Debe seleccionar un metodo de pago' }}
              render={({ field }) => {
                return (
                  <RadioGroup {...field} isDisabled={isSubmitting}>
                    <Stack direction='row'>
                      <Radio value='cash'>Efectivo</Radio>
                      <Radio value='nequi'>Nequi</Radio>
                    </Stack>
                  </RadioGroup>
                );
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Notas del servicio</FormLabel>
            <Textarea {...register('notes')} isDisabled={isSubmitting} />
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
