import { Box, Heading, Text, Spinner, Flex } from '@chakra-ui/react';
import React from 'react';
import { ListItem } from '../ListItem';
import { sortBy } from 'lodash';

export const ServiceList = ({ services = [], isLoadingServices }) => {
  const today = new Date();
  const dateString = today.toLocaleDateString();

  const sortedData = sortBy(services, ['hour']);

  return (
    <Box mt={4}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4}>
        Listado de Servicios
      </Heading>
      <Text fontSize='lg' textAlign='right' mb={4} fontWeight='bold'>
        {dateString}
      </Text>
      <Box w={'full'}>
        {isLoadingServices && (
          <Flex width='100%' justifyContent='center'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        )}
        {!services.length && !isLoadingServices && (
          <Text>No hay servicios</Text>
        )}
        {sortedData?.map((service, key) => (
          <>
            <ListItem key={service.id} service={service} itemNumber={key + 1} />
          </>
        ))}
      </Box>
    </Box>
  );
};
