import React, { useState } from 'react';
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link as ChakraLink,
  Flex,
  Text,
  Heading,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { useAuth } from 'context/AuthContext';
import _groupBy from 'lodash/groupBy';
import { formatToCurrency } from 'utils/formaters';
import Link from 'next/link';
import { UserFilter } from 'src/components';
import { useGetResumeServicesQuery } from 'src/store/services/slice';
import { useGetUsersQuery } from 'src/store/users/slice';

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

export const ResumeInfo = ({ session }) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [userId, setUserId] = useState(session?.userId);
  const { data: resumeServices } = useGetResumeServicesQuery({ userId, month });
  const { data: users } = useGetUsersQuery(undefined);

  const isAdmin = session?.role === 'owner' || session?.role === 'admin';

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

  const handleOnSelectChange = (event) => {
    const userId = event?.target?.value;
    setUserId(userId);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setMonth(Number(value));
  };

  return (
    <VStack align='stretch' px={4} mt={7} spacing={8}>
      <Heading textAlign='center'>Resumen de Ingresos</Heading>
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
      {isAdmin && <UserFilter users={users} onChange={handleOnSelectChange} />}
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
      {/* <Link href='/'>
        <Text textAlign='center' fontSize='xl'>
          <ChakraLink>Regresar al home</ChakraLink>
        </Text>
      </Link> */}
    </VStack>
  );
};
