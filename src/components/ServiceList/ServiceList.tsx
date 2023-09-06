import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Select,
  Icon,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import React, { useState } from 'react';
import { sortBy } from 'lodash';
import { UserFilter, ListItem } from 'src/components';
import type { User } from 'src/types/user';
import type { ServiceState } from 'src/store/services/types';
import { Alert } from '../Alert';

interface ServiceListProps {
  services: ServiceState[];
  isLoadingServices?: boolean;
  role: string;
  user: User;
  users: User[];
  // getUserServices: (userId: string, date: string) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  isLoadingServices = false,
  users = [],
  setUser,
  setDateString,
  today,
  dateString,
  userSelected,
  isArrowDisabled,
  isAdmin,
  getUserServices,
  deleteUserService,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [serviceId, setServiceId] = useState('');

  const toast = useToast();
  const sortedData = sortBy(services, ['hour']);

  const handleOnSelectChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    const userId = (event.target as HTMLSelectElement)?.value;
    setUser(userId);
  };

  const handleLeftClick = () => {
    today.setDate(today.getDate() - 1);
    const newDate = today.toLocaleDateString();
    setDateString(newDate);
  };

  const handleRightClick = () => {
    today.setDate(today.getDate() + 1);
    const newDate = today.toLocaleDateString();
    setDateString(newDate);
  };

  const handleConfirmDeleteClick = () => {
    if (!serviceId) return;

    deleteUserService(serviceId)
      .then(() => {
        toast({
          title: 'Muy bien',
          description: 'El servicio se ha eliminado correctamente',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Ah ocurrido un error',
          description: 'Error al eliminar el servicio',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsAlertOpen(false);
        // getUserServices({ userId: userSelected, dateSelected: dateString });
      });
  };

  const handleDeleteClick = (id: string) => {
    setIsAlertOpen(true);
    setServiceId(id);
  };

  return (
    <Box mt={4}>
      <Heading as='h2' size='lg' noOfLines={1} mb={4} textAlign='center'>
        Listado de Servicios
      </Heading>
      <Flex justifyContent='space-between' mb={5}>
        <IconButton
          colorScheme='blue'
          aria-label='left'
          icon={<Icon as={MdKeyboardArrowLeft} w={8} h={8} />}
          onClick={handleLeftClick}
          isDisabled={isArrowDisabled}
        />
        <Text
          as='span'
          fontSize='lg'
          textAlign='center'
          mb={4}
          fontWeight='bold'
          suppressHydrationWarning
        >
          {dateString}
        </Text>
        <IconButton
          colorScheme='blue'
          aria-label='right'
          icon={<Icon as={MdKeyboardArrowRight} w={8} h={8} />}
          onClick={handleRightClick}
          isDisabled={isArrowDisabled}
        />
      </Flex>

      {isAdmin && <UserFilter users={users} onChange={handleOnSelectChange} />}

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
        {!isLoadingServices &&
          sortedData?.map((service, key) => (
            <ListItem
              key={key}
              service={service}
              itemNumber={key + 1}
              userId={userSelected}
              dateSelected={dateString}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
      </Box>
      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onDelete={() => handleConfirmDeleteClick()}
      />
    </Box>
  );
};
