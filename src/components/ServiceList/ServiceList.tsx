import { Box, Heading, Text, Spinner, Flex, Select } from '@chakra-ui/react';
import React from 'react';
import { ListItem } from '../ListItem';
import { sortBy } from 'lodash';

export const ServiceList = ({
  services = [],
  isLoadingServices = false,
  role,
  users = [],
  getUserServices,
}) => {
  const today = new Date();
  const dateString = today.toLocaleDateString();

  const sortedData = sortBy(services, ['hour']);

  const isAdmin = role === 'owner' || role === 'admin';

  const handleOnSelectChange = (event) => {
    const userId = event?.target?.value;
    getUserServices(userId);
  };

  return (
    <Box mt={4}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4} textAlign='center'>
        Listado de Servicios
      </Heading>
      <Text fontSize='lg' textAlign='center' mb={4} fontWeight='bold'>
        {dateString}
      </Text>

      {isAdmin && (
        <Select
          placeholder='Seleccione un barbero'
          mb={5}
          onChange={handleOnSelectChange}
        >
          {users?.map((option) => {
            return (
              <option key={option.userId} value={option.userId}>
                {option.fullName}
              </option>
            );
          })}
        </Select>
      )}

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
