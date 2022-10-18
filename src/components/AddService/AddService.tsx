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
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { FormData, Option, Service, User } from './types';
import Link from 'next/link';

const DEFAULT_VALUES = {
  serviceId: '',
  name: '',
  value: 0,
  userId: '',
  createdBy: '',
  paymentMethod: 'cash',
  notes: '',
};

export const AddService = () => {
  const { services, user, users, addService } = useAuth();
  const toast = useToast();

  const isAdmin = user.role === 'owner' || user.role === 'admin';

  const formDefaultValues = {
    ...DEFAULT_VALUES,
    createdBy: user.uid,
    userId: isAdmin ? '' : user.uid,
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

  const serviceSelected = watch('serviceId');

  useEffect(() => {
    if (serviceSelected) {
      const service = services.find(
        (service: Service) => service.id === serviceSelected
      );
      setValue('value', service.value);
      setValue('name', service.name);
    } else {
      setValue('value', 0);
      setValue('name', '');
    }
  }, [serviceSelected, services, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      await addService(data);
      reset(formDefaultValues);
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
    <VStack spacing={5} align='stretch' px={4} mt={7}>
      <Heading>Agregar servicio</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          {isAdmin && (
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
                      {users?.map((option: User) => {
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
                    {services?.map((option: Option) => {
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
      <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al listado de servicios</ChakraLink>
        </Text>
      </Link>
    </VStack>
  );
};
