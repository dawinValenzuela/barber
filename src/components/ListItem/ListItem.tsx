import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';

import { formatToCurrency } from 'utils/formaters';

export const ListItem = ({ service, itemNumber, handleDeleteClick }) => {
  const serviceName = service?.name;
  const isFreeService = serviceName === 'corte gratis';

  const percentageFromService = !isFreeService
    ? (service?.value * 60) / 100
    : service?.value;

  return (
    <>
      <Box p={3} boxShadow='base' rounded='md' mb={4}>
        <Flex justifyContent='space-between' mb={2} alignItems='center'>
          <Flex alignItems='center'>
            <Badge mr={2}>{itemNumber}</Badge>
            <Badge>{service.name}</Badge>
          </Flex>
          <IconButton
            size='sm'
            aria-label='Delete'
            colorScheme='red'
            variant='outline'
            icon={<Icon as={MdDeleteForever} h={4} w={4} />}
            onClick={() => handleDeleteClick(service.id)}
          />
        </Flex>
        <Flex justifyContent='space-between' mb={2} alignItems='center'>
          <Text fontWeight='semibold' textTransform='capitalize'>
            Valor: {formatToCurrency(service.value)}
          </Text>
        </Flex>
        <Flex justifyContent='space-between' mb={2} alignItems='center'>
          <Text fontWeight='semibold' textTransform='capitalize'>
            Porcentaje: {formatToCurrency(percentageFromService)}
          </Text>
        </Flex>
        <Flex flexDirection='column'>
          <Text>Notas: {service.notes}</Text>
          <Text>
            Pago en {service.paymentMethod === 'cash' ? 'Efectivo' : 'Nequi'}
          </Text>
          <Text fontWeight='bold' textAlign='right'>
            Hora del servicio: {service.hour}
          </Text>
        </Flex>
      </Box>
      <Divider my={5} orientation='horizontal' colorScheme='blue' />
    </>
  );
};
