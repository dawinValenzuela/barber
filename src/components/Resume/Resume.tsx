import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { formatToCurrency } from '../../../utils/formaters';

export const Resume = ({ services }) => {
  const servicesCount = services?.length || 0;

  //We should not sum free services
  const filterServices = services?.filter(
    (service) => service.name !== 'corte gratis'
  );

  const freeServices = services?.filter(
    (service) => service.name === 'corte gratis'
  );

  const totalValue = filterServices?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0
  );

  // Total to pay for free services
  const totalValueFreeServices = freeServices?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0
  );

  const percentage = Math.round(totalValue * 0.6);
  const amountUtility = Math.round(totalValue * 0.4);

  return (
    <Box my={6}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4}>
        Resumen del Día
      </Heading>
      <Box p={4} shadow='md' borderWidth='1px' rounded='md'>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Total Servicios:
          </Text>
          <Text fontSize='xl'>{servicesCount}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Total Pagado:
          </Text>
          <Text fontSize='xl'>{formatToCurrency(totalValue)}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Ganado 60%:
          </Text>
          <Text fontSize='xl'>{formatToCurrency(percentage)}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Ganado 40%:
          </Text>
          <Text fontSize='xl'>{formatToCurrency(amountUtility)}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Servicios gratis:
          </Text>
          <Text fontSize='xl'>{formatToCurrency(totalValueFreeServices)}</Text>
        </HStack>
        <HStack>
          <Text color='gray.800' fontWeight={800} fontSize='larger'>
            Pago final:
          </Text>
          <Text fontSize='xl' fontWeight={500} color='red.500'>
            {formatToCurrency(percentage + totalValueFreeServices)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
