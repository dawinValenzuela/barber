import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';

export const AddService = ({ services }) => {
  console.log('services', services);
  return (
    <Box mb={4}>
      <VStack spacing={3} align='stretch'>
        <FormControl>
          <FormLabel>Servicio</FormLabel>
          <Select placeholder='Select option'>
            {services?.map((option) => {
              return <option key={option.key}>{option.name}</option>;
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Costo</FormLabel>
          <Input type='text' value='' placeholder='$0' />
        </FormControl>
        <Button colorScheme='blue'>Registrar</Button>
      </VStack>
    </Box>
  );
};
