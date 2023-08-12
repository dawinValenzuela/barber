import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  TableContainer,
  VStack,
  Heading,
} from '@chakra-ui/react';
import type { Product } from 'src/types/product';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <VStack align='stretch' px={4} mt={7} spacing={8}>
      <Heading textAlign='center'>Listado de Productos</Heading>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nombre del Producto</Th>
              <Th>Proveedor</Th>
              <Th isNumeric>Precio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.supplier.name}</Td>
                <Td isNumeric>${product.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
