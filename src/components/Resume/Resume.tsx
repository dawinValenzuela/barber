import { Box, Heading, HStack, Text } from '@chakra-ui/react';

export const Resume = () => {
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
          <Text fontSize='xl'>5</Text>
        </HStack>
        <HStack>
          <Text color='gray.400' fontWeight={600} fontSize='larger'>
            Ganancia del 60%
          </Text>
          <Text fontSize='xl'>$40,000</Text>
        </HStack>
      </Box>
    </Box>
  );
};
