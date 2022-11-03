import {
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import React, { useEffect } from 'react';
import _groupBy from 'lodash/groupBy';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import { formatToCurrency } from 'utils/formaters';
import Link from 'next/link';

export const Report = () => {
  const { user, getAllServices, reportServices, users, getUsers } = useAuth();

  useEffect(() => {
    getUsers();
    getAllServices();
  }, []);

  const groupedServices = _groupBy(reportServices, 'userId') || [];

  const filteredFreeServices = _filter(
    reportServices,
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

  return (
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
      <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al home</ChakraLink>
        </Text>
      </Link>
    </VStack>
  );
};
