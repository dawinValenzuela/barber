import { Box, Heading, HStack, Text } from '@chakra-ui/react';

export const Resume = ({ services }) => {
  const toltal = services?.length || 0;

  const totalValue = services?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0
  );

  const percentage = Math.round(totalValue * 0.6);

  return (
    <Box my={6}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4}>
        Resumen del Día
      </Heading>
      <Box p={4} shadow='md' borderWidth='1px' rounded='md'>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Total Servicios
          </Text>
          <Text fontSize='xl'>{toltal}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Total Pagado
          </Text>
          <Text fontSize='xl'>${totalValue}</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            60%
          </Text>
          <Text fontSize='xl'>${percentage}</Text>
        </HStack>
      </Box>
    </Box>
  );
};
