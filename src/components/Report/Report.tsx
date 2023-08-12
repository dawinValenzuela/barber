import {
  Heading,
  VStack,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
  Input,
  Link as ChakraLink,
  Container,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import _groupBy from 'lodash/groupBy';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import { formatToCurrency } from 'utils/formaters';
import Link from 'next/link';
import { useServices } from 'src/services/useServices';
import { useUsers } from 'src/services/useUsers';
import { Timestamp } from 'firebase/firestore';

export const Report = () => {
  const [initialDate, setInitialDate] = useState<string>('');
  const [finalDate, setFinalDate] = useState<string>('');

  const { getReportServices, reportServices, status } = useServices();
  const { users } = useUsers();

  const { services } = reportServices;

  // const {
  //   user,
  //   getAllServices,
  //   reportServices,
  //   users,
  //   getUsers,
  //   getAllOutputs,
  //   outputs,
  // } = useAuth();

  const isLoading = status === 'loading';

  useEffect(() => {
    getReportServices();
    // getAllOutputs();
  }, [getReportServices]);

  if (isLoading) return <div>Loading...</div>;

  const groupedServices = _groupBy(services, 'userId') || [];

  // group all the services by date formated as DD-MM-YYYY
  const groupedServicesByDate = _groupBy(services, (service) => {
    const date = new Date(service.createdAt);

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
  // const totalOutputs = outputs?.reduce((previousValue, currentValue) => {
  //   return previousValue + Number(currentValue.value);
  // }, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'initialDate') {
      // const firstDay = new Date(`${value} GMT-0500`);
      // firstDay.setHours(0, 0, 0, 0);
      // console.log({ firstDay, value });
      setInitialDate(`${value} GMT-0500`);
    }

    if (name === 'endDate') {
      setFinalDate(`${value} GMT-0500`);
    }
  };

  const handleSearch = () => {
    // getAllServices(initialDate, finalDate);
    // getAllOutputs(initialDate, finalDate);
  };

  return (
    <>
      <Container maxWidth='container.xl' mt={5}>
        <HStack alignContent='center'>
          <FormControl>
            <FormLabel>Fecha Inicial</FormLabel>
            <Input type='date' name='initialDate' onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Fecha Final</FormLabel>
            <Input type='date' name='endDate' onChange={handleChange} />
          </FormControl>
          <Flex alignSelf='end'>
            <Button colorScheme='blue' onClick={handleSearch}>
              Buscar
            </Button>
          </Flex>
        </HStack>
        <VStack mt={7} spacing={5} align='stretch' px={4}>
          <Heading textAlign='center'>Reporte consolidado</Heading>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Barbero</Th>
                  <Th>servicios</Th>
                  <Th isNumeric>Ingresos</Th>
                </Tr>
              </Thead>
              <Tbody>
                {groupedServices &&
                  Object.keys(groupedServices).map((userId) => {
                    const userInfo = _find(users, { userId: userId });

                    // filter free services, those doesn't add value
                    const services = _filter(
                      groupedServices[userId],
                      (service) => service.name !== 'corte gratis'
                    );

                    const totalAmount = services?.reduce(
                      (previousValue, currentValue) => {
                        if (currentValue.name === 'corte gratis') {
                          return previousValue + currentValue.value;
                        }

                        return previousValue + (currentValue.value * 40) / 100;
                      },
                      0
                    );

                    return (
                      <Tr key={userId}>
                        <Td>{userInfo.fullName}</Td>
                        <Td>{services.length}</Td>
                        <Td>{formatToCurrency(totalAmount)}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
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
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th isNumeric>total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {servicesByDate &&
                  servicesByDate.map((data) => {
                    return (
                      <Tr key={data.date}>
                        <Td>{data.date}</Td>
                        <Td>{formatToCurrency(data.total)}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
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
        {/* <VStack mt={7} spacing={5} align='stretch' px={4}>
          <Heading textAlign='center'>Reporte salidas</Heading>
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Detalle</Th>
                  <Th>fecha</Th>
                  <Th isNumeric>Valor</Th>
                </Tr>
              </Thead>
              <Tbody>
                {outputs &&
                  outputs.map((output, key) => {
                    return (
                      <Tr key={output.id}>
                        <Td>{key + 1}</Td>
                        <Td>{output.detail}</Td>
                        <Td>{output.paymentDate}</Td>
                        <Td>{formatToCurrency(Number(output.value))}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
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
          <Link href='/'>
            <Text textAlign='center' fontSize='xl'>
              <ChakraLink>Regresar al home</ChakraLink>
            </Text>
          </Link>
        </VStack> */}
      </Container>
    </>
  );
};
