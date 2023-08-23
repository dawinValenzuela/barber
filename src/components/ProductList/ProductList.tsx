import React from 'react';
import { VStack, Heading, Flex, Button } from '@chakra-ui/react';
import type { Product } from 'src/types/product';
import { Table } from 'src/components';

interface ProductListProps {
  products: Product[];
}

const DEFAULT_COLUMNS = [
  { id: 'name', header: 'Nombre producto' },
  { id: 'supplier', header: 'Proveedor' },
  { id: 'value', header: 'Valor' },
  { id: 'category', header: 'Categoria' },
  { id: 'stock', header: 'Existencias' },
];

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <VStack align='stretch' px={4} mt={7} spacing={8}>
      <Heading textAlign='center'>Listado de Productos</Heading>
      <Flex>
        <Button variant='solid' colorScheme='blue'>
          Nuevo Producto
        </Button>
      </Flex>
      <Table columns={DEFAULT_COLUMNS} data={products} />
    </VStack>
  );
};
