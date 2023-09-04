import {
  Heading,
  VStack,
  HStack,
  Flex,
  Text,
  Input,
  Link as ChakraLink,
  Container,
  FormControl,
  FormLabel,
  Button,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import _groupBy from 'lodash/groupBy';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import { formatToCurrency } from 'utils/formaters';
import Link from 'next/link';
import { useGetAllServicesQuery } from 'src/store/services/slice';
import { useGetOutputsQuery } from 'src/store/outputs/slice';
import { useGetUsersQuery } from 'src/store/users/slice';
import { ConsolidatedTable } from './ConsolidatedTable';
import { PerDaysTable } from './PerDaysTable';
import { OutputsTable } from './OutputsTable';

const MONTHS = [
  { value: 0, label: 'Enero' },
  { value: 1, label: 'Febrero' },
  { value: 2, label: 'Marzo' },
  { value: 3, label: 'Abril' },
  { value: 4, label: 'Mayo' },
  { value: 5, label: 'Junio' },
  { value: 6, label: 'Julio' },
  { value: 7, label: 'Agosto' },
  { value: 8, label: 'Septiembre' },
  { value: 9, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 11, label: 'Diciembre' },
];

export const Report = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const { data: services, isLoading } = useGetAllServicesQuery(month);
  const { data: outputs } = useGetOutputsQuery(month);
  const { data: users } = useGetUsersQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  const groupedServices = _groupBy(services, 'userId') || [];

  // group all the services by date formated as DD-MM-YYYY
  const groupedServicesByDate = _groupBy(services, (service) => {
    const date = new Date(service.createdAt._seconds * 1000);

    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  });

  // map the grouped services by date to get the total amount of each day
  const servicesByDate = Object.keys(groupedServicesByDate).map((date) => {
    const services = groupedServicesByDate[date];

    // the total is the 40% of the value of each service
    const total = services.reduce(
      (acc, service) => acc + service.value * 0.4,
      0
    );

    return {
      date,
      total,
    };
  });

  // get the total amount of servicesByDate
  const totalServices = servicesByDate.reduce(
    (acc, service) => acc + service.total,
    0
  );

  const filteredFreeServices = _filter(
    services,
    (service) => service.name !== 'corte gratis'
  );

  const totalReward = filteredFreeServices?.reduce(
    (previousValue, currentValue) => {
      if (currentValue.name === 'corte gratis') {
        return previousValue + currentValue.value;
      }

      return previousValue + (currentValue.value * 40) / 100;
    },

    0
  );

  // // sum all the values from the outputs
  const totalOutputs = outputs?.reduce((previousValue, currentValue) => {
    return previousValue + Number(currentValue.value);
  }, 0);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setMonth(Number(value));
  };

  const consolidatedTableData = Object.keys(groupedServices).map((userId) => {
    // filter free services, those doesn't add value
    const services = _filter(
      groupedServices[userId],
      (service) => service.name !== 'corte gratis'
    );

    const userData = _find(users, { userId });

    const totalAmount = services?.reduce((previousValue, currentValue) => {
      if (currentValue.name === 'corte gratis') {
        return previousValue + currentValue.value;
      }

      return previousValue + (currentValue.value * 40) / 100;
    }, 0);

    return {
      barber: userData?.fullName,
      services: services.length,
      value: formatToCurrency(totalAmount),
    };
  });

  const perDaysTableData = Object.keys(groupedServicesByDate).map((date) => {
    const services = groupedServicesByDate[date];

    // the total is the 40% of the value of each service
    const total = services.reduce(
      (acc, service) => acc + service.value * 0.4,
      0
    );

    return {
      date,
      total: formatToCurrency(total),
    };
  });

  const outputsTableData = outputs?.map((output) => {
    return {
      detail: output.detail,
      date: output.paymentDate,
      value: formatToCurrency(Number(output.value)),
    };
  });

  return (
    <>
      <Container maxWidth='container.xl' mt={5}>
        <HStack alignContent='center'>
          <FormControl>
            <Select
              placeholder='Selecciona un mes'
              defaultValue={month}
              onChange={handleMonthChange}
            >
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>
        <VStack mt={7} spacing={5} align='stretch' px={4}>
          <Heading textAlign='center'>Reporte consolidado</Heading>
          <ConsolidatedTable data={consolidatedTableData} />
          <Flex justifyContent='space-between'>
            <Text>Total Ingresos</Text>
            <Text fontWeight={900}>{formatToCurrency(totalReward)}</Text>
          </Flex>
          {/* <Link href='/'>
          <Text textAlign='center' fontSize='xl'>
            <ChakraLink>Regresar al home</ChakraLink>
          </Text>
        </Link> */}
        </VStack>
        <VStack mt={7} spacing={5} align='stretch' px={4}>
          <Heading textAlign='center'>Reporte por dias</Heading>
          <PerDaysTable data={perDaysTableData} />
          <Flex justifyContent='space-between'>
            <Text>Total Ingresos</Text>
            <Text fontWeight={900}>{formatToCurrency(totalServices)}</Text>
          </Flex>
          {/* <Link href='/'>
          <Text textAlign='center' fontSize='xl'>
            <ChakraLink>Regresar al home</ChakraLink>
          </Text>
        </Link> */}
        </VStack>
        <VStack mt={7} spacing={5} align='stretch' px={4}>
          <Heading textAlign='center'>Reporte salidas</Heading>
          <OutputsTable data={outputsTableData} />
          <Flex justifyContent='space-between'>
            <Text>Total Salidas</Text>
            <Text fontWeight={900}>{formatToCurrency(totalOutputs)}</Text>
          </Flex>
          <Flex justifyContent='space-between'>
            <Text>Saldo en caja</Text>
            <Text fontWeight={900}>
              {formatToCurrency(totalReward - totalOutputs)}
            </Text>
          </Flex>
          {/* <Link href='/'>
            <Text textAlign='center' fontSize='xl'>
              <ChakraLink>Regresar al home</ChakraLink>
            </Text>
          </Link> */}
        </VStack>
      </Container>
    </>
  );
};
