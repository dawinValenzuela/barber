import React, { useEffect, useState } from 'react';
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link as ChakraLink,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import _groupBy from 'lodash/groupBy';
import { formatToCurrency } from 'utils/formaters';
import Link from 'next/link';

export const ResumeInfo = () => {
  const { resumeServices, getResumeUserInfo } = useAuth();
  // const [totalReward, setTotalReward] = useState(0);

  useEffect(() => {
    getResumeUserInfo();
  }, []);

  const groupedServices = _groupBy(resumeServices, 'date') || [];

  const totalReward = resumeServices?.reduce(
    (previousValue, currentValue) => {
      if (currentValue.name === 'corte gratis') {
        return previousValue + currentValue.value;
      }

      return previousValue + (currentValue.value * 60) / 100;
    },

    0
  );

  console.log('groupedServices', groupedServices);

  return (
    <VStack align='stretch' px={4} mt={7} spacing={8}>
      <Heading textAlign='center'>Resumen de Ingresos</Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>servicios</Th>
              <Th isNumeric>Ingresos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupedServices &&
              Object.keys(groupedServices)?.map((service, key) => {
                const services = groupedServices?.[service];

                const totalAmount = services?.reduce(
                  (previousValue, currentValue) => {
                    if (currentValue.name === 'corte gratis') {
                      return previousValue + currentValue.value;
                    }

                    return previousValue + (currentValue.value * 60) / 100;
                  },
                  0
                );

                return (
                  <Tr key={key}>
                    <Td>{service}</Td>
                    <Td>{services.length}</Td>
                    <Td isNumeric>
                      <Text fontWeight={900}>
                        {formatToCurrency(totalAmount)}
                      </Text>
                    </Td>
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
