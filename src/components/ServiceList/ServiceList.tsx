import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import React, { ChangeEvent, useState } from 'react';
import { sortBy } from 'lodash';
import { UserFilter, ListItem } from 'src/components';
import { ServiceProps, UserInfo } from 'types';

interface Props {
  services: ServiceProps[];
  isLoadingServices?: boolean;
  role: string;
  user: UserInfo;
  users: UserInfo[];
  getUserServices: (userId: string, date: string) => void;
}

export const ServiceList = ({
  services = [],
  isLoadingServices = false,
  role,
  user,
  users = [],
  getUserServices,
}: Props) => {
  const [userSelected, setUserSelected] = useState<string>(user?.userId); // just for admin
  const [today] = useState(new Date());
  const [dateString, setDateString] = useState(today.toLocaleDateString());

  const sortedData = sortBy(services, ['hour']);

  const isAdmin = role === 'owner' || role === 'admin';

  const handleOnSelectChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const newDate = today.toLocaleDateString();
    const userId = event?.target?.value as string;
    setUserSelected(userId);
    getUserServices(userId, newDate);
  };

  const handleLeftClick = () => {
    today.setDate(today.getDate() - 1);
    const newDate = today.toLocaleDateString();
    setDateString(newDate);
    getUserServices(userSelected, newDate);
  };

  const handleRightClick = () => {
    today.setDate(today.getDate() + 1);
    const newDate = today.toLocaleDateString();
    setDateString(newDate);
    getUserServices(userSelected, newDate);
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
        />
        <Text fontSize='lg' textAlign='center' mb={4} fontWeight='bold'>
          {dateString}
        </Text>
        <IconButton
          colorScheme='blue'
          aria-label='right'
          icon={<Icon as={MdKeyboardArrowRight} w={8} h={8} />}
          onClick={handleRightClick}
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
            <>
              <ListItem key={key} service={service} itemNumber={key + 1} />
            </>
          ))}
      </Box>
    </Box>
  );
};
