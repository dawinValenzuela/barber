import { Box, Heading, HStack, Text } from '@chakra-ui/react';

export const Resume = () => {
  return (
    <Box mx={4}>
      <Heading as='h2' size='lg' noOfLines={1}>
        Resumen del Día
      </Heading>
      <Box p={4} shadow='md' borderWidth='1px'>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Total Servicios
          </Text>
          <Text fontSize='xl'>5</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Ganancia del 40%
          </Text>
          <Text fontSize='xl'>$40,000</Text>
        </HStack>
      </Box>
    </Box>
  );
};
