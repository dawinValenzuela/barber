import React, { useEffect } from "react";
import { useAuth } from "context/AuthContext";
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
} from "@chakra-ui/react";

export const ProductList = () => {
  const { getProducts, products, getSuppliers, suppliers } = useAuth();

  useEffect(() => {
    getProducts();
    getSuppliers();
  }, []);

  const productsWithSuppliers = products?.map((product) => {
    const supplier = suppliers?.find(
      (supplier) => supplier.id === product.supplierId
    );
    return {
      ...product,
      supplierName: supplier?.name,
    };
  });

  return (
    <VStack align="stretch" px={4} mt={7} spacing={8}>
      <Heading textAlign="center">Listado de Productos</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nombre del Producto</Th>
              <Th>Proveedor</Th>
              <Th isNumeric>Precio</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productsWithSuppliers?.map((product) => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.supplierName}</Td>
                <Td isNumeric>${product.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
