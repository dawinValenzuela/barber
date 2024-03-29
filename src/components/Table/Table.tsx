import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';
import { useTable } from './useTable';

export const Table = ({ columns, data = [] }) => {
  const tableInstance = useTable({ columns, data });

  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    <TableContainer>
      <ChakraTable size='sm'>
        {getHeaderGroups().map((headerGroup) => (
          <Thead key={headerGroup.id}>
            <Tr>
              {headerGroup.headers.map((header) => {
                return (
                  <Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
        ))}
        <Tbody>
          {getRowModel().rows.map((row) => {
            return (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
