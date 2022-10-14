import {
  Box,
  Heading,
  Flex,
  Text,
  Divider,
  Badge,
  Tag,
} from '@chakra-ui/react';
import React from 'react';

const SERVICES = [
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 12000,
    date: '12/02/2022',
  },
  {
    name: 'Corte Basico',
    cost: 15000,
    date: '12/02/2022',
  },
];

export const ServiceList = () => {
  return (
    <Box mt={4}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4}>
        Listado de Servicios
      </Heading>
      <Box rounded={'md'} w={'full'} boxShadow={'2xl'}>
        {!SERVICES.length && <Text>No hay servicios</Text>}
        {SERVICES?.map((service, key) => (
          <>
            <Box p={3} key={key}>
              <Flex justifyContent='space-between' mb={2} alignItems='center'>
                <Text fontWeight='medium'>{service.name}</Text>
                <Tag colorScheme='green' size='lg'>
                  {service.cost}
                </Tag>
              </Flex>
              <Text textAlign='right' fontWeight='bold'>
                {service.date}
              </Text>
            </Box>
            <Divider />
          </>
        ))}
      </Box>
    </Box>
  );
};
