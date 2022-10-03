import {
  Select,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';

export const AddService = () => {
  return (
    <Box p={4}>
      <VStack spacing={3} align='stretch'>
        <FormControl>
          <FormLabel>Servicio</FormLabel>
          <Select placeholder='Select option'>
            <option value='option1' key={1}>
              Option 1
            </option>
            <option value='option2' key={2}>
              Option 2
            </option>
            <option value='option3' key={3}>
              Option 3
            </option>
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
