import React from 'react';
import {
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
import { Table } from 'src/components';

interface ProductListProps {
  products: Product[];
}

const DEFAULT_COLUMNS = [
  { id: 'name', header: 'Nombre producto' },
  { id: 'value', header: 'Valor' },
  { id: 'category', header: 'Categoria' },
];

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <VStack align='stretch' px={4} mt={7} spacing={8}>
      <Heading textAlign='center'>Listado de Productos</Heading>
      <Table columns={DEFAULT_COLUMNS} data={products} />
      {/* <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Nombre del Producto</Th>
              <Th>Proveedor</Th>
              <Th isNumeric>Precio</Th>
              <Th>Categoria</Th>
              <Th>Existencias</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.supplier.name}</Td>
                <Td isNumeric>${product.value}</Td>
                <Td>{product.category}</Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer> */}
    </VStack>
  );
};
